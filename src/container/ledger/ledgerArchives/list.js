import React, { Component } from 'react';
import { Row,Col,DatePicker,Input,Icon, Layout,Upload,Button,Table,Tag,message,Radio,Menu,Dropdown,Alert, Form,Select, Modal,Progress} from 'antd';
import TableGrid from '../../../component/tableGrid';
import { Link } from 'react-router-dom'
import assets from '../../../api/assets';
import styles from './style.css';
import { ledgerData,productTypeData,useFstateSel } from '../../../constants';
import request from '../../../utils/request';
import queryString from 'querystring';
import moment from 'moment';
const Confirm = Modal.confirm;
const RangePicker = DatePicker.RangePicker;
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RemoteTable } = TableGrid;
const columns = [
  {
    title: '操作',
    dataIndex: 'RN',
    width: 250,
    render: (text, record) =>
      <span>
        <Link to={{pathname: `/ledger/ledgerArchives/${record.assetsRecordGuid}`}}><Icon type="profile" />详情</Link>
        <Link className={styles['ml10']}  to={{pathname: `/ledger/lifecycle/${record.assetsRecordGuid}`}}><Icon type="profile" />生命周期</Link>
        <a className={styles['ml10']} target="_blank" href={assets.printEquipmentQrcode+"?"+queryString.stringify({assetsRecordGuid:record.assetsRecordGuid})}>打码</a>
        <Link className={styles['ml10']}  to={{pathname: `/ledger/benefitAnalysis/${record.assetsRecordGuid}`}}><Icon type="profile" />效益分析</Link>
      </span>
  },
  {
    title: '资产编号',
    dataIndex: 'assetsRecord',
    width: 200,
    sorter:true
  },
  {
    title: '状态',
    dataIndex: 'useFstate',
    width: 100,
    filters: useFstateSel,
    onFilter: (value, record) => (record && record.useFstate===value),
    render: text =><Tag color={ledgerData[text].color}> { ledgerData[text].text } </Tag>,
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
    title: '资产分类',
    dataIndex: 'productType',
    width: 100,
    render: text => text ?  productTypeData[text].text  : null
  },
  {
    title: '保管员',
    dataIndex: 'custodian',
    width: 150
  },
  {
    title: '使用科室',
    dataIndex: 'useDept',
    width: 100
  },
  {
    title: '管理科室',
    dataIndex: 'bDept',
    width: 100
  }
];
const messageInfo = "添加大量的信息，建议使用导入功能。导入前请先下载Excel格式模版文件。";
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

class SearchForm extends Component {

  state={
    display: 'none',
    manageSelect:[],
    outDeptOptions: []
  }
  componentDidMount = () => {
    this.getManageSelect();
    this.outDeptSelect();
  }

