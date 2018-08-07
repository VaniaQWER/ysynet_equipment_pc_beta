/**
 * 档案管理-资产档案-详情-基本信息-资产信息
 */
import React, { Component } from 'react';
import { Form , Card , Input , Row, Col,message,Tooltip ,DatePicker , Button , Select} from 'antd';
import './style.css';
import request from '../../../utils/request';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { ledger as ledgerService } from '../../../service';
import assets from '../../../api/assets';
import querystring from 'querystring';
import moment, { isMoment } from 'moment';
import _ from 'lodash';
import { clearNull , limitNum , validMonth } from '../../../utils/tools';

import { depreciationTypeData } from '../../../constants';
const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const ShowDomInfo = (props) =>{
  const { name } = props;
  return ( 
    <div style={{height:40,lineHeight:'38px'}}>
      <Col span={6}>{`${name} :`}</Col>
      <Col span={18}>{props.children}</Col>
    </div>
  )
} 

class DepreInfo extends Component {
  
  state={
    submitList:[],
    value:1,
    editable:false,
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
 
   //1-产品信息- 折旧信息 - 整体编辑或保存
   handleSubmit = () => {
    // 此处发出请求地址 insertAssetsRecord   获取所有可编辑的数据
    if(this.state.editable){
      const { AssetInfoData } = this.props;
      this.props.form.validateFields((err, values)=>{
        values.assetsRecordGuid=AssetInfoData.assetsRecordGuid;
        values.assetsRecord=AssetInfoData.assetsRecord;
        if(values.depreciationBeginDate && isMoment(values.depreciationBeginDate)){
          values.depreciationBeginDate=moment(values.depreciationBeginDate).format('YYYY-MM-DD')
        }
        console.log('整体编辑或保存', {assetsRecord:clearNull(values),equipmentPayList:[]});
        request(assets.insertAssetsRecord,{
          body:JSON.stringify({assetsRecord:clearNull(values),equipmentPayList:[]}),
          headers: {
            'Content-Type': 'application/json'
          },
          success: data => {
            if(data.status){
              this.props.freshDetail()
              this.setState({editable:!this.state.editable})
              message.success('保存成功！')
              
            }else{
              message.error(data.msg)
            }
          },
          error: err => {console.log(err)}
        })

      })
    }else{
      this.setState({editable:!this.state.editable})
    }
  }
  
  render () {
    const { getFieldDecorator } = this.props.form;
    const { AssetInfoData } = this.props;
    const { editable } = this.state;
    const header= (
      <Row>
        <Col span={12}>折旧信息</Col>
        <Col span={12} style={{textAlign:'right'}}>
          <Button type='primary' style={{marginRight:15}} onClick={()=>this.handleSubmit()}>{editable? '保存':'编辑'}</Button>
        </Col>
      </Row>
    )
    return (

      <Card  title={header} style={{marginTop: 16,marginBottom:24}} className='baseInfo-assetInfo'>
        <Form>
          <Row>
            <Col span={8}>
              {
                editable? 
                  <FormItem label={`折旧方式`} {...formItemLayout}>
                    {getFieldDecorator(`depreciationType`,{//DEPRECIATION_TYPE
                      initialValue: AssetInfoData.depreciationType
                    })(
                      <Select>
                        <Option value="00">无折旧方式</Option>
                        <Option value="01">{depreciationTypeData['01'].text}</Option>
                        <Option value="02">{depreciationTypeData['02'].text}</Option>
                        <Option value="03">{depreciationTypeData['03'].text}</Option>
                        <Option value="04">{depreciationTypeData['04'].text}</Option>
                      </Select> 
                    )}
                  </FormItem>
                  :<ShowDomInfo name="折旧方式">{AssetInfoData?AssetInfoData.depreciationType?depreciationTypeData[AssetInfoData.depreciationType].text:'':''}</ShowDomInfo>
              }
            </Col>
            <Col span={8}>
              <ShowDomInfo name="原值">{AssetInfoData?AssetInfoData.originalValue:''}</ShowDomInfo>
            </Col>
            <Col span={8}>
              <ShowDomInfo name="累计折旧">
                <Tooltip placement="top" title={`自筹资金:￥${this.getBackData('01','buyPrice')}财政拨款：￥${this.getBackData('02','buyPrice')}`} arrowPointAtCenter>
                {AssetInfoData?AssetInfoData.totalDepreciationPrice:''}
                </Tooltip>
              </ShowDomInfo>
            </Col>
            <Col span={8}>
              <ShowDomInfo name="净值">{AssetInfoData?AssetInfoData.carryingAmount:''}</ShowDomInfo>
            </Col>
            <Col span={8}>
              {
                editable? 
                  <FormItem label={`净残值率`} {...formItemLayout}>
                    {getFieldDecorator(`residualValueV`,{
                      initialValue: AssetInfoData.residualValueV*100,
                      rules:[{validator:limitNum,max:100,message:'请输入0-100的数字，最多保留两位小数!'}]
                    })(
                        <Input addonAfter='%'/>
                    )}
                  </FormItem>
                  :<ShowDomInfo name="净残值率">{`${AssetInfoData.residualValueV*100}%`}</ShowDomInfo>
              }
            </Col>
            <Col span={8}>
              <ShowDomInfo name="预计使用年限">{AssetInfoData?AssetInfoData.useLimit:''}</ShowDomInfo>
            </Col>
            <Col span={8}>
              <ShowDomInfo name="月折旧率">{AssetInfoData?AssetInfoData.monthDepreciationV:''}</ShowDomInfo>
            </Col>
            <Col span={8}>
              <ShowDomInfo name="月折旧额">{AssetInfoData?AssetInfoData.monthDepreciationPrice:''}</ShowDomInfo>
            </Col>
            <Col span={8}>
              {
                editable? 
                  <FormItem label={`已折月数`} {...formItemLayout}>
                    {getFieldDecorator(`depreciationMonths`,{
                      initialValue: AssetInfoData.depreciationMonths,
                      rules:[{validator:validMonth,max:12,message:'请输入0-12正整数'}]
                      
                    })(
                        <Input/>
                    )}
                  </FormItem>
                  :<ShowDomInfo name="已折月数">{AssetInfoData.depreciationMonths}</ShowDomInfo>
              }
            </Col>
            <Col span={8}>
              <ShowDomInfo name="剩余月数">{AssetInfoData?AssetInfoData.surplusMonths:''}</ShowDomInfo>
            </Col>
            <Col span={8}>
              {
                editable? 
                  <FormItem label={`开始折旧时间`} {...formItemLayout}>
                    {getFieldDecorator(`depreciationBeginDate`,{
                      initialValue: AssetInfoData.depreciationBeginDate?moment(AssetInfoData.depreciationBeginDate,'YYYY-MM'):null
                    })(
                        <DatePicker/>
                    )}
                  </FormItem>
                  :<ShowDomInfo name="开始折旧时间">{ AssetInfoData.depreciationBeginDate?AssetInfoData.depreciationBeginDate.split(' ')[0]:'' }</ShowDomInfo>
              }
            </Col>  
          </Row>
        </Form>
      </Card>
    )
  }
}


 export default withRouter(connect(null, dispatch => ({
  updateAssetsRecordInfo: (url,values,success,type) => ledgerService.getInfo(url,values,success,type),
}))(Form.create()(DepreInfo)));


