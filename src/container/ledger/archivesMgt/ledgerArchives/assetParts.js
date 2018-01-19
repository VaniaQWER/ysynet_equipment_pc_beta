/**
 * 档案管理-资产档案-详情-基本信息-资产配件
 */
import React, { Component } from 'react';
import user from '../../../../api/user';
import TableGrid from '../../../../component/tableGrid';
const { RemoteTable } = TableGrid;

class AssetParts extends Component {
  render () {
    const columns = [
      {
        title: '配件编号',
        dataIndex: 'assetsRecord',
        width: 100
      },
      {
        title: '配件名称',
        dataIndex: 'equipmetStandarName',
        width: 100
      },
      {
        title: '型号',
        dataIndex: 'spec',
        width: 100
      },
      {
        title: '规格',
        dataIndex: 'fmodel',
        width: 100,
      },
      {
        title: '数量',
        dataIndex: 'amount',
        width: 100,
      },
      {
        title: '单位',
        dataIndex: 'useDeptCode',
        width: 100
      },
      {
        title: '价格',
        dataIndex: 'buyPrice',
        width: 100
      }
    ];
    return (
      <div>
         <RemoteTable
            ref='remote'
            url={user.getLedgerArchivesParts}
            scroll={{x: '120%', y: 315}}
            columns={columns}
            rowKey={'assetsRecord'}
            style={{marginTop: 10}}
            size="small"
          /> 
      </div>
    )
  }
}
export default AssetParts 