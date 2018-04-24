/**
 * 档案管理-资产档案-详情-基本信息-资产信息
 */
import React, { Component } from 'react';
import { Row, Col,message,Tooltip ,DatePicker , Button , Select} from 'antd';
import InputWrapper from '../../../component/inputWrapper'
import styles from './style.css';
import request from '../../../utils/request';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { ledger as ledgerService } from '../../../service';
import assets from '../../../api/assets';
import querystring from 'querystring';
import moment, { isMoment } from 'moment';
import _ from 'lodash';
import { depreciationTypeData } from '../../../constants';
const { MonthPicker} = DatePicker;


class DepreInfo extends Component {
  
  state={
    submitList:[],
    value:1
  }

  componentWillMount () {
    this.getDevalueInfoData(this.props.match.params.id)
  }

  getDevalueInfoData (id){

    request(assets.getDepreciateDetails, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body:  querystring.stringify({'assetsRecordGuid':id}),
      success: (data) => {
        if(_.isArray(data.result)){
          this.setState({
            submitList:data.result
          })
        }else{
          this.setState({
            submitList:[]
          })
        }
      },
      error: err => alert(err)
    })
  }

  handleUpdateAssetsRecordInfo = (data,field) =>{
    if(isMoment(data)){
        data = moment(data).format('YYYY-MM')
    }
    const { updateAssetsRecordInfo } = this.props;
    let params = { };
    params.value = field;
    params.text = data;
    params.assetsRecordGuid = this.props.match.params.id;

    updateAssetsRecordInfo(assets.updateAssetsRecordInfo, querystring.stringify(params),(data) => {
     if(data.status){
      message.success("修改成功")
     }else{
      message.error(data.msg);
     }
   },{
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
   })
  }
  handlePayList = ()=>{
    //提交资金结构列表
    let json = {
      equipmentPayList:this.state.submitList,
      assetsRecordGuid:this.props.match.params.id
    }
    console.log(JSON.stringify(json))
    let options = {
			body:JSON.stringify(json),
			success: data => {
				if(data.status){
          message.success('资金结构保存成功')
          this.props.freshDetail();//刷新单条
				}else{
					message.error(data.msg)
				}
			},
			error: err => {console.log(err)}
		}
		request(assets.submitEquipmentPay,options)
  }
  setSubmitList = (value,type,field)=> {
    let j = {
      payType:type,
      [field]:value-0
    }
    let a = this.state.submitList;
    if(a.length){
      a.forEach(ele=>{
        if(ele.payType===j.payType){
          ele=Object.assign(ele,j)
          return
        }
      })
    }
    a.push(j)
    this.setState({
      submitList:_.uniqBy(a,'payType')
    })
  }
  getBackData = (type,field)=>{
    let single = _.find(this.state.submitList,{"payType":type})
    if(single && single[field]){
      return single[field].toString()
    }else{
      return ''
    }
  }
 
  render () {
    const { AssetInfoData } = this.props;
    return (
      <Row type="flex" style={{marginTop: 16}}  className={styles['table-row']}>
        <Col span={4} className={styles['table-span']}>折旧方式</Col>
        <Col span={8} className={styles['table-span']}>
          {
              <Select defaultValue={AssetInfoData.depreciationType} style={{width:140,marginLeft:10}}
                onChange={(e)=>this.handleUpdateAssetsRecordInfo(e,'DEPRECIATION_TYPE')}>
                <Select.Option value="00">无折旧方式</Select.Option>
                <Select.Option value="01">{depreciationTypeData['01'].text}</Select.Option>
                <Select.Option value="02">{depreciationTypeData['02'].text}</Select.Option>
                <Select.Option value="03">{depreciationTypeData['03'].text}</Select.Option>
                <Select.Option value="04">{depreciationTypeData['04'].text}</Select.Option>
              </Select> 
            }
        </Col>
        <Col span={4} className={styles['table-span']}>原值</Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.originalValue }</Col>
        <Col span={4} className={styles['table-span']}>
          <Tooltip placement="top" title={`自筹资金:￥${this.getBackData('01','buyPrice')}财政拨款：￥${this.getBackData('02','buyPrice')}`} arrowPointAtCenter>累计折旧</Tooltip>
        </Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.totalDepreciationPrice }</Col>
        <Col span={4} className={styles['table-span']}>净值</Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.carryingAmount }</Col>
        <Col span={4} className={styles['table-span']}>净残值率</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'RESIDUAL_VALUE_V')} text={ AssetInfoData.residualValueV ? AssetInfoData.residualValueV.toString() : '' } /></Col>
        <Col span={4} className={styles['table-span']}>净残值</Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.residualValue }</Col>
        <Col span={4} className={styles['table-span']}>月折旧率</Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.monthDepreciationV }</Col>
        <Col span={4} className={styles['table-span']}>
            <Tooltip placement="top" title={`自筹资金:￥${this.getBackData('01','buyPrice')}财政拨款：￥${this.getBackData('02','buyPrice')}`} arrowPointAtCenter>月折旧额</Tooltip>
        </Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.monthDepreciationPrice }</Col>
        <Col span={4} className={styles['table-span']}>预计使用年限</Col>
        <Col span={8} className={styles['table-span']}>
          <InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'USE_LIMIT')} text={ AssetInfoData.useLimit ?  AssetInfoData.useLimit.toString() : '' } />
        </Col>
        <Col span={4} className={styles['table-span']}>计提开始时间</Col>
        <Col span={8} className={styles['table-span']}>
        <MonthPicker
         onChange={(data) =>this.handleUpdateAssetsRecordInfo(data,'DEPRECIATION_BEGIN_DATE')}  
         text={ moment(AssetInfoData.depreciationBeginDate,'YYYY-MM') } placeholder="选择计提开始时间"
         defaultValue={AssetInfoData.depreciationBeginDate ?  moment(AssetInfoData.depreciationBeginDate,'YYYY-MM') :null}
         allowClear={false}></MonthPicker>
        </Col>

        <Col span={24} className={styles['table-span']} style={{textAlign:'left',textIndent:'15px'}}>资金结构
          <Button style={{float:'right',marginTop:5,marginRight:15}} onClick={this.handlePayList} type="primary" > 保存</Button></Col>
        <Col span={0} className={styles['table-span']}></Col>

        <Col span={4} className={styles['table-span']} style={{textAling:'center'}}> 自筹资金</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.setSubmitList(data,'01','buyPrice')} text={ this.getBackData('01','buyPrice') } /></Col>
        
        <Col span={4} className={styles['table-span']}  style={{textAling:'center'}}>财政拨款</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) =>  this.setSubmitList(data,'02','buyPrice')} text={ this.getBackData('02','buyPrice') } /></Col>
        
        <Col span={4} className={styles['table-span']}>自筹资金原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.setSubmitList(data,'01','originalValue')} text={ this.getBackData('01','originalValue') } /></Col>
        
        <Col span={4} className={styles['table-span']}>财政拨款原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.setSubmitList(data,'02','originalValue')} text={ this.getBackData('02','originalValue') } /></Col>
        
        <Col span={4} className={styles['table-span']}>科研经费</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.setSubmitList(data,'03','buyPrice')}  text={  this.getBackData('03','buyPrice') } /></Col>
        
        <Col span={4} className={styles['table-span']}>教学资金</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.setSubmitList(data,'04','buyPrice')}  text={ this.getBackData('04','buyPrice')  } /></Col>
        
        <Col span={4} className={styles['table-span']}>科研经费原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.setSubmitList(data,'03','originalValue')} text={ this.getBackData('03','originalValue') } /></Col>
        
        <Col span={4} className={styles['table-span']}>教学资金原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) =>  this.setSubmitList(data,'04','originalValue')} text={ this.getBackData('04','originalValue') } /></Col>
        
        <Col span={4} className={styles['table-span']}>接收捐赠</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.setSubmitList(data,'05','buyPrice')}  text={ this.getBackData('05','buyPrice') } /></Col>
        
        <Col span={4} className={styles['table-span']}>其他</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.setSubmitList(data,'06','buyPrice')}  text={ this.getBackData('06','buyPrice') } /></Col>
        
        <Col span={4} className={styles['table-span']}>接收捐赠原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) =>  this.setSubmitList(data,'05','originalValue')} text={ this.getBackData('05','originalValue') } /></Col>
        
        <Col span={4} className={styles['table-span']}>其他原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) =>  this.setSubmitList(data,'06','originalValue')} text={ this.getBackData('06','originalValue') } /></Col>
        
    </Row>
    )
  }
}


 export default withRouter(connect(null, dispatch => ({
  updateAssetsRecordInfo: (url,values,success,type) => ledgerService.getInfo(url,values,success,type),
}))(DepreInfo));


