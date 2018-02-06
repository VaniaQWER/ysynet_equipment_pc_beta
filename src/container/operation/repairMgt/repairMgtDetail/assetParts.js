/**
 * 维修记录-详情-基本信息-资产配件
 */
import React, { Component } from 'react';
import assets from '../../../../api/assets';
import TableGrid from '../../../../component/tableGrid';
const { RemoteTable } = TableGrid;

class AssetParts extends Component {
  render () {
    console.log(this.props.assetsRecordGuid,'11')
    const columns = [
      {
        title: '配件编号',
        dataIndex: 'equipmentCode',
        width: 100
      },
      {
        title: '配件名称',
        dataIndex: 'equipmentName',
        width: 100
      },
      {
        title: '型号',
        dataIndex: 'fmodel',
        width: 100
      },
      {
        title: '规格',
        dataIndex: 'spec',
        width: 100,
      },
      {
        title: '数量',
        dataIndex: 'extendSum',
        width: 100,
      },
      {
        title: '单位',
        dataIndex: 'meteringUnit',
        width: 100
      },
      {
        title: '价格',
        dataIndex: 'money',
        width: 100
      }
    ];
    return (
      <div>
         <RemoteTable
            query={{ assetsRecord: this.props.assetsRecordGuid }}
            ref='remote'
            url={assets.selectAssetsExtendList}
            scroll={{x: '120%',y:400}}
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