/**
 * @file 资产转科 - 转科记录
 * @author Vania
 * @since 2018-04-08
 */
import React, { PureComponent } from 'react';
import { Layout, Card, Form, Row, Col, Input, Button, Icon, Select, DatePicker, Tabs} from 'antd';
import tableGrid from '../../../component/tableGrid';
import './style.css';
import { Link } from 'react-router-dom';
import querystring from 'querystring';
import request from '../../../utils/request';
import transfer from '../../../api/transfer';

const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const { RemoteTable } = tableGrid
const TabPane = Tabs.TabPane;

let timeout;
let currentValue;
function fetchOut(deptName, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = deptName;

  let options = {
    body:querystring.stringify({'deptName': deptName, 'deptType': '00'}),
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: d => {
      if (currentValue === deptName) {
        const result = d.result;
        const dataOut = [];
        result.forEach((r) => {
          dataOut.push({
            value: r.value,
            text: r.text
          });
        });
        callback(dataOut);
      }
    }
  }
  request(transfer.getSelectUseDeptList, options);
}
function fetchInto(deptName, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = deptName;

  let options = {
    body:querystring.stringify({'deptName': deptName}),
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: d => {
      if (currentValue === deptName) {
        const result = d.result;
        const dataInto = [];
        result.forEach((r) => {
          dataInto.push({
            value: r.value,
            text: r.text
          });
        });
        callback(dataInto);
      }
    }
  }
  request(transfer.getSelectUseDeptList, options);
}
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
class SearchFormWrapper extends PureComponent {
  state={
    display: 'none',
    dataOut: [],
    dataInto: [],
    deptName: '',
  }
  handleChangeOut = (deptName) => {
    this.setState({ deptName });
    fetchOut(deptName, dataOut => this.setState({ dataOut }));
  }
  handleChangeInto = (deptName) => {
    this.setState({ deptName });
    fetchInto(deptName, dataInto => this.setState({ dataInto }));
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
      const createDate = values.createDate === undefined ? '': values.createDate;
      if(createDate.length>0) {
        values.startCreateDate = createDate[0].format('YYYY-MM-DD');
        values.endCreateDate = createDate[1].format('YYYY-MM-DD');
      }
      this.props.query(values);
    });
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
  }
  render() {
    const { display } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col span={8}>
            <FormItem label={`资产编码`} {...formItemLayout}>
            {getFieldDecorator('assetsRecord',{})(
              <Input placeholder="请输入资产编码" style={{width: 200}} />
            )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={`资产名称`} {...formItemLayout}>
            {getFieldDecorator('equipmentStandardName', {})(
              <Input placeholder="请输入资产名称" style={{width: 200}} />
            )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'right', marginTop: 4}} >
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{marginLeft: 30}} onClick={this.handleReset}>重置</Button>
            <a style={{marginLeft: 30, fontSize: 14}} onClick={this.toggle}>
              {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{display: display}}>
            <FormItem label={`转出科室`} {...formItemLayout}>
            {getFieldDecorator('outDeptguid', {})(
            <Select
              showSearch
              placeholder={`请输入搜索转出科室`}
              style={{width: 200}}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              disabled={this.props.activeKey === '1'? true: false}
              onSearch={this.handleChangeOut}
              onSelect={(val, option)=>{this.setState({outDeptguid: val, outDeptname: option.props.children})}}
            >
              {this.state.dataOut.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>)}
            </Select>
            )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`转入科室`} {...formItemLayout}>
            {getFieldDecorator('inDeptguid', {})(
              <Select
              showSearch
              placeholder={`请输入搜索转入科室`}
              style={{width: 200}}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              disabled={this.props.activeKey === '2'? true: false}
              onSearch={this.handleChangeInto}
              onSelect={(value, option)=>{this.setState({inDeptguid: value, inDeptname: option.props.children})}}
            >
              {this.state.dataInto.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>)}
            </Select>
            )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`申请时间`} {...formItemLayout}>
            {getFieldDecorator('createDate', {})(
              <RangePicker style={{width: 200}} />
            )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SearchForm = Form.create()(SearchFormWrapper);
class TransferRecord extends PureComponent {
  state = {
    query: '',
    activeKey: '1'
  }
  queryHandle = (query) => {
    this.refs.table.fetch(query);
    this.setState({query});
  }
  callback = (e) => {};
  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'transferGuid',
        width: 50,
        render: (text, record, index) => {
          return (
            <span>
              <Link to={{pathname:`/transfer/transferRecord/details/${record.transferGuid}`}}>详情</Link>
            </span>
          )
        }
      },
      {
        title: '转科单号',
        dataIndex: 'transferNo',
        width: 110,
        sorter: true
      },
      {
        // 一共有三种状态 1.待转科 2.已转科 3.已关闭
        title: '单据状态',
        dataIndex: 'fstate',
        width: 80,
        render: (text, record, index) => {
          if (record.fstate === "00") {
            return <span>待转科</span>;
          } else if (record.fstate === "03") {
            return <span>已转科</span>;
          } else if (record.fstate === "07") {
            return <span>已关闭</span>;
          }
        }
      },
      {
        title: '申请时间',
        dataIndex: 'createDate',
        width: 130
      },
      {
        title: '申请人',
        dataIndex: 'createUserName',
        width: 80
      },
      {
        title: '转出科室',
        dataIndex: 'outDeptName',
        width: 130
      },
      {
        title: '转入科室',
        dataIndex: 'inDeptName',
        width: 200
      },
      {
        title: '转科日期',
        dataIndex: 'transferDate',
        width: 150
      },
      {
        title: '转科原因',
        dataIndex: 'transferCause',
        width: 150
      },
    ]
    const query = this.state.query;
    return (
      <Content>
        {/* 转科记录查询部分 */}
        <Card bordered={false} className="min_card">
          <SearchForm query={this.queryHandle} activeKey={this.state.activeKey}/>
        </Card>
        <Card>
          <Tabs defaultActiveKey="1" onChange={(activeKey) =>{this.setState({activeKey: activeKey})}} animated={false}>
            <TabPane tab="转出科室" key="1">
              <RemoteTable
                query={query}
                showHeader={true}
                ref='table'
                url={transfer.getSelectTransferList}
                scroll={{x: '140%', y : document.body.clientHeight - 110 }}
                columns={columns}
                size="small"
                rowKey={'transferGuid'}
                style={{marginTop: 10}}
              />
            </TabPane>
            <TabPane tab="转入科室" key="2">
              <RemoteTable
                query={query}
                showHeader={true}
                ref='table'
                url={transfer.getSelectTransferList}
                scroll={{x: '140%', y : document.body.clientHeight - 110 }}
                columns={columns}
                size="small"
                rowKey={'transferGuid'}
                style={{marginTop: 10}}
              />
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    )
  }
}
export default TransferRecord;