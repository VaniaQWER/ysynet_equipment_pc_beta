/**
 * 维修记录列表
 */ 
import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout } from 'antd';
import TableGrid from '../../../component/tableGrid';
import { Link, withRouter } from 'react-router-dom';
import assets from '../../../api/assets';
import { connect } from 'react-redux';
import { repairCommonDataSource } from '../../../constants'
import { repairRecord } from '../../../service';
const { Content } = Layout;
const Search = Input.Search;
const { RemoteTable } = TableGrid;

class RepairRecordList extends Component {
  queryHandler = (query) => {
    this.refs.table.fetch(query);
    this.setState({ query });
    this.props.setRepairRecordSearch(['searchCondition'], {
      ...query
    })
  }
  
  render() {
    const { repairRecord } = this.props;
    const columns = [
      {
        title: '',
        dataIndex: 'RN',
        width: 30,
        render: (text, record, index) => index + 1
      },
      {
        title: '操作',
        dataIndex: 'rrpairOrderGuid',
        width: 80,
        render: (text, record) => 
          <Link to={{pathname: `/repairMgt/repairRecord/${record.rrpairOrderGuid}`}}>
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
        dataIndex: 'callTime',
        width: 130
      }
    ];
    const defaultParams = repairRecord.searchCondition ? repairRecord.searchCondition.params : null;
    return (
        <Content className='ysynet-content ysynet-common-bgColor'>
          <Row>
            <Col span={12}>
              <Search
                placeholder="请输入维修单号/资产编号/资产名称"
                onSearch={ value =>  this.queryHandler({params: value,menuFstate:"repairRegList"}) }
                style={{ width: 400 }}
                enterButton="搜索"
                defaultValue={ defaultParams }
              />
            </Col>
          </Row>
          <RemoteTable
            query={{
              params: defaultParams,
              menuFstate:"repairRecord"
            }}
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
export default withRouter(connect(state => state, dispatch => ({
  setRepairRecordSearch: (nestKeys, value) => dispatch(repairRecord.setRepairRecordSearch(nestKeys, value)),
}))(RepairRecordList));