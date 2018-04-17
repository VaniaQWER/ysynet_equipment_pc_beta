/**
 * @file 资产转科 - 新建转科
 * @author Vania
 * @since 2018-04-08
 */
import React, { PureComponent } from 'react';
import { Layout, Card, Button, Affix, Form, Col, Row, Input, Select, DatePicker, Table, Modal, message } from 'antd';
import { productTypeData } from '../../../constants'
import tableGrid from '../../../component/tableGrid';
import querystring from 'querystring';
import request from '../../../utils/request';
import transfer from '../../../api/transfer';
import assets from '../../../api/assets';
import _ from 'lodash';

const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const { RemoteTable } = tableGrid

let timeout;
let currentValue;
let currentValueRollOut;

// 表单布局样式
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

// 选择资产弹窗列表渲染
const productColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    render: (text, record, index) => <span>{`${index+1}`}</span>,
    width: 50
  },
  {
    title: '资产编号',
    dataIndex: 'assetsRecord',
    sorter: true,
    width: 150
  },
  {
    title: '资产名称',
    dataIndex: 'equipmentStandardName',
    width: 150
  },
  {
    title: '型号',
    dataIndex: 'fmodel',
    width: 100
  },
  {
    title: '规格',
    dataIndex: 'spec',
    width: 100
  },
  {
    title: '设备分类',
    dataIndex: 'productType',
    render: (text, record) => text ? productTypeData[text].text : null,
    width: 150
  },
  {
    title: '使用科室',
    dataIndex: 'useDept',
    width: 150
  }
]

// 新保养人模糊搜索
function fetchMaintainUsername(userName, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = userName;
  let options = {
    body:querystring.stringify({'userName':userName}),
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: d => {
      if (currentValue === userName) {
        const result = d.result;
        const userNameData = [];
        result.forEach((r) => {
          userNameData.push({
            value: r.value,
            userName: r.userName,
            deptName: r.deptName
          });
        });
        callback(userNameData);
      }
    }
  }
  request(transfer.getSelectUserNameList, options);
}

// 转出转入科室
function fetchOutDeptname(deptName, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValueRollOut = deptName;
  
  let options = {
    body:querystring.stringify({'deptName': deptName, 'deptType': '00'}),
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: d => {
      if (currentValueRollOut === deptName) {
        const result = d.result;
        const deptNameData = [];
        result.forEach((r) => {
          deptNameData.push({
            value: r.value,
            text: r.text
          });
        });
        callback(deptNameData);
      }
    }
  }
  request(transfer.getSelectUseDeptList, options);
}
function fetchIntoDeptname(deptName, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValueRollOut = deptName;
  let options = {
    body:querystring.stringify({'deptName': deptName}),
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: d => {
      if (currentValueRollOut === deptName) {
        const result = d.result;
        const IntodeptNameData = [];
        result.forEach((r) => {
          IntodeptNameData.push({
            value: r.value,
            text: r.text
          });
        });
        callback(IntodeptNameData);
      }
    }
  }
  request(transfer.getSelectUseDeptList, options);
}

