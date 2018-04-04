import React from 'react'
import moment from 'moment';
import { Tree ,Table , message ,  Row, Col, Input, Card ,Form, Button , Radio ,Select ,DatePicker ,Modal} from 'antd'
import request from '../../../utils/request';
import querystring from 'querystring';
import upkeep from '../../../api/upkeep';
import { FTP } from '../../../api/local';
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;
function UnStateText(label,data){

  let txt = '';
  switch(data){
    case '02':
    if(label==="设备状态"){
      txt='故障';
    }else{
      txt = '高';
    }
    break;
    
    case '01':
      if(label==="设备状态"){
        txt='正常';
      }else{
        txt = '中';
      }
    break;

    case '00':
    txt = '低';
    break;

    default:
    txt = data;
  }

  if(label ==="备注（可选）"){
    return (
      <Row style={{padding:'15px 0px'}}>
        <Col span={4} style={{textAlign: 'right',paddingRight:8}}>{label} :</Col>
        <Col span={8}>{txt}</Col>
      </Row>
    )
  }else{
    return (
      <Row style={{padding:'15px 0px'}}>
        <Col span={8} style={{textAlign: 'right',paddingRight:8}}>{label} :</Col>
        <Col span={16}>{txt}</Col>
      </Row>

    )
  }
}

const initSearch = {
  assetsRecordGuid:"",
  maintainType:"",
  maintainDay:"",
  deposit:"",
  bDept:"",
  custodian:"",
  spec:"",
  useDept:"",
  fmodel:"",
  productType:"",
	equipmentStandardName:""
}
const treeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' },
    ],
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' },
    ],
  }, {
    title: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
  ],
}, {
  title: '0-2',
  key: '0-2',
}];
const tabledata = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  result:'01',
  remark:'1346'
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  result:'01',
  remark:'1346'
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  result:'01',
  remark:'1346'
}];

export default class AddUpKeepForm extends React.Component {
    state = {
      expand: false,
      data:{},
      fileList: [],
      editState:true,
      fileUploadState:true,
      //table
      tableData:[],
      //modal
      loading: false,
      visible: false,
      //tree
      expandedKeys:[],//展开项目 ['0-0-0', '0-0-1']
      autoExpandParent: true,
      checkedKeys: [],//默认勾选项目['0-0-0']
      selectedKeys: [],
    };

