/*
 * @Author: yuwei - 合同管理
 * @Date: 2018-07-10 16:45:38 
* @Last Modified time: 2018-07-10 16:45:38 
 */
import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout,Button,message,Form,Select,Modal} from 'antd';
import TableGrid from '../../../component/tableGrid';
import { Link } from 'react-router-dom';
import ledger from '../../../api/ledger';
import request from '../../../utils/request';
import queryString from 'querystring';
import { contractStatus,  contractSelect } from '../../../constants';
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RemoteTable } = TableGrid;
const Confirm = Modal.confirm;

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
  }
  componentDidMount = () => {
    this.getManageSelect();
  }

  getManageSelect = () => {
    request(ledger.selectUseDeptList,{
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

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.query(values);
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }
  filterOption = (input, option) => {
    if(option.props.children){
      return option.props.children.indexOf(input) >= 0
    }
    return false
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form  onSubmit={this.handleSearch}>
          <Col span={6}> 
            <FormItem
              {...formItemLayout}
              label="管理部门"
            >
              {getFieldDecorator('bDeptId',{
                initialValue:""
              })(
                <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
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
              label="状态"
            >
              {getFieldDecorator('fstate',{
                initialValue:""
              })(
                <Select>
                  <Option key="" value="">全部</Option>
                  {
                    contractSelect.map((item)=>(<Option value={item.value} key={item.value}>{item.text}</Option>))
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6} style={{textAlign:'left',paddingLeft:15}}> 
            <FormItem style={{display: 'inline-block'}}>
              {getFieldDecorator('searchName',{
                initialValue:""
              })(
                <Input placeholder="请输入合同名称/编号" style={{width:180,marginRight:8,}}/>
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" style={{marginTop:3}}>搜索</Button>
          </Col>
      </Form>
    )
  }
}
const SearchFormWapper = Form.create()(SearchForm);

class Contract extends Component {
  
  state={
    query:{}
  }
  searchTable = (val) => {
    this.refs.table.fetch(val)
  }
  //删除合同
  deleteRow = (record) =>{
    Confirm({
      content:'确定要删除该合同吗？',
      onOk:()=>{
        request(ledger.deleteContract,{
          body:queryString.stringify({contractId:record.contractId}),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: data => {
            if(data.status){
              let values = this.refs.form.getFieldsValue();
              console.log(values);
              this.refs.table.fetch(values)
            }else{
              message.error(data.msg)
            }
          },
          error: err => {console.log(err)}
        })
      },
      onCancel:()=>{ }
    })
  }
  render() {
    const columns = [
      {
        title:"序号",
        dataIndex:'index',
        width:40,
        render:(text,record,index)=>`${index+1}`
      },
      {
        title:'状态',
        dataIndex:'fstate',
        width:60,
        render:(text)=>text?contractStatus[text]:""
      },
      {
        title: '合同名称',
        dataIndex: 'contractName',
        width:120,
        render:(text,record)=>(
          <Link to={{pathname:`/ledger/contract/details/${record.contractId}`,state:record}}>{text}</Link>
        )
      },
      {
        title: '合同编号',
        dataIndex: 'contractNo',
        width:120
      },
      {
        title: '供应商名称',
        dataIndex: 'fOrgName',
        width:100,
      },
      {
        title: '管理科室',
        dataIndex: 'bDeptName',
        width:100,
      },
      {
        title: '最后编辑时间',
        dataIndex: 'createTime',
        width:80,
        render:(text)=>text.substr(0,11)
      },
      {
        title: '操作',
        dataIndex: 'actions',
        width:50,
        render:(text,record)=> 
        record.fstate==="00" ?
         ( <a onClick={()=>this.deleteRow(record)}>删除</a>): null
      },
    ];
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
        <Row style={{padding:'24px 24px 0'}}>
            <Col span={6}>
              <Button type='primary'>
                <Icon type="plus" />
                <Link to={{pathname:`/ledger/contract/add`}} style={{color:'#fff'}}> 新建</Link>
              </Button>
            </Col>
            <SearchFormWapper query={(val)=>this.searchTable(val)} ref='form'></SearchFormWapper>
        </Row>
        <RemoteTable
            ref='table'
            query={this.state.query}
            url={ledger.queryContractList}
            scroll={{x: '100%', y : document.body.clientHeight - 311}}
            columns={columns}
            showHeader={true}
            rowKey={'contractId'}
            style={{padding:24}}
            size="small"
          /> 
         
      </Content>
    )
  }
}
export default Contract;