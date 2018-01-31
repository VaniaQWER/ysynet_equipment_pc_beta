/**
 * @file 维修信息 Card
 */
import React, { PureComponent } from 'react';
import { Row, Col, Radio, Form, Select, DatePicker, Input } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const gridStyle = {
  label: {
    span: 4,
    style: { textAlign: 'right', height: 50, lineHeight: '50px' }
  }, 
  content: {
    span: 8,
    style: { textAlign: 'left', height: 50, lineHeight: '50px' }
  }
}
// 内修
class InsideRepairForm extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Row type='flex'>
          <Col {...gridStyle.label}>维修人电话：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('inRrpairPhone')(
                <Input placeholder='请输入维修人电话'/>
            )}
          </Col>
          <Col {...gridStyle.label}>维修结果：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('repairResult')(
                <Select allowClear>
                  <Option value={"0"}>检测无故障</Option>
                  <Option value={"1"}>故障全部修复</Option>
                  <Option value={"2"}>故障部分修复</Option>
                  <Option value={"3"}>故障未修复</Option>
                </Select>
            )}
          </Col>
          <Col {...gridStyle.label}>维修费用：（总计）</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('actualPrice')(
                <Input addonBefore="￥"/>
            )}
          </Col>
          <Col {...gridStyle.label}>故障类型：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('repairContentType')(
                <Select allowClear>
                  <Option value={"0"}>故障类型1</Option>
                  <Option value={"1"}>故障类型2</Option>
                  <Option value={"2"}>故障类型3</Option>
                  <Option value={"3"}>故障类型4</Option>
                </Select>
            )}
          </Col>
          <Col {...gridStyle.label}>故障原因：</Col>
          <Col span={20} style={gridStyle.content.style}>
            <Select allowClear style={{width: '40%'}}>
              <Option value={"0"}>故障原因1</Option>
              <Option value={"1"}>故障原因2</Option>
              <Option value={"2"}>故障原因3</Option>
              <Option value={"3"}>故障原因4</Option>
            </Select>
          </Col>
          <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>维修备注：</Col>
          <Col span={20} style={{marginTop: 20}}>
            <TextArea rows={4} style={{width: '100%'}} />
          </Col>
        </Row>
      </Form>  
    )
  }
}

// 外修
class OutsideRepairForm extends PureComponent {
  render() {
    return (
      <Form>
        <Row type='flex'>
          <Col {...gridStyle.label}>指派服务商：</Col>
          <Col {...gridStyle.content}>
            <Input placeholder='输入服务商'/>
          </Col>
          <Col {...gridStyle.label}>维修联系电话：</Col>
          <Col {...gridStyle.content}>
            <Input placeholder='输入联系电话'/>
          </Col>
          <Col {...gridStyle.label}>起始时间~完成时间：</Col>
          <Col span={20} style={gridStyle.content.style}>
            <RangePicker style={{width: '40%'}}/>
          </Col>
          <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>指派备注：</Col>
          <Col span={20} style={{marginTop: 20}}>
            <TextArea rows={4} style={{width: '100%'}} />
          </Col>
        </Row>
      </Form> 
    )
  }
}
class ServiceInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      serviceType: "0"
    }
  }
  postData = () => {
    //const { serviceType } = this.state;
    console.log(this.wrapperForm.props.form.getFieldsValue())
  }
  render() {
    const { serviceType } = this.state;
    const Comp = serviceType === "0" ? Form.create()(InsideRepairForm) : Form.create()(OutsideRepairForm)
    return (
      <div>
        <Row type="flex">
          <Col {...gridStyle.label}>维修方式：</Col>
          <Col span={16} style={gridStyle.content.style}>
            <RadioGroup defaultValue="0" onChange={e => this.setState({serviceType: e.target.value})}>
              <RadioButton value="0">内修</RadioButton>
              <RadioButton value="1">外修</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Comp wrappedComponentRef={(inst) => this.wrapperForm = inst}/>
      </div>  
    )
  }
}
export default ServiceInfo;