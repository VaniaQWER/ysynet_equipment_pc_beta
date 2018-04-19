/**
 * @file 资产档案 - 新增档案详情
 * @since 2018-04-18
 */
import React, { PureComponent } from 'react';
import { Layout, Card, Affix, Button, Row, Col, Form, Input, Radio, Select, DatePicker, message, Modal, Table } from 'antd';
import request from '../../../utils/request';
import querystring from 'querystring';
import transfer from '../../../api/transfer';
// import tableGrid from '../../../component/tableGrid';
const { Content } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker } = DatePicker;
// const { RemoteTable } = tableGrid
// 表单布局样式
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
// 选择设备弹框里面的搜索表单
class SelectEquipment extends PureComponent {
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.query(values);
    });
 }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
  }
  render() {
    // const { getFieldDecorator } = this.props.form;
    return (
      // 转科记录查询部分
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col span={12}>
            <FormItem label={`证件号`} {...formItemLayout}>
              {(
                <Input placeholder="请输入证件号" style={{width: 220}} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={`品牌`} {...formItemLayout}>
              {(
                <Input placeholder="请输入品牌" style={{width: 220}} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={`设备名称`} {...formItemLayout}>
              {(
                <Input placeholder="请输入设备名称" style={{width: 220}} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={`转入科室`} {...formItemLayout}>
              {(
                <Input placeholder="请输入设备名称" style={{width: 220}} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={`规格`} {...formItemLayout}>
              {(
                <Input placeholder="请输入规格" style={{width: 220}} />
              )}
            </FormItem>
          </Col>
          <Col span={10} style={{ textAlign: 'right', marginTop: 4}} >
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{marginLeft: 30}} onClick={this.handleReset}>重置</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SelectEquipmentModal = Form.create()(SelectEquipment);
// 新增字典弹框新增表单
class NewAddDictionary extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="证件号" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          {(<Input style={{width: 250}} />)}
        </FormItem>
        <FormItem label="品牌" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          {(<Select style={{width: 250}}>
              <Option value="00">请选择</Option>
              <Option value="01">无</Option>
              <Option value="03">医商云品牌库</Option>
            </Select>)}
        </FormItem>
        <FormItem label="设备名称" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          {(<Input style={{width: 250}} />)}
        </FormItem>
        <FormItem label="型号" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          {(<Input style={{width: 250}} />)}
        </FormItem>
        <FormItem label="规格" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          {(<Input style={{width: 250}} />)}
        </FormItem>
        <FormItem label="计量单位" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
            {(<Select style={{width: 250}}>
              <Option value="00">医商云单位字典库</Option>
              <Option value="00">医商云单位字典库</Option>
              <Option value="00">医商云单位字典库</Option>
            </Select>)}
        </FormItem>
      </Form>
    )
  }
}
const NewAddDictionaryModal = Form.create()(NewAddDictionary);
class LedgerArchivesAdd extends PureComponent {
  state={
    value: '00',
    deptName: '',//模糊搜索参数
    managementData: [],//管理科室
    deptNameData: [],//使用科室
    userNameData: [],//保管人
    loading: false,
    equipmentVisible: false, //选择设备弹框
    dictionaryVisible: false, //新增字典弹框
    query: '',//选择设备弹框查询
  }
  //管理科室模糊搜索
  handleChangeManagement = (value) =>{
    let options = {
      body:querystring.stringify({deptName: value, deptType: '01'}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          let ret = []
          data.result.forEach(item => {
            console.log(item)
            ret.push({
              value:item.value,
              text: item.text,
            })
          });
          this.setState({
            'managementData':ret
          })
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(transfer.getSelectUseDeptList,options)
  }
   //使用科室模糊搜索
   handleChangeRollOut = (value) =>{
    let options = {
      body:querystring.stringify({deptName: value, deptType: '00'}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          let ret = []
          data.result.forEach(item => {
            console.log(item)
            ret.push({
              value:item.value,
              text: item.text,
            })
          });
          this.setState({
            'deptNameData':ret
          })
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(transfer.getSelectUseDeptList,options)
  }
  //保管人模糊搜索
  handleChangeMaintainUserid = (value) =>{
    let options = {
      body:querystring.stringify({userName: value}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          let ret = []
          data.result.forEach(item => {
            console.log(item)
            ret.push({
              value: item.value,
              userName: item.userName,
              deptName: item.deptName,
            })
          });
          this.setState({
            'userNameData':ret
          })
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(transfer.getSelectUserNameList,options)
  }
  /**---------------弹框Start------------------------- */
  showModal = (modalName) => {
    this.setState({ [modalName]: true });
  }
  handleOk = (modalName) => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, [modalName]: false });
    }, 3000);
  }
  handleCancel = (modalName) => {
    this.setState({ [modalName]: false });
  }
  /**---------------弹框End------------------------- */
  queryHandle = (query) => {
    this.refs.table.fetch(query);
    this.setState({query});
  }
  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        render: (text, record, index) => <span>{`${index+1}`}</span>,
        width: 50
      },
      {
        title: '操作',
        dataIndex: 'transferGuid',
        width: 80,
        render: (text, record, index) => {
          // <span>添加</span>
        }
      },
      {
        title: '证件号',
        dataIndex: 'zhengjianhao',
        width: 80,
      },
      {
        title: '品牌',
        dataIndex: 'pingpai',
        width: 80,
      },
      {
        title: '设备名称',
        dataIndex: 'shebeimingcheng',
        width: 80,
      },
      {
        title: '型号',
        dataIndex: 'xinghao',
        width: 80,
      },
      {
        title: '规格',
        dataIndex: 'guige',
        width: 80,
      },
    ]
    const { getFieldDecorator } = this.props.form;
    const { equipmentVisible, dictionaryVisible, loading } = this.state;
    // const query = this.state.query;
    return (
      <Content>
        <Affix>
          <div style={{background: '#fff', padding: '10px 20px', marginBottom: 4, display: 'flex', alignContent: 'center', justifyContent: 'flex-end'}}>
            <Button type="primary">保存</Button>
          </div>
        </Affix>
        {/* 选择设备弹框 */}
        <Modal
        visible={equipmentVisible}
        title={`选择设备`}
        width='900px'
        onOk={()=>this.handleOk('equipmentVisible')}
        onCancel={()=>this.handleCancel('equipmentVisible')}
        footer={null}
        >
          {/* <SelectEquipmentModal query={this.queryHandle} /> */}
          <SelectEquipmentModal />
          <Table
          ref='proTable' // 根据搜索后进行刷新列表
          showHeader={true}
          query={{useDeptGuid: this.state.outDeptguid}}
          // url={assets.selectAssetsList}
          columns={columns}
          scroll={{x: '100%', y: document.body.clientHeight - 110 }}
          size="small"
          />
        </Modal>

        {/* 新增字典弹框 */}
        <Modal
        visible={dictionaryVisible}
        title={`新增`}
        width='600px'
        onOk={()=>this.handleOk('dictionaryVisible')}
        onCancel={()=>this.handleCancel('dictionaryVisible')}
        footer={[
          <Button key="submit" type="primary" loading={loading} onClick={()=>this.handleOk('dictionaryVisible')}>提交</Button>,
          <Button key="back" onClick={()=>this.handleCancel('dictionaryVisible')}>取消</Button>
        ]}
        >
          <NewAddDictionaryModal />
        </Modal>
        <Card title={`基础信息`}  bordered={false} className="min_card">
          <Row>
            <Col span={24} style={{marginLeft: 56, marginBottom: 10}}>
              <Button type="primary" onClick={()=>{this.showModal('equipmentVisible')}}>选择设备</Button>
              <Button type="primary" onClick={()=>{this.showModal('dictionaryVisible')}} style={{marginLeft: 20}}>新增字典</Button>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="注册证号" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="资产名称" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="型号" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="规格" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="计量单位" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="品牌" {...formItemLayout}>
                {(<Input style={{width: 200}} placeholder={`显示`} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="资产编号" {...formItemLayout}>
                {(<Input style={{width: 200}} placeholder={`自动生成`} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`复用原码`} {...formItemLayout}>
                {getFieldDecorator(`reuse`, {
                    initialValue: '00',
                  })(
                  <RadioGroup onChange={(e) => {this.setState({value: e.target.value})}}>
                    <Radio value={`00`}>是</Radio>
                    <Radio value={`01`}>否</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="原码" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label={`管理科室`} {...formItemLayout}>
              {getFieldDecorator('orgId ')(
                  <Select
                    showSearch
                    onSearch={this.handleChangeManagement}
                    onSelect={(value)=>{this.setState({orgId: value})}}
                    style={{ width: 200 }} 
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    allowClear={true}
                    filterOption={false}
                    placeholder={`请搜索`}
                  >
                    {this.state.managementData.map(d => {
                    return <Option value={d.value} key={d.value}>{d.text}</Option>
                  })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`使用科室`} {...formItemLayout}>
                {getFieldDecorator('outDeptguid')(
                  <Select
                    showSearch
                    onSearch={this.handleChangeRollOut}
                    onSelect={(value, option)=>{this.setState({outDeptguid: value, outDeptname: option.props.children})}}
                    style={{ width: 200 }} 
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    allowClear={true}
                    filterOption={false}
                    placeholder={`请搜索`}
                  >
                    {this.state.deptNameData.map(d => {
                    return <Option value={d.value} key={d.value}>{d.text}</Option>
                  })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="存放地址" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label={`保管人`} {...formItemLayout}>
              {getFieldDecorator('maintainUserid')(
                  <Select
                    showSearch
                    onSearch={this.handleChangeMaintainUserid}
                    onSelect={(value, option)=>{this.setState({maintainUserid: value, maintainUsername: option.props.children})}}
                    style={{ width: 200 }} 
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    allowClear={true}
                    filterOption={false}
                    placeholder={`请搜索`}
                  >
                    {this.state.userNameData.map(d => {
                    return <Option value={d.value} key={d.value}>{d.userName}{`+`}{d.deptName}</Option>
                  })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`供应商`} {...formItemLayout}>
              {(<Select style={{width: 200}}>
                <Option value="1">请选择</Option>
                <Option value="2">无</Option>
                <Option value="3">医商云机构字典</Option>
              </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="合同编号" {...formItemLayout}>
                {(<Input style={{width: 200}} placeholder={`请输入采购合同号`} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label={`出厂日期`} {...formItemLayout}>
                {(<DatePicker style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`购买金额`} {...formItemLayout}>
              {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="安装费用" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label={`购置日期`} {...formItemLayout}>
                {(<DatePicker style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`生产商`} {...formItemLayout}>
              {(<Input style={{width: 200}}placeholder={`请输入生产商`} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="生产国家" {...formItemLayout}>
                {(<Select style={{width: 200}}>
                  <Option value="1">请选择</Option>
                  <Option value="2">国产</Option>
                  <Option value="3">进口</Option>
                </Select>)}
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title={`折旧信息`}  bordered={false} className="min_card">
          <Row>
            <Col span={8}>
              <FormItem label="折旧方式" {...formItemLayout}>
              {getFieldDecorator(`depreciationWay`, {
                    initialValue: '00',
                  })(
                  <RadioGroup onChange={(e) => {this.setState({value: e.target.value})}}>
                    <Radio value={`01`}>否</Radio>
                    <Radio value={`00`}>是</Radio>
                    <Select style={{width: 92}}>
                      <Option value={`1`}>平均年限法</Option>
                      <Option value={`2`}>平均年限法</Option>
                    </Select>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="净残值率" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="预计使用年限" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="月折旧率" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="开始计提时间" {...formItemLayout}>
                {(<MonthPicker style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title={`其他信息`}  bordered={false} className="min_card">
          <Row>
            <Col span={8}>
              <FormItem label="有无备用" {...formItemLayout}>
              {getFieldDecorator(`standby`, {
                    initialValue: '00',
                  })(
                  <RadioGroup onChange={(e) => {this.setState({value: e.target.value})}}>
                    <Radio value={`00`}>有</Radio>
                    <Radio value={`01`}>无</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="保修截至" {...formItemLayout}>
                {(<DatePicker style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title={`资金结构`}  bordered={false} className="min_card">
          <Row>
            <Col span={8}>
              <FormItem label="自筹资金" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="财政拨款" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="科研经费" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="自筹资金原值" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="财政拨款原值" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="科研经费原值" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="教学资金" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="接收捐赠" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="其他" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="教学资金原值" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="接收捐赠原值" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="其他原值" {...formItemLayout}>
                {(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="原值" {...formItemLayout}>
                {(<Input style={{width: 200}} placeholder={`计算而得出`} />)}
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Content>
    )
  }
}
export default Form.create()(LedgerArchivesAdd);
