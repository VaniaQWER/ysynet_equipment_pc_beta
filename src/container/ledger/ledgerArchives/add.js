/**
 * @file 资产档案 - 新增档案详情
 * @since 2018-04-19
 */
import React, { PureComponent } from 'react';
import { Layout, Card, Affix, Button, Row, Col, Form, Input, Radio, Select, DatePicker, message, Modal } from 'antd';
import request from '../../../utils/request';
import querystring from 'querystring';
import ledger from '../../../api/ledger';
import transfer from '../../../api/transfer';
import { selectStaticDataListMeteringUnit, saveLedger } from '../../../api/ledger';
import tableGrid from '../../../component/tableGrid';
import { depreciationTypeData } from '../../../constants';
const { Content } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RemoteTable } = tableGrid
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
    const { getFieldDecorator } = this.props.form;
    return (
      // 转科记录查询部分
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col span={12}>
            <FormItem label={`证件号`} {...formItemLayout}>
              {getFieldDecorator('registerNo')(
                <Input placeholder="请输入证件号" style={{width: 220}} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={`品牌`} {...formItemLayout}>
              {getFieldDecorator('tfBrand')(
                <Input placeholder="请输入品牌" style={{width: 220}} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={`设备名称`} {...formItemLayout}>
              {getFieldDecorator('equipmentName')(
                <Input placeholder="请输入设备名称" style={{width: 220}} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={`型号`} {...formItemLayout}>
              {getFieldDecorator('fmodel')(
                <Input placeholder="请输入型号" style={{width: 220}} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={`规格`} {...formItemLayout}>
              {getFieldDecorator('spec')(
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
  state={
    optionsTfBrand: [],//品牌
    optionsMeteringUnit: [],//计量单位
    callbackData: {}
  }
  async componentDidMount() {
    // 计量单位
    const dataMeteringUnitList = await selectStaticDataListMeteringUnit();
    if (dataMeteringUnitList.status && dataMeteringUnitList.result) {
      this.setState({ optionsMeteringUnit: dataMeteringUnitList.result.rows })
    }
  }
  componentWillMount =()=>{
		this.gettfBrandVal();
  }
  // 品牌
  gettfBrandVal = (value) => {
    let o;
		if(value){
			o={name: value, code: 'TF_BRAND'}
		}else{
			o={code:'TF_BRAND'}
		}
		let options = {
			body:querystring.stringify(o),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: data => {
				if(data.status){
					this.setState({
						'optionsTfBrand': data.result.rows
					})
				}else{
					message.error(data.msg)
				}
			},
			error: err => {console.log(err)}
		}
		request(ledger.selectStaticDataListTfBrand,options)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form>
        <FormItem label="证件号" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('registerNo', {
            initialValue: '',
            rules: [{required: true, message:'请输入证件号若无注册证号填无'}]
          })(<Input style={{width: 250}} placeholder={`请输入证件号若无注册证号填无`} />)}
        </FormItem>
        <FormItem label="品牌" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('tfBrand', {
            initialValue: '',
            rules: [{required: true, message:'请选择品牌'}]
          })(<Select 
            style={{width: 250}}
            placeholder="请选择品牌"
            showSearch
            onSearch={this.gettfBrandVal}
            >
              {this.state.optionsTfBrand.map((item, index)=><Option value={item.TF_CLO_CODE} key={item.TF_CLO_NAME}>{item.TF_CLO_NAME}</Option>)}
            </Select>)}
        </FormItem>
        <FormItem label="设备名称" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('equipmentName', {
            initialValue: '',
            rules: [{required: true, message:'请输入设备名称'}]
          })(<Input style={{width: 250}} placeholder={`请输入设备名称`} />)}
        </FormItem>
        <FormItem label="型号" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('fmodel', {
            initialValue: '',
            rules: [{required: true, message:'请输入型号'}]
          })(<Input style={{width: 250}} placeholder={`请输入型号`} />)}
        </FormItem>
        <FormItem label="规格" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('spec', {
            initialValue: '',
            rules: [{required: true, message:'请输入规格'}]
          })(<Input style={{width: 250}} placeholder={`请输入规格`} />)}
        </FormItem>
        <FormItem label="计量单位" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('meteringUnit', {
              initialValue: '',
              rules: [{required: true, message:'请选择计量单位'}]
            })(<Select style={{width: 250}}>
            {this.state.optionsMeteringUnit.map((item, index) => <Option value={item.TF_CLO_CODE} key={item.TF_CLO_NAME}>{item.TF_CLO_NAME}</Option>)}
            </Select>)}
        </FormItem>
      </Form>
    )
  }
}
const NewAddDictionaryModal = Form.create()(NewAddDictionary);
class LedgerArchivesAdd extends PureComponent {
  constructor(props) {
    super();
    this.sendEndAjax = this.sendEndAjax.bind(this)
  }
  state={
    // value: '00',
    deptName: '',//模糊搜索参数
    managementData: [],//管理科室
    deptNameData: [],//使用科室
    userNameData: [],//保管人
    orgIdData: [],//供应商
    loading: false,
    equipmentVisible: false, //选择设备弹框
    dictionaryVisible: false, //新增字典弹框
    query: '',//选择设备弹框查询
    res: [],//详情数据
    record: {},//新增字典数据
    equipmentBackData: [],//设备弹框收集的数据
    equipmentCode: null, //设备id
    assetsRecordGuid: null,
    assetsRecord: null,
    productType: null,
    data: {},
    isEdit: false,
    disabled: false,
    prompt: '请输入原码',
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
    request(transfer.getSelectUseDeptList,options);
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
    request(transfer.getSelectUseDeptList,options);
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
    request(transfer.getSelectUserNameList,options);
  }
  /**---------------弹框Start------------------------- */
  showModal = (modalName) => {
    this.setState({ [modalName]: true });
  }
  handleOk = (modalName) => {
    if (modalName === 'dictionaryVisible') {
      this.refs.formDictionary.validateFields((err, values) => {
        if (!err) {
          this.sendSubmitAjax(values);
          this.setState({ loading: true });
        }
      })
    }
  }
  // 新增字典弹框 - 增加
  sendSubmitAjax = (value) =>{
    let options = {
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      },
      success: data => {
        this.setState({ loading: false, dictionaryVisible: false });
        if (data.status) {
          message.success( '新增成功');
          this.refs.formDictionary.resetFields();
          // this.refs.table.fetch();
        } else {
          message.error(data.msg);
        }
      },
      error: err => {console.log(err)}
    }
    request(ledger.getInsertEquipment,options);
  }
  handleCancel = (modalName) => { this.setState({ [modalName]: false }); }
  /**---------------弹框End------------------------- */
  queryHandle = (query) => {
    this.refs.table.fetch(query);
    this.setState({query});
  }
  getOrgIdVal = (value) =>{
    console.log(value);
  }
  componentWillMount =() => {
    this.getOrgIdList();//供应商下拉数据
    this.setState({isEdit: this.state.isEdit});
  }
  // 供应商列表
  getOrgIdList = (value) => {
    let options = {
      body:querystring.stringify({orgId: value}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          let ret = []
          data.result.forEach(item => {
            ret.push({
              value: item.orgId,
              text: item.orgName
            })
          });
          this.setState({
            'orgIdData': ret
          })
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(ledger.getSelectFOrgList, options);
  }
  // 通过使用科室接口带出存放地址数据
  getNewAddessInfo = (value,option) => {
    this.setState({inDeptguid: value,inDeptname:option.props.children});
    let options = {
      body:querystring.stringify({'deptId': value}),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        // console.log(data);
        // const values = this.props.form.getFieldsValue();
        // if (data.result.length === 0) {
        //   values.newAdd = '';
        //   this.setState({newAddressEdit: false});
        // } else {
        //   const result = data.result[0].address;
        //   values.newAdd = result;
        //   this.setState({newAddressEdit: true});
        // }
        // this.setState({data: values});
      }
    }
    request(transfer.getSelectDeptAddress, options);
  }
  // 保存按钮
  save = () => {
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        this.sendEndAjax();
      }
    })
  }
  // 保存逻辑
  async sendEndAjax () {
    console.log('我是保存逻辑交互');
    const values = this.props.form.getFieldsValue();
    let poatData = {};
    // 基本数据
    // const { assetsRecord, contractNo } = values; 
    poatData.assetsRecord = {
      
    };
    poatData.assetsRecord.assetsRecordGuid = this.state.assetsRecordGuid;
    poatData.assetsRecord.productType = this.state.productType;
    poatData.assetsRecord.assetsRecord = this.state.assetsRecord;
    poatData.assetsRecord.contractNo = values.contractNo;
    poatData.assetsRecord.equipmentCode = this.state.equipmentCode;
    poatData.assetsRecord.productCountry = values.productCountry;
    poatData.assetsRecord.product = values.product;
    poatData.assetsRecord.bDeptCode = values.bDeptCode;
    poatData.assetsRecord.deposit = values.deposit;
    poatData.assetsRecord.productionDate = values.productionDate;
    poatData.assetsRecord.useLimit = values.useLimit;
    poatData.assetsRecord.buyDate = values.buyDate;
    poatData.assetsRecord.depreciationType = values.depreciationType;
    poatData.assetsRecord.residualValueV = values.residualValueV;
    poatData.assetsRecord.custodian = values.custodian;
    poatData.assetsRecord.installPrice = values.installPrice;
    poatData.assetsRecord.useDeptCode = values.useDeptCode;
    poatData.assetsRecord.buyPrice = values.buyPrice;
    poatData.assetsRecord.inDate = values.inDate;
    poatData.assetsRecord.spare = values.spare;
    poatData.assetsRecord.fOrgId = values.fOrgId;
    poatData.assetsRecord.tfBrand = values.tfBrand;
    poatData.assetsRecord.monthDepreciationV = values.monthDepreciationV;
    poatData.assetsRecord.depreciationBeginDate = values.depreciationBeginDate;
    // list集合list集合
    poatData.equipmentPayList = [];
    //payType
    poatData.equipmentPayList.push({
      payType: '01',
      buyPrice: values.name1,
      originalValue: values.name4
    })
    poatData.equipmentPayList.push({
      payType: '02',
      buyPrice: values.name2,
      originalValue: values.name5
    })
    poatData.equipmentPayList.push({
      payType: '03',
      buyPrice: values.name3,
      originalValue: values.name6
    })
    poatData.equipmentPayList.push({
      payType: '04',
      buyPrice: values.name7,
      originalValue: values.name10
    })
    poatData.equipmentPayList.push({
      payType: '05',
      buyPrice: values.name8,
      originalValue: values.name11
    })
    poatData.equipmentPayList.push({
      payType: '06',
      buyPrice: values.name9,
      originalValue: values.name12
    });
    console.log(poatData,'你就说你是来干啥的')
    
    let options = {
      body: JSON.stringify(poatData)
    }
    const data = await saveLedger(options);
    console.log(data)
  }
  // 选择设备弹框 - 添加按钮
  addEquipmentTable = (value, modalName) => {
    this.setState({[modalName]: false, equipmentCode: value.equipmentCode});
    this.props.form.setFieldsValue({
      'registerNo': value.registerNo,
      'equipmentStandardName':value.equipmentStandardName,
      'fmodel': value.fmodel,
      'spec': value.spec,
      'meteringUnit': value.meteringUnit,
      'tfBrand':value.tfBrand
    });
  }
  //原码-资产编号搜索带值
  getAssetInfoAjax = (value) =>{
    let options = {
      body:querystring.stringify({ assetsRecord:value }),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          console.log(data.result, 'result');
          const getData = data.result;
          console.log(getData);
          const setFields = [
            'bDeptCode', 'useDeptCode', 'deposit', 'custodian', 'fOrgId', 'contractNo', 'productionDate', 'buyPrice',
            'installPrice', 'product',  'productCountry', 'depreciationType', 'residualValueV', 'useLimit',
            'monthDepreciationV', 'spare', 'inDate', 
            // 'buyDate', 'depreciationBeginDate'
          ];
          let Fieds = {};
          setFields.map((item, index) => {
            console.log(item)
            console.log(Fieds[item], getData[item]);
            return Fieds[item] = getData[item];
          })
          this.props.form.setFieldsValue(Fieds);
          this.setState({
            assetsRecordGuid: data.result.assetsRecordGuid,
            assetsRecord: data.result.assetsRecord,
            productType: data.result.productType
          });
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(ledger.getSelectAssetsRecordDetail, options)
  }
  doSerach = (e) =>{
    this.getAssetInfoAjax(e.target.value)
  }
  // 对原码切换进行判断
  radioTab = (e) => {
    this.setState({value: e.target.value});
    if (e.target.value === '00') {
      this.setState({disabled: true, prompt: '请输入后点击回车'});
    } else {
      this.setState({disabled: false, prompt: '请输入原码'});
    }
  }
  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'equipmentCode',
        width: 80,
        render: (text, record, index) => {
          return(
            <a onClick={()=>this.addEquipmentTable(record, 'equipmentVisible')}>添加</a>
          )
        }
      },
      {
        title: '证件号',
        dataIndex: 'registerNo',
        width: 80,
      },
      {
        title: '品牌',
        dataIndex: 'tfBrand',
        width: 80,
      },
      {
        title: '设备名称',
        dataIndex: 'equipmentName',
        width: 80,
      },
      {
        title: '型号',
        dataIndex: 'fmodel',
        width: 80,
      },
      {
        title: '规格',
        dataIndex: 'spec',
        width: 80,
      },
    ]
    const { equipmentVisible, dictionaryVisible, loading, res, disabled, prompt } = this.state;
    const { getFieldDecorator } = this.props.form;
    const query = this.state.query;
    return (
      <Content>
        <Affix>
          <div style={{background: '#fff', padding: '10px 20px', marginBottom: 4, display: 'flex', alignContent: 'center', justifyContent: 'flex-end'}}>
            <Button type="primary" onClick={this.save} >保存</Button>
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
          <SelectEquipmentModal query={this.queryHandle} />
          <RemoteTable
          ref='table' // 根据搜索后进行刷新列表
          showHeader={true}
          query={query}
          url={ledger.getSelectEquipmentList}
          columns={columns}
          rowKey={'equipmentCode'}
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
          <NewAddDictionaryModal ref='formDictionary' data={{record: this.state.record}} />
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
                {getFieldDecorator('registerNo', {
                  initialValue: res.registerNo
                })(<Input style={{width: 200}} disabled={true} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="资产名称" {...formItemLayout}>
                {getFieldDecorator('equipmentStandardName', {
                  initialValue: res.equipmentStandardName
                })(<Input style={{width: 200}} disabled={true} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="型号" {...formItemLayout}>
                {getFieldDecorator('fmodel', {
                  initialValue: res.fmodel
                })(<Input style={{width: 200}} disabled={true} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="规格" {...formItemLayout}>
                {getFieldDecorator('spec', {
                  initialValue: res.spec
                })(<Input style={{width: 200}} disabled={true} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="计量单位" {...formItemLayout}>
                {getFieldDecorator('meteringUnit', {
                  initialValue: res.meteringUnit
                })(<Input style={{width: 200}} disabled={true} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="品牌" {...formItemLayout}>
                {getFieldDecorator('tfBrand', {
                  initialValue: res.tfBrand
                })(<Input style={{width: 200}} disabled={true} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label={`复用原码`} {...formItemLayout}>
                {getFieldDecorator(`reuse`, {
                    initialValue: '01',
                    rules: [{required: true, message: '请选择复用原码'}]
                  })(
                  <RadioGroup onChange={this.radioTab}>
                    <Radio value={`00`}>是</Radio>
                    <Radio value={`01`}>否</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="原码" {...formItemLayout}>
                {getFieldDecorator('assetsRecord')(
                  <Input style={{ width: 200 }} placeholder={prompt} onPressEnter={this.doSerach} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label={`管理科室`} {...formItemLayout}>
              {getFieldDecorator('bDeptCode')(
                <Select
                showSearch
                onSearch={this.handleChangeManagement}
                style={{ width: 200 }} 
                defaultActiveFirstOption={false}
                showArrow={false}
                allowClear={true}
                filterOption={false}
                placeholder={`请搜索`}
                disabled={disabled}
              >
                {this.state.managementData.map(d => {
                return <Option value={d.value} key={d.text}>{d.text}</Option>
              })}
              </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`使用科室`} {...formItemLayout}>
                {getFieldDecorator('useDeptCode')(
                  <Select
                    showSearch
                    onSearch={this.handleChangeRollOut}
                    onSelect={this.getNewAddessInfo}
                    style={{ width: 200 }} 
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    allowClear={true}
                    filterOption={false}
                    placeholder={`请搜索`}
                    disabled={disabled}
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
                {getFieldDecorator('deposit')(<Input style={{width: 200}} disabled={disabled} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label={`保管人`} {...formItemLayout}>
              {getFieldDecorator('custodian')(
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
                    disabled={disabled}
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
                {getFieldDecorator('fOrgId')(
                  <Select
                    onChange={this.getOrgIdList}
                    style={{ width: 200 }} 
                    disabled={disabled}
                  >
                    {this.state.orgIdData.map(d=>{
                      return <Option value={d.value} key={d.text}>{d.text}</Option>
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="合同编号" {...formItemLayout}>
                {getFieldDecorator('contractNo')(<Input style={{width: 200}} disabled={disabled} placeholder={`请输入采购合同号`} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label={`出厂日期`} {...formItemLayout}>
                {getFieldDecorator('productionDate')(<DatePicker style={{width: 200}} disabled={disabled} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`购买金额`} {...formItemLayout}>
              {getFieldDecorator('buyPrice')(<Input style={{width: 200}} disabled={disabled} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="安装费用" {...formItemLayout}>
                {getFieldDecorator('installPrice')(<Input style={{width: 200}} disabled={disabled} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label={`购置日期`} {...formItemLayout}>
                {getFieldDecorator('buyDate', {
                  initialValue: null
                })(<DatePicker style={{width: 200}} disabled={disabled} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`生产商`} {...formItemLayout}>
              {getFieldDecorator('product')(<Input style={{width: 200}} disabled={disabled} placeholder={`请输入生产商`} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="生产国家" {...formItemLayout}>
                {getFieldDecorator('productCountry')(
                <Select placeholder={`请选择生产国家`} style={{width: 200}} disabled={disabled} onChange={(value)=>{this.setState({productCountry: value})}}>
                  <Option value={`01`}>国产</Option>
                  <Option value={`02`}>进口</Option>
                </Select>)}
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title={`折旧信息`}  bordered={false} className="min_card">
          <Row>
            <Col span={8}>
              <FormItem label="折旧方式" {...formItemLayout}>
              {getFieldDecorator(`depreciationType`)(
                  <Select placeholder={`请选择折旧方式`} style={{width: 200}} disabled={disabled} onChange={(value)=>{this.setState({depreciationType: value})}}>
                    <Option value={`01`}>{depreciationTypeData[`01`].text}</Option>
                    <Option value={`02`}>{depreciationTypeData[`02`].text}</Option>
                    <Option value={`03`}>{depreciationTypeData[`03`].text}</Option>
                    <Option value={`04`}>{depreciationTypeData[`04`].text}</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="净残值率" {...formItemLayout}>
                {getFieldDecorator('residualValueV')(<Input style={{width: 200}} disabled={disabled} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="预计使用年限" {...formItemLayout}>
                {getFieldDecorator('useLimit')(<Input style={{width: 200}} disabled={disabled} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="月折旧率" {...formItemLayout}>
                {getFieldDecorator('monthDepreciationV')(<Input style={{width: 200}} disabled={disabled} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="开始计提时间" {...formItemLayout}>
                {getFieldDecorator('depreciationBeginDate')(<DatePicker style={{width: 200}} disabled={disabled} />)}
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title={`其他信息`}  bordered={false} className="min_card">
          <Row>
            <Col span={8}>
              <FormItem label="有无备用" {...formItemLayout}>
              {getFieldDecorator(`spare`, {
                    initialValue: '00',
                  })(
                  <RadioGroup onChange={(e) => {this.setState({value: e.target.value})}} disabled={disabled}>
                    <Radio value={`00`}>有</Radio>
                    <Radio value={`01`}>无</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="保修截至" {...formItemLayout}>
                {getFieldDecorator('inDate')(<DatePicker style={{width: 200}} disabled={disabled} />)}
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title={`资金结构`}  bordered={false} className="min_card">
          <Row>
            <Col span={8}>
              <FormItem label="自筹资金" {...formItemLayout}>
                {getFieldDecorator('name1')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="财政拨款" {...formItemLayout}>
                {getFieldDecorator('name2')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="科研经费" {...formItemLayout}>
                {getFieldDecorator('name3')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="自筹资金原值" {...formItemLayout}>
                {getFieldDecorator('name4')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="财政拨款原值" {...formItemLayout}>
                {getFieldDecorator('name5')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="科研经费原值" {...formItemLayout}>
                {getFieldDecorator('name6')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="教学资金" {...formItemLayout}>
                {getFieldDecorator('name7')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="接收捐赠" {...formItemLayout}>
                {getFieldDecorator('name8')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="其他" {...formItemLayout}>
                {getFieldDecorator('name9')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="教学资金原值" {...formItemLayout}>
                {getFieldDecorator('name10')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="接收捐赠原值" {...formItemLayout}>
                {getFieldDecorator('name11')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="其他原值" {...formItemLayout}>
                {getFieldDecorator('name12')(<Input style={{width: 200}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="原值" {...formItemLayout}>
                {getFieldDecorator('original')(<Input style={{width: 200}} placeholder={`计算而得出`} />)}
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Content>
    )
  }
}
export default Form.create()(LedgerArchivesAdd);
