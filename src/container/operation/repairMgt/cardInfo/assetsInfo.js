/**
 * @file 资产信息 Card
 */
import React, { PureComponent } from 'react';
import { Row, Col, Input, Switch, Form } from 'antd';
import PropTypes from 'prop-types';
import { queryAssets } from '../../../../api/operation';
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
class AssetsInfoForm extends PureComponent {
  static defaultProps = {
    isEdit: false,
    data: {}
  };
  static propTypes = {
    isEdit: PropTypes.bool,
    data: PropTypes.object
  };
  constructor(props) {
    super(props)
    this.state = {
      isAssets: false,
      data: this.props.data 
    }
    this.onSearch = this.onSearch.bind(this);
  }
  async onSearch (val) {
    const data = await queryAssets({
      body: { searhName: val }
    })
    this.setState({
      data: data.result
    })
  }
  switchChange = checked => {
    const params = { isAssets: !checked }
    checked ? this.setState({
      ...params
    }) : this.setState({
      ...params, data: {}
    })
  }
  render() {
    const { isAssets, data } = this.state;
    const { isEdit, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Row type="flex">
        <Col span={4} style={{textAlign: 'right', height: 50, lineHeight: '50px' }}>资产编码/二维码：</Col>
        <Col span={12} style={{textAlign: 'left', height: 50, lineHeight: '50px' }}>
          {
            isEdit ? getFieldDecorator('assetsRecord')(
              <span>
                { data.assetsRecord }
              </span>
          ) : <Search
              placeholder="输入后点击回车"
              onSearch={this.onSearch}
              style={{ width: '80%', marginRight: 20 }}
              disabled={isAssets}
            />
          }
          {
            isEdit ? null : <Switch 
              checkedChildren="有资产" 
              unCheckedChildren="无资产" 
              defaultChecked 
              onChange={this.switchChange}
            />
          }

        </Col>
        <Col {...gridStyle.label}>资产名称：</Col>
        <Col {...gridStyle.content}>
        {
          getFieldDecorator('equipmetStandardName')(
            <span>{ data.equipmentStandardName }</span>
          )
        }
        </Col>
        <Col {...gridStyle.label}>型号：</Col>
        <Col {...gridStyle.content}>
        {
          getFieldDecorator('fmodel')(
            <span>{ data.fmodel }</span>
          )
        }
        </Col>
        <Col {...gridStyle.label}>规格：</Col>
        <Col {...gridStyle.content}>
        {
          getFieldDecorator('spec')(
            <span>{ data.spec }</span>
          )
        }
        </Col>
        <Col {...gridStyle.label}>资产类别：</Col>
        <Col {...gridStyle.content}>
        {
          getFieldDecorator('productType')(
            <span>{ data.productType }</span>
          )
        }
        </Col>
        <Col {...gridStyle.label}>使用科室：</Col>
        <Col {...gridStyle.content}>
        {
          getFieldDecorator('useDept')(
            <span>{ data.useDept }</span>
          )
        }
        </Col>
        <Col {...gridStyle.label}>管理员：</Col>
        <Col {...gridStyle.content}>
        {
          getFieldDecorator('custodian')(
            <span>{ data.custodian }</span>
          )
        }
        </Col>
        <Col {...gridStyle.label}>管理科室：</Col>
        <Col {...gridStyle.content}>
        {
          getFieldDecorator('bDept')(
            <span>{ data.bDept }</span>
          )
        }
        </Col>
        <Col {...gridStyle.label}>存放地址：</Col>
        <Col {...gridStyle.content}>
        {
          getFieldDecorator('deposit')(
            <span>{ data.deposit }</span>
          )
        }
        </Col>
        <Col {...gridStyle.label}>是否在保：</Col>
        <Col {...gridStyle.content}>
        {
          getFieldDecorator('guaranteeFlag')(
            <span>{ data.guaranteeFlag }</span>
          )
        }
        </Col>
      </Row>
    )
  }
}
const AssetsInfo = Form.create()(AssetsInfoForm);
export default AssetsInfo;