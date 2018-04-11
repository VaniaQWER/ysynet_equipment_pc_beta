/**资产盘点 --详情/盘点 */
import React, { Component } from 'react';
import {Table ,Affix , message ,TreeSelect , Alert , Row, Col, Input, Icon ,Card ,Form, Button , Radio ,Select ,DatePicker ,Upload ,Modal} from 'antd'
import './style.css';
const Option = Select.Option;
const FormItem = Form.Item;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
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
const treeData = [{
  label: 'Node1',
  value: 'Node1',
  key: '0-0',
}, {
  label: 'Node2',
  value: 'Node2',
  key: '0-1',
}, {
  label: 'Node3',
  value: 'Node3',
  key: '0-3',
}, {
  label: 'Node4',
  value: 'Node4',
  key: '0-4',
},
{
  label: 'Node5',
  value: 'Node5',
  key: '0-5',
},
{
  label: 'Node6',
  value: 'Node6',
  key: '0-6',
},{
  label: 'Node7',
  value: 'Node7',
  key: '0-7',
},
];

const treeData1 = [{
  label: '啊',
  value: '啊',
  key: '1',
  children: [{
    label: '哈哈哈',
    value: '哈哈哈',
    key: '1-1',
  }],
}];

//搜索表单内容
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {
		const { getFieldDecorator } = this.props.form;
		const { expand  } = this.state;
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
								<Input placeholder="请输入资产分类" />
							)}
						</FormItem>
					</Col>
					<Col span={8} className={ expand ? 'show':'hide' }>
						<FormItem label={`使用科室`}>
							{getFieldDecorator(`zichanfenlei`)(
								<Input placeholder="请输入使用科室" />
							)}
						</FormItem>
					</Col>
				</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
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
	}
	onChange =(value)=>{
		console.log('onChange ', value, arguments);
		// this.props.callback(value);
	}

	handleChange = (value) => {
		console.log(`selected ${value}`);
	}
	render(){
		const { getFieldDecorator  } = this.props.form;
		const tProps = {
      treeData:treeData,
      onChange: this.onChange,
      treeCheckable: true,
      searchPlaceholder: '默认全部',
		};
		
		const tProps0 ={
			treeData:treeData,
      onChange: this.onChange,
      treeCheckable: true,
      // showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请输入科室名称进行搜索',
		}
		const tProps1 = {
      treeData:treeData1,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请输入资产分类进行搜索',
		};
	
		return(
			<Form>
				<FormItem
					{...formItemLayout}
					label="实盘使用科室"
				>
					{getFieldDecorator('email', {
						rules: [{
							required: true, message: '请选择实盘使用科室！',
						}],
					})(
						<TreeSelect {...tProps}/>
					)}
				</FormItem>
				
				
				<FormItem
					{...formItemLayout}
					label="实盘存放地址"
				>
					{getFieldDecorator('shiyongkeshi')(
						<TreeSelect {...tProps0} />
					)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="实盘保管人"
				>
					{getFieldDecorator('zichanfenle')(
						<TreeSelect {...tProps1}/>
					)}
				</FormItem>
				
		</Form>
		)
	}
}

const ModalFormWapper = Form.create()(ModalForm);


const messageInfo = '全部：10000 条     已盘：9000 条    未盘：1000 条  ';

const data = [{
  key: '1',
  name: 'John Brown',
  age: '',
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: '',
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: '',
  address: 'Sidney No. 1 Lake Park',
}];
class inventoryDetails extends Component {

	state={
		detailsId:'',
		multiSelect:['0-0'],
		infoChangeModalVisible:false,
		handleRecord:{}
	}
	componentWillMount = ()=>{
		this.setState({
			detailsId:this.props.match.params.id,
			
		})
	}
	//资产信息-实盘操作变更
	infoChange = (val,record) =>{
		switch (val){
			case '00':
				 console.log('正常再用-需要在这里发出一个单条保存请求')
				 this.sigleAssign('00')
				break;
			case '01':
				console.log('丢失-需要在这里发出一个单条保存请求')
				this.sigleAssign('01')
			 	break;	
			case '02':
				console.log('信息变更--保存该条信息,执行弹窗操作,若弹窗确定-单条保存请求,否,则将该条下拉框清空为"" ')
				this.setState({infoChangeModalVisible:true,handleRecord:record})
				break;	
			default:
				return
		}
	}

