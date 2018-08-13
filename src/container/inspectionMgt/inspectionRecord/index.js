import React, { Component } from 'react';

import {Layout, Icon, Button, Row} from 'antd';

import {Link} from 'react-router-dom';


import InspectionForm from './component/inspectionForm';

import {timeToStamp} from '../../../utils/tools';

import inspectionMgt from '../../../api/inspectionMgt';

import tableGrid from '../../../component/tableGrid';

const {RemoteTable} = tableGrid;

const {Content} = Layout;


class InspectionRecord extends Component {
    state = {
        query: {}
    }
    setQuery = (query) => {
        if( query.createTime && query.createTime.length > 0 ) {
            query.startTime = query.createTime[0].format('YYYY-MM-DD');
            query.endTime = query.createTime[1].format('YYYY-MM-DD');
        }else {
            query.startTime = '';
            query.endTime = '';
        };
        delete query.createTime;
        for (const key in query) {
            query[key] = query[key] === undefined? '' : query[key]
        };
        this.refs.table.fetch(query);
    }

    checkDate = (a, b) => {
        return timeToStamp(a.checkDate) - timeToStamp(b.checkDate);
    }

    createTime = (a, b)=> {
        return timeToStamp(a.createTime) - timeToStamp(b.createTime);
    }
    
    render() {
        let {query} = this.state;
        const columns = [
            {
                title: '巡检单号',
                dataIndex: 'checkNo',
                render: (text, record) => <Link to={{ pathname: `/inspectionMgt/inspectionRecord/detail/${record.checkGuid}` }}>{text}</Link>
            },
            {
                title: '巡检科室',
                dataIndex: 'deptNames'
            },
            {
                title: '巡检结果',
                dataIndex: 'checkResult'
            },
            {
                title: '巡检日期',
                dataIndex: 'checkDate',
                sorter: (a, b) => this.checkDate(a,b)
            },
            {
                title: '操作时间',
                dataIndex: 'createTime',
                sorter: (a, b) => this.createTime(a,b)
            },
            {
                title: '巡检人',
                dataIndex: 'userNames'
            },
        ];
        return (
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:24}}>
                <InspectionForm setQuery={this.setQuery} />
                <Row style={{ marginBottom: 10 }}>
                    <Link to={{ pathname: `/inspectionMgt/inspectionRecord/newRegister` }}><Button type="primary"><Icon type="plus"/>新建</Button></Link>
                </Row>
                <RemoteTable
                    ref="table"
                    pagination={{
                        showTotal: (total, range) => `总共${total}个项目`
                    }}
                    query={query}
                    url={inspectionMgt.queryCheckInfoList}
                    scroll={{x: '100%'}}
                    showHeader={true}
                    columns={columns}
                    size="small"
                    rowKey={'RN'}
                />
            </Content>
        )
    }
}

export default InspectionRecord;