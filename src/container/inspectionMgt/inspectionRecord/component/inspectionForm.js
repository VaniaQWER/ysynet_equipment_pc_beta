/*  巡检管理 - 巡检记录 - 表单组件  */

import React, {Component} from 'react';

import {Form, Input, Row, Col, Button, Icon, Select, DatePicker} from 'antd';

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

class InspectionForm extends Component {
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
            this.props.queryAsset(values);
        })
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        let {display} = this.state;
        return (
            <Form onSubmit={this.handleSearch}>
                <Row gutter={30}>
                    <Col span={8}>
                        <FormItem label={`巡检单号`} {...formItemLayout}>
                            {getFieldDecorator(`equipmentStandardName`)(
                                <Input placeholder="请输入巡检单号" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={`巡检科室`} {...formItemLayout}>
                            {getFieldDecorator(`assetsRecord`)(
                                <Select
                                    placeholder="请选择巡检科室"
                                    defaultActiveFirstOption = {false}
                                    allowClear={true}  
                                    filterOption={false}
                                >
                                    <Option key="00" value="01" >科室</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`巡检人`} {...formItemLayout}>
                            {getFieldDecorator(`spec`)(
                                <Input placeholder="请输入巡检人" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`巡检日期`} {...formItemLayout}>
                            {getFieldDecorator(`fmodel`)(
                                <RangePicker
                                    format={'YYYY-MM-DD'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={ display === 'none'? 8 : 16 } style={{ textAlign: 'right' }} >
                        <Button type="primary" htmlType="submit" >查询</Button>
                        <Button style={{ margin: '0 8px' }} onClick={() => { this.props.form.resetFields(); }}>重置</Button>
                        <a onClick={this.toggle}>{ display === 'none'? '展开' : '收起' }<Icon type={ display === 'none'? 'down' : 'up' } /></a>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(InspectionForm);