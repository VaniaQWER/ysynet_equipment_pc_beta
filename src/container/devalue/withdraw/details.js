/**折旧计提 --详情 */
import React, { Component } from 'react';
import {message ,Row, Col, Input, Icon ,Card ,Form, Button ,Select } from 'antd'

import TableGrid from '../../../component/tableGrid';
import querystring from 'querystring';
import devalue from '../../../api/devalue';
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
						<FormItem label={`资产名称`}>
							{getFieldDecorator(`zichanmingchen`)(
								<Input placeholder="请输入资产名称" />
							)}
						</FormItem>
					</Col>
					<Col span={8} style={{ display: 'block'}}>
						<FormItem label={`资产编码`}>
							{getFieldDecorator(`zichanbianma`)(
								<Input placeholder="请输入资产编码" />
							)}
						</FormItem>
					</Col>
					
					<Col span={8} className={ expand ? 'show':'hide' }>
						<FormItem label={`使用科室`}>
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

const mockData={
	glks:'管理科室',
	syks:'使用科室',
	zcfl:'资产分类',
	gzrq:['2018-04-12','2018-04-16'],
	Guid:'',
}
class WithDrawDetails extends Component {

	state={
		detailsId:'',
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


  render() {
		const columns =[
			{
			title: '序号',
			key: 'index',
			width:50,
			render: (text,record,index) => {return `${index+1}`},
		},
		{
			title: '资产编号',
			key: 'maintainNo',
			dataIndex: 'maintainNo',
			width:100,
			render: (text,record,index) => <span>{text}</span>
		},{
			title: '资产名称',
			key: 'maintainPlanDate',
			dataIndex: 'maintainPlanDate',
			width:100,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '型号',
			key: 'maintainDate',
			dataIndex: 'maintainDate',
			width:100,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '规格',
			key: 'maintainPlanNo',
			dataIndex: 'maintainPlanNo',
			width:100,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '使用科室',
			key: 'modifyUserName',
			dataIndex: 'modifyUserName',
			width:100,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '存放地址',
			key: 'nextMaintainDate',
			dataIndex: 'nextMaintainDate',
			width:100,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '月折旧率',
			key: 'yuezhejiulv',
			dataIndex: 'yuezhejiulv',
			width:80,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '资金来源',
			key: 'zijinlaiyuan',
			dataIndex: 'zijinlaiyuan',
			width:80,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '月折旧金额',
			key: 'shipancunfangdizhi',
			dataIndex: 'shipancunfangdizhi',
			width:80,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '累计折旧金额',
			key: 'shipanbaoguanren',
			dataIndex: 'shipanbaoguanren',
			width:80,
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '净值',
			key: 'pandianren',
			dataIndex: 'pandianren',
			width:80,
			render:(text)=><span title={text}>{text}</span>
		}]
    return (
			<div style={{padding:20}} >
				<Card title='资产信息'>
					<WrappedAdvancedSearchForm formInfo ='' callback={(queryJson)=>{this.queryTable(queryJson)}}></WrappedAdvancedSearchForm>
					
					<RemoteTable
							ref='table'
							query={this.state.queryJson}
							url={devalue.getDetailTable}
							scroll={{x: '150%', y : document.body.clientHeight - 110 }}//187
							columns={columns}
							rowKey={'maintainGuid'}
							showHeader={true}
							style={{marginTop: 10}}
							size="small"
					/> 
				</Card>
			</div>
    )
  }
}

export default WithDrawDetails;