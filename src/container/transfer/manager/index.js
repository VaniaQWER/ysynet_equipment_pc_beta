/**
 * @file 资产转科 - 转科管理
 * @author Vania
 * @since 2018-04-08
 */
import React, { PureComponent } from 'react';
import { Layout, Card, Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import tableGrid from '../../../component/tableGrid';
import { Link } from 'react-router-dom';
import transfer from '../../../api/transfer';
import request from '../../../utils/request';
import querystring from 'querystring';

const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const { RemoteTable } = tableGrid

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
// 转出转入科室
let timeout;
let currentValueRollOut;
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
class SearchFormWrapper extends PureComponent {
  state = {
    display: 'none',
    deptNameData: [],// 转出科室保存数据
    IntodeptNameData: [],// 转入科室保存数据
    deptName: '',// 转入转出科室
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
  render() {
    const { display } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      // 转科记录查询部分
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col span={8}>
            <FormItem label={`资产编码`} {...formItemLayout}>
            {getFieldDecorator('assetsRecord', {})(
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
              onSearch={this.handleChangeRollOut}
              defaultActiveFirstOption={false}
              showArrow={false}
              allowClear={true}
              filterOption={false}
              style={{width: 200}}
              onSelect={(val,option)=>{this.setState({ outDeptguid:val, outDeptname: option.props.children })}}
              placeholder={`请搜索选择转出科室`}
            >
              {this.state.deptNameData.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>)}
            </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`转入科室`} {...formItemLayout}>
              {getFieldDecorator('inDeptguid', {})(
              <Select
              showSearch
              onSearch={this.handleChangeInto}
              defaultActiveFirstOption={false}
              showArrow={false}
              allowClear={true}
              filterOption={false}
              style={{width: 200}}
              placeholder={`请搜索选择转入科室`}
              onSelect={(val, option) => this.setState({inDeptguid: val, inDeptName: option.props.children})}
              >
                {this.state.IntodeptNameData.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>)}
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

class TransferManager extends PureComponent {
  state = {
    query: '',
  }
  queryHandle = (query) => {
    this.refs.table.fetch(query);
    this.setState({query});
  }
  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'transferGuid',
        width: 80,
        render: (text, record, index) => {
          if (record.fstate === "00") {
            return (
              <span><Link to={{pathname:`/transfer/transferManager/edit/${record.transferGuid}`}}>转科</Link></span>
            )
          } else {
            return (
              <span><Link to={{pathname:`/transfer/transferManager/details/${record.transferGuid}`}}>详情</Link></span>
            )
          }
          
        }
      },
      {
        title: '转科单号',
        dataIndex: 'transferNo',
        width: 150,
        sorter: true
      },
      {
        // --状态 00待转科 03已转科 07已关闭 
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
        width: 150
      },
      {
        title: '申请人',
        dataIndex: 'createUserName',
        width: 100
      },
      {
        title: '转出科室',
        dataIndex: 'outDeptName',
        width: 140
      },
      {
        title: '转入科室',
        dataIndex: 'inDeptName',
        width: 230
      },
      {
        title: '转科日期',
        dataIndex: 'transferDate',
        width: 150
      },
      {
        title: '转科原因',
        dataIndex: 'transferCause',
        width: 200
      },
    ]
    const query = this.state.query;
    return (
      <Content>
        <Card bordered={false} className="min_card" >
          <SearchForm query={this.queryHandle} />
        </Card>
        <Card style={{marginTop: 4}} >
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
        </Card>
      </Content>
    )
  }
}
export default TransferManager;