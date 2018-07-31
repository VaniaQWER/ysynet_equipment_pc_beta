/*计量台账- 添加*/
import React , { Component } from 'react';
import { Layout, Card, Button, Affix, Form, Col, Row, Input,  DatePicker, Radio } from 'antd';
import { Link } from 'react-router-dom';
// import querystring from 'querystring';
// import request from '../../../utils/request';
const { Content } = Layout;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class AddMeterStand extends Component{
  state ={
    SearchKey:'',//资产编号搜索
    assetsInfo:{}
  }
  searchAsset = (e) => {
    this.setState({SearchKey:e.target.value}) 
    //在这里发出请求获取资产信息,将回填信息给assets做操作
    // this.setState({assetsInfo:{ }})
  }
  save = () => {
    this.props.form.validateFields((err,values)=>{
      if(!err){
        values.daijianshijian = values.daijianshijian.format('YYYY-MM-DD')
        console.log(this.state.SearchKey);//此处为资产编码
        values = Object.assign(values,{assetbianma : this.state.SearchKey})
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { assetsInfo } = this.state;
    return(
      <Content className='ysynet-content'>
      {/* 保存申请信息按钮部分 */}
      <Affix>
        <div style={{background: '#fff', padding: '10px 20px', marginBottom: 4, display: 'flex', alignContent: 'center', justifyContent: 'flex-end'}}>
        <Button type="primary"><Link to={{pathname:`/meterMgt/meterStand/`}}>取消</Link></Button>
        <Button type="primary" onClick={this.save} style={{marginLeft:15}}>保存</Button>
        </div>
      </Affix>
      {/* 资产信息部分 */}
      <Card title="资产信息" bordered={false} className="min_card">
          <Row>
            <Col span={8}>
              <div className="ant-row ant-form-item">
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                  <label>资产编号</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                  <div className="ant-form-item-control">
                    <Input style={{width: 200}}  onPressEnter={this.searchAsset}
                    placeholder={`请输入资产编号`} />
                  </div>
                </div>
              </div>

            </Col>
            <Col span={16}>
              <div className="ant-row ant-form-item">
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                  <label>资产名称</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                  <div className="ant-form-item-control">
                    {assetsInfo.zichanmingc || '资产名称'}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-row ant-form-item">
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                  <label>型号</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                  <div className="ant-form-item-control">
                    {assetsInfo.xinghao || '型号'}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-row ant-form-item">
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                  <label>规格</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                  <div className="ant-form-item-control">
                  {assetsInfo.xinghao || '规格'}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-row ant-form-item">
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                  <label>资产类别</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                  <div className="ant-form-item-control">
                  {assetsInfo.xinghao || '资产类别'}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>

            <Col span={8}>
              <div className="ant-row ant-form-item">
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                  <label>使用科室</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                  <div className="ant-form-item-control">
                  {assetsInfo.xinghao || '使用科室'}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-row ant-form-item">
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                  <label>保管员</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                  <div className="ant-form-item-control">
                  {assetsInfo.xinghao || '保管员'}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-row ant-form-item">
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                  <label>管理科室</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                  <div className="ant-form-item-control">
                  {assetsInfo.xinghao || '管理科室'}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
      </Card>
      {/* 资产信息部分 */}
      <Card title="检测信息" bordered={false} style={{marginTop: 4}} className="min_card">     
        <Form ref='checkForm'>
          <Row>
            <Col span={8}>
              <FormItem  {...formItemLayout} label='检定方式'>
                {getFieldDecorator('jiandingfangshi', {
                  initialValue:"01"
                })(
                  <Radio.Group>
                    <Radio value="01">内检</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label='计量周期'>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请填写计量周期!' }],
                })(
                  <Input addonAfter='月' style={{width:200}}/>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem {...formItemLayout} label='下次待检日期'>
              {getFieldDecorator('daijianshijian',{
                initialValue:null,
                rules:[{
                  required:true,message:"请选择下次待检日期!"
                }]
              })(
                <DatePicker format={'YYYY-MM-DD'} style={{width:200}}/>
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label='提前提醒天数'>
                {getFieldDecorator('tiqiantixingtianshu', )(
                  <Input addonAfter='天' style={{width:200}}/>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
  </Content>  
    )
  }
}

export default Form.create()(AddMeterStand) ; 