  getManageSelect = () => {
    request(assets.selectUseDeptList,{
      body:queryString.stringify({deptType:"01"}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
                this.setState({manageSelect:data.result})
        }else{
                message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    })
  }
  outDeptSelect = () => {
    request(assets.selectUseDeptList,{
      body:queryString.stringify({deptType:"00"}),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
                this.setState({outDeptOptions:data.result})
        }else{
                message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    })
  }

  toggle = () => {
    const { display, expand } = this.state;
    this.setState({
      display: display === 'none' ? 'block' : 'none',
      expand: !expand
    })
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(values.buyDate){
        values.buyDateStart=moment(values.buyDate[0]).format('YYYY-MM-DD');
        values.buyDateEnd=moment(values.buyDate[1]).format('YYYY-MM-DD');
        delete values['buyDate'];
      }
      this.props.query(values);
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { display } = this.state;
    return (
      <Form  onSubmit={this.handleSearch}>
        <Row>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="资产编码"
            >
              {getFieldDecorator('assetCode')(
                <Input placeholder='请输入资产编码'/>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="资产名称"
            >
              {getFieldDecorator('assetName')(
                <Input placeholder='请输入资产名称'/>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="型号"
            >
              {getFieldDecorator('fmodel')(
                <Input  placeholder='请输入型号'/>
              )}
            </FormItem>
          </Col>
          <Col span={6} style={{textAlign:'right',paddingRight:15,paddingTop:5}}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button style={{marginLeft: 30,}} onClick={this.handleReset}>重置</Button>
              <a style={{marginLeft: 30, fontSize: 14}} onClick={this.toggle}>
                {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
          </Col>
        </Row>
        <Row style={{display: display}}>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="规格"
            >
              {getFieldDecorator('spec')(
                <Input  placeholder='请输入规格'/>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="管理科室"
            >
              {getFieldDecorator('manageDeptGuid',{
                initialValue:""
              })(
                <Select
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="" key={-1}>全部</Option>
                    {
                        this.state.manageSelect.map((item,index) => {
                        return <Option key={index} value={item.value}>{item.text}</Option>
                        })
                    }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="使用科室"
            >
              {getFieldDecorator('useDeptGuid',{
                initialValue:""
              })(
                <Select
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="" key={-1}>全部</Option>
                    {
                        this.state.outDeptOptions.map((item,index) => {
                        return <Option key={index} value={item.value.toString()}>{item.text}</Option>
                        })
                    }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{display: display}}>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="保管员"
            >
              {getFieldDecorator('custodian')(
                <Input placeholder='请输入保管员'/>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="购置日期"
            >
              {getFieldDecorator('buyDate')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SearchFormWapper = Form.create()(SearchForm);

const importModalColumns =[
  {
    title:'校验结果',
    dataIndex:'remark',
    width:200
  },
  {
    title:'行数',
    dataIndex:'rn',
    width:100,
    render:(text,record,index)=>`第${record.rn}行`
  },
  {
    title:'资产编码',
    dataIndex:'assetsRecord',
    width:100
  },
  {
    title:'二维码',
    dataIndex:'qrcode',
    width:100
  },
  {
    title:'资产名称',
    dataIndex:'equipmentStandardName',
    width:100
  },
  {
    title:'注册证号',
    dataIndex:'registerNo',
    width:100
  },
  {
    title:'品牌',
    dataIndex:'brand',
    width:100
  },
  {
    title:'通用名称',
    dataIndex:'equipmentName',
    width:100
  },
  {
    title:'型号',
    dataIndex:'fmodel',
    width:100
  },
  {
    title:'规格',
    dataIndex:'spec',
    width:100
  },
  {
    title:'计量单位',
    dataIndex:'meteringUnit',
    width:100
  },
  {
    title:'购买金额',
    dataIndex:'buyPrice',
    width:100
  },
  {
    title:'使用科室',
    dataIndex:'useDeptName',
    width:100
  },
  {
    title:'保管员',
    dataIndex:'custodian',
    width:100
  },
  {
    title:'存放地址',
    dataIndex:'deposit',
    width:100
  },
  {
    title:'管理科室',
    dataIndex:'manageDeptName',
    width:100
  },
  {
    title:'生产商',
    dataIndex:'product',
    width:100
  },
  {
    title:'生产商国家',
    dataIndex:'productCountry',
    width:120
  },
  {
    title:'出厂日期',
    dataIndex:'productionDate',
    width:100
  },
  {
    title:'供应商',
    dataIndex:'fOrgName',
    width:100
  },
  {
    title:'购买日期',
    dataIndex:'buyDate',
    width:100
  },
  {
    title:'合同编号',
    dataIndex:'contractNo',
    width:100
  },
  {
    title:'保修截止日期',
    dataIndex:'inDate',
    width:120
  },
  {
    title:'折旧方式',
    dataIndex:'depreciationType',
    width:100
  },
  {
    title:'预计使用年限（年）',
    dataIndex:'useLimit',
    width:180
  },
  {
    title:'出厂编号',
    dataIndex:'eqProductNo',
    width:100
  },
  {
    title:'公用设备',
    dataIndex:'publicEquipment',
    width:100
  }
]
const accessoriesModalColumns = [
  {
    title:'校验结果',
    dataIndex:'remark',
    width:200
  },
  {
    title:'行数',
    dataIndex:'index',
    width:100,
    render:(text,record,index)=>`第${index+1}行`
  },
  {
    title:'资产编码',
    dataIndex:'assetsRecord',
    width:100
  },
  {
    title:'配件编码',
    dataIndex:'partsCode',
    width:100
  },
  {
    title:'证件号',
    dataIndex:'registerNo',
    width:100
  },
  {
    title:'品牌',
    dataIndex:'brand',
    width:100
  },
  {
    title:'配件名称',
    dataIndex:'partsName',
    width:100
  },
  {
    title:'型号',
    dataIndex:'fmodel',
    width:100
  },
  {
    title:'规格',
    dataIndex:'spec',
    width:100
  },
  {
    title:'单位',
    dataIndex:'meteringUnit',
    width:100
  },
  {
    title:'单价',
    dataIndex:'price',
    width:100,
    render:(text)=> text ? (text-0).toFixed(2) :''
  },
]
class LedgerArchivesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showProgress:false,//导入模态框的
      importModalType:"01",//导入模态框选择的导入类型
      progressPercent:0,
      importDataSource:[],//导入数据的table数据
      query:{},//"deptType":"MANAGEMENT"
      messageError:"",
      selectedRowKeys:[],
      tableRecords:0
    }
  }
  query = (val) => {
    this.refs.table.fetch(val)
  }
  //打印所有
  printAll = () =>{
    if(this.state.tableRecords<=100){
      let v = this.refs.form.getFieldsValue();
      this.sendPrintAjax(v)
    }else{
      message.warn('为了提高效率，打印数量请保持在100以内');
    }
  }
  //选择资产打印
  printSelect = ()=>{
    //查看选择内容
    const {selectedRowKeys} = this.state;
    if(selectedRowKeys.length>0){
      let json = {assetsGuids:selectedRowKeys}
      this.sendPrintAjax(json)
    }else{
      message.warn('请选择相关资产信息打印')
    }
  }

  sendPrintAjax = (json) => {
    Confirm({
      title:'您是否需要打印资产配件的标签?',
      content:'选择是将打印附件标签，你还要继续吗?',
      onOk:()=>{
        json.extendBoolean='yes';
        window.open(assets.printEquipmentQrcode+"?"+queryString.stringify(json))
      },
      onCancel:()=>{
        window.open(assets.printEquipmentQrcode+"?"+queryString.stringify(json))
      }
    })
    // console.log('发出的数据内容',JSON.stringify(json))
    this.setState({selectedRowKeys:[]})
  }
  //导出资产
  exportAssets = () => {
    let json = this.refs.form.getFieldsValue();
    window.open(assets.exportApplyList+'?'+queryString.stringify(json))
  }
  //保存
  onSubmitImport = () => {
    let arr = this.state.importDataSource;
    let filed =  this.state.importModalType ==="01" ?  "assetsRecordImportList":"partsDtoList";
    // console.log(JSON.stringify({[filed]:arr,}))
    if(arr.length){
      request(assets.addAssets+'?'+queryString.stringify({importType:this.state.importModalType}),{
        body:JSON.stringify({[filed]:arr}),
        headers: {
            'Content-Type': 'application/json'
        },
        success: data => {
          if(data.status){
             message.success('保存成功')
             this.setState({visibleImportModal:false,importDataSource:[],importModalType:"01"})
             this.refs.table.fetch();
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      })
    }else{
      message.warn('请先导入模板！')
    }
  }
  render() {
    const { selectedRowKeys , importDataSource } = this.state;
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
         <Alert message={messageInfo} type="warning" showIcon closeText="关闭" />

          <SearchFormWapper query={query=>{this.query(query)}} ref='form'/>
          <Row style={{marginTop : 10}}>
            <Col span={12}></Col>
            <Col span={8} className={styles['text-align-right']}>
              <Button type='primary' style={{marginRight:15}} onClick={()=>this.setState({visibleImportModal:true})}>导入</Button>
              <Button type='primary' style={{marginRight:15}} onClick={()=>this.exportAssets()}>导出</Button>
              <Dropdown overlay={
                <Menu  onClick={()=>this.printAll()}>
                  <Menu.Item key="1"> 全部打印</Menu.Item>
                </Menu>
                }>
                <Button onClick={()=>this.printSelect()}>
                  打印 <Icon type="ellipsis" />
                </Button>
              </Dropdown>
            </Col>
            <Col span={4} style={{textAlign:'right'}}>
              <Button type='primary' style={{ marginRight: 16 }}>
                <Link to={{pathname:`/ledger/ledgerArchives/add/id`}}>新增档案</Link>
              </Button>
            </Col>
          </Row>
          <RemoteTable
            loading={ this.state.loading}
            ref='table'
            query={this.state.query}
            url={assets.selectAssetsList}
            scroll={{x: '100%', y : document.body.clientHeight - 311}}
            columns={columns}
            showHeader={true}
            rowKey={'assetsRecordGuid'}
            style={{marginTop: 10}}
            size="small"
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys) => {
                this.setState({selectedRowKeys})
              }
            }}
            callback={
              (data)=>{
                this.setState({tableRecords:data.result.records})
              }
            }
          />
          <Modal
            title='导入数据'
            width={980}
            visible={this.state.visibleImportModal}
            onOk={()=>this.setState({visibleImportModal:false,importDataSource:[],importModalType:"01"})}
            onCancel={()=>this.setState({visibleImportModal:false,importDataSource:[],importModalType:"01"})}
            footer={null}
          >
            {
              this.state.messageError === "" ? null
              :
              <Alert style={{marginTop : 10}} message="错误提示"  type="error" description={<div dangerouslySetInnerHTML={{__html:this.state.messageError}}></div>} showIcon closeText="关闭" />
            }
            {
              this.state.showProgress ? <Progress percent={this.state.progressPercent} status="active" />
              : null
            }
            <Row style={{marginTop:10}}>
              <Col span={12}>
                <div className="ant-row ant-form-item">
                  <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                    <label>导入类型</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                    <div className="ant-form-item-control">
                      <Radio.Group value={this.state.importModalType} onChange={(e)=>this.setState({importModalType:e.target.value})}>
                        <Radio value="01">资产</Radio>
                        <Radio value="02">配件</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12} style={{textAlign:'right'}}>
                <span>导入模板：
                  {
                    this.state.importModalType==="01" ?
                    <a href={assets.importModalTemplate} style={{ marginRight: 8 }} target="_blank">资产模板.xls</a>
                    :<a href={assets.accessoriesModalTemplate} style={{ marginRight: 8 }} target="_blank"> 配件模板.xls</a>
                  }

                </span>
                <Upload
                  action={assets.importAssets}
                  data={{importType:this.state.importModalType}}
                  showUploadList={false}
                  withCredentials={true}
                  beforeUpload={()=>this.setState({loading: true,showProgress:true})}
                  onError={(error)=>{
                      this.setState({loading: false,showProgress:false})
                  }}
                  onChange={(file)=>{
                    if(file.event){
                      if(file.event.percent<100){
                        this.setState({
                          progressPercent:file.event.percent
                        })
                      }else{
                        this.setState({
                          progressPercent:99
                        })
                      }
                    }
                  }}
                  onSuccess={(result)=>{
                    this.setState({loading: false})
                    if(result.status){
                      this.setState({
                          importDataSource:result.result,
                          progressPercent:100,
                          showProgress:false,
                          messageError:"",
                      })
                      message.success("上传成功")
                    }else{
                      this.setState({
                          messageError:result.msg,showProgress:false
                      })
                    }
                  }}>
                  <Button style={{ marginRight: 8 }}>
                    <Icon type='export'/> 上传
                  </Button>
                </Upload>
                <Button type='primary' style={{marginRight:8}} onClick={()=>this.onSubmitImport()}>保存</Button>
              </Col>
            </Row>
            <Table
              rowKey={'rn'}
              scroll={{x:'320%'}}
              columns={this.state.importModalType==="01" ? importModalColumns : accessoriesModalColumns}
              dataSource={importDataSource}>
            </Table>

          </Modal>


        </Content>
    )
  }
}
export default LedgerArchivesList;
