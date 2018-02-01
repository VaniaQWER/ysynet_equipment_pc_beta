/**
 * @file 资产信息 Card
 */
import React, { PureComponent } from 'react';
import { Row, Col, Input, Switch, Form } from 'antd';
import PropTypes from 'prop-types';
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
    const { isAssets } = this.state;
    const { isEdit, form, data } = this.props;
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
              placeholder="输入后点击查询或回车"
              onSearch={value => console.log(value)}
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
          getFieldDecorator('equipmentStandardName')(
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
          getFieldDecorator('deptName')(
            <span>{ data.deptName }</span>
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
          getFieldDecorator('mDeptName')(
            <span>{ data.mDeptName }</span>
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