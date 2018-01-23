 /**
 *  档案管理-资产档案-详情-操作记录
 */
import React, { Component } from 'react';
import user from '../../../../api/user';
import TableGrid from '../../../../component/tableGrid';
const { RemoteTable } = TableGrid;

class RecordList extends Component {
  render () {
    const columns = [
      {
        title: '操作分类',
        dataIndex: 'operType',
        width: 100
      },
      {
        title: '操作内容',
        dataIndex: 'operContent',
        width: 100
      },
      {
        title: '操作前',
        dataIndex: 'beforeOper',
        width: 100
      },
      {
        title: '操作结果',
        dataIndex: 'operResult',
        width: 100,
      },
      {
        title: '操作员',
        dataIndex: 'userName',
        width: 100,
      },
      {
        title: '操作时间',
        dataIndex: 'operTime',
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
            url={user.getRecordList}
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
export default RecordList 