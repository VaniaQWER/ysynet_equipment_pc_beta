/*
 * @Author: yuwei - 财务结账 - financialClosing
 * @Date: 2018-07-18 13:56:06 
* @Last Modified time: 2018-07-18 13:56:06 
 */
import React , { Component } from 'react';
import { Layout, Form, Row, Col, Button, Select,DatePicker,Modal,message} from 'antd';
import financialControl from '../../../api/financialControl';
import { fetchData } from '../../../utils/tools';
import { Link } from 'react-router-dom';
import RemoteTable from '../../../component/tableGrid/remote';
import querystring from 'querystring';
import moment from 'moment';
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker , MonthPicker } = DatePicker;
/** 挂载查询表单 */
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
class SearchForm extends React.Component{

	handleSearch = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			for (let item in values){
				if(Array.isArray(values[item])){
					if(values[item].length===0){
						delete values[item]
					}
				}else{
					switch(values[item]){
						case "":
							delete values[item]
							break 
						case null:
							delete values[item]
							break
						case undefined:
							delete values[item]
							break
						default:
							break 
					}
				}
			}
			if(values.acctYh){
				values.acctYhStart = values.acctYh === undefined ? null : values['acctYh'][0].format('YYYY-MM');
				values.acctYhEnd = values.acctYh === undefined ? null :  values['acctYh'][1].format('YYYY-MM');
			}
			console.log('查询条件: ', values);
			this.props.query(values);
		});
	}
      
	resetFields = () => {
		const storageData  = this.props.storageOptions;
		this.props.form.resetFields();
		this.props.query({bDeptId: storageData[0].value});
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const storageData  = this.props.storageOptions;
	
    return (
			<Form onSubmit={this.handleSearch}>
				<Row>
					<Col span={6} key={1}>
						<FormItem {...formItemLayout} label={'管理部门'}>
							{
								getFieldDecorator(`bDeptId`,{
									initialValue: storageData.length > 0 ? storageData[0].value : null
								})(
									<Select
												showSearch
												placeholder={'请选择'}
												optionFilterProp="children"
												filterOption={(input, option)=>this.filterOption(input, option)}
											>
											{
												storageData.map((item,index)=>
														<Option key={index} value={item.value}>{item.text}</Option>
												)
											}
									</Select>
								)
							}
						</FormItem>
					</Col>
					<Col span={6} key={2}>
						<FormItem {...formItemLayout} label={'会计月'}>
							{getFieldDecorator('acctYh')(
								<RangePicker  format={'YYYY-MM'}></RangePicker>
							)}
						</FormItem>
					</Col>

					<Col span={4} key={5} style={{textAlign:'right'}}>
						<Button type="primary" htmlType="submit" style={{marginRight:8}}>搜索</Button>
						<Button onClick={()=>this.resetFields()}>重置</Button>
					</Col>
				</Row>
			</Form>
			)
	}
}
const SearchBox = Form.create()(SearchForm);

class FinancialClosing extends Component{
    state = {
        query :{},
        visible:false,
				storageOptions:[],//弹出层- 管理部门
				checkAmount:0
		}
    componentWillMount (){
			fetchData(financialControl.selectUseDeptList, querystring.stringify({deptType:"01"}), data => {
				const result = data.result;
				const options = [];
				if (result.length) {
					result.map((item) => options.push({value: item.value, text: item.text}));
					this.setState({ storageOptions: options ,query:{bDeptId:result[0].value}});
					this.getSumInvoiceNotAcctCountMoney({bDeptId:result[0].value})
				}
			})
		}
		
		// 获取未结账金额
		getSumInvoiceNotAcctCountMoney = (bDeptIdJson) =>{
			fetchData(financialControl.sumInvoiceNotAcctCountMoney, querystring.stringify(bDeptIdJson), data => {
				if(data.status){
					this.setState({checkAmount:data.result})
				}else{
					message.warn(data.msg)
				}
			})
		}

		// header - 搜索
    queryHandler = (query) => {
			this.refs.table.fetch(query);
			this.setState({ query })
		}
		
