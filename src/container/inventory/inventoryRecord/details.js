/**资产盘点 --详情/盘点 */
import React, { Component } from 'react';
import {message , Affix , Alert , Row, Col, Input, Icon ,Card ,Form, Button ,Select , Modal} from 'antd'
import './style.css';
import TableGrid from '../../../component/tableGrid';
import querystring from 'querystring';
import assets from '../../../api/assets';
import basicdata from '../../../api/basicdata';
// import inventory from '../../../api/inventory';
import request from '../../../utils/request';
const { RemoteTable } = TableGrid;
const Option = Select.Option;
const FormItem = Form.Item;
const styles={
	mb:{
		marginBottom:15
	},
	affix:{
		display:'flex',
		alignContent:'center',
		justifyContent:'flex-end',
		background:'#fff',
		padding:'10px 20px',
		marginBottom:10,
	},
	default:{
		width:150
	}
}

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

//搜索表单内容
class AdvancedSearchForm extends React.Component {
  state = {
		expand: false,
		selectUseDepart:[],
		callbackData:{}
  };

	componentWillMount =()=>{
		this.getUseDepart();
	}

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
			console.log('Received values of form: ', values);
			console.log(this.state.callbackData)
			debugger
			let querystring = Object.assign(values,this.state.callbackData);
			this.props.callback(querystring)
    });
  }

  handleReset = () => {
	this.props.form.resetFields();
	this.setState({
		callbackData:{}
	})
	this.props.callback({})
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  //获取科室下拉框
	getUseDepart = (value) =>{
		let o;
		if(value){
			o={maintainTemplateName:value}
		}else{
			o=''
		}

		let options = {
			body:querystring.stringify(o),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: data => {
				if(data.status){
					let ret = []
					data.result.forEach(item => {
						let i ={
							value:item.maintainTemplateId,
							text:item.maintainTemplateName,
							key:item.detailNum
						}
						ret.push(i);
					});
					this.setState({
						'selectUseDepart':ret
					})
				}else{
					message.error(data.msg)
				}
			},
			error: err => {console.log(err)}
		}
		request(basicdata.queryOneModule,options)
	}

	getOptions = (selData)=>{
		if(selData){
			return(
				selData.map(d => <Option key={d.value} value={d.text}>{d.text}</Option>)
			)
		}
	} 
	setStateValue = (value,keyName,filterData)=>{
		let o =filterData.filter(item=>{
			return item.text===value
		})[0];

		let ret = o ? o.value :'';
		this.setState({
			callbackData:Object.assign(this.state.callbackData,{[keyName]:ret})
		})
		console.log(this.state.callbackData)
	}

  render() {
		const { getFieldDecorator } = this.props.form;
		const { expand ,selectUseDepart } = this.state;
	return (
		<Form
			className="ant-advanced-search-form"
					onSubmit={this.handleSearch}
					style={styles.mb}
		>
				<Row gutter={24}>
					<Col span={8} style={{ display: 'block'}}>
						<FormItem label={`资产编码`}>
							{getFieldDecorator(`zichanbianma`)(
								<Input placeholder="请输入资产编码" />
							)}
						</FormItem>
					</Col>
					<Col span={8} style={{ display: 'block'}}>
						<FormItem label={`资产名称`}>
							{getFieldDecorator(`zichanmingchen`)(
								<Input placeholder="请输入资产名称" />
							)}
						</FormItem>
					</Col>
					<Col span={8} className={ expand ? 'show':'hide' }>
						<FormItem label={`资产分类`}>
							{getFieldDecorator(`zichanfenlei`)(
								<Select
									placeholder="请输入资产分类"
									name='syks'
									mode="combobox"
									defaultActiveFirstOption={false}
									showArrow={false}
									filterOption={false}
									onSearch={this.getUseDepart}
									onSelect={(v)=>this.setStateValue(v,'zichanfenlei',selectUseDepart)}
									style={{ width: 250,marginBottom:15 }} 
								>
									{this.getOptions(selectUseDepart)}
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={8} className={ expand ? 'show':'hide' }>
						<FormItem label={`使用科室`}>
							{getFieldDecorator(`syks`)(
								<Select
									placeholder="请输入资产分类"
									name='syks'
									mode="combobox"
									defaultActiveFirstOption={false}
									showArrow={false}
									filterOption={false}
									onSearch={this.getUseDepart}
									onSelect={(v)=>this.setStateValue(v,'syks',selectUseDepart)}
									style={{ width: 250,marginBottom:15 }} 
								>
									{this.getOptions(selectUseDepart)}
								</Select>
							)}
						</FormItem>
					</Col>
				</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" onChange={this.handleSearch}>查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
						{expand ? '收起' : '展开'}  <Icon type={expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);


//变更信息表单内容
class ModalForm extends React.Component{
	state={
		selectUseDepart:[],//使用科室下拉
		selectStoreAddress:[],//存放地址下拉
		callbackData:{
			syks:'',
			bgr:'',
			cfdz:''
		}
	}
	onChange =(value)=>{
		console.log('onChange ', value, arguments);
		// this.props.callback(value);
	}

	handleChange = (value) => {
		console.log(`selected ${value}`);
	}

	componentWillMount = ()=>{
		this.getUseDepart()
	}

	//获取科室下拉框
	getUseDepart = (value) =>{
		let o;
		if(value){
			o={maintainTemplateName:value}
		}else{
			o=''
		}

		//置空存放地址
		this.resetStoreAddress();
		let options = {
			body:querystring.stringify(o),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: data => {
				if(data.status){
					let ret = []
					data.result.forEach(item => {
						let i ={
							value:item.maintainTemplateId,
							text:item.maintainTemplateName,
							key:item.detailNum
						}
						ret.push(i);
					});
					this.setState({
						'selectUseDepart':ret
					})
				}else{
					message.error(data.msg)
				}
			},
			error: err => {console.log(err)}
		}
		request(basicdata.queryOneModule,options)
	}

	//点击使用科室时 获取对应的地址下拉框
	changeSelectStoreAddress = (value)=>{
		//此处的value为使用科室的keys
		let o =this.state.selectUseDepart.filter(item=>{
			return item.text===value
		})[0];
		let json='';
		this.setStateValue(value,'syks',this.state.selectUseDepart)
		if(o){
			
			json ={
				'maintainTemplateId':o.value
			}
		}
		this.resetStoreAddress()
		let options = {
			body:querystring.stringify(json),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: data => {
				if(data.status){
					let ret = []
					data.result.forEach(item => {
						let i ={
							value:item.templateDetailGuid,
							text:item.templateTypeName,
							key:item.maintainTypeId
						}
						ret.push(i);
					});
					this.setState({
						'selectStoreAddress':ret
					})
				}else{
					message.error(data.msg)
				}
			},
			error: err => {console.log(err)}
		}
		request(basicdata.queryTwoModule,options)
	}

	setStateValue = (value,keyName,filterData)=>{
		let o =filterData.filter(item=>{
			return item.text===value
		})[0];

		let ret = o ? o.value :'';
		this.setState({
			callbackData:Object.assign(this.state.callbackData,{[keyName]:ret})
		})
		console.log(this.state.callbackData)
		this.props.callback(this.state.callbackData);
	}

	//重置存放地址
	resetStoreAddress= ()=>{
		this.props.form.resetFields('shiyongkeshi')
		this.setState({
			selectStoreAddress:[]
		})
	}

	getOptions = (selData)=>{
		if(selData){
			return(
				selData.map(d => <Option key={d.value} value={d.text}>{d.text}</Option>)
			)
		}
	} 

	render(){
		const { getFieldDecorator  } = this.props.form;
		const { selectUseDepart , selectStoreAddress } =this.state;
	
		return(
			<Form ref='ModalForm'>
				<FormItem
					{...formItemLayout}
					label="实盘使用科室"
				>
					{getFieldDecorator('syks', {
						rules: [{
							required: true, message: '请选择实盘使用科室！',
						}],
					})(
						<Select
							name='syks'
							mode="combobox"
							defaultActiveFirstOption={false}
							showArrow={false}
							filterOption={false}
							onSearch={this.getUseDepart}
							onSelect={this.changeSelectStoreAddress}
							style={{ width: 250,marginBottom:15 }} 
						>
							{this.getOptions(selectUseDepart)}
						</Select>
					)}
				</FormItem>
				
				
				<FormItem
					{...formItemLayout}
					label="实盘存放地址"
				>
					{getFieldDecorator('cfdz')(
						<Select
							mode="combobox"
							defaultActiveFirstOption={false}
							showArrow={false}
							filterOption={false}
							/*onSearch={this.getUseDepart}
							*/
							onSelect={(v)=>this.setStateValue(v,'cfdz',selectStoreAddress)}
							style={{ width: 250,marginBottom:15 }} 
						>
						{this.getOptions(selectStoreAddress)}
						</Select>
					)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="实盘保管人"
				>
					{getFieldDecorator('bgr')(
						<Select
							mode="combobox"
							defaultActiveFirstOption={false}
							showArrow={false}
							filterOption={false}
							onSearch={this.getUseDepart}
							onSelect={(v)=>this.setStateValue(v,'bgr',selectUseDepart)}
							style={{ width: 250,marginBottom:15 }} 
						>
							{this.getOptions(selectUseDepart)}
						</Select>
					)}
				</FormItem>
				
		</Form>
		)
	}
}
const ModalFormWapper = Form.create()(ModalForm);

const messageInfo = '全部：10000 条     已盘：9000 条    未盘：1000 条  ';

const mockData={
	glks:'管理科室',
	syks:'使用科室',
	zcfl:'资产分类',
	gzrq:['2018-04-12','2018-04-16'],
	Guid:'',
	inventoryList:[
		{
			key: '1',
			name: 'John Brown',
			ftate: '01',
			address: 'New York No. 1 Lake Park',
		}, {
			key: '2',
			name: 'Jim Green',
			ftate: '02',
			address: 'London No. 1 Lake Park',
		}, {
			key: '3',
			name: 'Joe Black',
			ftate: '00',
			address: 'Sidney No. 1 Lake Park',
		}
	]

}
class inventoryDetails extends Component {

	state={
		detailsId:'',
		multiSelect:['0-0'],
		infoChangeModalVisible:false,
		infoChangeModalData:{},//信息变更的弹窗信息
		queryJson:{},//搜索栏目关键字
		handleRecord:{},
		editState:true,
		data:{}
	}
	componentWillMount = ()=>{
		this.setState({
			detailsId:this.props.match.params.id,
		})
		let key = this.props.match.params.id;
		this.getDetailsAjax(key);
	}

	getDetailsAjax =(key)=>{
		// let options = {
		// 	body:querystring.stringify(key),
		// 	headers:{
		// 		'Content-Type': 'application/x-www-form-urlencoded'
		// 	},
		// 	success: data => {
		// 		if(data.status){
		// 			let retData = data.result;
		// 			//拿到回显数据
		// 			// this.setState({
		// 			// 	data:mockData,
		// 			//  editState:false//ture
		// 			// })
		// 			//并且在这里更改editState的值

		// 		}else{
		// 			message.error(data.msg)
		// 		}
		// 	},
		// 	error: err => {console.log(err)}
		// }
		//request(inventory.getAssetInfo, options);
		this.setState({
			data:mockData,
			queryJson:Object.assign(this.state.queryJson,{'maintainNo':mockData.Guid})
		})
	}

	//查询内容
	queryTable = (queryJson)=>{
		debugger
		this.setState({queryJson})
		console.log('在此处发出对应的搜索内容,并刷新table')
		queryJson.maintainNo ='BY180411000002'
		this.refs.table.fetch(queryJson)
	}

	//资产信息-实盘操作变更
	infoChange = (val,record) =>{
		switch (val){
			case '00':
				 console.log('正常再用-需要在这里发出一个单条保存请求')
				 this.sigleAssign('00',record)
				break;
			case '01':
				console.log('丢失-需要在这里发出一个单条保存请求')
				this.sigleAssign('01',record)
			 	break;	
			case '02':
				console.log('信息变更--保存该条信息,执行弹窗操作,若弹窗确定-单条保存请求,否,则将该条下拉框清空为"" ')
				this.setState({infoChangeModalVisible:true,handleRecord:record})
				break;	
			default:
				return
		}
	}

	sigleAssign = (state,record,values)=>{
		let handleRecord ;
		if(record){
			handleRecord = record ; 
		}else{
			handleRecord = this.state.handleRecord ; 
		}
		let ret = this.state.data.inventoryList.filter(item=>{
			if( item.key===handleRecord.key){
				item.fstate=state	
			}
			return  item.key===handleRecord.key
		})
		console.log('filter Array ', ret[0])
		//每次操作完成之后 ，此处需要发出单条保存请求
		this.sigleSubmit(state,handleRecord,values)
	}

	sigleSubmit = (state,record,values) =>{
		console.log('savestate:',state)
		console.log('saveRecord:',record)
		if(state==='02'){
			console.log('此处是信息变更时候的信息：',values)
		}


	}

	modalHandleOk = (e) => {
		console.log(this.state.infoChangeModalData)//此处为带有key值的表单内容
		let jons = this.state.infoChangeModalData;
		this.refs.form.validateFields((err, values) => {
			if (!err) {
				// console.log('Received values of form: ', values);
				this.refs.form.resetFields();
				this.setState({
					infoChangeModalVisible: false,
					infoChangeModalData:jons
				});
				this.sigleAssign('02',null,values)
			}
		})
	}

	modalHandleCancel = (e) => {
		//再点击确定的时候=更改data的age状态内容
		this.sigleAssign('')
		this.refs.form.resetFields();
		this.setState({
			infoChangeModalVisible: false,
		});
	}
	
  render() {
		const { infoChangeModalVisible , infoChangeModalData , editState , data} = this.state;
		const columns =[
			{
			title: '序号',
			key: 'index',
			fixed: 'left',
			width:60,
			render: (text,record,index) => {return `${index+1}`},
		},
		{
			title: '实盘操作',
			key: 'maintainGuid',
			dataIndex: 'maintainGuid',
			fixed: 'left',
			width:180,
			render: (text,record,index) => {
				if(editState){
					return(
						<Select 
						style={styles.default} 
						value={record.fstate} 
						defaultValue=''
						 onSelect={(val)=>this.infoChange(val,record)}
						>
							<Option value=''>请选择</Option>
							<Option value='00'>正常在用</Option>
							<Option value='01'>丢失</Option>
							<Option value='02'>信息变更</Option>
						</Select>
					)	
				}else{
					return (<span>未盘点 {text}</span>)
				}
			},
		},{
			title: '资产分类',
			key: 'equipmentName',
			dataIndex: 'equipmentName',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '资产编码',
			key: 'maintainType',
			dataIndex: 'maintainType',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '资产名称',
			key: 'maintainPlanDate',
			dataIndex: 'maintainPlanDate',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '型号',
			key: 'maintainDate',
			dataIndex: 'maintainDate',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '规格',
			key: 'maintainPlanNo',
			dataIndex: 'maintainPlanNo',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '使用科室',
			key: 'modifyUserName',
			dataIndex: 'modifyUserName',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '存放地址',
			key: 'nextMaintainDate',
			dataIndex: 'nextMaintainDate',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '保管人',
			key: 'baoguanren',
			dataIndex: 'baoguanren',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '账面状态',
			key: 'zhangmianzhuangtai',
			dataIndex: 'zhangmianzhuangtai',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '实盘使用科室',
			key: 'shipanshiyongkeshi',
			dataIndex: 'shipanshiyongkeshi',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '实盘存放地址',
			key: 'shipancunfangdizhi',
			dataIndex: 'shipancunfangdizhi',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '实盘保管人',
			key: 'shipanbaoguanren',
			dataIndex: 'shipanbaoguanren',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '盘点人',
			key: 'pandianren',
			dataIndex: 'pandianren',
			width:200,
			render:(text)=><span title={text}>{text}</span>
		}]
    return (
			<div style={{padding:20}} >
				{
					editState?
					<Affix>
						<div style={styles.affix}>
							<Button type="primary" onClick={()=>this.handleSubmit('20')}>保存计划</Button>
						</div>
					</Affix>
					:''
				}

				<Card title='盘点信息' style={styles.mb}>
					<Row style={styles.mb}>
						<Col span={8}>
							管理科室:{data.glks}
						</Col>
						<Col span={8}>
							使用科室:{data.syks}
						</Col>
						<Col span={8}>
							资产分类:{data.zcfl}
						</Col>
					</Row>
					<Row style={styles.mb}>
						<Col span={8}>
							购置日期:{data.gzrq[0]} —— {data.gzrq[1]}
						</Col>
					</Row>
				</Card>

				<Card title='资产信息'>
					<WrappedAdvancedSearchForm formInfo ='' callback={(queryJson)=>{this.queryTable(queryJson)}}></WrappedAdvancedSearchForm>
					<Alert message={messageInfo} type="info" showIcon  style={styles.mb}/>
						<RemoteTable
								ref='table'
								query={this.state.queryJson}
								url={assets.selectMaintainOrderList}
								scroll={{x: '250%', y : document.body.clientHeight - 110 }}//187
								columns={columns}
								rowKey={'maintainGuid'}
								showHeader={true}
								style={{marginTop: 10}}
								size="small"
						/> 
				</Card>
				
				<Modal 
					visible={infoChangeModalVisible}
					onOk={this.modalHandleOk}
					onCancel={this.modalHandleCancel}
					title='信息变更'>
					<ModalFormWapper  ref='form' value={infoChangeModalData}  callback={(infoChangeModalData)=>{ this.setState(infoChangeModalData) }}></ModalFormWapper>
				</Modal>
			</div>
    )
  }
}
export default inventoryDetails;