/**
 * @file 指派信息 Card
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
    return (
      <Form>
        <Row type='flex'>
          <Col {...gridStyle.label}>维修组：</Col>
          <Col {...gridStyle.content}>
            <Select allowClear>
              <Option value={"0"}>维修组1</Option>
              <Option value={"1"}>维修组2</Option>
              <Option value={"2"}>维修组3</Option>
              <Option value={"3"}>维修组4</Option>
            </Select>
          </Col>
          <Col {...gridStyle.label}>维修人：</Col>
          <Col {...gridStyle.content}>
            <Select allowClear>
              <Option value={"0"}>狄仁杰</Option>
              <Option value={"1"}>韩信</Option>
              <Option value={"2"}>鲁班七号</Option>
              <Option value={"3"}>甄宓</Option>
            </Select>
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

// 关闭
class CloseRepairForm extends PureComponent {
  render() {
    return (
      <Form>
        <Row type='flex'>
          <Col {...gridStyle.label}>关闭原因：</Col>
          <Col {...gridStyle.content}>
            <Select allowClear>
              <Option value={"0"}>关闭原因1</Option>
              <Option value={"1"}>关闭原因2</Option>
              <Option value={"2"}>关闭原因3</Option>
              <Option value={"3"}>关闭原因3</Option>
            </Select>
          </Col>
          <Col {...gridStyle.label}>后续处理：</Col>
          <Col {...gridStyle.content}>
            <Select allowClear>
              <Option value={"0"}>后续处理4</Option>
              <Option value={"1"}>后续处理3</Option>
              <Option value={"2"}>后续处理2</Option>
              <Option value={"3"}>后续处理1</Option>
            </Select>
          </Col>
          <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>关闭备注：</Col>
          <Col span={20} style={{marginTop: 20}}>
            <TextArea rows={4} style={{width: '100%'}} />
          </Col>
        </Row>
      </Form> 
    )
  }
}

class AssignInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      serviceType: "0"
    }
  }
  
  render() {
    const { serviceType } = this.state;
    let Comp = null;
    if (serviceType === "0") {
      Comp = InsideRepairForm;
    } else if (serviceType === "1") {
      Comp = OutsideRepairForm;
    } else {
      Comp = CloseRepairForm;
    }
    return (
      <div>
        <Row type="flex">
          <Col {...gridStyle.label}>维修方式：</Col>
          <Col span={16} style={gridStyle.content.style}>
            <RadioGroup defaultValue="0" onChange={e => this.setState({serviceType: e.target.value})}>
              <RadioButton value="0">内修</RadioButton>
              <RadioButton value="1">外修</RadioButton>
              <RadioButton value="2">关闭</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Comp/>
      </div>
    )
  }
}

export default AssignInfo;