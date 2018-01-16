import React, { Component } from 'react';
import { Input,Icon, Layout } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import { Link } from 'react-router-dom'

const { Content } = Layout;
const Search = Input.Search;
const { RemoteTable } = TableGrid;

class LedgerArchivesList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
      }
    }
  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'RN',
        width: 250,
        render: (text, record) => 
          <span>
            <Link to={{pathname: `/archives/detail`, state: { record }}}><Icon type="form" />详情</Link>
          </span>  
      },
      {
        title: '资产编号',
        dataIndex: 'assetsRecord',
        width: 200
      },
      {
        title: '资产名称',
        dataIndex: 'equipmetStandarName',
        width: 200
      },
      {
        title: '型号',
        dataIndex: 'spec',
        width: 200
      },
      {
        title: '状态',
        dataIndex: 'useFstate',
        width: 150,
        //render: text => ArchivesStatus[text]
      },
      {
        title: '设备分类',
        dataIndex: 'productType',
        width: 150,
        //render: text => ProductType[text]
      },
      {
        title: '使用科室',
        dataIndex: 'useDeptCode',
        width: 150
      },
      {
        title: '购置金额',
        dataIndex: 'buyPrice',
        width: 150
      },
      {
        title: '生产商',
        dataIndex: 'product',
        width: 150
      },
      {
        title: '管理科室',
        dataIndex: 'bDept',
        width: 150
      },
      {
        title: '负责人',
        dataIndex: 'custodian',
        width: 150
      }
    ];
    return (
        <Content>
            <Search
              placeholder="请输入资产编号/资产名称"
              onSearch={value => console.log(value)}
              style={{ width: 300 }}
              enterButton="搜索"
            />
            <RemoteTable
            ref='remote'
            //url={api.ARCHIVES}
            scroll={{x: '1800px'}}
            columns={columns}
            rowKey={'assetsRecord'}
            style={{marginTop: 10}}
          /> 
        </Content>
    )
  }
}
export default LedgerArchivesList;