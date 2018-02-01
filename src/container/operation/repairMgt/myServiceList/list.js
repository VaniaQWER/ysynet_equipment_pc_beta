/**
 * 我的维修单
 */
import React, { Component } from 'react';
import { Row, Col, Input, Layout, Icon } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import { Link } from 'react-router-dom';
import assets from '../../../../api/assets';
import { repairCommonDataSource } from '../../../../constants'

const Search = Input.Search;
const { Content } = Layout;
const { RemoteTable } = TableGrid;

class MyServiceList extends Component {
  
  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'RN',
        width: 120,
        render: (text, record) => {
          //return <Link to={'/operation/repairMgt/myServiceList/100'}>详情</Link>
          switch (record.orderFstate) {
            case '10':
              return <Link to={`/operation/repairMgt/myServiceList/orderTaking/${record.rrpairOrderGuid}`}><Icon style={{marginRight: 5}} type="tool" />接修</Link>
            case '30':
              return <Link to={`/operation/repairMgt/myServiceList/complete/${record.rrpairOrderGuid}`}><Icon style={{marginRight: 5}} type="poweroff" />完成</Link>
            default:
              return <Link to={`/operation/repairMgt/myServiceList/detail/${record.rrpairOrderGuid}`}><Icon style={{marginRight: 5}} type="profile" />详情</Link>
          }
        }
      },
      ...repairCommonDataSource,
      {
        title: '故障现象',
        dataIndex: 'inRrpairUsername',
        width: 200
      }];
    return (
        <Content className='ysynet-content ysynet-common-bgColor'>
          <Row>
            <Col span={12}>
              <Search
                placeholder="请输入维修单号/资产编号/资产名称"
                onSearch={value => console.log(value)}
                style={{ width: 300 }}
                enterButton="搜索"
              />
            </Col>
          </Row>
          <RemoteTable
            ref='remote'
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
export default MyServiceList;