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
    dataIndex: ''
  },
  {
    title: '保养开始时间',
    className:'col-1',
    dataIndex: 'maintainDate',
    sorter: (a, b) => this.sortTime(a,b,'maintainDate'),
  },
  {
    title: '保养结束时间',
    className:'col-1',
    dataIndex: 'endMaintainDate',
    sorter: (a, b) => this.sortTime(a,b,'endMaintainDate'),
  },
  {
    title: '保养计划单号',
    className:'col12',
    dataIndex: ''
  },
  {
    title: '下次保养时间',
    className:'col-1',
    dataIndex: 'nextMaintainDate',
    sorter: (a, b) => (this.sortTime(a,b,'nextMaintainDate')),
  },
  {
    title: '操作员',
    className:'col-1',
    dataIndex: 'modifyUserName',
  }
]
class UpKeepList extends React.Component{

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
                      placeholder="请输入保养单号"
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
                  scroll={{x: '100%', y : document.body.clientHeight - 110 }}
                  columns={columns}
                  rowKey={'maintainGuid'}
                  showHeader={true}
                  style={{marginTop: 10}}
                  size="small"
                  onChange={this.handleChange}
              /> 
            </Content>
        )
    }
}

export default UpKeepList;