		//新增结账
		submitClose = () =>{
			this.props.form.validateFieldsAndScroll((err,value)=>{
				if(!err){
					if(value.acctYh){
						value.acctYh = moment(value.acctYh).format('YYYYMM');
					}
					console.log('确认结账的数据',JSON.stringify(value))
					fetchData(financialControl.invoiceSettleAccount, querystring.stringify(value), data => {
						if(data.status){
							this.setState({visible:false})
							this.refs.table.fetch(this.refs.headerSearch.getFieldsValue());
						}else{
							message.warn(data.msg)
						}
					})
				}
			})
		}

		// 弹窗时间限制
		disabledDate = (current) =>{
			// Can not select days before today and today
			return current && current < moment().endOf('day');
		}

		getNow = () =>{
			let d = new Date();
			let Y = d.getFullYear();
			let m = d.getMonth()+1;
			let M = m > 10 ? m : `0${m}`;
			console.log(`${Y}-${M}`)
			return `${Y}-${M}`
		}

    render(){
        const columns = [
            {
            title : '操作',
            dataIndex : 'action',
            width: 80,
            render : (text,record)=>{
                //`/finance/finance/show`, {...record,storageGuid:this.state.query.storageGuid}
                return <Link to={{pathname:"/finance/finance/details",state:{...record,storageGuid:this.state.query.storageGuid}}}>
                        详情
                    </Link>
            }
            },{
                title : '会计月',
                dataIndex : 'acctYh',
                width: 180,
            
            },{
                title : '结账金额',
                dataIndex : 'money',
                width: 100,
            },{
                title : '结账操作员',
                dataIndex : 'acctUserName',
                width: 150,
            },{
                title : '结帐时间',
                dataIndex : 'acctDate',
                width: 150,
            }
        ];
        const { getFieldDecorator } = this.props.form;
        const { query , visible , storageOptions , checkAmount} =  this.state;
        return(
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
								<SearchBox ref='headerSearch' query={this.queryHandler} storageOptions={storageOptions}/>
								<Button type="primary" onClick={()=>this.setState({visible:true})}>新增结账</Button>
								{
									query.bDeptId ?
									<RemoteTable 
                    style={{marginTop:20}}
                    showHeader={true}
                    query={query}
                    ref='table'
                    columns={columns}
                    url={financialControl.selectInvoiceByMonth}
                    rowKey='invoiceId'
                    scroll={{ x: '100%' }}
                />:null
								}
								
                <Modal
                    title="结账"
										visible={visible}
										destroyOnClose={true}
										onCancel={()=>this.setState({visible:false})}
										onOk={()=>this.submitClose()}
									>
                    <Form>
                        <FormItem label={`管理部门`} {...formItemLayout}>
                            {getFieldDecorator(`bDeptId`, {
															initialValue: storageOptions.length ? storageOptions[0].value : null,
															rules:[{required:true,message:'请选择管理部门！'}]
                            })(
                            <Select 
                                style={{width: 200}} 
                                showSearch
                                placeholder={'请选择'}
                                optionFilterProp="children"
																filterOption={(input, option)=>this.filterOption(input, option)}
																onSelect={(input, option)=>{
																	this.getSumInvoiceNotAcctCountMoney({bDeptId:input})
																}}
																>
                                {
                                storageOptions.map((item, index) => (
                                    <Option key={index} value={item.value}>{ item.text }</Option>
                                ))
                                }
                            </Select>
                            )}
                        </FormItem>
                        <div>
                            <div className="ant-row ant-form-item">
                                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-6">
                                    <label>结账金额</label>
                                </div>
                                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                    <div className="ant-form-item-control">{checkAmount?checkAmount.toFixed(2):'0.00'}</div>
                                </div>
                            </div>
                        </div>
                        <FormItem label={`会计月`} {...formItemLayout}>
                            {getFieldDecorator(`acctYh`, {
															initialValue:moment(this.getNow(), 'YYYY-MM') ,
															rules:[{required:true,message:'请选择会计月！'}]
                            })(
																<MonthPicker  
																// monthCellContentRender={
																// 	(date, locale)=>{

																// 		debugger	
																// 		return  <span>123123</span>
																// 	}
																// }
																// disabledDate={(current)=>this.disabledDate(current)}
																></MonthPicker>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </Content>
        )
    }
}
export default Form.create()(FinancialClosing);