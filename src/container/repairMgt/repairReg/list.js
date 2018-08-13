/**
 * 保修记录
 */ 
import React, { Component } from 'react';
import { Row, Col, Input, Icon, Layout } from 'antd';
import TableGrid from '../../../component/tableGrid';
import { Link } from 'react-router-dom';
import assets from '../../../api/assets';
import { repairCommonDataSource,faultDescribeData } from '../../../constants'
import  textTips  from '../../../utils/tools'

const Search = Input.Search;
const { Content } = Layout;
const { RemoteTable } = TableGrid;

class RepairRegList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query:{menuFstate:"repairRegList"}
    }
  }
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
        render: (text, record) => (
          record.orderFstate === '10' ?
          <span>
            <Link to={{pathname: `/repairMgt/repairRegList/edit/${record.rrpairOrderGuid}`}}>
              <Icon type="edit" style={{marginRight: 5}}/>编辑
            </Link>
          </span>  :
          <span>
            <Link to={{pathname: `/repairMgt/repairRegList/detail/${record.rrpairOrderGuid}`}}>
              <Icon type="profile" style={{marginRight: 5}}/>详情
            </Link>
          </span>
        )
      },
      ...repairCommonDataSource,
      {
        title: '故障现象',
        dataIndex: 'faultDescribe',
        width: 200,
        render: (text)=>{
          let str = '';
          if(text){
            text.map((item) => {
              return  str += faultDescribeData[item] ? faultDescribeData[item].text + "," : '' 
             }) 
          }
          return str === null ? "" : textTips(200,str.substring(0, str.length - 1));
        }  
      }];
    return (
        <Content className='ysynet-content ysynet-common-bgColor' style={{padding:24}} >
          <Row>
            <Col span={12}>
              <Search
                placeholder="请输入维修单号/资产编号/资产名称"
                onSearch={value =>  {this.queryHandler({'params':value,menuFstate:"repairRegList"})}}
                style={{ width: 400 }}
                enterButton="搜索"
              />
            </Col>
          </Row>
          <RemoteTable
            ref='table'
            query={this.state.query}
            url={assets.selectRrpairList}
            scroll={{x: '150%', y : document.body.clientHeight - 110 }}
            columns={columns}
            rowKey={'RN'}
            pagesize={20}
            showHeader={true}
            style={{marginTop: 10}}
            size="small"
          /> 
        </Content>
    )
  }
}
export default RepairRegList;