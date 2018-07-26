/**
 * 维修记录列表
 */ 
import React, { Component } from 'react';
import { Row,Col,Input,Icon, Form , Layout , Button , DatePicker ,  } from 'antd';
import moment from 'moment';
import TableGrid from '../../../component/tableGrid';
import { Link, withRouter } from 'react-router-dom';
import assets from '../../../api/assets';
import { connect } from 'react-redux';
import { repairCommonDataSource } from '../../../constants'
import { repairRecord } from '../../../service';
const { Content } = Layout;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { RemoteTable } = TableGrid;
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

class SearchFormWrapper extends React.Component {
  state = {
    display: 'none',
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
        values.startTime=moment(values.Time[0]).format('YYYY-MM-DD');
        values.endTime=moment(values.Time[1]).format('YYYY-MM-DD');
        delete values['Time'];
      }
      console.log(values)
      this.props.query(values);
    });
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }

  render() {
    const { display } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      // 转科记录查询部分
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col span={6}>
            <FormItem label={`资产编号`} {...formItemLayout}>
              {getFieldDecorator('assetsRecord')(
                <Input placeholder="请输入资产编号" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={`资产名称`} {...formItemLayout}>
              {getFieldDecorator('equipmentStandardName')(
                <Input placeholder="请输入资产名称" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={`维修单号`} {...formItemLayout}>
              {getFieldDecorator('repairOrderNo')(
                <Input placeholder="请输入维修单号"/>
              )}
            </FormItem>
          </Col>

          <Col span={6} style={{ textAlign: 'right', marginTop: 4}} >
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{marginLeft: 30}} onClick={this.handleReset}>重置</Button>
            <a style={{marginLeft: 30, fontSize: 14}} onClick={this.toggle}>
              {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
        <Row>
          <Col span={6}  style={{display: display}}> 
            <FormItem
              {...formItemLayout}
              label="维修时间"
            >
              {getFieldDecorator('Time')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
          <Col span={6}  style={{display: display}}> 
            <FormItem
              label="维修总费用"
              {...formItemLayout}
            >
              <Col span={11}>
                <FormItem>
                  {getFieldDecorator('actualPriceLeast')(
                    <Input type='number'/>
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                  -
                </span>
              </Col>
              <Col span={11}>
                <FormItem>
                  {getFieldDecorator('actualPriceMax')(
                    <Input type='number'/>
                  )}
                </FormItem>
              </Col>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SearchForm = Form.create()(SearchFormWrapper);


class RepairRecordList extends Component {
  queryHandler = (query) => {
    this.refs.table.fetch(query);
    this.setState({ query });
    this.props.setRepairRecordSearch(['searchCondition'], {
      ...query
    })
  }
  
  render() {
    const { repairRecord } = this.props;
    const columns = [
      {
        title: '',
        dataIndex: 'RN',
        width: 30,
        render: (text, record, index) => index + 1
      },
      {
        title: '操作',
        dataIndex: 'rrpairOrderGuid',
        width: 80,
        render: (text, record) => 
          <Link to={{pathname: `/repairMgt/repairRecord/${record.rrpairOrderGuid}`}}>
            <Icon type="profile" style={{marginRight: 5}}/>
            详情
          </Link>
      },
      ...repairCommonDataSource,
      {
        title: '维修员',
        dataIndex: 'inRrpairUsername',
        width: 100
      },
      {
        title: '维修时间',
        dataIndex: 'callTime',
        width: 130
      }
    ];
    const defaultParams = repairRecord.searchCondition ? repairRecord.searchCondition.params : null;
    return (
        <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
          <SearchForm query={ value =>  this.queryHandler({...value,menuFstate:"repairRecord"}) }></SearchForm>
          {/*
            <Row>

              <Col span={12}>
                <Search
                  placeholder="请输入维修单号/资产编号/资产名称"
                  enterButton="搜索"
                  defaultValue={ defaultParams }
                />
              </Col>
            </Row>
          */}
          <RemoteTable
            query={{
              params: defaultParams,
              menuFstate:"repairRecord"
            }}
            ref='table'
            showHeader={true}
            url={assets.selectRrpairList}
            scroll={{x: '150%', y : document.body.clientHeight - 311 }}
            columns={columns}
            rowKey={'RN'}
            style={{marginTop: 10}}
            size="small"
          /> 
        </Content>
    )
  }
}
export default withRouter(connect(state => state, dispatch => ({
  setRepairRecordSearch: (nestKeys, value) => dispatch(repairRecord.setRepairRecordSearch(nestKeys, value)),
}))(RepairRecordList));