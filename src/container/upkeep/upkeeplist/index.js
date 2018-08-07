/*
 * @Author: yuwei 保养工单
 * @Date: 2018-07-26 11:30:17 
* @Last Modified time: 2018-07-26 11:30:17 
 */
import React from 'react';
import { Row, Col, Input, Button , Form , Icon , DatePicker , Layout , Popover} from 'antd';
import TableGrid from '../../../component/tableGrid';
import assets from '../../../api/assets';
import { upkeepState , upkeepMainTainType ,upkeepStateSel } from '../../../constants';
import { Link } from 'react-router-dom';
import { timeToStamp } from '../../../utils/tools';
// import './styles.css';
import moment from 'moment';
const { Content } = Layout;
const { RemoteTable } = TableGrid;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const sortTime = (a,b,key) =>{
  if(a[key] && b[key]){
    return timeToStamp(a[key]) - timeToStamp(b[key])
  }
}
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
const columns=[
  { title: '操作', 
  dataIndex: 'maintainGuid', 
  key: 'x', 
  width:120,
  render: (text,record) =>
    <span>
      { (record.fstate==="00") ? 
        <span><Link to={{pathname:`/upkeep/UpKeepDetail/finish/${record.maintainGuid}`}}>完成</Link></span>
        :<span><Link to={{pathname:`/upkeep/UpKeepDetail/details/${record.maintainGuid}`}}>详情</Link></span>
      }
    </span>
  },
  {
    title: '保养单号',
    dataIndex: 'maintainNo',
    width:150,
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '保养单状态',
    dataIndex: 'fstate',
    key: 'fstate',
    width:150,
    filters: upkeepStateSel,
    onFilter: (value, record) => (record && record.fstate===value),
    render: text => 
      <div><span style={{marginRight:5,backgroundColor:upkeepState[text].color ,width:10,height:10,borderRadius:'50%',display:'inline-block'}}></span>
      { upkeepState[text].text }
      </div>
      
  },
  {
    title: '设备名称',
    width:150,
    dataIndex: 'equipmentName',
    render:(text,record) =>
      <Popover  content={
        <div style={{padding:20}}>
          <p>设备名称：{record.equipmentName}</p>
          <p>操作员：{record.modifyUserName}</p>
          <p>保养单状态：{upkeepState[record.fstate].text}</p>
        </div>
      }>
        {text}
      </Popover>
  },
  {
    title: '资产编号',
    width:150,
    dataIndex: 'assetsRecord'
  },
  {
    title: '保养类型',
    width:150,
    dataIndex: 'maintainType',
    render: text => <span>{upkeepMainTainType[text].text}</span>
  },
  {
    title: '本次计划保养时间',
    width:150,
    dataIndex: 'maintainPlanDate',
    sorter: (a, b) => sortTime(a,b,'maintainPlanDate'),
    render(text, record) {
      return <span title={text}>{text?text.substr(0,11):''}</span>
    }
  },
  {
    title: '保养开始时间',
    width:150,
    dataIndex: 'maintainDate',
    sorter: (a, b) => sortTime(a,b,'maintainDate'),
    render(text, record) {
      return <span title={text}>{text?text.substr(0,11):''}</span>
    }
  },
  {
    title: '保养结束时间',
    width:150,
    dataIndex: 'endMaintainDate',
    sorter: (a, b) => sortTime(a,b,'endMaintainDate'),
    render(text, record) {
      return <span title={text}>{text?text.substr(0,11):''}</span>
    }
  },
  {
    title: '保养计划单号',
    width:150,
    dataIndex: 'maintainPlanNo',
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '下次保养时间',
    width:150,
    dataIndex: 'nextMaintainDate',
    sorter: (a, b) => (sortTime(a,b,'nextMaintainDate')),
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '操作员',
    width:150,
    dataIndex: 'modifyUserName',
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  }
]

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
      if(values.PlanTime){
        values.startPlanTime=moment(values.PlanTime[0]).format('YYYY-MM-DD');
        values.endPlanTime=moment(values.PlanTime[1]).format('YYYY-MM-DD');
        delete values['PlanTime'];
      }
      if(values.UpkeepTime){
        values.startUpkeepTime=moment(values.UpkeepTime[0]).format('YYYY-MM-DD');
        values.endUpkeepTime=moment(values.UpkeepTime[1]).format('YYYY-MM-DD');
        delete values['UpkeepTime'];
      }
      if(values.UpkeepEndTime){
        values.startUpkeepEndTime=moment(values.UpkeepEndTime[0]).format('YYYY-MM-DD');
        values.endUpkeepEndTime=moment(values.UpkeepEndTime[1]).format('YYYY-MM-DD');
        delete values['UpkeepEndTime'];
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
              {getFieldDecorator('assetsRecord', {})(
                <Input placeholder="请输入资产编号" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={`资产名称`} {...formItemLayout}>
              {getFieldDecorator('equipmentStandardName', {})(
                <Input placeholder="请输入资产名称" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={`保养单号`} {...formItemLayout}>
              {getFieldDecorator('upkeepNo', {})(
                <Input placeholder="请输入保养单号"/>
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
              label="保养开始时间"
            >
              {getFieldDecorator('UpkeepTime')(
                <RangePicker allowClear={false}/>
              )}
            </FormItem>
          </Col>
          <Col span={6}  style={{display: display}}> 
            <FormItem
              {...formItemLayout}
              label="保养结束时间"
            >
              {getFieldDecorator('UpkeepEndTime')(
                <RangePicker allowClear={false}/>
              )}
            </FormItem>
          </Col>
          <Col span={9}  style={{display: display}}> 
            <FormItem
              {...formItemLayout}
              label="本次计划保养时间"
            >
              {getFieldDecorator('PlanTime')(
                <RangePicker allowClear={false}/>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SearchForm = Form.create()(SearchFormWrapper);

class UpKeepList extends React.Component{

    state = {
      query:'',
    };
    queryHandler = (query) => {
      debugger
      this.refs.table.fetch(query);
      this.setState({ query })
    }
    handleChange = (pagination, filters, sorter)=>{
    }
    render(){
        return(
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
              <SearchForm query={(query)=>this.queryHandler(query)}></SearchForm>
              <RemoteTable
                  ref='table'
                  query={this.state.query}
                  url={assets.selectMaintainOrderList}
                  scroll={{x: '200%', y : document.body.clientHeight - 110 }}
                  columns={columns}
                  rowKey={'maintainGuid'}
                  showHeader={true}
                  style={{marginTop: 10}}
                  size="small"
              /> 
            </Content>
        )
    }
}

export default UpKeepList;