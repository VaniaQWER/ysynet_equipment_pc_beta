/*
 * @Author: yuwei - 新增入库
 * @Date: 2018-06-12 16:06:41 
* @Last Modified time: 2018-06-12 16:06:41 
 */

import React , { Component } from 'react'//message,
import { Layout , Form, Row, Col,Icon, Input, Button , Table ,Modal ,message} from 'antd';
// import TableGrid from '../../../component/tableGrid';
import storage from '../../../api/storage';
import request from '../../../utils/request';
import queryString from 'querystring';
import { Link } from 'react-router-dom';
const { Content } = Layout;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const styles = {
  textRight:{
    textAlign:'right'
  },
  fillRight:{
    marginRight:8
  },
  top:{
    marginTop:3
  }
}

class SearchForm extends Component {

  //搜索表单
  searchFrom = () => {
    let values = this.props.form.getFieldsValue();
    console.log(values)
    this.props.query(values)
  }

  render(){
    const { getFieldDecorator } = this.props.form;
 
    return (
      <Form>
        <Row>
          <Col span={8}>
            <FormItem label={`送货单号`} {...formItemLayout} style={styles.fillRight}>
              {getFieldDecorator(`sendNo`)(
                <Input placeholder="请输入送货单号或扫描二维码"/>
              )}
            </FormItem>
           </Col>
           <Col span={3}>
            <Button type='primary'  style={styles.top}  onClick={()=>this.searchFrom()}>搜索</Button>
           </Col>
           <Col span={13} style={styles.textRight}>
              <Button type='primary'  style={styles.fillRight}  onClick={()=>this.props.submit(this.props.form.getFieldsValue())}>确认入库</Button>
              <Button type='primary' ><Link to={{pathname:`/storage/wareHouseMgt`}}>取消</Link></Button>
           </Col>
        </Row>
      </Form>
    )
  }
}
const SearchFormWapper = Form.create()(SearchForm);

class AddWareHouse extends Component {

  state = {
    query:"",
    baseInfo:{},
    dataSource: [],
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }

  //提交表单
  submit = (values) => {
    console.log(values)
    console.log(this.state.dataSource);
    confirm({
      title:'确定入库',
      ContentText:"您确定执行该入库操作吗?",
      onOk:()=>{
        //发出请求
        request(storage.insertImport,{
          body:queryString.stringify({sendId:this.state.baseInfo.sendId}),
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: data => {
            if(data.status){
                message.success('入库成功')
                this.props.form.resetFields();
                this.setState({
                  baseInfo:{},
                  dataSource:[]
                })
            }else{
              message.error(data.msg)
            }
          },
          error: err => {console.log(err)}
        })
      }
    })
  }

  query = (values) => {
    console.log(values)
    //查询当前baseInfo
    request(storage.selectZCDeliveryList,{
      body:queryString.stringify(values),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          this.setState({baseInfo:data.result.rows[0]})
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    })

    request(storage.selectZCDeliveryDetail,{
      body:queryString.stringify(values),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          this.setState({dataSource:data.result}) 
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    })
  }

  total = () => {
    let total = 0 ;
    this.state.dataSource.map(item=>{
      total+=item.amount*item.purchasePrice;
      return item
    })
    return total.toFixed(2)
  }

  render () {
    const { dataSource , baseInfo } = this.state;
    const columns = [
      {
        title:"产品名称",
        dataIndex: 'materialName',
        render: (text, record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key, 'materialName')}
          />
        ),
      },
      {
        title:"品牌",
        dataIndex: 'tfBrand',
      },
      {
        title:"证件号",
        dataIndex: 'registerNo',
      },
      {
        title:"规格",
        dataIndex: 'spec',
        render: (text, record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key, 'spec')}
          />
        ),
      },
      {
        title:"型号 ",
        dataIndex: 'fmodel',
        render: (text, record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key, 'fmodel')}
          />
        ),
      },
      {
        title:"单位 ",
        dataIndex: 'purchaseUnit',
        render: (text, record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key, 'purchaseUnit')}
          />
        ),
      },
      {
        title:"采购单价",
        dataIndex: 'purchasePrice',
      },
      {
        title:"送货数量",
        dataIndex: 'amount',
      },
      {
        title:"生产商",
        dataIndex: 'produceName',
      }
    ]

    return (
      <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
        <SearchFormWapper 
        query={values=>this.query(values)}
        submit={(values)=>this.submit(values)}
        />

        <Row>
          <div className="ant-col-8">
            <div className="ant-row ant-form-item">
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>送货单号</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                <div className="ant-form-item-control">
                  {baseInfo.sendNo}
                </div>
              </div>
            </div>
          </div>
          <div className="ant-col-8">
            <div className="ant-row ant-form-item">
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>供应商</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                <div className="ant-form-item-control">
                {baseInfo.fOrgName}
                </div>
              </div>
            </div>
          </div>
          <div className="ant-col-8">
            <div className="ant-row ant-form-item">
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>收货科室</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                <div className="ant-form-item-control">
                {baseInfo.tDeptName}
                </div>
              </div>
            </div>
          </div>
          <div className="ant-col-8">
            <div className="ant-row ant-form-item">
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>收货地址</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                <div className="ant-form-item-control">
                 {baseInfo.tfAddress}
                </div>
              </div>
            </div>
          </div>
        </Row>

        <Table 
          bordered 
          rowKey={'sendId'}
          dataSource={dataSource} 
          columns={columns} 
          footer={()=>{
            return (
              <div>
                总金额：{this.total()}
              </div>
            )
          }}/>

      </Content>
    )
  }
}

export default AddWareHouse;

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ? (
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
              suffix={
                <Icon
                  type="check"
                  className="editable-cell-icon-check"
                  onClick={this.check}
                />
              }
            />
          ) : (
            <div style={{ paddingRight: 24 }}>
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
          )
        }
      </div>
    );
  }
}