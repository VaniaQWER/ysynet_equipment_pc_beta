import React, {Component} from 'react';

import {Form, Input, Row, Col, DatePicker, Select, Button, Icon} from 'antd';

const FormItem = Form.Item;

const {Option} = Select;

const {RangePicker} = DatePicker;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
}

class BorrowMgtForm extends Component {
    state = {
        display: 'none'
    }
    toggle = () => {
        this.setState({
            display: this.state.display === 'none'? 'block' : 'none'
        })
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
        })
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        let {display} = this.state;
        return (
            <Form onSubmit={this.handleSearch}>
                <Row style={{background: '#fff', margin: '18px 18px 0', paddingTop: 18}} gutter={30}>
                    <Col span={8}>
                        <FormItem label={`资产名称`} {...formItemLayout}>
                            {getFieldDecorator(`bDeptId`)(
                                <Input placeholder="请输入资产名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={`资产编号`} {...formItemLayout}>
                            {getFieldDecorator(`bDeptId`)(
                                <Select placeholder="请输入资产编号" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`管理科室`} {...formItemLayout}>
                            {getFieldDecorator(`bDeptId`)(
                                <Input placeholder="请输入资产名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`借用科室`} {...formItemLayout}>
                            {getFieldDecorator(`bDeptId`)(
                                <Input placeholder="请输入借用科室" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`借出日期`} {...formItemLayout}>
                            {getFieldDecorator(`bDeptId`)(
                                <Input placeholder="请输入资产名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`归还日期`} {...formItemLayout}>
                            {getFieldDecorator(`bDeptId`)(
                                <Input placeholder="请输入资产名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`单据状态`} {...formItemLayout}>
                            {getFieldDecorator(`bDeptId`)(
                                <Input placeholder="请输入资产名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`借用编号`} {...formItemLayout}>
                            {getFieldDecorator(`bDeptId`)(
                                <Input placeholder="请输入借用编号" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }} >
                        <Button type="primary" htmlType="submit" >查询</Button>
                        <Button style={{ margin: '0 8px' }} onClick={this.props.form.resetFields}>重置</Button>
                        <a onClick={this.toggle}>{ display === 'none'? '展开' : '收起' }<Icon type={ display === 'none'? 'down' : 'up' } /></a>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(BorrowMgtForm);