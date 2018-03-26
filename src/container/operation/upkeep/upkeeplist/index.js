/**保养登记--列表*/
import React from 'react';
import { Row, Col, Input, Layout} from 'antd';
import TableGrid from '../../../../component/tableGrid';
import assets from '../../../../api/assets';
import { upkeepState , upkeepMainTainType } from '../../../../constants';
import { Link } from 'react-router-dom';
const Search = Input.Search;
const { Content } = Layout;
const { RemoteTable } = TableGrid;

class UpKeepList extends React.Component{

    state={
      query:''
    }

    queryHandler = (query) => {
      this.refs.table.fetch(query);
      this.setState({ query })
    }
    render(){
        const columns=[
					{ title: '操作', 
					dataIndex: 'maintainGuid', 
          key: 'x', 
          width:30,
          render: (text,record) =>
						<span>
							{ (record.fstate==="00") ? 
                <span><Link to={{pathname:`/operation/upkeep/UpKeepDetail/finish/${record.maintainGuid}`,state: record }}>完成</Link></span>
                :<span><Link to={{pathname:`/operation/upkeep/UpKeepDetail/details/${record.maintainGuid}`,state: record }}>详情</Link></span>
							}
						</span>
					},
					{
            title: '保养单号',
            width:50,
            dataIndex: 'maintainNo',
          },
          {
            title: '保养单状态',
            dataIndex: 'fstate',
            width:50,
            key: 'fstate',
            sorter:true,
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
          },
          {
            title: '保养结束时间',
            width:50,
            dataIndex: 'endMaintainDate',
          },
          {
            title: '下次保养时间',
            width:50,
            dataIndex: 'nextMaintainDate',
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
              /> 
            </Content>
        )
    }
}

export default UpKeepList;