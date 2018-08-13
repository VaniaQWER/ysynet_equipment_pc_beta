/*
 * @Author: yuwei  approvalNew  新品审批
 * @Date: 2018-07-11 14:31:51 
* @Last Modified time: 2018-07-11 14:31:51 
 */
import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout,Button,message,Form,Select,DatePicker} from 'antd';
import TableGrid from '../../../component/tableGrid';
import { Link } from 'react-router-dom';
import approval from '../../../api/approval';
import request from '../../../utils/request';
import queryString from 'querystring';
import moment from 'moment';
import { allowTypeSelect , allowTypeStatus , approvalFstateSelect ,approvalFstateStatus  } from '../../../constants';
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RemoteTable } = TableGrid;
const RangePicker = DatePicker.RangePicker;
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
  }

  //申请科室
  getManageSelect = () => {
    request(approval.queryDeptListByUserId,{
      body:queryString.stringify({}),
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
      if(values.Time){
        values.startTime = moment(values.Time[0]).format('YYYY-MM-DD');
        values.endTime = moment(values.Time[1]).format('YYYY-MM-DD');
      }
      delete values['Time']
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
          <Col span={8}> 
            <FormItem
              {...formItemLayout}
              label="开票日期"
            >
              {getFieldDecorator('Time')(
                <RangePicker></RangePicker>
              )}
            </FormItem>
          </Col>
          <Col span={8}> 
            <FormItem
              {...formItemLayout}
              label="申请科室"
            >
              {getFieldDecorator('deptGuid',{
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
          <Col span={8} style={{display: display}}> 
            <FormItem
              {...formItemLayout}
              label="单据号"
            >
              {getFieldDecorator('applyNo')(
                <Input placeholder='请输入'/>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}> 
            <FormItem
              {...formItemLayout}
              label="单据类型"
            >
              {getFieldDecorator('allowType')(
                <Select>
                  <Option key="" value="">全部</Option>
                  {
                    allowTypeSelect.map((item)=><Option key={item.value} value={item.value}>{item.text}</Option>)
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}> 
            <FormItem
              {...formItemLayout}
              label="审批状态"
            >
              {getFieldDecorator('fstate')(
                <Select>
                  <Option key="" value="">全部</Option>
                  {
                    approvalFstateSelect.map((item)=><Option key={item.value} value={item.value}>{item.text}</Option>)
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{textAlign:'right', paddingTop:5}}> 
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button style={{marginLeft: 8,}} onClick={this.handleReset}>重置</Button>
              <a style={{marginLeft: 8, fontSize: 14}} onClick={this.toggle}>
                {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SearchFormWapper = Form.create()(SearchForm);

class ApprovalNew extends Component {
  state={
    query:{}
  }
  searchTable = (val) => {
    this.refs.table.fetch(val)
  }
  render() {
    
    const columns = [
      {
        title:'单据类型',
        dataIndex:'allowType',
        width:80,
        render:(text)=>text?allowTypeStatus[text]:""
      },
      {
        title: '单据号',
        dataIndex: 'applyNo',
        width:150,
        render:(text,record)=>(
          <Link to={{pathname:`/approval/approvalNew/details/${record.approvalRecordDetailGuid}`,state:record}}>{text}</Link>
        )
      },
      {
        title: '状态',
        dataIndex: 'fstate',
        width:100,
        render:(text)=>text?approvalFstateStatus[text]:""
      },
      {
        title: '申请科室',
        dataIndex: 'deptName',
        width:120
      },
      {
        title: '管理科室',
        dataIndex: 'bDeptName',
        width:100,
      },
      {
        title: '申请时间',
        dataIndex: 'createTime',
        width:100,
        render:(text)=>text?text.substr(0,11):""
      }
    ];
    return (
      <Content className='ysynet-content ysynet-common-bgColor' style={{padding: 24}}>
        <SearchFormWapper query={(val)=>this.searchTable(val)} ref='form'></SearchFormWapper>
        <RemoteTable
            ref='table'
            query={this.state.query}
            url={approval.queryApprovalList}
            scroll={{x: '100%', y : document.body.clientHeight - 311}}
            columns={columns}
            showHeader={true}
            rowKey={'RN'}
            size="small"
          /> 
      </Content>
    )
  }
}
export default ApprovalNew;