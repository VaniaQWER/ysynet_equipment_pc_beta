/*
 * @Author: yuwei  发票审核-auditInvoice
 * @Date: 2018-07-05 13:58:29 
* @Last Modified time: 2018-07-05 13:58:29 
 */
import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout,Button,message,Form,Select,DatePicker,Modal } from 'antd';
import TableGrid from '../../../component/tableGrid';
import { Link } from 'react-router-dom';
import financialControl from '../../../api/financialControl';
import request from '../../../utils/request';
import queryString from 'querystring';
import moment from 'moment';
import { equipmentInvoiceStatus,  equipmentInvoiceSelect } from '../../../constants';
const {TextArea} = Input;
const {RangePicker} = DatePicker;
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RemoteTable } = TableGrid;
const columns = [
  {
    title:'状态',
    dataIndex:'fstate',
    width:100,
    render:(text)=>equipmentInvoiceStatus[text].text
  },
  {
    title: '发票代码',
    dataIndex: 'invoiceCode',
    width:100
  },
  {
    title: '发票号码',
    dataIndex: 'invoiceNo',
    width:100
  },
  {
    title: '发票金额',
    dataIndex: 'accountPayed',
    width:100,
    render:(text)=>(text-0).toFixed(2)
  },
  {
    title: '开票日期',
    dataIndex: 'invoiceDate',
    width:100,
    render:(text)=>text.substr(0,11)
  },
  {
    title: '供应商',
    dataIndex: 'fOrgName',
    width:100
  },
  {
    title: '送货单号',
    dataIndex: 'sendNo',
    width:100
  },
  {
    title: '入库单号',
    dataIndex: 'bDept123',
    width:100
  },
  {
    title: '操作',
    dataIndex: 'actions',
    width:100,
    render:(text,record)=>(
      <Link to={{pathname:`/financialControl/auditInvoice/details/${record.invoiceId}`,state:record}}>详情</Link>
    )
  },
];
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
    request(financialControl.selectUseDeptList,{
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
    request(financialControl.selectFOrgList,{
      body:queryString.stringify({}),
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
      if(values.invoiceTime){
        values.invoiceStartTime = moment(values.invoiceTime[0]).format('YYYY-MM-DD');
        values.invoiceEndTime = moment(values.invoiceTime[1]).format('YYYY-MM-DD');
        delete values['invoiceTime']
      }
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
    const { display } = this.state;
    return (
      <Form  onSubmit={this.handleSearch}>
        <Row>
          <Col span={6}> 
            <FormItem
              {...formItemLayout}
              label="管理部门"
            >
              {getFieldDecorator('bDeptId',{//manageDeptGuid
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
                    equipmentInvoiceSelect.map((item)=>(<Option value={item.value} key={item.value}>{item.text}</Option>))
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}> 
            <FormItem
              {...formItemLayout}
              label="供应商"
            >
              {getFieldDecorator('fOrgId',{//useDeptGuid
                initialValue:""
              })(
                <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option)=>this.filterOption(input, option)}
                >
                    <Option value="" key={-1}>全部</Option>
                    {
                        this.state.outDeptOptions.map((item,index) => {
                        return <Option key={item.orgId} value={item.orgId}>{item.orgName}</Option>
                        })
                    }
                </Select>
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
              label="发票代码"
            >
              {getFieldDecorator('invoiceCode')(
                <Input placeholder='请输入'/>
              )}
            </FormItem>
          </Col>
          <Col span={6}> 
            <FormItem
              {...formItemLayout}
              label="发票号码"
            >
              {getFieldDecorator('invoiceNo')(
                <Input placeholder='请输入'/>
              )}
            </FormItem>
          </Col>
          <Col span={6}> 
            <FormItem
              {...formItemLayout}
              label="开票日期"
            >
              {getFieldDecorator('invoiceTime')(
                <RangePicker></RangePicker>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{display: display}}>
          <Col span={6}> 
            <FormItem
              {...formItemLayout}
              label="送货单号"
            >
              {getFieldDecorator('sendNo')(
                <Input  placeholder='请输入'/>
              )}
            </FormItem>
          </Col>
          <Col span={6}> 
            <FormItem
              {...formItemLayout}
              label="入库单号"
            >
              {getFieldDecorator('inNo')(
                <Input placeholder='请输入'/>
              )}
            </FormItem>
          </Col>
        </Row>
        
      </Form>
    )
  }
}
const SearchFormWapper = Form.create()(SearchForm);

class AuditInvoice extends Component {
  
  state = {
    visible:false,
    selectedRowKeys:[],
    reason:'',//审核不通过原因
  }
  searchTable = (val) => {
    this.refs.table.fetch(val)
  }
  //审核通过
  pass = () => {
    const { selectedRowKeys } = this.state;
    if(selectedRowKeys.length>0){
      //发出请求
      let json = {
        invoiceId:selectedRowKeys,
        fstate:'03',
      }
      request(financialControl.updateZCInvoiceFstate,{
        body:queryString.stringify(json),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: data => {
          if(data.status){
            message.success('审核状态修改成功！')
            let query = this.refs.form.getFieldsValue();
            this.refs.table.fetch(query)
            this.setState({
              selectedRowKeys:[]
            })
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      })
    }else{
      message.warn('请选择发票！')
    }
  }
   //审核不通过
  noPass = () => {
    const { selectedRowKeys } = this.state;
    if(selectedRowKeys.length>0){
      this.setState({visible:true})
    }else{
      message.warn('请选择发票！')
    }
  }
  //审核不通过 - 提交
  submit = () => {
    console.log(this.state.reason)
    //此处发出请求
    let json = {
      invoiceId:this.state.selectedRowKeys,
      fstate:'09',
      rejectReason:this.state.reason
    }
    console.log('审核不通过发出的请求信息',json)
    request(financialControl.updateZCInvoiceFstate,{
      body:queryString.stringify(json),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          this.setState({visible:false,reason:"",selectedRowKeys:[]})
          let query = this.refs.form.getFieldsValue();
          this.refs.table.fetch(query)
          message.success('审核状态修改成功！')
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    })
  }
  render() {
    const { selectedRowKeys , visible , reason} = this.state;
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
        <SearchFormWapper query={(val)=>this.searchTable(val)} ref='form'></SearchFormWapper>
        <Row style={{textAlign:'right'}}>
          <Button type='primary' onClick={()=>this.pass()}>审核通过</Button>
          <Button type='primary' style={{marginLeft:15}} onClick={()=>this.noPass()}>审核不通过</Button>
        </Row>
        <RemoteTable
            loading={ this.state.loading}
            ref='table'
            query={this.state.query}
            url={financialControl.selectZCInvoiceList}
            scroll={{x: '100%', y : document.body.clientHeight - 311}}
            columns={columns}
            showHeader={true}
            rowKey={'invoiceId'}
            style={{marginTop: 10}}
            size="small"
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys) => {
                this.setState({selectedRowKeys})
              }
            }}
          /> 
          <Modal
            visible={visible}
            title='审核不通过'
            onOk={()=>{this.submit()}}
            onCancel={()=>{this.setState({reason:"",visible:false})}}
            >
            <TextArea placeholder="不通过原因" value={reason} maxLength={200} rows={4} onInput={(e)=>this.setState({reason:e.target.value})}/>
          </Modal>
      </Content>
    )
  }
}
export default AuditInvoice;