class NewTransfer extends PureComponent {
  state={
    loading: false,
    userNameData: [],// 新保养人保存数据
    userName: '',// 新保养人
    deptNameData: [],// 转出科室保存数据
    IntodeptNameData: [],// 转入科室保存数据
    deptName: '',// 转入转出科室

    productVisible: false,// 选择产品弹窗可视内容
    ProductType:'',//资产搜索条件
    mobile: '', //资产搜索value
    ProductModalCallBackKeys: [],//资产弹框选中保存数据的key
    ProductModalCallBack:[],//选择保养资产返回的数据
    ProductTabledata:[],//选择保养资产返回的数据(重新赋值给这个)
    CacheProductTabledata:[],//缓存
    fstate: '', //转出科室 00已转出
    useDeptGuid:'',
    data: {},
    newAddressEdit: false
  }
  // 新保养人
  handleChange = (userName) => {
    this.setState({ userName });
    fetchMaintainUsername(userName, userNameData => this.setState({ userNameData }));
  }
  // 转出科室
  handleChangeRollOut = (deptName) => {
    this.setState({ deptName });
    fetchOutDeptname(deptName, deptNameData => this.setState({ deptNameData }));
  }
  // 转入科室
  handleChangeInto = (deptName) => {
    this.setState({ deptName });
    fetchIntoDeptname(deptName, IntodeptNameData => this.setState({ IntodeptNameData }));
  }
  // 资产弹窗
  showModal = (modalName) => {
    if(this.refs.proTable){
      this.refs.proTable.fetch({useDeptGuid: this.state.outDeptguid});
    }
    this.setState({[modalName]: true});
  }
  handleOk = (modalName) => {
    const { ProductModalCallBackKeys } = this.state;
    if (ProductModalCallBackKeys.length !== 0) {
      this.setState({loading: true});
      setTimeout(() => {
        if (modalName==='productVisible') {
          this.add();
        }
        this.setState({loading: false, [modalName]: false});
      }, 1000)
    } else {
      message.warning('请选择项目之后再添加！')
    }
  }
  
