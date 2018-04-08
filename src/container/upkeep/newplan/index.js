/**
 * @file 保养管理 - 新增计划
 * @author Vania
 * @since 2018-03-21 14:00:00
 * @version 1.0.0
 */
import React, { PureComponent } from 'react';
import {Card, Row, Col, Form, Input, Tooltip, DatePicker, Icon, Button, Modal,Table,Affix,
  Select, Radio, Layout ,message } from 'antd';
import querystring from 'querystring';
import TableGrid from '../../../component/tableGrid';
import request from '../../../utils/request';
import upkeep from '../../../api/upkeep';
import basicdata from '../../../api/basicdata';
import assets from '../../../api/assets';
import _ from 'lodash';
import moment from 'moment';
import { productTypeData } from '../../../constants';
import styles from './style.css';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RemoteTable } = TableGrid;
const { Content } = Layout;
const RangePicker = DatePicker.RangePicker;
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

class MaintainPlan extends PureComponent {

  state={
    cycleModule:'00',
    detpSel:[],//资产 选择科室  下拉框内容
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
    ProductType:'',//资产搜索条件
    useDeptGuid:'',//资产搜索条件
  }
  componentWillMount = ()=>{
    this.getOneModule();//获取弹窗树状结构
    this.getDetpSelect();
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
      if(modalName==='productVisible'){
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
  //获取资产下拉框数据
  getDetpSelect = ()=>{
    let options = {
      body:querystring.stringify({'deptType':'00'}),
				headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          this.setState({
            'detpSel':data.result
          })
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(upkeep.selectUseDeptList,options)
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

  handleSubmit =(status)=>{
    //此处提交所有搜集到的数据
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let json = values;
        if(values.loopFlag==="00"){//单次循环
          json.maintainDate = moment(json.maintainDate).format('YYYY-MM-DD');
          console.log('Received values of form: ', json);
        }else{
          json.maintainDate = moment(json.Date[0]).format('YYYY-MM-DD');
          json.endMaintainDate = moment(json.Date[1]).format('YYYY-MM-DD');
          delete json.Date;//删除Date
          console.log('Received values of form: ', json);
        }
        //此处还需要继续做表格的数据添加
        // json.assetsRecordGuidList
        // json.maintainTypes


      }
    });

  }

  productQueryHandler =(value)=>{
      let json ={
        ProductType:this.state.ProductType,
        useDeptGuid:this.state.useDeptGuid,
        assetsRecord:value
      }
      console.log(json)
  }

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 50,
        render:(text,record,index)=>{ <span>{index+1}</span>}
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
    const { detpSel ,cycleModule , prjTableData , selectDropData , productVisible , prjVisible , loading ,defaultParams  ,ProductTabledata} =this.state;
    const { getFieldDecorator } = this.props.form;
    //选择项目中的下拉框
    const mapOption = data => data.map((item)=>{
      return <Option value={item.maintainTemplateId} key={item.maintainTemplateId}>{item.maintainTemplateName}</Option>
    })
    //选择资产弹窗中的科室sel
    const deptSelFn = detpSel =>detpSel.map((item)=>{
        return <Option key={item.value} value={item.value}>{item.text}</Option>
    })
    
    const cycleModuleFn =(val)=>{
      if(val==='00'){
        return(
          <Col span={8}>
            <FormItem label={
              <Tooltip title="循环保养时用于首次保养时间">
                <span><Icon type="question-circle-o" style={{marginRight: 1}}/>保养时间</span>
              </Tooltip>} {...formItemLayout}>
                {getFieldDecorator(`maintainDate`)(
                <DatePicker />
              )}
            </FormItem>
          </Col>
        
        )
      }else{
        return(
          <div>
            <Col span={8}>
            <FormItem label={`循环周期`} {...formItemLayout}>
              {getFieldDecorator(`tfCycle`)(
                <Input placeholder="请输入循环周期" style={{width: 200}} addonAfter={'月'}/>
              )}
            </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label={`提前生成保养单`} {...formItemLayout}>
                {getFieldDecorator(`advancePlan`)(
                  <Input placeholder="请输入天数" style={{width: 200}} addonAfter={'天'}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} >
              {/* maintainDate - endMaintainDate*/}
              <FormItem
                {...formItemLayout}
                label="保养有效期"
              >
                {getFieldDecorator('Date')(
                  <RangePicker />
                )}
              </FormItem>
            </Col>
          </div>
        )
      }
    }

    return (
      <Content className='ysynet-content'>
      <Affix>
        <div style={{background:'#fff',padding:'10px 20px',marginBottom:10,display:'flex',alignContent:'center',justifyContent:'flex-end'}}>
          <Button type="default" onClick={()=>this.handleSubmit('02')}>保存</Button>
        </div>
      </Affix>

        <Card title="计划信息" bordered={false} className='min_card'>
          <Form>
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
                  {getFieldDecorator(`maintainPlanName`)(
                    <Input placeholder="请输入计划名称" style={{width: 200}}/>
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem label={`临床风险等级`} {...formItemLayout}>
                  {getFieldDecorator(`clinicalRisk`)(
                    <Select allowClear style={{width: 200}}>
                      <Option value={'00'}>低</Option>
                      <Option value={'01'}>中</Option>
                      <Option value={'02'}>高</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={`循环方式`} {...formItemLayout}>
                  {getFieldDecorator(`loopFlag`, {
                    initialValue: '00'
                  })(
                    <RadioGroup onChange={(e)=>{this.setState({'cycleModule':e.target.value}) } }>
                      <RadioButton value="00">单次</RadioButton>
                      <RadioButton value="01">循环</RadioButton>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              {cycleModuleFn(cycleModule)}
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
              <Select name="ProductType" defaultValue="00" onChange={(e)=>this.setState({ProductType:e.target.value})} style={{ width: 150 }} className={styles.mrLarge}>
                <Option value="00">全部分类</Option>
                <Option value="01">通用设备</Option>
                <Option value="02">电气设备</Option>
                <Option value="03">电子产品及通信设备</Option>
                <Option value="04">仪器仪表及其他</Option>
                <Option value="05">专业设备</Option>
                <Option value="06">其他</Option>
              </Select>
              <Select name="useDeptGuid" defaultValue="00" onChange={(e)=>this.setState({useDeptGuid:e.target.value})} style={{ width: 150 }} className={styles.mrLarge}>
                <Option value="00">选择使用科室</Option>
                {deptSelFn(detpSel)}
              </Select>
              <Search
                placeholder="请输入设备编号/名称"
                onSearch={ value =>  this.productQueryHandler(value) }
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