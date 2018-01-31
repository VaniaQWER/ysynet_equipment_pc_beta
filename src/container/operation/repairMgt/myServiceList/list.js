/**
 * 我的维修单
 */
import React, { Component } from 'react';
import { Row, Col, Input, Icon, Layout } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import { Link} from 'react-router-dom';
import assets from '../../../../api/assets';
import { repairCommonDataSource } from '../../../../constants'

const Search = Input.Search;
const { Content } = Layout;
const { RemoteTable } = TableGrid;

class MyServiceList extends Component {
  
  handleActions = (record) => {
    switch (record.orderFstate) {
      case "10" :
        return  <span>
                  <Link to={{pathname: `/operation/repairMgt/myServiceList/orderTaking/${record.rrpairOrderGuid}`}}>
                    <Icon type="solution" />接修
                  </Link>
                </span>  
      case "30" :
        return  <span>
                  <Link to={{pathname: `/operation/repairMgt/myServiceList/complete/${record.rrpairOrderGuid}`}}>
                    <Icon type="form" />完成
                  </Link>
                </span>  
      case "60" :
        return <span>
                  <Link to={{pathname: `/operation/repairMgt/myServiceList/${record.rrpairOrderGuid}`}}>
                    <Icon type="form" />详情
                  </Link>
                </span>  
      default:
          break;
    }
  }
  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'RN',
        width: 120,
        render: (text, record) => {
          return this.handleActions(record)
        }
      },
      ...repairCommonDataSource,
      {
        title: '故障现象',
        dataIndex: 'inRrpairUsername',
        width: 100
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
            scroll={{x: '100%', y : document.body.clientHeight - 311 }}
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