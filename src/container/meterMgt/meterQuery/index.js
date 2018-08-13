/*计量查询- 首页 - 列表页*/
import React , { Component } from 'react';
import { Layout, Form, Row, Col, Input, Button, Icon, Select, DatePicker ,} from 'antd';
import tableGrid from '../../../component/tableGrid';
import queryString from 'querystring';
import { Link } from 'react-router-dom';
import {timeToStamp} from '../../../utils/tools';
// import moment from 'moment';
import request from '../../../utils/request';
import meterStand from '../../../api/meterStand';
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
    useDeptData: [],   //使用科室保存数据
    mgtDeptData: [],  //管理科室保存数据
  }
  toggle = () => {
    const { display } = this.state;
    this.setState({
      display: display === 'none' ? 'block' : 'none'
    })
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let {detecDate} = values;
      detecDate = detecDate === undefined ? '' : detecDate;
      if(detecDate.length>0) {
        values.startTime = detecDate[0].format('YYYY-MM-DD');
        values.endTime = detecDate[1].format('YYYY-MM-DD');
      }else {
        values.startTime = '';
        values.endTime = '';
      }
      delete values.detecDate;
      this.props.query(values);
    });
 }
  componentDidMount() {
    request(meterStand.selectUseDeptList, {   //使用科室
      bady: queryString.stringify({deptType: "00"}),
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        if(data.status) {
          this.setState({ useDeptData: data.result });
        }
      },
      error: (err) => console.log(err)
    });
    request(meterStand.mgtDeptList, {     //管理科室
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        if(data.status) {
          this.setState({ mgtDeptData: data.result });
        }
      },
      error: (err) => console.log(err)
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
      // 转科记录查询部分
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col span={8}>
            <FormItem label={`资产名称`} {...formItemLayout}>
              {getFieldDecorator('assetName', {})(
                <Input placeholder="请输入资产名称" style={{width: 200}} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={`资产编号`} {...formItemLayout}>
              {getFieldDecorator('assetsRecord', {})(
                <Input placeholder="请输入资产编号" style={{width: 200}} />
              )}
            </FormItem>
          </Col>
          <Col span={8}  style={{display: display}} >
            <FormItem label={`管理科室`} {...formItemLayout}>
              {getFieldDecorator('bDeptId', {})(
              <Select
                showSearch
                onSearch={this.handleChangeMagtDept}
                defaultActiveFirstOption={false}
                showArrow={false}
                allowClear={true}
                filterOption={false}
                style={{width: 200}}
                placeholder={`请搜索选择管理科室`}
              >
                {this.state.mgtDeptData.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>)}
              </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}  style={{display: display}} >
            <FormItem label={`使用科室`} {...formItemLayout}>
              {getFieldDecorator('useDeptId', {})(
              <Select
                showSearch
                onSearch={this.handleChangeUseDept}
                defaultActiveFirstOption={false}
                showArrow={false}
                allowClear={true}
                filterOption={false}
                style={{width: 200}}
                placeholder={`请搜索选择转出科室`}
              >
                {this.state.useDeptData.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>)}
              </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`检定日期`} {...formItemLayout}>
              {getFieldDecorator('detecDate', {})(
                <RangePicker style={{width: 200}} />
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`检测结果`} {...formItemLayout}>
              {getFieldDecorator('results', {
                initialValue:""
              })(
              <Select style={{width: 200}}
              >
                <Option value="" key="">全部</Option>
                <Option value="00" key="00">合格</Option>
                <Option value="01" key="01">不合格</Option>
              </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'right', marginTop: 4, float: 'right'}} >
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
            <a style={{marginLeft: 8, fontSize: 14}} onClick={this.toggle}>
              {this.state.display === 'block' ? '收起' : '展开'} <Icon type={this.state.display === 'block' ? 'up' : 'down'} />
            </a>
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

  queryHandle = (query) => {
    for (const key in query) {
      query[key] = query[key] === undefined? '' : query[key];
    };
    this.setState({ query }, ()=>{ this.refs.table.fetch() });
  }

  nextMeasureDate = (a, b) => {
    return timeToStamp(a.nextMeasureDate) - timeToStamp(b.nextMeasureDate);
  }

  sortTime = (a, b) => {
    return timeToStamp(a.measureDate) - timeToStamp(b.measureDate);
  }

  render(){
    const columns = [
      {
        title: '计量检测编号',
        width: 200,
        dataIndex: 'recordNo',
        render: (text, record) => <Link to={{ pathname: `/meterMgt/meterQuery/details/${record.recordInfoGuid}` }}>{text}</Link>
      },
      {
        title: '资产名称',
        dataIndex: 'equipmentName',
        width: 120,
      },
      {
        title: '资产编号',
        dataIndex: 'assetsRecord',
        width: 200
      },
      {
        title: '型号',
        dataIndex: 'fmodel',
        width: 120,
      },
      {
        title: '规格',
        dataIndex: 'spec',
        width: 120,
      },
      {
        title: '使用科室',
        dataIndex: 'useDeptName',
        width: 120,
      },
      {
        title: '检测日期',
        dataIndex: 'measureDate',
        width: 200,
        sorter: (a, b) => this.sortTime(a,b)
      },
      {
        title: '下次待检日期',
        dataIndex: 'nextMeasureDate',
        width: 200,
        sorter: (a, b) => this.nextMeasureDate(a,b)
      },
      {
        // --状态 00合格 01不合格
        title: '检测结果',
        dataIndex: 'results',
        width:120,
        render: (text, record, index) => {
          if (record.results === "00") {
            return <span>合格</span>;
          } else if (record.results === "01") {
            return <span>不合格</span>;
          }
        }
      }
    ]
    const { query } = this.state;
    return(
      <Content className='ysynet-content ysynet-common-bgColor' style={{padding:24}}>
        <SearchForm query={this.queryHandle} />
        <RemoteTable
          query={query}
          showHeader={true}
          ref='table'
          url={meterStand.meterRecordInfoList}
          pagination={{
            size: 'small',
            showTotal: (total, range) => `总共${total}个项目`
          }}
          scroll={{x: '120%', y : document.body.clientHeight - 110 }}
          columns={columns}
          size="small"
          rowKey={'RN'}
          style={{marginTop: 10}}
        />
      </Content>
    )
  }
}
export default MeterQuery ;
