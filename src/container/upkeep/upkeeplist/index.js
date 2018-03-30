/**保养登记--列表*/
import React from 'react';
import { Row, Col, Input, Layout} from 'antd';
import TableGrid from '../../../component/tableGrid';
import assets from '../../../api/assets';
import { upkeepState , upkeepMainTainType } from '../../../constants';
import { Link } from 'react-router-dom';
import { timeToStamp } from '../../../utils/tools';
const Search = Input.Search;
const { Content } = Layout;
const { RemoteTable } = TableGrid;

class UpKeepList extends React.Component{

    state = {
      query:'',
      filteredInfo: null,
      sortedInfo: null,
    };
    sortTime = (a,b,key) =>{
      if(a[key] && b[key]){
        return timeToStamp(a[key]) - timeToStamp(b[key])
      }
    }
    handleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter);
      this.setState({
        filteredInfo: filters,
      });
    }
    queryHandler = (query) => {
      this.refs.table.fetch(query);
      this.setState({ query })
    }
    render(){
      let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
        const columns=[
					{ title: '操作', 
					dataIndex: 'maintainGuid', 
          key: 'x', 
          width:30,
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
            width:50,
            dataIndex: 'maintainNo',
            render(text, record) {
              return <span title={text}>{text}</span>
            }
          },
          {
            title: '保养单状态',
            dataIndex: 'fstate',
            width:50,
            key: 'fstate',
            filters: [
              { text: '待完成', value: '00' },
              { text: '已完成', value: '01' },
              { text: '已关闭', value: '02' },
            ],
            onFilter: (value, record) => (record && record.fstate===value),
            render: text => 
              <div><span style={{marginRight:5,backgroundColor:upkeepState[text].color ,width:10,height:10,borderRadius:'50%',display:'inline-block'}}></span>
              { upkeepState[text].text }
              </div>
              
          },
          {
            title: '设备名称',
            width:50,
            dataIndex: 'equipmentName',
          },
          {
            title: '保养类型',
            width:30,
            dataIndex: 'maintainType',
            render: text => <span>{upkeepMainTainType[text].text}</span>
          },
          {
            title: '保养开始时间',
            width:50,
            dataIndex: 'maintainDate',
            sorter: (a, b) => (this.sortTime(a,b,'maintainDate')),
            // sortOrder: 'maintainDate' === 'maintainDate' && 'descend',
          },
          {
            title: '保养结束时间',
            width:50,
            dataIndex: 'endMaintainDate',
            sorter: (a, b) => (this.sortTime(a,b,'endMaintainDate')),
          },
          {
            title: '下次保养时间',
            width:50,
            dataIndex: 'nextMaintainDate',
            sorter: (a, b) => (this.sortTime(a,b,'nextMaintainDate')),
          },
          {
            title: '操作员',
            width:20,
            dataIndex: 'modifyUserName',
          }
        ]
        return(
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
              <Row>
                  <Col span={12}>
                  <Search
                      placeholder="请输入保养单号/资产名称/资产编码"
                      onSearch={value =>  {this.queryHandler({'params':value})}}
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