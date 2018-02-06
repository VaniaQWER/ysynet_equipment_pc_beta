import React, { Component } from 'react';
import { Card, BackTop, Affix, Button,message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import StepsInfo from '../cardInfo/stepsInfo'
import AssetsInfo from '../cardInfo/assetsInfo';   
import RepairInfo from '../cardInfo/repairInfo'; 
import ServiceInfo from '../cardInfo/serviceInfo';
import assets from '../../../../api/assets';
import { operation as operationService } from '../../../../service';
import querystring from 'querystring';
/**
 * @file 报修记录-编辑
 */
class RepairReg extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectRrpairDetailIsOrder: {},
        selectRrpairDetailIsAssets:{},
        selectRrpairDetailIsRrpair:{},
        selectRrpairDetailIsAcce:{},
        selectRrpairDetailIsCall:{}
      }
    }

   //获取id 根据id号查详情
   componentWillMount = () =>{
    const rrpairOrderGuid = this.props.match.params.id ;
    const { getSelectRrpairDetailList } = this.props;
    const params = { rrpairOrderGuid: rrpairOrderGuid };
    getSelectRrpairDetailList(assets.selectRrpairDetailList,querystring.stringify(params),(data) => {
      this.setState({ 
          selectRrpairDetailIsOrder: data.result.selectRrpairDetailIsOrder,
          selectRrpairDetailIsAssets: data.result.selectRrpairDetailIsAssets,
          selectRrpairDetailIsRrpair: data.result.selectRrpairDetailIsRrpair,
          selectRrpairDetailIsAcce: data.result.selectRrpairDetailIsAcce,
          selectRrpairDetailIsCall: data.result.selectRrpairDetailIsCall
        })
    },{
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    })
  }

  onSubmit = () => {
    const { insertOrRrpair } = this.props;
    const rrpairOrderGuid = this.props.match.params.id ;
    const params= {
      rrpairOrderGuid:rrpairOrderGuid,
      isRepairs:true,
      orderFstate:'10',
      ...this.repairInfo.postData(),
      ...this.refs.serviceInfo.postData()};
    console.log("报修登记编辑接口数据",params)
    insertOrRrpair(assets.insertOrUpdateRrpair,querystring.stringify(params),(data) => {
      if(data.status){
        message.success("操作成功!")
      }else{
        message.error(data.msg);
      }
    },{
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    })

  }

  render() {
    return (
      <div className='ysynet-repair ysynet-content '>
        <Card title="报修进度" extra={[
          <Affix key={1}>
            <Button type='primary' onClick={this.onSubmit}>提交</Button>
          </Affix>
        ]} key={1}>
          <StepsInfo current={0}/>
        </Card>
        <Card title="资产信息" style={{marginTop: 16}} hoverable={false} key={2}>
          {
            JSON.stringify(this.state.selectRrpairDetailIsAssets) === '{}' ? null 
            :
            <AssetsInfo isEdit={true} wrappedComponentRef={(inst) => this.assetsInfo = inst}  data={this.state.selectRrpairDetailIsAssets}/>
          } 
        </Card>
        <Card title="报修信息" style={{marginTop: 16}} hoverable={false} key={3}>
          {
            JSON.stringify(this.state.selectRrpairDetailIsOrder) === '{}' ? null 
            :
            <RepairInfo isEdit={true} wrappedComponentRef={(inst) => this.repairInfo = inst} data={this.state.selectRrpairDetailIsOrder}/>
          } 
        
        </Card>
        <Card title="维修信息" style={{marginTop: 16}} hoverable={false} key={5}>
          {
            JSON.stringify(this.state.selectRrpairDetailIsRrpair) === '{}' ? null 
            :
            <ServiceInfo isEdit={true}  ref='serviceInfo' data={this.state.selectRrpairDetailIsRrpair}/>
          } 
        </Card>
        <BackTop />
      </div>  
    )
  }
}



export default withRouter(connect(state => state, dispatch => ({
  getSelectRrpairDetailList: (url,values,success,type) => operationService.getInfo(url,values,success,type),
  insertOrRrpair: (url,values,success,type) => operationService.getInfo(url,values,success,type),
}))(RepairReg));