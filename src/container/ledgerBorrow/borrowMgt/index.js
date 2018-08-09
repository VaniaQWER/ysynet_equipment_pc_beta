import React, { Component } from 'react';

import BorrowMgtForm from './component/borrowMgtForm';

import tableGrid from '../../../component/tableGrid';

import ledgerBorrow from '../../../api/ledgerBorrow';

import request from '../../../utils/request';

import queryString from 'querystring';

import {Button, Row, Modal, Layout, Card, Form, DatePicker, Input, message} from 'antd';

import {Link} from 'react-router-dom';

const { RemoteTable } = tableGrid;

const {Content} = Layout;

const {TextArea} = Input;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 19}
    }
}

const FormItem = Form.Item;

class BorrowMgt extends Component {
    state = {
        query: {
            assetName: '',
            deptGuid: '',
            assetsRecord: '',
            bDeptGuid: '',
            startTime: '',
            endTime: '',
            loanStartTime: '',
            loanEndTime: '',
            borrowFstate: '',
            borrowNo: '',
        },
        selectedRowKeys: [],
        selectedRows: [],
        visible: false,
        okLoading: false
    }
    showModal = () => {
        let {selectedRows} = this.state;

        if(selectedRows.length === 0) {
            message.warning('请选择一条数据', 2);
            return;
        }
        if(this.refs.modalForm) {
            this.refs.modalForm.resetFields();
        };
        this.setState({visible: true});
    }
    setQuery = (query) => {
        this.setState({ query }, ()=>{ this.refs.table.fetch() })
    }
    handleOk = () => {
        this.refs.modalForm.validateFields((err, values) => {
            if(err) return;
            let {selectedRows} = this.state;
            this.setState({okLoading: true});
            values.actualBack = values.actualBack.format('YYYY-MM-DD HH:mm:ss');
            values.remark = values.remark === undefined? '' : values.remark;
            values.borrowDetailGuids = selectedRows.map( (item) => item.borrowDetailGuid );
            this.giveback(values);
        })
    }
    giveback = (query) => {
        request(ledgerBorrow.updateBorrow, {
                body: queryString.stringify(query),
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: (data) => {
                    if(data.status) {
                        this.setState({okLoading: false, visible: false, selectedRowKeys: []}, ()=>{
                            this.refs.table.fetch();
                        });
                        message.success('归还成功');
                    }else {
                        message.error(data.msg);
                        this.setState({okLoading: false});
                    }
                },
                error: (err) => console.log(err)
            })
    }
    render() {
        let {query, visible, okLoading, selectedRows} = this.state;
        const columns = [
            {
                title: '借用单号',
                dataIndex: 'borrowNo'
            },
            {
                title: '资产编号',
                dataIndex: 'assetsRecord'
            },{
                title: '资产名称',
                dataIndex: 'equipmentStandardName'
            },{
                title: '借用人',
                dataIndex: 'borrowUserName'
            },{
                title: '借用科室',
                dataIndex: 'deptName'
            },{
                title: '借用时间',
                dataIndex: 'createTime'
            },{
                title: '预计归还时间',
                dataIndex: 'estimateBack'
            },{
                title: '实际归还时间',
                dataIndex: 'actualBack'
            },{
                title: '借用原因',
                dataIndex: 'borrowCause'
            },{
                title: '费用',
                dataIndex: 'cost'
            },{
                title: '备注',
                dataIndex: 'remark'
            },{
                title: '操作员',
                dataIndex: 'createUserId'
            },{
                title: '单据状态',
                dataIndex: 'borrowFstate',
                render: (text) => {
                    return <span>{text === "00"? "已借出" : "已归还"}</span>
                }
            },
        ];
        return (
            <Content>
                <Card style={{margin: '16px 16px 0'}} bordered={false}>
                    <BorrowMgtForm setQuery={this.setQuery} />
                </Card>
                <Card style={{ margin: '0 16px' }}>
                    <Row style={{ marginBottom: 50 }}>
                        <Link to={{ pathname: `/ledgerBorrow/borrowMgt/loan` }}><Button type="primary" >新增借出</Button></Link>
                        <Button onClick={this.showModal} style={{ marginLeft: 8 }} type="primary" >归还</Button>
                    </Row>
                    <RemoteTable
                        ref="table"
                        selectedRows={selectedRows}
                        rowSelection={{
                            onChange: (selectedRowKeys, selectedRows) => {
                                this.setState({ selectedRowKeys, selectedRows });
                            },
                            getCheckboxProps: record => ({
                                disabled: record.borrowFstate === '01', // Column configuration not to be checked
                                borrowFstate: record.borrowFstate,
                             })
                        }}
                        pagination={{
                            showTotal: (total, range) => `总共${total}个项目`
                        }}
                        query={query}
                        url={ledgerBorrow.BorrowRecordList}
                        scroll={{x: '150%'}}
                        showHeader={true}
                        columns={columns}
                        size="small"
                        rowKey={'RN'}
                    />
                </Card>
                <Modal
                    title="归还"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={okLoading}
                    onCancel={ () => {this.setState({ visible: false })} }
                >
                    <Row>
                        <ModalFormWrap
                            ref="modalForm"
                        />
                    </Row>
                </Modal>
            </Content>
        )
    }
};

class ModalForm extends Component {
    
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <Row>
                    <FormItem label={`归还时间`} {...formItemLayout}>
                        {getFieldDecorator('actualBack', {
                            rules: [{
                                required: true,
                                message: '请输入归还时间'
                            }]
                        })(
                            <DatePicker
                                style={{width: '100%'}}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="请输入归还时间"
                            />
                        )}
                    </FormItem>
                </Row>
                <Row>
                    <FormItem label={`备注`} {...formItemLayout}>
                        {getFieldDecorator('remark')(
                            <TextArea rows={4}/>
                        )}
                    </FormItem>
                </Row>
            </Form>
        )
    }
}

const ModalFormWrap = Form.create()(ModalForm)



export default BorrowMgt;