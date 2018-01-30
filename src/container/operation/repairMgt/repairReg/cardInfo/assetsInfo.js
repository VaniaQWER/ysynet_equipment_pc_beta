import React, { PureComponent } from 'react';
import { Row, Col, Input, Switch } from 'antd';
const { Search } = Input;
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
export default class AssetsInfo extends PureComponent {
  constructor() {
    super();
    this.state = {
      isAssets: false
    }
  }
  switchChange = checked => {
    this.setState({isAssets: !checked})
  }
  render() {
    const { isAssets } = this.state
    return (
      <Row type="flex">
        <Col span={4} style={{textAlign: 'right', height: 50, lineHeight: '50px' }}>资产编码/二维码：</Col>
        <Col span={12} style={{textAlign: 'left', height: 50, lineHeight: '50px' }}>
          <Search
            placeholder="输入后点击查询或回车"
            onSearch={value => console.log(value)}
            style={{ width: '80%', marginRight: 20 }}
            disabled={isAssets}
          />
          <Switch 
            checkedChildren="有资产" 
            unCheckedChildren="无资产" 
            defaultChecked 
            onChange={this.switchChange}
          />
        </Col>
        <Col {...gridStyle.label}>资产名称：</Col>
        <Col {...gridStyle.content}></Col>
        <Col {...gridStyle.label}>型号：</Col>
        <Col {...gridStyle.content}></Col>
        <Col {...gridStyle.label}>规格：</Col>
        <Col {...gridStyle.content}></Col>
        <Col {...gridStyle.label}>资产类别：</Col>
        <Col {...gridStyle.content}></Col>
        <Col {...gridStyle.label}>使用科室：</Col>
        <Col {...gridStyle.content}></Col>
        <Col {...gridStyle.label}>管理员：</Col>
        <Col {...gridStyle.content}></Col>
        <Col {...gridStyle.label}>管理科室：</Col>
        <Col {...gridStyle.content}></Col>
        <Col {...gridStyle.label}>存放地址：</Col>
        <Col {...gridStyle.content}></Col>
        <Col {...gridStyle.label}>是否在保：</Col>
        <Col {...gridStyle.content}></Col>
      </Row>
    )
  }
}