/**
 * @file 配件信息 Card
 */
import React, { PureComponent } from 'react';
import { Table, Button, Icon, Modal, Form, Row, Col, Input, Select } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import PropTypes from 'prop-types';
const Option = Select.Option;
const { RemoteTable } = TableGrid;
const gridStyle = {
  label: {
    span: 4,
    style: { textAlign: 'right', height: 50, lineHeight: '50px' }
  }, 
  content: {
    span: 20,
    style: { textAlign: 'left', height: 50, lineHeight: '50px' }
  }
}
const getColumns = (isEdit) => {
  let columns = [{
      title: '配件编号',
      dataIndex: 'assetsRecord',
      key: 'assetsRecord',
      width: 200
    }, {
      title: '配件名称',
      dataIndex: 'acceName',
      key: 'acceName',
      width: 200
    }, {
      title: '型号',
      dataIndex: 'acceFmodel',
      key: 'acceFmodel',
      width: 150
    }, {
      title: '规格',
      dataIndex: 'acceSpec',
      key: 'acceSpec',
      width: 150
    }, {
      title: '数量',
      dataIndex: 'acceNum',
      key: 'acceNum',
      width: 100
    }, {
      title: '单位',
      dataIndex: 'acceUnit',
      key: 'acceUnit',
      width: 100
    }, {
      title: '单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 100
    }, {
      title: '金额',
      dataIndex: 'money',
      key: 'money',
      width: 100
    }]
  if (!isEdit) {
    columns = [ {
      title: '操作',
      dataIndex: 'rrpairFittingUseGuid',
      key: 'rrpairFittingUseGuid',
      width: 100
    }, ...columns ]
  } 
  return columns;
}

/**
 * 选择配件
 */
class SelectParts extends PureComponent {
  render() {
    return (
      <RemoteTable
        ref='remote'
        url={''}
        scroll={{x: '100%'}}
        columns={getColumns()}
        rowKey={'RN'}
        style={{marginTop: 10}}
        size="small"
      /> 
    )
  }
}

/**
 * 填写配件
 */
class InsertParts extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Row type='flex'>
          <Col {...gridStyle.label}>配件编号：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('assetsRecord')(
                <Input />
            )}
          </Col>
          <Col {...gridStyle.label}>名称：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('acceName')(
                <Input />
            )}
          </Col>
          <Col {...gridStyle.label}>型号：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('acceFmodel')(
                <Input />
            )}
          </Col>
          <Col {...gridStyle.label}>规格：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('acceSpec')(
                <Input />
            )}
          </Col>
          <Col {...gridStyle.label}>单位：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('acceUnit')(
                <Select allowClear>
                  <Option value='个'>个</Option>
                  <Option value='只'>只</Option>
                  <Option value='包'>包</Option>
                  <Option value='把'>把</Option>
                </Select>
            )}
          </Col>
          <Col {...gridStyle.label}>单价：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('unitPrice')(
                <Input />
            )}
          </Col>
          <Col {...gridStyle.label}>数量：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('acceNum')(
                <Input />
            )}
          </Col>
        </Row>  
      </Form>
    )
  }
}
const InsertPartsWrapper = Form.create()(InsertParts);

class PartsInfo extends PureComponent {
  static defaultProps = {
    isEdit: false,
    dataSource: []
  };
  static propTypes = {
    isEdit: PropTypes.bool,
    data: PropTypes.array
  };
  constructor(props) {
    super(props)
    this.state = {
      dataSource: this.props.dataSource || [],
      choseVisible: false,
      writeVisible: false
    }
  }
  hideModal = type => type ? this.setState({writeVisible: false}) : this.setState({choseVisible: false});
  showModal = type => type ? this.setState({writeVisible: true}) : this.setState({choseVisible: true});
  render() {
    const { dataSource, choseVisible, writeVisible } = this.state;
    const { isEdit } = this.props;
    return (
      <div>
        <Modal
          style={{ top: 10 }}
          width={1000}
          title="选择配件"
          visible={choseVisible}
          onOk={this.hideModal.bind(this, 0)}
          onCancel={this.hideModal.bind(this, 0)}
          okText="确认"
          cancelText="取消"
        >
          <SelectParts/>
        </Modal>
        <Modal
          title="填写配件"
          style={{ top: 10 }}
          visible={writeVisible}
          onOk={this.hideModal.bind(this, 1)}
          onCancel={this.hideModal.bind(this, 1)}
          okText="确认"
          cancelText="取消"
        >
          <InsertPartsWrapper/>
        </Modal>
        <Table 
          dataSource={dataSource} 
          columns={getColumns(isEdit)} 
          showHeader={true}
          {...(isEdit ? null : {
            title: () => (
              isEdit ? null : 
              <div>
                <Button 
                  style={{marginRight: 5}} 
                  type='primary'
                  onClick={this.showModal.bind(this, 0)}
                >
                  <Icon type="switcher" />
                  选择配件
                </Button>
                <Button
                  onClick={this.showModal.bind(this, 1)}
                >
                  <Icon type="edit" />
                  填写配件
                </Button>
              </div>
            )
          })}
        />
      </div>  
    )
  }
}

export default PartsInfo;