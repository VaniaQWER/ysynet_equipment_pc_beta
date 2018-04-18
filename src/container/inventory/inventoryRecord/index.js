/**清查记录--列表*/
import React from 'react';
import { message , Row, Col, Input, Layout ,Button , Popover ,DatePicker ,Modal ,Form ,TreeSelect} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import TableGrid from '../../../component/tableGrid';
import assets from '../../../api/assets';
import inventory from '../../../api/inventory';
import request from '../../../utils/request';
import { upkeepState ,upkeepStateSel } from '../../../constants';
import { Link } from 'react-router-dom';
// import { timeToStamp } from '../../../utils/tools';
import moment from 'moment';
const Search = Input.Search;
const { Content } = Layout;
const FormItem = Form.Item;
const { RemoteTable } = TableGrid;
const { RangePicker } = DatePicker;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
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
        <span><Link to={{pathname:`/inventory/inventoryRecord/details/${record.maintainGuid}`}}>盘点</Link></span>
        :<span><Link to={{pathname:`/inventory/inventoryRecord/details/${record.maintainGuid}`}}>详情</Link></span>
      }
    </span>
  },
  {
    title: '盘点单号',
    dataIndex: 'maintainNo',
    width:'10%',
    render(text, record) {
      return <span title={text}>{text}</span>
    }
  },
  {
    title: '盘点单状态',
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
	checkTextLength = (rule, value, callback) => {//备注的验证规则	
		const { getFieldValue } = this.props.form;
		const mentions = getFieldValue('remark');
		if (!mentions || mentions.length < 5) {
			callback(new Error('请输入至少五个字符!'));
		} else {
			callback();
		}
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
					label="管理科室"
				>
					{getFieldDecorator('email', {
						rules: [{
							required: true, message: '请选择管理科室！',
						}],
					})(
						<TreeSelect {...tProps}  id='email' />
					)}
				</FormItem>
				
				
				<FormItem
					{...formItemLayout}
					label="使用科室"
				>
					{getFieldDecorator('shiyongkeshi')(
						<TreeSelect {...tProps0}  id='email' />
					)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="资产分类"
				>
					{getFieldDecorator('zichanfenle')(
						<TreeSelect {...tProps1}  id='email' />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="购置日期"
				>
					{getFieldDecorator('date')(
						<RangePicker
							format="YYYY-MM-DD"
							onChange={this.onChange} 
						/>
					)}
				</FormItem>
				<FormItem label='备注（可选）' {...formItemLayout}>
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
			multiSelect:['0-0']
    };
    queryHandler = (query) => {
        debugger
      console.log(this.state.query)
      this.refs.table.fetch(this.state.query);
    }
    onChange = (date, dateString) => {
        console.log(date, dateString);
        let options ={
            time:dateString
        }
        this.setState({
            query:Object.assign(this.state.query,options)
        })
    }
		handleOk = (e) => {
			console.log(e);
			this.refs.form.validateFields((err, values) => {
				if (!err) {
          if(values.date){
            values.startTime= moment(values.date[0]).format('YYYY-MM-DD');
            values.endTime= moment(values.date[1]).format('YYYY-MM-DD');
          }
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
        body:JSON.stringify(value),
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
        const { query , visible , multiSelect } = this.state;
        return(
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
              <Row>
                  <Col span={12}>
                    <Search
                        placeholder="请输入盘点单号"
                        onChange={(e) =>{  this.setState({'query':Object.assign(query,{'maintainNo':e.target.value}) })   }}
                        style={{ width: 200 ,marginRight:15}}
                    />
                    <RangePicker onChange={this.onChange}  style={{ marginRight:15}} format='YYYY-MM-DD'/>
                    <Button type='primary' size='default' onClick={this.queryHandler}>查询</Button>
                  </Col> 
                  <Col span={12} style={{textAlign:'right'}}>
                    <Button type='primary' size='default' onClick={()=>{this.setState({visible:true})}}>新增盘点 </Button>
                  </Col>
              </Row>
              <RemoteTable
                  ref='table'
                  query={this.state.query}
                  url={assets.selectMaintainOrderList}
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
                title='新建盘点'>
									<ModalFormWapper  ref='form' value={multiSelect}  callback={(multiSelect)=>{ this.setState(multiSelect) }}></ModalFormWapper>
              </Modal>
            </Content>
        )
    }
}


export default inventoryRecord;