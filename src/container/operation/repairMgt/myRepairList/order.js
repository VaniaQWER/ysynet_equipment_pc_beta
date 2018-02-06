/**
 * @file 资产运维 - 维修管理 - 我的指派 - 指派
 */
import React, { PureComponent } from 'react';
import { Layout, Card, Affix, Button, BackTop,message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import StepsInfo from '../cardInfo/stepsInfo'
import AssetsInfo from '../cardInfo/assetsInfo';   
import RepairInfo from '../cardInfo/repairInfo'; 
import AssignInfo from '../cardInfo/assignInfo';
import { operation as operationService } from '../../../../service';
import assets from '../../../../api/assets';
const { Content } = Layout;
class RepairOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      AssetInfoData: {},
    }
  }

  onSubmit = () => {
    const { designateInOrOut } = this.props;
    const data = this.refs.assignInfo.postData(); //获取指派信息
    let params ={};
    //下面两个字段接口中无
    //params.rrpairOrderGuid = this.AssetInfoData.rrpairOrderGuid;
    //params.orderFstate = this.AssetInfoData.orderFstate;
    console.log({...params,...data},'指派信息');
    designateInOrOut(assets.designateInOrOut,params,(data) => {
      if(data.status){
        message.success("操作成功!")
      }else{
        message.error(data.msg)
      }
    })
  }
  //获取id 根据id号查详情
  componentWillMount = () =>{
    const assetsRecordGuid = this.props.match.params.id;
    const { getSelectAssetsRecordDetail } = this.props;
    const params = { assetsRecordGuid: assetsRecordGuid };
    getSelectAssetsRecordDetail(assets.selectAssetsRecordDetail , params,(data) => {
      this.setState( { AssetInfoData : data.result })
    })
  }
  render() {
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
        <Card title="报修进度" extra={[
          <Affix key={1}>
            <Button onClick={this.onSubmit} type='primary'>提交</Button>
          </Affix>
        ]} key={1}>
          <StepsInfo current={1} />
        </Card>
        <Card title="资产信息" style={{marginTop: 16}} hoverable={false} key={2}>
         {
            JSON.stringify(this.state.AssetInfoData) === '{}' ? null 
            :
            <AssetsInfo wrappedComponentRef={(inst) => this.assetsInfo = inst} data={this.state.AssetInfoData} isEdit={true}/>
         } 
        </Card>
        <Card title="报修信息" style={{marginTop: 16}} hoverable={false} key={3}>
          
          {
            JSON.stringify(this.state.AssetInfoData) === '{}' ? null 
            :
            <RepairInfo wrappedComponentRef={(inst) => this.repairInfo = inst} data={this.state.AssetInfoData} isEdit={true}/>
         } 
        </Card>
        <Card title="指派信息" style={{marginTop: 16}} hoverable={false} key={5}>
          <AssignInfo ref='assignInfo'/>
        </Card>
        <BackTop />
      </Content>
    )
  }
}


export default withRouter(connect(null, dispatch => ({
  getSelectAssetsRecordDetail: (url,values,success) => operationService.getInfo(url,values,success),
  designateInOrOut: (url,values,success) => operationService.getInfo(url,values,success),
}))(RepairOrder));