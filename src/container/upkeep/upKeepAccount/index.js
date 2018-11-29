/**
 * @file 保养管理 保养台账
 */
import React from 'react';
import { message , Row, Col, Input, Layout, Form, Select, Button, Badge } from 'antd';
import { upkeepPlanLoopFlag , upkeepPlanStateSel ,upkeepPlanState , upkeepMainTainType } from '../../../constants';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { search } from '../../../service';
import TableGrid from '../../../component/tableGrid';
import upkeep from '../../../api/upkeep';
import querystring from 'querystring';
import request from '../../../utils/request';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { Option } = Select;
const { Content } = Layout;
const { RemoteTable } = TableGrid;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class SearchForm extends React.Component{
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={48}>
          <Col span={6}>
            <FormItem {...formItemLayout} label={`资产名称`}>
              {
                getFieldDecorator(`equipmentStandardName`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入'/>
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label={`资产编号`}>
              {
                getFieldDecorator(`assetsRecord`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入'/>
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label={`保养模式`}>
              {
                getFieldDecorator(`maintainModule`,{
                  initialValue: ''
                })(
                  <Select placeholder='请选择'>
                    <Option value=''>请选择</Option>
                    <Option value='00'>模式一</Option>
                    <Option value='01'>模式二</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType='submit'>查询</Button>
            <Button style={{marginLeft: 5, marginRight: 25}} onClick={()=> this.handleReset }>重置</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

const SearchFormWapper = Form.create()(SearchForm);

class UpkeepAccount extends React.Component{

  constructor(props){
    super(props);
      /* 设置redux前置搜索条件 */
      const { search, history } = this.props;
      const pathname = history.location.pathname;
      this.state = {
        query:search[pathname]?{...search[pathname]}:{},
        record:{},
      };
    }

   /* 回显返回条件 */
   async componentDidMount () {
    const { search, history } = this.props;
    const pathname = history.location.pathname;
    console.log(search[pathname])
    if (search[pathname]) {
      //找出表单的name 然后set
      let value = {};
      let values = this.form.props.form.getFieldsValue();
      values = Object.getOwnPropertyNames(values);
      values.map(keyItem => {
        value[keyItem] = search[pathname][keyItem];
        return keyItem;
      });
      this.form.props.form.setFieldsValue(value)
    }
  }
  /* 查询时向redux中插入查询参数 */
  searchTable = (val) => {
    /* 存储搜索条件 */
    const { setSearch, history ,search } = this.props;
    const pathname = history.location.pathname;
    let values = Object.assign({...search[pathname]},{...val})
    setSearch(pathname, values);
    this.refs.table.fetch(val)
  }
  /* 记录table过滤以及分页数据 */
  changeQueryTable = (values) =>{
    const { setSearch, history ,search} = this.props;
    values = Object.assign({...search[history.location.pathname]},{...values})
    setSearch(history.location.pathname, values);
  }
  stopUse = (record,index) =>{
    console.log(record,index)
  }

  render(){
    let columns = [
      {
        title: '资产名称',
        dataIndex: 'equipmentStandardName',
        width: 168,
        render:(text,record) => <span><Link to={{ pathname: `/upkeep/upKeepAccount/edit/${record.maintainPlanDetailId}` }}>{text}</Link></span>
          
      },
      {
        title: "资产编号",
        dataIndex: 'assetsRecord',
        width: 120
      },
      {
        title: "状态",
        dataIndex: 'fstate',
        width: 80,
        filters:upkeepPlanStateSel,
        onFilter: (value, record) => (record && record.fstate===value),
        render: text => text
         
      },
      {
        title: '保养模式',
        dataIndex: 'maintanModule',
        width: 80,
      },
      {
        title: '保养执行科室',
        dataIndex: 'maintainDeptName',
        width: 110,
        render: text => <span title={text}>{text}</span>
      },
      {
        title: "最近保养时间",
        dataIndex: 'lastMaintainTime',
        width: 110
      },
      {
        title: '循环方式',
        dataIndex: "loopFlag",
        width: 80,
        render: text => <span title={text}>{upkeepPlanLoopFlag[text].text}</span>
      },
      {
        title: '操作员',
        dataIndex: 'executeUsername',
        width: 100,
        render: text => <span title={text}>{text}</span>
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 110,
        render: text => <span title={text}>{text}</span>
      },
      {
        title: "操作",
        width: 80,
        dataIndex: 'action',
        render: (text,record,index) => <a onClick={() => this.stopUse(record,index)}>停用</a>
      }
    ]
    return (
      <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20,backgroundColor:'none'}}>
        <SearchFormWapper 
          query={(val)=>this.searchTable(val)} 
          wrappedComponentRef={(form) => this.form = form}
        />
        <div>
          <Link to={{ pathname: '/upkeep/upKeepAccount/newAdd' }}><Button type='primary'>新增台账</Button></Link>
        </div>
        <RemoteTable
          ref='table'
          query={this.state.query}
          onChange={this.changeQueryTable}
          url={upkeep.selectMaintainParameterList}
          scroll={{x: '120%', y : document.body.clientHeight - 110 }}
          columns={columns}
          rowKey={'maintainPlanDetailId'}
          showHeader={true}
          style={{marginTop: 10}}
          size="small"
      /> 
      </Content>
    )
  }
}
export default withRouter(connect(state => state, dispatch => ({
  setSearch: (key, value) => dispatch(search.setSearch(key, value)),
  // clearSearch:(key, value) => dispatch(search.clearSearch(key, value)),
}))(UpkeepAccount));