    onChange = (e) => {
			// const value = e.target.value;
			// const expandedKeys = dataList.map((item) => {
			// 	if (item.key.indexOf(value) > -1) {
			// 		return getParentKey(item.key, gData);
			// 	}
			// 	return null;
			// }).filter((item, i, self) => item && self.indexOf(item) === i);
			// this.setState({
			// 	expandedKeys,
			// 	searchValue: value,
			// 	autoExpandParent: true,
			// });
		}
    componentWillMount =() =>{
        const { maintainGuid , editState} =this.props;
        //获取资产编号相关信息
        if(maintainGuid){
          this.getDetailAjax({maintainGuid})
        }
        this.setState({
          editState:editState,
        })
    }
    //获取详情数据并给form表单
    getDetailAjax = (keys) =>{
      let options = {
        body:querystring.stringify(keys),
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: data => {
          if(data.status){
            let retData = data.result;
            //拿到回显数据--处理时间格式
            retData.maintainDate=moment(retData.maintainDate,'YYYY-MM-DD HH:mm')
            retData.endMaintainDate=moment(retData.endMaintainDate,'YYYY-MM-DD HH:mm')
            retData.nextMaintainDate=moment(retData.nextMaintainDate,'YYYY-MM-DD')
            //处理附件格式
            if(retData.tfAccessory){
              let urls = retData.tfAccessory.split(';');
              let u = urls.splice(0, urls.length-1);
              let files = [];
              u.map((item, index) => {
                return files.push({
                  url: FTP + item,
                  uid: index
                })
              });
              retData.tfAccessoryList=files;
            }
            this.setState({
              data:retData,
              tableData:tabledata //此处tabledata接口未对
            })
            if(this.state.editState){this.props.callback(tabledata)}
            
            //获取第一个板块的信息内容
            this.getAssetInfoAjax(retData.assetsRecord)
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      }
      request(upkeep.listToDetails, options)
    }
    
    componentWillReceiveProps = (nextProps)=> {
      if(nextProps.formInfo.assetsRecordGuid===""){
        this.setState({
          data:nextProps.formInfo
        })
      }
    }
    componentWillUnmount = () =>{
        this.handleReset();
    }
  
    handleReset = () => {
      this.props.form.resetFields();
    }

    //1-资产信息-资产编号搜索带值
    getAssetInfoAjax = (value) =>{
      let options = {
        body:querystring.stringify({
          assetsRecord:value
        }),
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: data => {
          if(data.status){
            //过滤出资产信息的固定字段
            const jsonData  = initSearch;
            for(let item in jsonData){
              jsonData[item] = data.result[item]
            }
            this.setState({
              data:Object.assign(this.state.data,jsonData),//合并现有的data数据
            })
          }else{
            message.error(data.msg)
            this.setState({
              data:Object.assign(this.state.data,initSearch)//清除带出的数据
            })
          }
        },
        error: err => {console.log(err)}
      }
      if(value && (value).trim()!=='' ){
        request(upkeep.getAssetInfo, options)
      }
    }
    doSerach = (e) =>{
      this.getAssetInfoAjax(e.target.value)
    }
    
    //3-项目信息-选择项目弹窗以及树状图
    toggleTree = () => {
      this.setState({
        visible: true,
      });
    }
    //-----table添加
    handleOkTree = () => {
      this.setState({ loading: true });
      //modal获得treenode之后需要向table中添加一条数据
      let newData = {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        result:'',
        remark:''
      }

      setTimeout(() => {//含清空tree勾选内容
        this.setState((prevState)=>{ 
          this.props.callback([...prevState.tableData,newData])
          return{
            loading: false, 
            visible: false ,
            checkedKeys:[],
            tableData:[...prevState.tableData,newData]
          }
        });
      }, 1000);
    }
    //-----table删除
    deleteTableData = (record) =>{
      const arr = this.state.tableData;
      arr.splice(arr.findIndex(item => item === record),1);
      this.setState({
        tableData:arr
      })
    }
    //-----table行内修改--并向外传送
    changeTableRow = (value,record,keyName) =>{
      const arr = this.state.tableData;
      let v = keyName==="result" ? value: value.target.value;
      arr[arr.findIndex(item => item === record)][keyName]=v;
      this.props.callback(arr);
    }
    handleCancelTree = () => {//含清空tree勾选内容
      this.setState({ visible: false ,checkedKeys:[]});
    }
    
    //3-项目信息-tree
    onExpand = (expandedKeys) => {
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.setState({
        expandedKeys,
        autoExpandParent: false,
      });
    }
    onCheck = (checkedKeys) => {
      this.setState({ checkedKeys });
    }
    onSelect = (selectedKeys, info) => {
      this.setState({ selectedKeys });
    }
    renderTreeNodes = (data) => {
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...item} />;
      });
    }

    render() {

      const columns = [
        {
          title: '序号',
          dataIndex: 'key',
          width:100,
        },
        {
          title: '操作',
          dataIndex: 'name',
          width:150,
          render:(text,record)=>{
            if(editState){
              return(
                <a onClick={()=>this.deleteTableData(record)}>删除</a>
              )
            }else{
              return <span>- -</span>
            }
          }
        },
        {
          title: '项目名称',
          width:350,
          dataIndex: 'address',
        }
      ]
     
      const { getFieldDecorator } = this.props.form;
      const { data , editState , visible, loading , tableData} = this.state;
      
      
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
      return (
        <Form>
          <Card title="资产信息" bordered={false} >
              <Row>
                  <Col span={8} >
                      {editState ? 
                        <FormItem label='资产编号' {...formItemLayout} style={{marginBottom:0}}>
                            {getFieldDecorator(`assetsRecord`,{initialValue:data.assetsRecord})(
                                <Input placeholder="请输入并搜索" onPressEnter={this.doSerach}/>
                            )}
                        </FormItem>
                        : UnStateText('资产编号',data.assetsRecord)
                      }
                  </Col>
                  <Col span={0} >
                        <FormItem>
                            {getFieldDecorator(`assetsRecordGuid`,{initialValue:data.assetsRecordGuid})(
                              <Input placeholder="AS171218000002"/>
                            )}
                        </FormItem>
                  </Col>
                  <Col span={8}>
                        {UnStateText('资产名称',data.equipmentStandardName)}
                  </Col>
              </Row>    
              <Row>
                  <Col span={8} >
                      {UnStateText('型号',data.fmodel)}
                  </Col>
                  <Col span={8}>
                    {UnStateText('规格',data.spec)}
                  </Col>
                  <Col span={8}>
                    {UnStateText('资产类别',data.productType)}
                  </Col>
              </Row>
              <Row>
                  <Col span={8} >
                        {UnStateText('使用科室',data.useDept)}
                  </Col>
                  <Col span={8}>
                        {UnStateText('管理员',data.custodian)}
                  </Col>
                  <Col span={8}>
                    {UnStateText('管理科室',data.bDept)}
                  </Col>
              </Row>
              <Row>
                  <Col span={8} >
                    {UnStateText('存放地址',data.deposit)}
                  </Col>
                  <Col span={8}>
                    {UnStateText('保养分类',data.maintainType)}
                  </Col>
                  <Col span={8}>
                    {UnStateText('保养周期',data.maintainDay)}
                  </Col>
              </Row>
          </Card>

          <Card title="计划信息" bordered={false} style={{marginTop:30}}>
              <Row>
                <Col span={8}>
                {editState ?
                  <FormItem label='保养类型' {...formItemLayout}>
                  {getFieldDecorator(`maintainType`,{initialValue:'00'})(
                    <Radio.Group>
                      <Radio value='00' checked={true}>内保</Radio>
                      {/*<Radio value='01' disabled={true}>外保</Radio>*/}
                    </Radio.Group>
                  )}
                  </FormItem>
                  :UnStateText('保养类型','内保')
                }
                </Col>
                <Col span={8}>
                {editState ? 
                  <FormItem label='保养人' {...formItemLayout}>
                  {getFieldDecorator(`engineerName`,{initialValue:data.engineerName})(
                    <Input placeholder="支持多人"/>
                  )}
                  </FormItem>
                  :UnStateText('保养人',data.engineerName)
                }
                </Col>
                <Col span={8}>
                  {editState ? 
                    <FormItem label='临床风险等级' {...formItemLayout}>
                    {getFieldDecorator(`clinicalRisk`,{initialValue:data.clinicalRisk})(
                      <Select placeholder='请选择'>
                        <Option value="">请选择</Option>
                        <Option value="02">高</Option>
                        <Option value="01">中</Option>
                        <Option value="00">低</Option>
                      </Select>
                    )}
                    </FormItem>
                    : UnStateText('临床风险等级',data.clinicalRisk)
                  }
                </Col>
              </Row>
                  <Row>
                    <Col span={8}>
                      {editState ? 
                        <FormItem label='循环方式' {...formItemLayout}>
                        {getFieldDecorator(`xunhuanfangsih`,{initialValue:data.xunhuanfangsih})(
                          <Input placeholder="多次循环"/>
                        )}
                        </FormItem>
                        :UnStateText('循环方式',"多次循环")
                      }
                    </Col>
                    <Col span={8}>
                      {editState ? 
                        <FormItem label='循环周期' {...formItemLayout}>
                        {getFieldDecorator(`xunhuanzhouqi`,{initialValue:data.xunhuanzhouqi})(
                          <Input placeholder="3月"/>
                        )}
                        </FormItem>
                        :UnStateText('循环方式',"3月")
                      }
                    </Col>
                  </Row>

              
              <Row>
                <Col span={8}>
                {editState ? 
                    <FormItem label='保养时间' {...formItemLayout}>
                      {getFieldDecorator(`maintainDate`,{initialValue:data.maintainDate})(
                        <DatePicker
                          showTime
                          format={"YYYY-MM-DD"}
                          placeholder="请选择保养时间"
                        /> 
                      )}
                    </FormItem>
                    : UnStateText('保养时间',moment(data.maintainDate).format('YYYY-MM-DD'))
                  }
                     
                </Col>
                <Col span={8}>
                  {editState ?
                    <FormItem label='保养失效时间' {...formItemLayout}>
                    {getFieldDecorator(`endMaintainDate`,{initialValue:data.endMaintainDate})(
                      <DatePicker
                        showTime
                        format={"YYYY-MM-DD"}
                        placeholder="请选择结束保养时间"
                      /> 
                    )}
                    </FormItem>
                    : UnStateText('保养失效时间',moment(data.endMaintainDate).format('YYYY-MM-DD'))                  
                  }
                </Col>
                <Col span={8}>
                {editState ?
                  <FormItem label='提前生成保单' {...formItemLayout}>
                    {getFieldDecorator(`xunhuanzhouqi`,{initialValue:data.xunhuanzhouqi})(
                      <Input placeholder="12天"/>
                    )}
                    </FormItem>
                    :UnStateText('提前生成保单',"12天")
                }
                </Col>
              </Row>
          </Card>
          
          <Card title="项目信息" bordered={false} style={{marginTop:30}}>
             <Row><Button type="buttom" onClick={this.toggleTree} disabled={!editState}>选择项目</Button></Row>
             <Row>
              <Table ref='tableItem' columns={columns} dataSource={tableData} size="middle"  style={{marginTop:15}}>
              </Table>
             </Row>
             <Modal
              visible={visible}
              title="选择项目"
              onOk={this.handleOkTree}
              onCancel={this.handleCancelTree}
              footer={[
                <Button key="back" onClick={this.handleCancelTree}>取消</Button>,
                <Button key="submit" type="primary" loading={loading} onClick={this.handleOkTree}>
                  提交
                </Button>,
              ]}>
                    
                  <Select placeholder='请选择' style={{width:300}}>
                    <Option value="">请选择</Option>
                    <Option value="02">高</Option>
                    <Option value="01">中</Option>
                    <Option value="00">低</Option>
                  </Select>
                  <Tree
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                  >
                    {this.renderTreeNodes(treeData)}
                  </Tree>
             </Modal>
          </Card>
        </Form>
      );
    }
  }
