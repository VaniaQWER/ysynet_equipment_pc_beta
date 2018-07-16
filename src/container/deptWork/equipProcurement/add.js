/*
 * @Author: yuwei  - 新建设备采购申请
 * @Date: 2018-07-11 11:33:17 
* @Last Modified time: 2018-07-11 11:33:17 
 */
import React, { Component } from 'react';
import { Row,Col,Input, Layout,Button,message,Form,Select} from 'antd';
import deptwork from '../../../api/deptwork';
import { CommonData , validMoney , validAmount } from '../../../utils/tools';
import request from '../../../utils/request';
import queryString from 'querystring';
import { fundsSourceSelect } from '../../../constants';
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const formItemLayoutLine = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const formItemLayoutLine2 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
class AddEquipProcurement extends Component {
  state={
    query:{},
    unitList:[],
    manageSelect:[],
    outDeptOptions: [],
    postFile:[],
    editStatus:false,
    editStatusText:'新建设备采购申请',
    bDeptName:"",
    fillBackData:{},//编辑的时候填充
  }
  componentDidMount = () => {
    console.log('this.props')
    if(this.props.match.params.id){
      console.log('编辑状态')
      this.setState({
        editStatusText:'编辑设备采购申请',
        editStatus:true,
      })
      request(deptwork.queryApplyZc,{
        body:JSON.stringify({applyId:this.props.match.params.id}),
        headers: {
          'Content-Type': 'application/json'
        },
        success: data => {
          if(data.status){
            this.setState({fillBackData:data.result})
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      })
    }
    this.getManageSelect();
    this.outDeptSelect();
    CommonData('UNIT', (data) => {
      this.setState({unitList:data.rows})
    })
  }
  getManageSelect = () => {
    request(deptwork.selectUseDeptList,{
      body:queryString.stringify({deptType:"01"}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          this.setState({manageSelect:data.result})
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    })
  }
  outDeptSelect = () => {

    request(deptwork.queryDeptListByUserId,{
      body:queryString.stringify({}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          this.setState({outDeptOptions:data.result})
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    })
  }
  handleSubmit = () =>{
    this.props.form.validateFieldsAndScroll((err,values)=>{
      
      let url = deptwork.insertApplyZc ; 
      if(this.state.editStatus){//编辑状态
        url = deptwork.updateApplyZc;
        values = Object.assign(this.state.fillBackData,values);
        delete values.createTime;
        delete values.purchaseName;
        values.fstate="00";
      }else{//新增
        values.bDeptName=this.state.bDeptName;
        values.fstate="00";
      }
      console.log(JSON.stringify(values))
      request(url,{
        body:JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        },
        success: data => {
          if(data.status){
            message.success('保存成功！');
            const {history} = this.props;
            history.push('/deptWork/equipProcurement')
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      })
    })
  }

  goBack = ()=>{
    const { history } = this.props;
    history.push('/deptWork/equipProcurement');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { unitList , editStatusText , fillBackData } = this.state; //  editStatus 编辑状态 true为编辑  false 为新增
    const unitOption =  unitList.map(item=>(<Option key={item.TF_CLO_CODE} value={item.TF_CLO_CODE}>{item.TF_CLO_NAME}</Option>))
    
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
        <h3 style={{padding:'24px'}}>{editStatusText}  
          <Button style={{float:'right'}} onClick={()=>this.goBack()}>取消</Button>
          <Button type='primary' style={{float:'right',marginRight:8}} onClick={()=>this.handleSubmit()}>确认</Button>
        </h3>

        <Form  onSubmit={this.handleSearch}>
            <Row>
              <Col span={12}> 
                <FormItem
                  {...formItemLayoutLine}
                  label="申请科室"
                >
                  {getFieldDecorator('deptGuid',{
                    initialValue:fillBackData.deptGuid||'',
                    rules:[{required:true,message:'请选择申请科室'}]
                  })(
                    <Select 
                      showSearch
                      placeholder={'请选择'}
                      optionFilterProp="children"
                      filterOption={(input, option)=>this.filterOption(input, option)}
                      >
                          <Option value="" key={-1}>全部</Option>
                          {
                              this.state.outDeptOptions.map((item,index) => {
                              return <Option key={item.value} value={item.value}>{item.text}</Option>
                              })
                          }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}> 
                <FormItem
                  {...formItemLayoutLine2}
                  label="管理科室"
                >
                  {getFieldDecorator('bDeptGuid',{
                    initialValue:fillBackData.bDeptGuid|| '',
                    rules:[{required:true,message:'请选择管理科室'}]
                  })(
                    <Select 
                      showSearch
                      placeholder={'请选择'}
                      optionFilterProp="children"
                      filterOption={(input, option)=>this.filterOption(input, option)}
                      onSelect={(input, option)=>{
                        this.setState({bDeptName:option.props.children})
                      }}
                      >
                          <Option value="" key={-1}>全部</Option>
                          {
                              this.state.manageSelect.map((item,index) => {
                              return <Option key={item.value} value={item.value}>{item.text}</Option>
                              })
                          }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}> 
                <FormItem
                  {...formItemLayoutLine}
                  label="申请人"
                >
                  {getFieldDecorator('applyUserId',{
                    initialValue:fillBackData.applyUserId||'',
                    rules:[{required:true,message:'请填写申请人'}]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}> 
                <FormItem
                  {...formItemLayoutLine2}
                  label="单位"
                >
                  {getFieldDecorator('purchaseUnit',{
                    initialValue:fillBackData.purchaseUnit||'',
                    rules:[{required:true,message:'请选择单位'}]
                  })(
                    <Select 
                      showSearch
                      placeholder={'请选择'}
                      optionFilterProp="children"
                      filterOption={(input, option)=>this.filterOption(input, option)}
                      >
                        {unitOption}
                    </Select>
                  )}
                </FormItem>
              </Col>
              </Row>
              <Row>
                <Col span={12}> 
                  <FormItem
                    {...formItemLayoutLine}
                    label="申购数量"
                  >
                    {getFieldDecorator('amount',{
                      initialValue:fillBackData.amount||'',
                      rules:[{required:true,message:'请填写申购数量'},{validator:validAmount}]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}> 
                  <FormItem
                    {...formItemLayoutLine2}
                    label="预算单价"
                  >
                    {getFieldDecorator('budgetPrice',{
                      initialValue:fillBackData.budgetPrice||'',
                      rules:[{required:true,message:'请选择预算单价'},{validator: validMoney}]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}> 
                  <FormItem
                    {...formItemLayoutLine}
                    label="经费来源"
                  >
                    {getFieldDecorator('fundsSource',{
                      initialValue:fillBackData.fundsSource||'',
                      rules:[{required:true,message:'请填写经费来源'}]
                    })(
                      <Select>
                      {
                        fundsSourceSelect.map((item)=>(<Option key={item.value} value={item.value}>{item.text}</Option>))
                      }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}> 
                  <FormItem
                    {...formItemLayoutLine2}
                    label="预算总金额"
                  >
                    {getFieldDecorator('totalBudgetPrice',{
                      initialValue:fillBackData.totalBudgetPrice||'',
                      rules:[{validator:validMoney}]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
            <FormItem
              {...formItemLayout}
              label="产品名称"
              >
              {getFieldDecorator('materialName',{
                initialValue:fillBackData.materialName||'',
                rules:[{required:true,message:'请选择产品名称'}]
              })(
                <Input/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="推荐型号"
              >
              {getFieldDecorator('recommendFmodel',{
                initialValue:fillBackData.recommendFmodel||'',
              })(
                <Input.TextArea rows={5} maxLength={200}>
                </Input.TextArea>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="推荐厂商"
              >
              {getFieldDecorator('recommendProduct',{
                initialValue:fillBackData.recommendProduct||'',
              })(
                <Input.TextArea rows={5} maxLength={200}>
                </Input.TextArea>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="申购理由"
              >
              {getFieldDecorator('buyReason',{
                initialValue:fillBackData.buyReason||'',
              })(
                <Input.TextArea rows={5} maxLength={500}>
                </Input.TextArea>
              )}
            </FormItem>
        </Form>
      </Content>
    )
  }
}
export default Form.create()(AddEquipProcurement);