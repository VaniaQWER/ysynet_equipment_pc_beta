import React, { PureComponent } from 'react';
import { Row, Col, Select, Input } from 'antd';
import PicWall from '../../../../../component/picWall'; 
const { Option } = Select;
const { TextArea } = Input;
const gridStyle = {
  label: {
    span: 4,
    style: { textAlign: 'right', height: 50, lineHeight: '50px' }
  }, 
  content: {
    span: 4,
    style: { textAlign: 'left', height: 50, lineHeight: '50px' }
  }
}
export default class RepairInfo extends PureComponent {
  render() {
    return (
      <Row type="flex">
        <Col {...gridStyle.label}>紧急度：</Col>
        <Col {...gridStyle.content}>
          <Select style={{width: '100%'}} allowClear>
            <Option value='0'>不急</Option>
            <Option value='1'>一般</Option>
            <Option value='2'>紧急</Option>
          </Select>
        </Col>
        <Col {...gridStyle.label}>是否送修：</Col>
        <Col {...gridStyle.content}>
          <Select style={{width: '100%'}} allowClear>
            <Option value='0'>是</Option>
            <Option value='1'>否</Option>
          </Select>
        </Col>
        <Col {...gridStyle.label}>备用情况：</Col>
        <Col {...gridStyle.content}>
          <Select style={{width: '100%'}} allowClear>
            <Option value='0'>有备用</Option>
            <Option value='1'>无备用</Option>
          </Select>
        </Col>
        <Col {...gridStyle.label}>联系电话：</Col>
        <Col {...gridStyle.content}>
          <Input style={{width: '100%'}}/>
        </Col>
        <Col {...gridStyle.label}>故障现象：</Col>
        <Col {...gridStyle.content}>
          <Select style={{width: '100%'}} allowClear>
            <Option value='0'>故障1</Option>
            <Option value='1'>故障2</Option>
            <Option value='2'>故障2</Option>
          </Select>
        </Col>
        <Col {...gridStyle.label}>是否停用：</Col>
        <Col {...gridStyle.content}>
          <Select style={{width: '100%'}} allowClear>
            <Option value='0'>是</Option>
            <Option value='1'>否</Option>
          </Select>
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>故障描述：</Col>
        <Col span={20} style={{marginTop: 20}}>
          <TextArea rows={4} style={{width: '100%'}} />
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>报修备注：</Col>
        <Col span={20} style={{marginTop: 20}}>
          <TextArea rows={4} style={{width: '100%'}} />
        </Col>
        <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>附件：</Col>
        <Col span={20} style={{marginTop: 20}}>
          <PicWall/>
        </Col>
      </Row>
    )
  }
}