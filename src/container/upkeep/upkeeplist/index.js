/**保养登记--列表*/
import React from 'react';
import { Row, Col, Input, Layout , Popover} from 'antd';
import TableGrid from '../../../component/tableGrid';
import assets from '../../../api/assets';
import { upkeepState , upkeepMainTainType ,upkeepStateSel } from '../../../constants';
import { Link } from 'react-router-dom';
import { timeToStamp } from '../../../utils/tools';
import './styles.css';
const Search = Input.Search;
const { Content } = Layout;
const { RemoteTable } = TableGrid;

const sortTime = (a,b,key) =>{
  if(a[key] && b[key]){
    return timeToStamp(a[key]) - timeToStamp(b[key])
  }
}
const columns=[
  { title: '操作', 
  dataIndex: 'maintainGuid', 
  key: 'x', 
  className:'col05',
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
    className:'col-1',
    dataIndex: 'maintainNo',
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '保养单状态',
    dataIndex: 'fstate',
    className:'col08',
    key: 'fstate',
    filters: upkeepStateSel,
    onFilter: (value, record) => (record && record.fstate===value),
    render: text => 
      <div><span style={{marginRight:5,backgroundColor:upkeepState[text].color ,width:10,height:10,borderRadius:'50%',display:'inline-block'}}></span>
      { upkeepState[text].text }
      </div>
      
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    className:'col-1',
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
    title: '保养类型',
    className:'col05',
    dataIndex: 'maintainType',
    render: text => <span>{upkeepMainTainType[text].text}</span>
  },
  {
    title: '本次计划保养时间',
    className:'col-1',
    dataIndex: 'maintainPlanDate',
    sorter: (a, b) => sortTime(a,b,'maintainPlanDate'),
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '保养开始时间',
    className:'col-1',
    dataIndex: 'maintainDate',
    sorter: (a, b) => sortTime(a,b,'maintainDate'),
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '保养结束时间',
    className:'col-1',
    dataIndex: 'endMaintainDate',
    sorter: (a, b) => sortTime(a,b,'endMaintainDate'),
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '保养计划单号',
    className:'col12',
    dataIndex: 'maintainPlanNo',
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '下次保养时间',
    className:'col-1',
    dataIndex: 'nextMaintainDate',
    sorter: (a, b) => (sortTime(a,b,'nextMaintainDate')),
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '操作员',
    className:'col-1',
    dataIndex: 'modifyUserName',
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  }
]
class UpKeepList extends React.Component{

    state = {
      query:'',
    };
    
    queryHandler = (query) => {
      this.refs.table.fetch(query);
      this.setState({ query })
    }
    handleChange = (pagination, filters, sorter)=>{
    }
    render(){
        
        return(
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
              <Row>
                  <Col span={12}>
                  <Search
                      placeholder="请输入保养单号/资产名称/资产编码"
                      onSearch={value =>  {this.queryHandler({'maintainNo':value})}}
                      style={{ width: 400 }}
                      enterButton="搜索"
                  />
                  </Col>
              </Row>
              <RemoteTable
                  ref='table'
                  query={this.state.query}
                  url={assets.selectMaintainOrderList}
                  scroll={{x: '160%', y : document.body.clientHeight - 110 }}
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