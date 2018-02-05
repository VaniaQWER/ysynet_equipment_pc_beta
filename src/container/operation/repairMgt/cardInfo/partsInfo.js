/**
 * @file 配件信息 Card
 */
import React, { PureComponent } from 'react';
import { Table, Button, Icon, Modal, Form, Row, Col, Input, Select,message } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import assets from '../../../../api/assets';
import uuid from 'uuid';
const Option = Select.Option;
const FormItem = Form.Item;
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
      dataIndex: 'equipmentName',
      key: 'equipmentName',
      width: 200
    }, {
      title: '型号',
      dataIndex: 'fmodel',
      key: 'fmodel',
      width: 150
    }, {
      title: '规格',
      dataIndex: 'spec',
      key: 'spec',
      width: 150
    }, {
      title: '数量',
      dataIndex: 'extendSum',
      key: 'extendSum',
      width: 100
    }, {
      title: '单位',
      dataIndex: 'meteringUnit',
      key: 'meteringUnit',
      width: 100
    }, {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
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
/* const columns = [{
  title: '操作',
  dataIndex: 'rrpairFittingUseGuid',
  key: 'rrpairFittingUseGuid',
  width: 100
}, {
  title: '配件编号',
  dataIndex: 'assetsRecord',
  key: 'assetsRecord',
  width: 200
}, {
  title: '配件名称',
  dataIndex: 'equipmentName',
  key: 'equipmentName',
  width: 200
}, {
  title: '型号',
  dataIndex: 'fmodel',
  key: 'fmodel',
  width: 150
}, {
  title: '规格',
  dataIndex: 'spec',
  key: 'spec',
  width: 150
}, {
  title: '数量',
  dataIndex: 'extendSum',
  key: 'extendSum',
  width: 100
}, {
  title: '单位',
  dataIndex: 'meteringUnit',
  key: 'meteringUnit',
  width: 100
}, {
  title: '单价',
  dataIndex: 'price',
  key: 'price',
  width: 100
}, {
  title: '金额',
  dataIndex: 'money',
  key: 'money',
  width: 100
}];
 */
/**
 * 选择配件
 */
class SelectParts extends PureComponent {
  state = {
    query:{
      assetsRecordGuid: this.props.assetsRecordGuid
    },
    selected: [],
    selectedRows: []
  }
  componentWillReceiveProps = nextProps =>{
    console.log(nextProps,'nextProps')
  }
  render() {
    const { selected,selectedRows } = this.state;
    console.log(selected,'selected');
    console.log(selectedRows,'selectedRow')
    return (
      <RemoteTable
        ref='remote'
        query={this.state.query}
        url={assets.selectAssetsExtendList}
        scroll={{x: '100%'}}
        columns={getColumns()}
        rowKey={'RN'}
        style={{marginTop: 10}}
        size="small"
        rowSelection={{
          selectedRowKeys: this.state.selected,
          onChange: (selectedRowKeys, selectedRows) => {
          this.setState({selected: selectedRowKeys,selectedRows : selectedRows});
          this.props.chosed(selectedRows);
          }
      }}
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
            <FormItem>
              {
                getFieldDecorator('assetsRecord',{
                  initialValue:'',
                  rules:[
                    {pattern:/[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,message:'只能是中文、英文、数字、下划线(_)、中横线(-)'},
                    {max: 50, message: '长度不能超过50'}
                  ]
                })(
                  <Input onBlur={(e)=>this.props.callBack('assetsRecord',e.target.value)}/>
              )}
            </FormItem>
          </Col>
          <Col {...gridStyle.label}>名称：</Col>
          <Col {...gridStyle.content}>
            <FormItem>
              {
                getFieldDecorator('equipmentName',{
                  initialValue:'',
                  rules:[
                    {pattern:/[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,message:'只能是中文、英文、数字、下划线(_)、中横线(-)'},
                    {max: 50, message: '长度不能超过50'}
                  ]
                })(
                  <Input onBlur={(e)=>this.props.callBack('equipmentName',e.target.value)}/>
              )}
            </FormItem>
          </Col>
          <Col {...gridStyle.label}>型号：</Col>
          <Col {...gridStyle.content}>
            <FormItem>
              {
                getFieldDecorator('fmodel',{
                  initialValue:'',
                  rules:[
                    {pattern:/[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,message:'只能是中文、英文、数字、下划线(_)、中横线(-)'},
                    {max: 50, message: '长度不能超过50'}
                  ]
                })(
                  <Input onBlur={(e)=>this.props.callBack('fmodel',e.target.value)}/>
              )}
            </FormItem>
          </Col>
          <Col {...gridStyle.label}>规格：</Col>
          <Col {...gridStyle.content}>
            <FormItem>
              {
                getFieldDecorator('spec',{
                  initialValue: '',
                  rules:[
                    {pattern:/[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,message:'只能是中文、英文、数字、下划线(_)、中横线(-)'},
                    {max: 50, message: '长度不能超过50'}
                  ]
                })(
                  <Input onBlur={(e)=>this.props.callBack('spec',e.target.value)}/>
              )}
            </FormItem>
          </Col>
          <Col {...gridStyle.label}>单位：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('meteringUnit')(
                <Select allowClear
                  onSelect={(value)=>this.props.callBack('meteringUnit',value)}
                >
                  <Option value='个'>个</Option>
                  <Option value='只'>只</Option>
                  <Option value='包'>包</Option>
                  <Option value='把'>把</Option>
                </Select>
            )}
          </Col>
          <Col {...gridStyle.label}>单价：</Col>
          <Col {...gridStyle.content}>
            <FormItem>
              {
                getFieldDecorator('price',{
                  initialValue:'',
                  rules:[
                    { required: true,message: '请输入单价' },
                    { pattern:/\d+$/,message:'只能是数字'},
                  ]
                })(
                  <Input onBlur={(e)=>this.props.callBack('price',e.target.value)}/>
              )}
            </FormItem>
          </Col>
          <Col {...gridStyle.label}>数量：</Col>
          <Col {...gridStyle.content}>
              <FormItem>
                {
                  getFieldDecorator('extendSum',{
                    initialValue:'',
                    rules:[
                      { required: true,message: '请输入数量' },
                      { pattern:/\d+$/,message:'只能是数字'},
                      {max: 100, message: '最大100'}
                    ]
                  })(
                    <Input onBlur={(e)=>this.props.callBack('extendSum',e.target.value)}/>
                )}
              </FormItem>
          </Col>
        </Row>  
      </Form>
    )
  }
}
const InsertPartsWrapper = Form.create()(InsertParts);

class PartsInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      S_parts: [],//选择配件
      W_parts: {},//填写配件
      choseVisible: false,
      writeVisible: false,
      showOrHide: false,
      assetsRecordGuid: this.props.data.assetsRecordGuid
    }
  }
  getWriteParts = (attr,val)=>{
    let { W_parts } = this.state;
    W_parts[attr] = val;
    this.setState({ W_parts  });
  }
  hideModal = (type) => {
    const dataSource = this.state.dataSource;
    if(type){
      const { W_parts } = this.state;
      const amount = W_parts.extendSum === 'undefined' ? 1 : W_parts.extendSum;
      W_parts.money = amount * W_parts.price;
      W_parts.assetsRecordGuid = uuid();
      console.log(W_parts,'W_parts')
      this.setState({writeVisible: false,dataSource:[...dataSource , W_parts],W_parts: {}});
    }else{
      if(dataSource.length > 0){
        this.setState({ dataSource:[...dataSource,...this.state.S_parts] })
      }else{
        this.setState({ dataSource : this.state.S_parts});
      }
      this.setState({choseVisible: false })
    }
  }
  showModal = (assetsRecordGuid,key) => {
    if(assetsRecordGuid){
      if(key==='select'){
        this.setState({ choseVisible: true, writeVisible: false });
      }else{
        //填写配件
        this.setState({choseVisible: false, writeVisible: true });
      }
    }else{
      message.warn('暂无资产信息，请先添加资产信息');
      this.setState({choseVisible: false,writeVisible: false});
    }
  }
  
  render() {
    console.log(this.props.data.assetsRecordGuid,'prop')
    const { dataSource, choseVisible, writeVisible } = this.state;
    return (
      <div>
        <Modal
          style={{ top: 10 }}
          width={1000}
          title="选择配件"
          visible={choseVisible}
          onOk={this.hideModal.bind(this, 0)}
          onCancel={this.hideModal.bind(this, 0)}
          okText="完成"
          cancelText="取消"
        >
          <SelectParts assetsRecordGuid={this.props.data.assetsRecordGuid} chosed={(S)=>this.setState({ S_parts:S })}/>
        </Modal>
        <Modal
          title="填写配件"
          visible={writeVisible}
          onOk={this.hideModal.bind(this, 1)}
          onCancel={this.hideModal.bind(this, 1)}
          okText="确认"
          cancelText="取消"
        >
          <InsertPartsWrapper 
            callBack={(attr,val)=>this.getWriteParts(attr,val)}
            showOrHide={this.state.showOrHide}
            />
        </Modal>
        <Table 
          dataSource={dataSource} 
          columns={getColumns()} 
          rowKey={'assetsRecordGuid'}
          showHeader={true}
          title={() => <div>
            <Button 
              style={{marginRight: 5}} 
              type='primary'
              onClick={this.showModal.bind(this, this.props.data.assetsRecordGuid,'select')}
            >
              <Icon type="switcher" />
              选择配件
            </Button>
            <Button
              onClick={this.showModal.bind(this, 1,'edit')}
            >
              <Icon type="edit" />
              填写配件
            </Button>
          </div>}
        />
      </div>  
    )
  }
}

export default PartsInfo;