  handleCancel = (modalName) => {
    if (modalName === 'productVisible') {
      this.setState({
        ProductType: '',//资产搜索条件
        mobile: '', //资产搜索value
        ProductModalCallBackKeys: [],//资产弹框选中保存数据的key
        ProductModalCallBack:[], //资产弹框选中保存数据的返回的数据
      });
    }
    this.setState({[modalName]: false});
  }
  add = () =>{
    let outDeptguid = this.state.outDeptguid;
    this.resetAll(outDeptguid);
  }
  sendEndAjax =(json)=>{
    const values = this.props.form.getFieldsValue();
    
    const data = {
      fstate: '00',
      useDeptGuid: values.outDeptguid,
      useDeptName: this.state.outDeptname,
    }
    let transferDetails = [],postData = {};
    json.map((item,index)=>{
      return transferDetails.push({
        assetsRecordGuid: item,
        useDeptGuid: data.useDeptGuid,
        useDeptName: data.useDeptName
      })
    });
    postData.transferDetails = transferDetails;
    postData.fstate = data.fstate;
    postData.outDeptguid = values.outDeptguid;
    postData.outDeptname = this.state.outDeptname;
    postData.inDeptguid = values.inDeptguid;
    postData.inDeptname = this.state.inDeptname;
    postData.newAdd = values.newAdd;
    postData.maintainUserid = values.maintainUserid;
    postData.maintainUsername = this.state.maintainUsername.split('-')[0];
    postData.transferDate = values.transferDate.format('YYYY-MM-DD');
    let options = {
      body:JSON.stringify(postData),
      success: data => {
        if(data.status){
          message.success('新增成功');
          //this.resetAll(postData.outDeptguid);
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(transfer.getInsertTransfer,options)
  }
  resetAll=(val)=>{
    //this.props.form.resetFields();
    let { ProductModalCallBack, outDeptname } = this.state;
    ProductModalCallBack.map((item,index)=> {
      item.useDept = outDeptname;
      item.useDeptGuid = val;
      return null;
    })
    this.setState({
      ProductTabledata:this.state.ProductModalCallBack,
    })
  }
  // 资产弹框搜索框
  productQueryHandler = (value) => {
    //this.setState({mobile: value});
    let json = {
      ProductType: this.state.ProductType,
      mobile: value,
      // useDeptGuid: this.state.inDeptguid
      useDeptGuid: this.state.outDeptguid
    }
    this.refs.proTable.fetch(json);
  }
  // 通过转入科室接口带出新存放地址数据
  getNewAddessInfo = (value,option) => {
    this.setState({inDeptguid: value,inDeptname:option.props.children});
    let options = {
      body:querystring.stringify({'deptId': value}),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        const values = this.props.form.getFieldsValue();
        if (data.result.length === 0) {
          values.newAdd = '';
          this.setState({newAddressEdit: false});
        } else {
          const result = data.result[0].address;
          values.newAdd = result;
          this.setState({newAddressEdit: true});
        }
        this.setState({data: values});
      }
    }
    request(transfer.getSelectDeptAddress, options);
  }
  //保存
  save = () =>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.sendEndAjax(this.state.ProductModalCallBackKeys);
      }
    })
  }
  deleteProRow =(isParent,record)=>{
    let a =_.cloneDeep(this.state.ProductTabledata);
    if(isParent){//如果是删除父级
      _.remove(a,function(n){
        return n.assetsRecord===record.assetsRecord
      })
    }
    this.setState({
      ProductTabledata:a,
      CacheProductTabledata:a
    })
  }
  render() {
    const { productVisible, ProductType, mobile, ProductModalCallBackKeys, ProductTabledata, data } = this.state;
    const { getFieldDecorator } = this.props.form;
    // 资产列表渲染
    const columns = [
      {
        title: '操作',
        dataIndex: 'transferGuid',
        width: 150,
        render: (text, record, index) => { 
          return <a onClick={()=>this.deleteProRow(true,record)}>删除</a>;
        }
      },
      {
        title: '资产编号',
        dataIndex: 'assetsRecord',
        width: 200,
        sorter: true
      },
      {
        title: '资产名称',
        dataIndex: 'equipmentStandardName',
        width: 200
      },
      {
        title: '型号',
        dataIndex: 'fmodel',
        width: 100
      },
      {
        title: '规格',
        dataIndex: 'spec',
        width: 100
      },
      {
        title: '使用科室',
        dataIndex: 'useDeptName',
        width: 100
      }
    ]
    return (
      <Content className='ysynet-content'>
        {/* 保存申请信息按钮部分 */}
        <Affix>
          <div style={{background: '#fff', padding: '10px 20px', marginBottom: 4, display: 'flex', alignContent: 'center', justifyContent: 'flex-end'}}>
            <Button type="primary" onClick={this.save}>保存</Button>
          </div>
        </Affix>
        {/* 申请信息部分 */}
        <Card title="申请信息" bordered={false} className="min_card">
          <Form ref='searchForm'>
            <Row>
              <Col span={8}>
                <FormItem label={`申请人`} {...formItemLayout}>
                  {getFieldDecorator('createUserName', {})(<Input style={{width: 200}} placeholder={`请输入当前用户名`} />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`转出科室`} {...formItemLayout}>
                {getFieldDecorator('outDeptguid',{
                  rules:[
                    {required:true, message: '请搜索选择转出科室',}
                  ]
                })(
                  <Select
                  showSearch
                  onSearch={this.handleChangeRollOut}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  allowClear={true}
                  filterOption={false}
                  style={{width: 200}}
                  onSelect={(val,option)=>this.setState({ outDeptguid:val, outDeptname: option.props.children })}
                  placeholder={`请搜索选择转出科室`}
                >
                  {this.state.deptNameData.map(d => {
                    return <Option value={d.value} key={d.value}>{d.text}</Option>
                  })}
                </Select>
                )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`转入科室`} {...formItemLayout}>
                {getFieldDecorator('inDeptguid',{
                  rules:[
                    {required:true, message: '请搜索选择转入科室',}
                  ]
                })(
                  <Select
                  showSearch
                  onSearch={this.handleChangeInto}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  allowClear={true}
                  filterOption={false}
                  style={{width: 200}}
                  placeholder={`请搜索选择转入科室`}
                  onSelect={this.getNewAddessInfo}
                  >
                    {this.state.IntodeptNameData.map(d => {
                      return <Option value={d.value} key={d.value}>{d.text}</Option>
                    })}
                  </Select>
                )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`新存放地址`} {...formItemLayout}>
                  {getFieldDecorator('newAdd', {
                    initialValue: data.newAdd,
                    rules:[
                      {required: true, message: '新存放地址不能为空'}
                    ]
                  })(
                    <Input disabled={this.state.newAddressEdit} placeholder={`请输入新存放地址`} style={{width: 200}}/>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`新保养人`} {...formItemLayout}>
                {getFieldDecorator('maintainUserid',{})(
                  <Select
                  showSearch
                  onSearch={this.handleChange}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  allowClear={true}
                  filterOption={false}
                  style={{width: 200}}
                  onSelect={(val,option) => this.setState({ maintainUsername:option.props.children })}
                  placeholder={`请搜索选择新保养人`}
                >
                  {this.state.userNameData.map(d => {
                    return <Option value={d.value} key={d.value}>{d.userName+'-'+d.deptName}</Option>
                  })}
                </Select>
                )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`计划转科时间`} {...formItemLayout}>
                  {getFieldDecorator('transferDate', {
                    rules: [
                      {required: true, message: '请选择计划转科时间'}
                    ]
                  })(<DatePicker style={{width: 200}} />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        {/* 资产信息部分 */}
        <Card title="资产信息" bordered={false} style={{marginTop: 4}} className="min_card">
          <Button type="primary" style={{marginBottom: 10}} onClick={() => this.showModal('productVisible')}>选择产品</Button>
          <Table
          columns={columns}
          scroll={{x: '100%'}}
          rowKey={'assetsRecordGuid'}
          dataSource={ProductTabledata}
          />
        </Card>

        {/* 选择资产弹窗 */}
        <Modal
        visible={productVisible}
        title={`选择要转科的资产`}
        width='900px'
        onOk={()=>this.handleOk('productVisible')}
        onCancel={()=>this.handleCancel('productVisible')}
        footer={null}
        >
          <Row>
            <Col span={20} style={{marginBottom: 15}}>
              <Select name="ProductType" value={ProductType} onChange={(v)=>{this.setState({ProductType: v})}} style={{width: 200}}>
                <Option value="">全部分类</Option>
                <Option value="01">通用设备</Option>
                <Option value="02">电气设备</Option>
                <Option value="03">电子产品及通信设备</Option>
                <Option value="04">仪器仪表及其他</Option>
                <Option value="05">专业设备</Option>
                <Option value="06">其他</Option>
              </Select>
              <Search
              placeholder="请输入资产编号/名称"
              style={{width: 350, marginLeft: 15}}
              enterButton="搜索"
              onChange={(v)=>{this.setState({mobile: v.target.value})}}
              value={mobile}
              onSearch={value=>{this.productQueryHandler(value)}}
              />
            </Col>
            <Col span={4} style={{textAlign: 'right'}}>
              <Button key="submit" type="primary" onClick={()=>this.handleOk('productVisible')}>添加</Button>
            </Col>
          </Row>
          {/* RemoteTable-->远程连接,需要一个url接口,因此假数据对他不起作用 */}
          <RemoteTable
          ref='proTable' // 根据搜索后进行刷新列表
          showHeader={true}
          query={{useDeptGuid: this.state.outDeptguid}}
          url={assets.selectAssetsList}
          rowKey={'assetsRecordGuid'}
          columns={productColumns}
          scroll={{x: '100%', y: document.body.clientHeight - 110 }}
          size="small"
          rowSelection={{
            // 选中项发生变化的时的回调
            selectedRowKeys: ProductModalCallBackKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              // 参数1.是assetsRecordGuid的value  参数2.一组数据
              // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              this.setState({
                'ProductModalCallBack': selectedRows, //全部数据
                'ProductModalCallBackKeys': selectedRowKeys //key值ID
              })
            },
            getCheckboxProps: record => {
              return ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
              })
            },
          }}
          />
        </Modal>
      </Content>  
    )
  }
}
export default Form.create()(NewTransfer);