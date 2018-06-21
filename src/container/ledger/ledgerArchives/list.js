import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout,Upload,Button,Tag,message,Menu,Dropdown,Alert, Form,Select} from 'antd';
import TableGrid from '../../../component/tableGrid';
import { Link } from 'react-router-dom'
import assets from '../../../api/assets';
import styles from './style.css';
import { ledgerData,productTypeData,useFstateSel } from '../../../constants';
import request from '../../../utils/request';
import queryString from 'querystring';

const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RemoteTable } = TableGrid;
const columns = [
  {
    title: '操作',
    dataIndex: 'RN',
    width: 200,
    render: (text, record) => 
      <span>
        <Link to={{pathname: `/ledger/ledgerArchives/${record.assetsRecordGuid}`}}><Icon type="profile" />详情</Link>
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
      console.log(values)
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
        </Row>
        
      </Form>
    )
  }
}
const SearchFormWapper = Form.create()(SearchForm);

class LedgerArchivesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query:{"deptType":"MANAGEMENT"},
      messageError:"",
      selectedRowKeys:[]
    }
  }
  queryHandler = (query) => {
    let q = Object.assign({"deptType":"MANAGEMENT"},query);
    this.refs.table.fetch(q);
    this.setState({ q })
  }
  query = (val) => {
    this.refs.table.fetch(val)
  }
  //打印所有
  printAll = () =>{
    let v = this.refs.form.getFieldsValue();
    this.sendPrintAjax(v)
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
    console.log('发出的数据内容',JSON.stringify(json))
    window.open(assets.printEquipmentQrcode+"?"+queryString.stringify(json))
  }
  render() {
    const { selectedRowKeys } = this.state;
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
         <Alert message={messageInfo} type="warning" showIcon closeText="关闭" />
         {
            this.state.messageError === "" ? null
            :
            <Alert style={{marginTop : 10}} message="错误提示"  type="error" description={<div dangerouslySetInnerHTML={{__html:this.state.messageError}}></div>} showIcon closeText="关闭" />
          }
          <SearchFormWapper query={query=>{this.query(query)}} ref='form'/>
          <Row style={{marginTop : 10}}>
            <Col span={12}></Col>
            <Col span={8} className={styles['text-align-right']}>
              <Upload
                action={assets.importEquipments}
                showUploadList={false}
                withCredentials={true}
                beforeUpload={()=>this.setState({loading: true})}
                onError={(error)=>{
                    this.setState({loading: false})
                    console.log(error)
                }}
                onSuccess={(result)=>{
                  console.log(result,'result')
                    this.setState({loading: false})
                    if(result.status){
                        this.refs.table.fetch();
                        this.setState({
                            messageError:""
                        })
                        message.success("导入成功")
                    }
                    else{
                        this.setState({
                            messageError:result.msg
                        })
                    }
                }}
                >
                <Button style={{ marginRight: 8 }}>
                  <Icon type='export'/> 导入
                </Button>
                
                
                {/*<a href={assets.importAssetsTemplate} style={{ marginLeft: 8 }} target="_self">
                  <Icon type='cloud-download'/> 下载模板
                </a>*/}
              </Upload>
              <Dropdown overlay={
                <Menu  onClick={()=>this.printAll()}>
                  <Menu.Item key="1"> 批量打印</Menu.Item>
                </Menu>
              } >
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
          /> 
        </Content>
    )
  }
}
export default LedgerArchivesList;