/*计量台账- 首页 - 列表页*/
import React , { Component } from 'react';
import { Layout, Card, Form, Row, Col, Input, Button, Icon, Select, DatePicker , Modal, Radio , message} from 'antd';
import tableGrid from '../../../component/tableGrid';
import { Link } from 'react-router-dom';
import {validAmount, validDay} from '../../../utils/tools';
// import moment from 'moment';
import request from '../../../utils/request';
import meterStand from '../../../api/meterStand';
import queryString from 'querystring';
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const { RemoteTable } = tableGrid;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

class SearchFormWrapper extends Component {
  state = {
    display: 'none',
    useDeptData: [],   //使用科室保存数据
    useDeptName: '',// 使用科室,
    mgtDeptData: [],  //管理科室保存数据
    mgtDeptName: '', //管理科室
  }
  componentDidMount() {
    let useOptions = {      //00 使用科室   01管理科室
      body: queryString.stringify({deptType: "00"}),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        let useDeptData = [{ text: "全部", value: "" }, ...data.result];
        this.setState({ useDeptData });
      },
      error: (err) => console.log(err)
    };
    request(meterStand.userDeptList, useOptions);
    let mgtOptions = {
      body: queryString.stringify({deptType: "01"}),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        let mgtDeptData = [{ text: "全部", value: "" }, ...data.result];
        this.setState({ mgtDeptData });
      },
      error: (err) => console.log(err)
    };
    request(meterStand.mgtDeptList, mgtOptions);
  }
  toggle = () => {
    const { display } = this.state;
    this.setState({
      display: display === 'none' ? 'block' : 'none'
    })
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const createDate = values.createDate === undefined ? '': values.createDate;
      if(createDate.length>0) {
        values.startTime = createDate[0].format('YYYY-MM-DD');
        values.endTime = createDate[1].format('YYYY-MM-DD');
      }else {
        values.startTime = '';
        values.endTime = '';
      };
      for (const key in values) {
        values[key] = values[key] === undefined? "" : values[key];
      }
      this.props.query(values);
    });
 }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
  }
  // 管理科室
  handleChangeMagtDept = (mgtDeptName) => {
    this.setState({ mgtDeptName });
  }
  //使用科室
  handleChangeUseDept = (useDeptName) => {
    this.setState({ useDeptName });
  }
  render() {
    const { display } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      // 转科记录查询部分
      <Form onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={`资产名称`} {...formItemLayout}>
              {getFieldDecorator('assetName', {})(
                <Input placeholder="请输入资产名称" style={{width: 200}} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={`资产编号`} {...formItemLayout}>
              {getFieldDecorator('assetsRecord', {})(
                <Input placeholder="请输入资产编号" style={{width: 200}} />
              )}
            </FormItem>
          </Col>
          <Col span={8}  style={{display: display}} >
            <FormItem label={`管理科室`} {...formItemLayout}>
              {getFieldDecorator('bDeptId', {})(
              <Select
                showSearch
                onSearch={this.handleChangeMagtDept}
                defaultActiveFirstOption={false}
                allowClear={true}
                filterOption={false}
                style={{width: 200}}
                placeholder={`请搜索选择管理科室`}
              >
                {this.state.mgtDeptData.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>)}
              </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}  style={{display: display}} >
            <FormItem label={`使用科室`} {...formItemLayout}>
              {getFieldDecorator('useDeptId', {})(
              <Select
                showSearch
                onSearch={this.handleChangeUseDept}
                defaultActiveFirstOption={false}
                allowClear={true}
                filterOption={false}
                style={{width: 200}}
                placeholder={`请搜索选择转出科室`}
              >
                {this.state.useDeptData.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>)}
              </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`待检日期`} {...formItemLayout}>
              {getFieldDecorator('createDate', {})(
                <RangePicker style={{width: 200}} />
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'center', marginTop: 4}} >
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{marginLeft: 30}} onClick={this.handleReset}>重置</Button>
            <a style={{marginLeft: 30, fontSize: 14}} onClick={this.toggle}>
              {this.state.display === 'block' ? '收起' : '展开'} <Icon type={this.state.display === 'block' ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SearchForm = Form.create()(SearchFormWrapper);


class meterStandList extends Component{

  state={
    query: {},
    visible: false,
    loading: false,
    selectedRowKeys: [], //勾选数据的条数
    selectedRows: [],    //勾选数据的具体信息
  }

  queryHandle = (query) => {
    this.setState( { query }, ()=>{ this.tabs.fetch() });
  }

  showModal = () => {
    const { selectedRowKeys } = this.state;
    if(selectedRowKeys.length>0){
      this.setState({visible:true})
    }else{
      message.warning('请至少选择一条数据进行批量编辑!')
    }
  }

  handleCancel = () => {
    //此处需要清空Modal表单
    this.refs.modaiForm.resetFields();
    this.setState({visible:false})
  }

  handleOk = () => {    //批量编辑保存
    this.refs.modaiForm.validateFields((err,values)=>{
      if(!err){
        this.setState({ loading: true })
        values.nextMeasureDate = values.nextMeasureDate.format('YYYY-MM-DD');
        //在这里将发出请求
        values.measureCycly = Number(values.measureCycly);
        values.remindDays = Number(values.remindDays);
        let {selectedRows} = this.state;
        selectedRows = selectedRows.map((item) => item.assetsRecordGuid);
        values.assetsRecordGuidList = selectedRows;     //添加assetsRecordGuidList字段参数
        request(meterStand.updateMeterRecord, {
          body: queryString.stringify(values),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: (data)=>{
            if(data.status) {
              this.setState({ loading: false, selectedRowKeys: [] });
              message.success('编辑成功');
              this.tabs.fetch();
            }
          },
          error: err => console.log(err)
        })

        this.refs.modaiForm.resetFields();
        this.setState({visible:false})
      }
    })
  }

  render(){
    const columns = [
      {
        title: '资产名称',
        dataIndex: 'equipmentName',
        width:120,
      },
      {
        title: '资产编号',
        dataIndex: 'assetsRecord',
        width: 120
      },
      {
        title: '型号',
        dataIndex: 'fmodel',
        width:120,
      },
      {
        title: '规格',
        dataIndex: 'spec',
        width:120,
      },
      {
        title: '使用科室',
        dataIndex: 'useDeptName',
        width:120,
      },
      {
        title: '计量周期',
        dataIndex: 'measureCycly',
        width:120,
      },
      {
        title: '下次待检日期',
        dataIndex: 'nextMeasureDate',
        width:120,
        // sorter: (a, b) => this.sortTime(a,b,'endMaintainDate')
      },
      {
        title: '操作',
        dataIndex: 'transferGuid',
        width:50,
        render: (text, record, index) => {
            return (
              <span><Link to={{pathname:`/meterMgt/meterStand/check/${record.assetsRecordGuid}`}}>检定</Link></span>
            )
        }
      },
    ]
    const {visible , loading, query, selectedRowKeys } = this.state;
    return(
      <Content>
        <Card bordered={false} className="min_card" >
          <SearchForm query={this.queryHandle} />
        </Card>
        <Card >
          <Row style={{textAlign: 'left'}} >
              <Button type="primary"><Link to={{pathname:`/meterMgt/meterStand/add`}}>新增</Link></Button>
              <Button type="primary" style={{marginLeft: 30}} onClick={this.showModal}>编辑</Button>
          </Row>
          <RemoteTable
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys, selectedRows });
              }
            }}
            pagination={{
              showTotal: (total, range) => `总共${total}个项目`
            }}
            query={query}
            showHeader={true}
            ref={ (node) => { this.tabs = node } }
            url={meterStand.meterRecordList}
            scroll={{x: '120%', y : document.body.clientHeight - 110 }}
            columns={columns}
            size="small"
            rowKey={'RN'}
            style={{marginTop: 10}}
          />
        </Card>
        <Modal
          visible={visible}
          title="批量编辑"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
          <ModalFormWapper ref='modaiForm'></ModalFormWapper>
        </Modal>
      </Content>
    )
  }
}

export default meterStandList ;


class ModalForm extends Component {
    render(){
      const { getFieldDecorator } = this.props.form;
      return (
        <Form>
          <FormItem
            {...formItemLayout}
            label="检定方式"
          >
            {getFieldDecorator('type',{
              initialValue:"00"
            })(
                <Radio.Group>
                  <Radio value="00">内检</Radio>
                </Radio.Group>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="计量周期"
          >
            {getFieldDecorator('measureCycly', {
              rules: [{
                  required: true, message: '请输入计量周期',
                },
                {
                  validator: validAmount
                }],
            })(
              <Input addonAfter={`月`} style={{width:200}}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="下次待检时间"
          >
            {getFieldDecorator('nextMeasureDate',{
              rules: [{
                required: true, message: '请选择下次待检时间',
              }],
            })(
              <DatePicker format={'YYYY-MM-DD'} style={{width:200}}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="提前提醒天数"
          >
            {getFieldDecorator('remindDays', {
              rules: [{
                validator: validDay
              }]
            })(
              <Input addonAfter={`日`} style={{width:200}}/>
            )}
          </FormItem>
        </Form>
      )
    }
}
const ModalFormWapper = Form.create()(ModalForm);
