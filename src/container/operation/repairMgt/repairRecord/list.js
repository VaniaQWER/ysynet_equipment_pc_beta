/**
 * 维修记录列表
 */ 
import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import { Link} from 'react-router-dom';
import assets from '../../../../api/assets';
import { repairCommonDataSource } from '../../../../constants'
const { Content } = Layout;
const Search = Input.Search;
const { RemoteTable } = TableGrid;

class RepairRecordList extends Component {


  queryHandler = (query) => {
    this.refs.table.fetch(query);
    this.setState({ query })
  }
  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'RN',
        width: 80,
        render: (text, record) => 
          <Link to={{pathname: `/operation/repairMgt/repairRecord/${record.rrpairOrderGuid}`}}>
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
        dataIndex: 'createDate',
        width: 130
      }
    ];
    return (
        <Content className='ysynet-content ysynet-common-bgColor'>
          <Row>
            <Col span={12}>
              <Search
                placeholder="请输入维修单号/资产编号/资产名称"
                onSearch={value =>  {this.queryHandler({'params':value})}}
                style={{ width: 400 }}
                enterButton="搜索"
              />
            </Col>
          </Row>
          <RemoteTable
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
export default RepairRecordList;