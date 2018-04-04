/**
 * @file 保养管理 - 新增计划
 * @author Vania
 * @since 2018-03-21 14:00:00
 * @version 1.0.0
 */
import React, { PureComponent } from 'react';
import {Tree, Card, Row, Col, Form, Input, Tooltip, DatePicker, Icon, Tag, Button, Modal,Table,
  Select, Radio, Layout ,message } from 'antd';
import querystring from 'querystring';
import TableGrid from '../../../component/tableGrid';
import request from '../../../utils/request';
import upkeep from '../../../api/upkeep';
import basicdata from '../../../api/basicdata';
import assets from '../../../api/assets';
import _ from 'lodash';
import { ledgerData, productTypeData } from '../../../constants';
import styles from './style.css';
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RemoteTable } = TableGrid;
const { Content } = Layout;
/* 表单布局样式 */ 
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
const data = [{
  key: 1,
  assetsRecord: 'John Brown sr.',
  age: 60,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: 11,
    assetsRecord: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park',
  }],
}, {
  key: 2,
  assetsRecord: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];
/** 表头 */

/** 选择资产弹窗的modal */
const productColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    width:35,
    render:(text,record,index)=> <span>{index+1}</span>
  },
  {
    title: '资产编号',
    dataIndex: 'assetsRecord',
    width: 80,
    sorter:true
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentStandardName',
    width: 50
  },
  {
    title: '型号',
    dataIndex: 'spec',
    width: 50
  },
  {
    title: '规格',
    dataIndex: 'useDept',
    width: 50
  },
  {
    title: '设备分类',
    dataIndex: 'productType',
    width: 50,
    render: text => text ?  productTypeData[text].text  : null
  },
  {
    title: '使用科室',
    dataIndex: 'bDept',
    width: 50
  },
  {
    title: '有效保养计划',
    dataIndex: 'custodian',
    width: 60
  },
]
const prjColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    width:35,
    render:(text,record,index)=> <span>{index+1}</span>
  },
  {
    title: '项目名称',
    dataIndex: 'templateTypeName',
    width: 80,
  },
]
const dataList = [];
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class MaintainPlan extends PureComponent {

  state={
    selectDropData:[],//项目弹出层 下拉框内容
    prjTableData:[],//项目弹出层  下拉框带出对应table内容
    prjVisible:false,//项目新增弹窗内容
    productVisible:false,//产品可视内容
    selctParentKey:'',//存储做操作的产品KEY--将在这里插入children
    loading:false,
    defaultParams:'',
    ProductModalCallBack:[],//选择保养资产返回的数据
    ProductTabledata:[],//选择保养资产返回的数据
    projecrModalCallBack:[],//选择项目返回的数据
    treeData:[],//选择项目的树状结构
    prjCheckedKeys:[],//被选择的项目
    formatPrjData:[],
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  }
  componentWillMount = ()=>{
    this.getOneModule();//获取弹窗树状结构
  }
  showModal = (modalName,recordKey) => {
    if(modalName==='prjVisible'){
      this.setState({
        selctParentKey:recordKey
      })
    }
    this.setState({
      [modalName]: true,
    });

  }
  handleOk = (modalName) => {
    this.setState({ loading: true });
    setTimeout(() => {
      //设置
      if(modalName=='productVisible'){
        this.setState({
          ProductTabledata:this.state.ProductModalCallBack
        })
      }else{
        //处理选中的项目数据并赋值给formatPrjData之后 将该数据混合入ProductTabledata
        debugger
      }
      this.setState({ loading: false, [modalName]: false });
    }, 1000);
  }
  handleCancel = (modalName) => {
    this.setState({ [modalName]: false });
  }
  //获取添加项目的一级下拉框
  getOneModule = () =>{
    let options = {
      body:'',
      success: data => {
        if(data.status){
          
          this.setState({
            'selectDropData':data.result
          })
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(basicdata.queryOneModule,options)
  }
  //获取添加项目的一级下拉框 带出的二级数据
  changeOneModule =(value)=>{
    debugger
    console.log(value)
    let json ={
      'maintainTemplateId':value
    }
    //发出请求获取对应二级项目内容 并给弹窗中的table
    let options = {
      body:querystring.stringify(json),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          this.setState({
            'prjTableData':data.result
          })
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(basicdata.queryTwoModule,options)

  }
 
  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 50,
        render:(text,record,index)=>{<span>{index+1}</span>}
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 200,
        render:(text,record,index)=>{
          return (
            <div>
              <a>删除</a>&nbsp;&nbsp;
              <a onClick={()=>this.showModal('prjVisible',record)}>新增项目</a>
            </div>
          )
        }
      },
      {
        title: '资产编号',
        dataIndex: 'assetsRecord',
        width: 200,
        sorter:true
      },
      {
        title: '资产名称',
        dataIndex: 'equipmentStandardName',
        width: 200
      },
      {
        title: '型号',
        dataIndex: 'spec',
        width: 100
      },
      {
        title: '规格',
        dataIndex: 'productType',
        width: 100
      },
      {
        title: '使用科室',
        dataIndex: 'useDept',
        width: 100
      }
    ];
    const { prjTableData , selectDropData , productVisible , prjVisible , loading ,defaultParams , ProductModalCallBack ,ProductTabledata} =this.state;
    const { getFieldDecorator } = this.props.form;

    const mapOption = data => data.map((item)=>{
      return <Option value={item.maintainTemplateId} key={item.maintainTemplateId}>{item.maintainTemplateName}</Option>
    })

    return (
      <Content className='ysynet-content'>
        <Card title="计划信息" bordered={false} className='min_card'>
          <Form >
            <Row>
              <Col span={6}>
                <FormItem label={`保养类型`} {...formItemLayout}>
                  {getFieldDecorator(`type`, {
                    initialValue: '00'
                  })(
                    <RadioGroup>
                      <RadioButton value="00">内保</RadioButton>
                      <Tooltip title="暂不提供该项服务">
                        <RadioButton value="01" disabled>外保</RadioButton>
                      </Tooltip>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`计划名称`} {...formItemLayout}>
                  {getFieldDecorator(`name`)(
                    <Input placeholder="请输入计划名称" style={{width: 200}}/>
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem label={`临床风险等级`} {...formItemLayout}>
                  {getFieldDecorator(`level`)(
                    <Select allowClear style={{width: 200}}>
                      <Option value={'低'}>低</Option>
                      <Option value={'中'}>中</Option>
                      <Option value={'高'}>高</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={`循环方式`} {...formItemLayout}>
                  {getFieldDecorator(`type1`, {
                    initialValue: '00'
                  })(
                    <RadioGroup>
                      <RadioButton value="00">单次</RadioButton>
                      <RadioButton value="01">循环</RadioButton>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`循环周期`} {...formItemLayout}>
                  {getFieldDecorator(`loopCycle`)(
                    <Input placeholder="请输入循环周期" style={{width: 200}} addonAfter={'月'}/>
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem label={`提前生成保养单`} {...formItemLayout}>
                  {getFieldDecorator(`advance`)(
                    <Input placeholder="请输入天数" style={{width: 200}} addonAfter={'天'}/>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={
                  <Tooltip title="循环保养时用于首次保养时间">
                    <span><Icon type="question-circle-o" style={{marginRight: 1}}/>保养时间</span>
                  </Tooltip>} {...formItemLayout}>
                  {getFieldDecorator(`maintainDate`)(
                    <DatePicker />
                  )}
                </FormItem>
              </Col>
              <Col span={8} >
                <FormItem label={`失效时间`} {...formItemLayout}>
                  {getFieldDecorator(`invalidDate`)(
                    <DatePicker />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title='资产信息' bordered={false} style={{marginTop: 4}} className='min_card'>
          <Button type='primary' style={{marginBottom: 2}} onClick={()=>this.showModal('productVisible')}>添加产品</Button>
          {/*资产信息表格*/}
          <Table columns={columns} 
            rowKey={'assetsRecordGuid'}
            rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
              console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
              console.log(selected, selectedRows, changeRows);
            },
            }} 
            dataSource={ProductTabledata} />
        </Card>

        {/*选择资产弹窗*/}
        <Modal
          visible={productVisible}
          title="选择要保养的资产"
          width='900px'
          onOk={()=>this.handleOk('productVisible')}
          onCancel={()=>this.handleCancel('productVisible')}
          footer={null}
        >
          <Row>
            <Col className={styles.mbLarge} span={20}>
              <Select name="fenlei" placehodler='全部分类' style={{ width: 150 }} className={styles.mrLarge}>
                <Option value="00">全部分类</Option>
              </Select>
              <Select name="shiyongkeshi" style={{ width: 150 }} className={styles.mrLarge}>
                <Option value="00">选择使用科室</Option>
              </Select>
              <Search
                placeholder="请输入设备编号/名称"
                onSearch={ value =>  this.queryHandler({params: value}) }
                style={{ width: 300 }}
                enterButton="搜索"
                defaultValue={ defaultParams }
              />
            </Col>
            <Col span={4} style={{textAlign:'right'}}>
              <Button key="submit" type="primary" loading={loading} onClick={()=>this.handleOk('productVisible')}>
                添加
              </Button>
            </Col>
          </Row>
          <RemoteTable
              showHeader={true}
              url={assets.selectAssetsList}
              scroll={{x: '100%' }}
              columns={productColumns}
              rowKey={'assetsRecordGuid'}
              size="small"
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                  this.setState({
                    'ProductModalCallBack':selectedRows
                  })
                },
                getCheckboxProps: record => ({
                  disabled: record.name === 'Disabled User', // Column configuration not to be checked
                  name: record.name,
                }),
              }}
            /> 
        </Modal>

         {/*选择项目*/}
         <Modal
            visible={prjVisible}
            title="选择项目"
            onOk={()=>this.handleOk('prjVisible')}
            onCancel={()=>this.handleCancel('prjVisible')}
            footer={null}
          >
          <Row>
            <Col className={styles.mbLarge}>
              <Select name="fenlei" style={{ width: 250 }} className={styles.mrLarge}
                onChange={(value)=>this.changeOneModule(value)} defaultValue="">
                <Option value=''>请选择模板添加项目</Option>
                {mapOption(selectDropData)}
              </Select>
              <Button key="submit" type="primary" loading={loading} onClick={()=>this.handleOk('prjVisible')}>
                添加
              </Button>
            </Col>
          </Row>
          <Table 
            rowKey={'templateDetailGuid'}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              },
              getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
              }),
            }} 
            columns={prjColumns} 
            dataSource={prjTableData} />
        </Modal>
      </Content>  
    )
  }
}

export default Form.create()(MaintainPlan);