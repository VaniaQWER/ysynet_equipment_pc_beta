/**
 * @file 保养管理 - 新建计划
 */
import React, { PureComponent } from 'react';
import { Card, Row, Col, Form, Input, Tooltip, DatePicker, Icon, Tag, Button,
  Select, Radio, Layout } from 'antd';
import TableGrid from '../../../component/tableGrid';
import assets from '../../../api/assets';
import { ledgerData, productTypeData } from '../../../constants';
const FormItem = Form.Item;
const Option = Select;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RemoteTable } = TableGrid;
const { Content } = Layout;
/* 表单布局样式 */ 
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const data = [
  '外观检查外观检查外观检查外观检查外观检查外观检查外观检查外观检查外观检查.',
  '清洁与保养.',
  '功能检查.',
  '安全检查.'
];
/** 表头 */
const columns = [
  {
    title: '资产编号',
    dataIndex: 'assetsRecord',
    width: 200,
    sorter:true
  },
  {
    title: '状态',
    dataIndex: 'useFstate',
    width: 100,
     render: text =>  <Tag color={ledgerData[text].color}> { ledgerData[text].text } </Tag>
  },
  {
    title: '资产名称',
    dataIndex: 'equipmentStandardName',
    width: 200
  },
  {
    title: '型号',
    dataIndex: 'spec',
    width: 100
  },
  {
    title: '资产分类',
    dataIndex: 'productType',
    width: 100,
    render: text => text ?  productTypeData[text].text  : null
  },
  {
    title: '保管员',
    dataIndex: 'custodian',
    width: 150
  },
  {
    title: '使用科室',
    dataIndex: 'useDept',
    width: 100
  },
  {
    title: '管理科室',
    dataIndex: 'bDept',
    width: 100
  }
];
/**
 * @class 保养计划class
 * @summary 保养计划返回视图
 */
class MaintainPlan extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Content className='ysynet-content'>
        <Card title="计划信息" bordered={false} className='min_card'>
          <Form >
            <Row>
              <Col span={6}>
                <FormItem label={`保养类型`} {...formItemLayout}>
                  {getFieldDecorator(`type`, {
                    initialValue: '00'
                  })(
                    <RadioGroup>
                      <RadioButton value="00">内保</RadioButton>
                      <Tooltip title="暂不提供该项服务">
                        <RadioButton value="01" disabled>外保</RadioButton>
                      </Tooltip>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`计划名称`} {...formItemLayout}>
                  {getFieldDecorator(`name`)(
                    <Input placeholder="请输入计划名称" style={{width: 200}}/>
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem label={`临床风险等级`} {...formItemLayout}>
                  {getFieldDecorator(`level`)(
                    <Select allowClear style={{width: 200}}>
                      <Option value={'低'}>低</Option>
                      <Option value={'中'}>中</Option>
                      <Option value={'高'}>高</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={`循环方式`} {...formItemLayout}>
                  {getFieldDecorator(`type1`, {
                    initialValue: '00'
                  })(
                    <RadioGroup>
                      <RadioButton value="00">单次</RadioButton>
                      <RadioButton value="01">循环</RadioButton>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={`循环周期`} {...formItemLayout}>
                  {getFieldDecorator(`loopCycle`)(
                    <Input placeholder="请输入循环周期" style={{width: 200}} addonAfter={'月'}/>
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem label={`提前生成保养单`} {...formItemLayout}>
                  {getFieldDecorator(`advance`)(
                    <Input placeholder="请输入天数" style={{width: 200}} addonAfter={'天'}/>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={
                  <Tooltip title="循环保养时用于首次保养时间">
                    <span><Icon type="question-circle-o" style={{marginRight: 1}}/>保养时间</span>
                  </Tooltip>} {...formItemLayout}>
                  {getFieldDecorator(`maintainDate`)(
                    <DatePicker />
                  )}
                </FormItem>
              </Col>
              <Col span={8} >
                <FormItem label={`失效时间`} {...formItemLayout}>
                  {getFieldDecorator(`invalidDate`)(
                    <DatePicker />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title={
          <Tooltip title="展开查看项目信息">
            产品信息&nbsp;<Icon type="question-circle-o" />
          </Tooltip>} bordered={false} style={{marginTop: 4}} className='min_card'>

          <Button type='primary' style={{marginBottom: 2}}>添加产品</Button>
          <RemoteTable
            showHeader={true}
            url={assets.selectAssetsList}
            scroll={{x: '150%' }}
            columns={columns}
            rowKey={'RN'}
            size="small"
            expandedRowRender={ record => (
              data.map((item, index) => (
                <Tag key={index} closable>{ item }</Tag>
              ))
            )}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              },
              getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
              }),
            }}
          /> 
        </Card>
      </Content>  
    )
  }
}

export default Form.create()(MaintainPlan);