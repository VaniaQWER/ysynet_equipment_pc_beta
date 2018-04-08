/**保养登记--列表*/
import React from 'react';
import { Row, Col, Input, Layout , Popover} from 'antd';
import TableGrid from '../../../component/tableGrid';
import upkeep from '../../../api/upkeep';
import './styles.css';  
import { upkeepPlanLoopFlag , upkeepPlanStateSel ,upkeepPlanState , upkeepMainTainType } from '../../../constants';
import { Link } from 'react-router-dom';
import { timeToStamp } from '../../../utils/tools';
const Search = Input.Search;
const { Content } = Layout;
const { RemoteTable } = TableGrid;
const columns=[
  { title: '操作', 
  dataIndex: 'maintainPlanDetailId', 
  className:'col-1',
  key: 'x', 
  render: (text,record) =>
    <span>
      { (record.fstate==="00") ? 
        <span><Link to={{pathname:`/upkeep/planEdit/${record.maintainGuid}`}}>编辑</Link>&nbsp;&nbsp;
        <Link to={{pathname:`/upkeep/UpKeepDetail/details/${record.maintainGuid}`}}>删除</Link>&nbsp;&nbsp;
        <Link to={{pathname:`/upkeep/planEdit/${record.maintainGuid}`}}>执行</Link></span>
        :<span><Link to={{pathname:`/upkeep/planDetail/${record.maintainGuid}`}}>详情</Link></span>
      }
    </span>
  },
  {
    title: '保养计划单号',
    className:'col-1',
    dataIndex: 'maintainPlanNo',
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '计划状态',
    dataIndex: 'fstate',
    className:'col08',
    key: 'fstate',
    filters:upkeepPlanStateSel,
    onFilter: (value, record) => (record && record.fstate===value),
    render: text => 
      <div>
      { upkeepPlanState[text].text }
      </div>
      
  },
  {
    title: '资产名称',
    className:'col-1',
    dataIndex: 'equipmentStandardName',
    render:(text,record) =>
      <Popover  content={
        <div style={{padding:20}}>
          <p>资产名称：{record.equipmentName}</p>
        </div>
      }>
        {text}
      </Popover>
  },
  {
    title: '使用科室',
    className:'col05',
    dataIndex: 'useDept',
    render: text => <span>使用科室</span>
  },
  {
    title: '保养类型',
    className:'col05',
    dataIndex: 'maintainType',
    render: text => <span>{upkeepMainTainType[text].text}</span>
  },
  {
    title: '上次保养时间',
    className:'col08',
    dataIndex: 'lastMaintainDate',
    sorter: (a, b) => this.sortTime(a,b,'maintainDate'),
  },
  {
    title: '计划保养时间',
    className:'col08',
    dataIndex: 'maintainDate',
    sorter: (a, b) => this.sortTime(a,b,'endMaintainDate'),
  },
  {
    title: '循环方式',
    className:'col08',
    dataIndex: 'loopFlag',
    render: text => <span>{upkeepPlanLoopFlag[text].text}</span>
  },
  {
    title: '循环周期',
    className:'col08',
    dataIndex: 'tfCycle',
  },
  {
    title: '操作员',
    className:'col-1',
    dataIndex: 'executeUsername',
  },
  {
    title: '创建时间',
    className:'col-1',
    dataIndex: 'createTime',
  }
]
class MaintainPlan extends React.Component{

    state = {
      query:'',
    };
    sortTime = (a,b,key) =>{
      if(a[key] && b[key]){
        return timeToStamp(a[key]) - timeToStamp(b[key])
      }
    }
    queryHandler = (query) => {
      this.refs.table.fetch(query);
      this.setState({ query })
    }
    render(){
        
        return(
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
              <Row>
                  <Col span={12}>
                  <Search
                      placeholder="请输入计划单号"
                      onSearch={value =>  {this.queryHandler({'maintainNo':value})}}
                      style={{ width: 400 }}
                      enterButton="搜索"
                  />
                  </Col>
              </Row>
              <RemoteTable
                  ref='table'
                  query={this.state.query}
                  url={upkeep.planList}
                  scroll={{x: '100%', y : document.body.clientHeight - 110 }}
                  columns={columns}
                  rowKey={'maintainNo'}
                  showHeader={true}
                  style={{marginTop: 10}}
                  size="small"
                  onChange={this.handleChange}
              /> 
            </Content>
        )
    }
}

export default MaintainPlan;