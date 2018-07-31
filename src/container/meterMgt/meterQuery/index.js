/*计量查询- 首页 - 列表页*/
import React , { Component } from 'react';
import { Layout, Card, Form, Row, Col, Input, Button, Icon, Select, DatePicker ,} from 'antd';
import tableGrid from '../../../component/tableGrid';
import { Link } from 'react-router-dom';
// import moment from 'moment';
// import request from '../../../utils/request';
// import querystring from 'querystring';
import meterStand from '../../../api/meterStand'
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const { RemoteTable } = tableGrid

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

class SearchFormWrapper extends Component {
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
  }
  // 转入科室
  handleChangeInto = (deptName) => {
    this.setState({ deptName });
  }
  render() {
    const { display } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      // 转科记录查询部分
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col span={8}>
            <FormItem label={`资产名称`} {...formItemLayout}>
              {getFieldDecorator('equipmentStandardName', {})(
                <Input placeholder="请输入资产名称" style={{width: 200}} />
              )}
            </FormItem>
          </Col>
          <Col span={8} >
            <FormItem label={`使用科室`} {...formItemLayout}>
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
            <FormItem label={`检测日期`} {...formItemLayout}>
              {getFieldDecorator('createDate', {})(
                <RangePicker style={{width: 200}} />
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`计量检测编号`} {...formItemLayout}>
              {getFieldDecorator('jiliangjiancebainhao', {})(
                <Input placeholder="请输入计量检测编号" style={{width: 200}} />
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`检测结果`} {...formItemLayout}>
              {getFieldDecorator('inDeptguid', {
                initialValue:""
              })(
              <Select style={{width: 200}}
              onSelect={(val, option) => this.setState({inDeptguid: val, inDeptName: option.props.children})}
              >
                <Option value="01" key="01">合格</Option>
                <Option value="00" key="00">不合格</Option>
              </Select>
              )}
            </FormItem>
          </Col>
          
        </Row>
      </Form>
    )
  }
}
const SearchForm = Form.create()(SearchFormWrapper);


class MeterQuery extends Component{
  state={
    query:'',
    selectedRowKeys:[],//勾选数据的条数
    selectedRows:[],//勾选数据的具体信息
  }

  render(){
    const columns = [
      {
        title:'序号',
        dataIndex: 'index', 
        width:50,
        render: (text, record, index) => {
          return `${index+1}`
        }
      },
      {
        title: '操作',
        dataIndex: 'transferGuid',
        width:50,
        render: (text, record, index) => {
            return (
              <span><Link to={{pathname:`/meterMgt/meterQuery/details/${record.assetsRecordGuid}`}}>详情</Link></span>
            )
        }
      },
      {
        title: '计量检测编号',
        width:200,
        dataIndex: 'assetsRecordGuid',
      },
      {
        title: '资产名称',
        dataIndex: 'zichanmingc',
        width:120,
      },
      {
        title: '型号',
        dataIndex: 'xinghao',
        width:120,
      },
      {
        title: '规格',
        dataIndex: 'desp',
        width:120,
      },
      {
        title: '使用科室',
        dataIndex: 'outDeptName',
        width:120,
      },
      {
        title: '检测日期',
        dataIndex: 'createUserName',
        width:120,
      },
      {
        title: '下次待检日期',
        dataIndex: 'createDate',
        width:120,
      },
      {
        // --状态 00合格 03不合格 07已关闭 
        title: '检测结果',
        dataIndex: 'fstate',
        width:120,
        render: (text, record, index) => {
          if (record.fstate === "00") {
            return <span>合格</span>;
          } else if (record.fstate === "03") {
            return <span>不合格</span>;
          }
        }
      },{
        title: '计量编号',
        width:200,
        dataIndex: 'jiliangbainhaoa',
      },
      
    ]
    const { query } = this.state;
    return(
      <Content>
        <Card bordered={false} className="min_card" >
          <SearchForm query={this.queryHandle} />
        </Card>
        <Card>
          <RemoteTable
            query={query}
            showHeader={true}
            ref='table'
            url={meterStand.planList}
            scroll={{x: '120%', y : document.body.clientHeight - 110 }}
            columns={columns}
            size="small"
            rowKey={'RN'}
            style={{marginTop: 10}}
          />
        </Card>
      </Content>
    )
  }
}
export default MeterQuery ;
