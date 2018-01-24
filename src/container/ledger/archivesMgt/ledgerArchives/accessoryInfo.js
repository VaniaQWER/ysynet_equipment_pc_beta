/**
 *  档案管理-资产档案-详情-附件信息
 */
import React, { Component } from 'react';
import TableGrid from '../../../../component/tableGrid';
import assets from '../../../../api/assets';

const { RemoteTable } = TableGrid;

class AccessoryInfo extends Component {
  render () {
    const columns = [
      {
        title: '附件类型',
        dataIndex: 'fileType',
        width: 100
      },
      {
        title: '文件名',
        dataIndex: 'fileName',
        width: 100
      },
      {
        title: '上传用户',
        dataIndex: 'userName',
        width: 100
      },
      {
        title: '上传时间',
        dataIndex: 'uploadTime',
        width: 100,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: 100,
      }
    ];
    return (
      <div>
         <RemoteTable
            ref='remote'
            query={{ assetsRecord: this.props.assetsRecord }}
            url={assets.selectCertInfoList}
            scroll={{x: '100%', y : document.body.clientHeight - 341}}
            columns={columns}
            rowKey={'RN'}
            style={{marginTop: 10}}
            size="small"
          /> 
      </div>
    )
  }
}
export default AccessoryInfo 