/**
 * @file 配件信息 Card
 */
import React, { PureComponent } from 'react';
import {  Button, Icon, Modal, Form, Row, Col, Input, Select,message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import TableGrid from '../../../../component/tableGrid';
import assets from '../../../../api/assets';
import { operation as operationService } from '../../../../service';
import querystring from 'querystring';

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
const handleDelete = (record,action)=>{
  let parms = {};
  parms.rrpairFittingUseGuid = record.rrpairFittingUseGuid;
  console.log(parms,'parms')
  action(assets.deleteRrpairFitting,parms,(data) => {
    if(data.status){
      message.success("操作成功!")
    }else{
      message.error(data.msg)
    }
  })
}
const getColumns = (action) => {
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
  if (action) {
    columns = [ {
      title: '操作',
      dataIndex: 'rrpairFittingUseGuid',
      key: 'rrpairFittingUseGuid',
      width: 100,
      render: (text, record) => (
        <a onClick={() => handleDelete(record,action)}>
          <Icon type="delete" style={{marginRight: 5}}/>删除
      </a>
      )
    }, ...columns ]
  } 
  return columns;
}
class SelectParts extends PureComponent {
  state = {
    query:{
      assetsRecordGuid: this.props.assetsRecordGuid
    },
    selected: [],
    selectedRows: []
  }

  render() {
    return (
      <RemoteTable
        ref='remote'
        query={this.state.query}
        url={assets.selectAssetsExtendList}
        scroll={{x: '100%'}}
        columns={getColumns()}
        rowKey={'assetsExtendGuid'}
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
                getFieldDecorator('acceName',{
                  initialValue:'',
                  rules:[
                    {pattern:/[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,message:'只能是中文、英文、数字、下划线(_)、中横线(-)'},
                    {max: 50, message: '长度不能超过50'}
                  ]
                })(
                  <Input onBlur={(e)=>this.props.callBack('acceName',e.target.value)}/>
              )}
            </FormItem>
          </Col>
          <Col {...gridStyle.label}>型号：</Col>
          <Col {...gridStyle.content}>
            <FormItem>
              {
                getFieldDecorator('acceFmodel',{
                  initialValue:'',
                  rules:[
                    {pattern:/[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,message:'只能是中文、英文、数字、下划线(_)、中横线(-)'},
                    {max: 50, message: '长度不能超过50'}
                  ]
                })(
                  <Input onBlur={(e)=>this.props.callBack('acceFmodel',e.target.value)}/>
              )}
            </FormItem>
          </Col>
          <Col {...gridStyle.label}>规格：</Col>
          <Col {...gridStyle.content}>
            <FormItem>
              {
                getFieldDecorator('acceSpec',{
                  initialValue: '',
                  rules:[
                    {pattern:/[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,message:'只能是中文、英文、数字、下划线(_)、中横线(-)'},
                    {max: 50, message: '长度不能超过50'}
                  ]
                })(
                  <Input onBlur={(e)=>this.props.callBack('acceSpec',e.target.value)}/>
              )}
            </FormItem>
          </Col>
          <Col {...gridStyle.label}>单位：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('acceUnit')(
                <Select allowClear
                  onSelect={(value)=>this.props.callBack('acceUnit',value)}
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
                getFieldDecorator('unitPrice',{
                  initialValue:'',
                  rules:[
                    { required: true,message: '请输入单价' },
                    { pattern:/\d+$/,message:'只能是数字'},
                  ]
                })(
                  <Input onBlur={(e)=>this.props.callBack('unitPrice',e.target.value)}/>
              )}
            </FormItem>
          </Col>
          <Col {...gridStyle.label}>数量：</Col>
          <Col {...gridStyle.content}>
              <FormItem>
                {
                  getFieldDecorator('acceNum',{
                    initialValue:'',
                    rules:[
                      { required: true,message: '请输入数量' },
                      { pattern:/\d+$/,message:'只能是数字'},
                      {max: 100, message: '最大100'}
                    ]
                  })(
                    <Input onBlur={(e)=>this.props.callBack('acceNum',e.target.value)}/>
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
      query:{
        rrpairOrderGuid: this.props.data.rrpairOrderGuid
      },
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
    let parms = {};
    parms.rrpairOrderGuid = this.props.data.rrpairOrderGuid;
    const { getPartsInfo } = this.props;
    if(type === "select") {
      if(this.state.S_parts.length===0){
        return message.warning("请选择要添加的资产配件!")
      }
      const assetsExtendGuids = [];
      this.state.S_parts.map((item) => {
       return assetsExtendGuids.push({assetsExtendGuid : item.assetsExtendGuid,acceNum:item.extendSum})
      })
      parms.assetsExtendGuids = assetsExtendGuids;
      console.log(parms,'选择配件数据')
      getPartsInfo(assets.insertRrpairFitting,JSON.stringify(parms),(data)=>{
        if(data.status){
          message.success("操作成功!")
          this.setState({choseVisible: false})
          this.refs.table.fetch();
        }else{
          message.error(data.msg)
        }
      })
    }else if(type === 'edit'){
      parms = {...this.state.W_parts,...parms};
      console.log(parms,'填写配件数据')
      getPartsInfo(assets.insertRrpairExtend,querystring.stringify(parms),(data)=>{
        if(data.status){
          message.success("操作成功!");
          this.setState({writeVisible: false});
          this.refs.table.fetch();
        }else{
          message.error(data.msg)
        }
      },{
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      })
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
    const {  choseVisible, writeVisible } = this.state;
    console.log(this.props.data.assetsRecordGuid,'assetsRecordGuid')
    return (
      <div>
        <Modal
          style={{ top: 10 }}
          width={1000}
          title="选择配件"
          visible={choseVisible}
          onOk={this.hideModal.bind(this, 'select')}
          onCancel={() => this.setState({ choseVisible: false ,writeVisible: false})}
          okText="完成"
          cancelText="取消"
        >
          <SelectParts assetsRecordGuid={this.props.data.assetsRecordGuid} chosed={(S)=>this.setState({ S_parts:S })}/>
        </Modal>
        <Modal
          title="填写配件"
          visible={writeVisible}
          onOk={this.hideModal.bind(this, 'edit')}
          onCancel={() => this.setState({ choseVisible: false ,writeVisible: false})}
          okText="确认"
          cancelText="取消"
        >
          <InsertPartsWrapper 
            callBack={(attr,val)=>this.getWriteParts(attr,val)}
            showOrHide={this.state.showOrHide}
            />
        </Modal>
        <RemoteTable
          ref='table'
          query={this.state.query}
          url={assets.selectRrpairFittingList}
          scroll={{x: '100%'}}
          columns={getColumns(this.props.getPartsInfo)}
          rowKey={'rrpairFittingUseGuid'}
          style={{marginTop: 10}}
          size="small"
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
              onClick={this.showModal.bind(this, this.props.data.assetsRecordGuid,'edit')}
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

export default withRouter(connect(state => state, dispatch => ({
  getPartsInfo: (url,values,success,type) => operationService.getInfo(url,values,success,type),
}))(PartsInfo));