	sigleAssign = (state)=>{
		let handleRecord = this.state.handleRecord;
		let ret = data.filter(item=>{
			if(item.key===handleRecord.key){
				item.age=state	
			}
			return  item.key===handleRecord.key
		})
		console.log('filter Array ', ret[0])
		//每次操作完成之后 ，此处需要发出单条保存请求
	}

	modalHandleOk = (e) => {
		this.refs.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.sigleAssign('02')
				this.setState({
					infoChangeModalVisible: false,
				});
			}
		})
	}

	modalHandleCancel = (e) => {
		//再点击确定的时候=更改data的age状态内容
		this.sigleAssign('')
		this.setState({
			infoChangeModalVisible: false,
		});
	}
	
  render() {
		const { infoChangeModalVisible , multiSelect } = this.state;
		const columns =[{
			title: '序号',
			key: 'index',
			fixed: 'left',
			width:60,
			render: (text,record,index) => {return `${index+1}`},
		},{
			title: '实盘操作',
			key: 'age',
			dataIndex: 'age',
			fixed: 'left',
			width:150,
			render: (text,record,index) => {
				return(
					<Select style={styles.default} value={record.age} defaultValue='' onChange={(val)=>this.infoChange(val,record)}>
						<Option value=''>请选择</Option>
						<Option value='00'>正常在用</Option>
						<Option value='01'>丢失</Option>
						<Option value='02'>信息变更</Option>
					</Select>
				)
			},
		},{
			title: '资产分类',
			key: 'address',
			dataIndex: 'address',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '资产编码',
			key: 'zichanbianma',
			dataIndex: 'zichanbianma',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '资产名称',
			key: 'zichanmingchen',
			dataIndex: 'zichanmingchen',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '型号',
			key: 'xinghao',
			dataIndex: 'xinghao',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '规格',
			key: 'guige',
			dataIndex: 'guige',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '使用科室',
			key: 'shiyongkeshi',
			dataIndex: 'shiyongkeshi',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '存放地址',
			key: 'cunfangdizhi',
			dataIndex: 'cunfangdizhi',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '保管人',
			key: 'baoguanren',
			dataIndex: 'baoguanren',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '账面状态',
			key: 'zhangmianzhuangtai',
			dataIndex: 'zhangmianzhuangtai',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '实盘使用科室',
			key: 'shipanshiyongkeshi',
			dataIndex: 'shipanshiyongkeshi',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '实盘存放地址',
			key: 'shipancunfangdizhi',
			dataIndex: 'shipancunfangdizhi',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '实盘保管人',
			key: 'shipanbaoguanren',
			dataIndex: 'shipanbaoguanren',
			render:(text)=><span title={text}>{text}</span>
		},{
			title: '盘点人',
			key: 'pandianren',
			dataIndex: 'pandianren',
			render:(text)=><span title={text}>{text}</span>
		}]
    return (
			<div style={{padding:20}} >
				<Affix>
					<div style={styles.affix}>
						<Button type="primary" onClick={()=>this.handleSubmit('20')}>保存计划</Button>
					</div>
				</Affix>

				<Card title='盘点信息' style={styles.mb}>
					<Row style={styles.mb}>
						<Col span={8}>
							管理科室:XXX
						</Col>
						<Col span={8}>
							使用科室:XXX
						</Col>
						<Col span={8}>
							资产分类:XXX
						</Col>
					</Row>
					<Row style={styles.mb}>
						<Col span={8}>
							购置日期:2018-04-10 —— 2018-05-10
						</Col>
					</Row>
				</Card>

				<Card title='资产信息'>
					<WrappedAdvancedSearchForm formInfo ='' ></WrappedAdvancedSearchForm>
					<Alert message={messageInfo} type="info" showIcon  style={styles.mb}/>
					<Table
						scroll={{x:'150%'}}
						columns={columns}
						dataSource={data} />
				</Card>
				
				<Modal 
					visible={infoChangeModalVisible}
					onOk={this.modalHandleOk}
					onCancel={this.modalHandleCancel}
					title='信息变更'>
					<ModalFormWapper  ref='form' value={multiSelect}  callback={(multiSelect)=>{ this.setState(multiSelect) }}></ModalFormWapper>
				</Modal>
			</div>
    )
  }
}
export default inventoryDetails;