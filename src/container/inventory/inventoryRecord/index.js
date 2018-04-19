/**清查记录--列表*/
import React from 'react';
import { message , Row, Col, Input, Layout ,Button ,Select, Popover ,DatePicker ,Modal ,Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import TableGrid from '../../../component/tableGrid';
import inventory from '../../../api/inventory';
import request from '../../../utils/request';
import { upkeepState ,upkeepStateSel } from '../../../constants';
import { Link } from 'react-router-dom';
import querystring from 'querystring';
// import { timeToStamp } from '../../../utils/tools';
const Option = Select.Option;
const Search = Input.Search;
const { Content } = Layout;
const FormItem = Form.Item;
const { RemoteTable } = TableGrid;
const { RangePicker } = DatePicker;
// const sortTime = (a,b,key) =>{
//   if(a[key] && b[key]){
//     return timeToStamp(a[key]) - timeToStamp(b[key])
//   }
// }
const columns=[
  { title: '操作', 
  dataIndex: 'maintainGuid', 
  width:'5%',
  render: (text,record) =>
    <span>
      { (record.fstate==="00") ? 
        <span><Link to={{pathname:`/inventory/inventoryRecord/details/${record.maintainGuid}`}}>清查</Link></span>
        :<span><Link to={{pathname:`/inventory/inventoryRecord/details/${record.maintainGuid}`}}>详情</Link></span>
      }
    </span>
  },
  {
    title: '清查单号',
    dataIndex: 'maintainNo',
    width:'10%',
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '清查单状态',
    dataIndex: 'fstate',
    key: 'fstate',
    width:'5%',
    filters: upkeepStateSel,
    onFilter: (value, record) => (record && record.fstate===value),
    render: text => 
      <div><span style={{marginRight:5,backgroundColor:upkeepState[text].color ,width:10,height:10,borderRadius:'50%',display:'inline-block'}}></span>
        { upkeepState[text].text }
      </div>
  },
  {
    title: '创建时间',
    width:'8%',
    dataIndex: 'maintainDate',
    // sorter: (a, b) => sortTime(a,b,'maintainDate'),
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '制单人',
    dataIndex: 'modifyUserName',
    width:'8%',
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '清查方式',
    dataIndex: 'modifyUserNameha',
    width:'8%',
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '备注',
    dataIndex: 'equipmentName',
    width:'20%',
    render:(text,record) =>
      <Popover  content={
        <div style={{padding:20}}>
          <p>设备名称：{record.equipmentName}</p>
          <p>操作员：{record.modifyUserName}</p>
          <p>保养单状态：{upkeepState[record.fstate].text}</p>
        </div>
      }>
        {text}
      </Popover>
  },
]
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

class ModalForm extends React.Component{
	state={
    selectUseDepart:[],
    callbackData:{}
  }
  componentWillMount =()=>{
		this.getUseDepart();
	}
	onChange =(value)=>{
		console.log('onChange ', value, arguments);
		// this.props.callback(value);
	}

	handleChange = (value) => {
		console.log(`selected ${value}`);
	}
	checkTextLength = (rule, value, callback) => {//备注的验证规则	
		const { getFieldValue } = this.props.form;
		const mentions = getFieldValue('remark');
		if (!mentions || mentions.length < 5) {
			callback(new Error('请输入至少五个字符!'));
		} else {
			callback();
		}
  }
  //获取科室下拉框
	getUseDepart = (value) =>{
		let o;
		if(value){
			o={deptName:value,deptType:'00'}
		}else{
			o={deptType:'00'}
		}
    
		let options = {
			body:querystring.stringify(o),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: data => {
				if(data.status){
					this.setState({
						'selectUseDepart':data.result
					})
				}else{
					message.error(data.msg)
				}
			},
			error: err => {console.log(err)}
		}
		request(inventory.selectUseDeptList,options)
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
    this.props.callback(this.state.callbackData)
		console.log(this.state.callbackData)
  }
  
	render(){
		const { getFieldDecorator  } = this.props.form;
    const { selectUseDepart } = this.state;
		return(
			<Form>
				<FormItem
					{...formItemLayout}
					label="清查方式"
				>
					{getFieldDecorator('type', {
						rules: [{
							required: true, message: '请选择管理科室！',
						}],
					})(
            <Select>
              <Option value='0'>按管理科室</Option>
              <Option value='1'>按使用科室</Option>
            </Select>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="使用科室"
				>
					{getFieldDecorator('deptCode')(
            <Select
                placeholder="请输入资产分类"
                name='deptCode'
                mode="combobox"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.getUseDepart}
                onSelect={(v)=>this.setStateValue(v,'deptCode',selectUseDepart)}
                style={{ width: 250,marginBottom:15 }} 
              >
                {this.getOptions(selectUseDepart)}
              </Select>
					)}
				</FormItem>

				<FormItem label='备注' {...formItemLayout}>
					{getFieldDecorator(`remark`,{
						rules:[
							{/*validator: this.checkTextLength*/}
						]
					})(
						<TextArea placeholder='请输入至少五个字符' style={{resize:'none',height:120}} maxLength={500}></TextArea>
					)}
				</FormItem>
		</Form>
		)
	}
}
const ModalFormWapper = Form.create()(ModalForm);


class inventoryRecord extends React.Component{

    state = {
      query:{},
			visible:false,
			modalFormData:{}
    };
    queryHandler = (query) => {
      console.log(this.state.query)
      this.refs.table.fetch(this.state.query);
    }
    onChange = (date, dateString) => {
        let options ={
            startTime:dateString[0],
            endTime:dateString[1],
        }
        this.setState({
            query:Object.assign(this.state.query,options)
        })
    }
		handleOk = (e) => {
      console.log(e);
      console.log(this.state.modalFormData)
      let modalFormData = this.state.modalFormData
			this.refs.form.validateFields((err, values) => {
				if (!err) {
          values= Object.assign(values,modalFormData)
          console.log('Received values of form: ', values);
          this.sendSubmitAjax(values)
					
				}
			})
		}
		handleCancel = (e) => {
      console.log(e);
      this.refs.form.resetFields();
			this.setState({
				visible: false,
			});
    }
    sendSubmitAjax = (value) =>{
      let options = {
        body:querystring.stringify(value),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: data => {
          if(data.status){
            setTimeout(()=>{
              message.success( '操作成功')
              this.setState({
                visible: false,
              });
              this.refs.form.resetFields();
              this.refs.table.fetch();
            },300)
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      }
      request(inventory.submitInventoryOrders, options)
    }
    render(){
        const { query , visible , modalFormData } = this.state;
        return(
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
              <Row>
                  <Col span={12}>
                    <Search
                        placeholder="请输入清查单号"
                        onChange={(e) =>{  this.setState({'query':Object.assign(query,{'stockCountNo':e.target.value}) })   }}
                        style={{ width: 200 ,marginRight:15}}
                    />
                    <RangePicker onChange={this.onChange}  style={{ marginRight:15}} format='YYYY-MM-DD'/>
                    <Button type='primary' size='default' onClick={this.queryHandler}>查询</Button>
                  </Col> 
                  <Col span={12} style={{textAlign:'right'}}>
                    <Button type='primary' size='default' onClick={()=>{this.setState({visible:true})}}>新增清查 </Button>
                   
                  </Col>
              </Row>
              <RemoteTable
                  ref='table'
                  query={this.state.query}
                  url={inventory.queryStockCountList}
                  scroll={{x: '100%', y : document.body.clientHeight - 110 }}
                  columns={columns}
                  rowKey={'maintainGuid'}
                  showHeader={true}
                  style={{marginTop: 10}}
                  size="small"
              /> 

              <Modal
								visible={visible}
								onOk={this.handleOk}
								onCancel={this.handleCancel}
                title='新建清查'>
									<ModalFormWapper  ref='form' value={modalFormData}  callback={(modalFormData)=>{ this.setState({modalFormData}) }}></ModalFormWapper>
              </Modal>
            </Content>
        )
    }
}


export default inventoryRecord;