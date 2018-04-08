import React from 'react'
import moment from 'moment';
import { Tree ,Table , message ,  Row, Col, Input, Icon ,Card ,Form, Button , Radio ,Select ,DatePicker ,Upload ,Modal} from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import request from '../../../utils/request';
import querystring from 'querystring';
import upkeep from '../../../api/upkeep';
import assets from '../../../api/assets';
import basicdata from '../../../api/basicdata';
import _ from 'lodash';
import { FTP } from '../../../api/local';
import { upkeepDetailsTable } from '../../../constants';
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

function UnStateTable(value){
  let txt = value;
  return  (
    <span>{txt}</span>
  )
}
const prjColumns = [
  {
    title: '项目名称',
    dataIndex: 'templateTypeName'
  },
]
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

export default class AddUpKeepForm extends React.Component {
    state = {
      selectDropData:[],//项目弹出层 下拉框内容
      prjTableData:[],//项目弹出层  下拉框带出对应table内容
      expand: false,
      data:{},
      previewVisible: false,
      previewImage: '',
      fileList: [],
      editState:true,
      fileUploadState:true,
      //table
      tableData:[],//回显的tableData
      //treeData
      treeData:[],
      //modal
      loading: false,
      visible: false,
      //tree
      expandedKeys:[],//展开项目 ['0-0-0', '0-0-1']
      autoExpandParent: true,
      checkedKeys: [],//默认勾选项目['0-0-0']
      selectedKeys: []
    };
    //图片上传内容---------------------------------------------
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
    beforeUpload = (file) => {
      const type = file.type === 'image/jpeg'|| file.type === 'image/png'|| file.type === 'image/bmp';
      if (!type) {
        message.error('您只能上传image/jpeg、png、bmp!');
      }
      const isLt5M = file.size / 1024 / 1024  < 5;
      if (!isLt5M) {
        message.error('图片不能大于 5MB!');
      }
      this.setState({
        fileUploadState:type && isLt5M
      })
      return true;
    }
    //上传点击删除
    handleChange = ({fileList}) => {
      if(this.state.editState){
        if(this.state.fileUploadState){
          let options = {
            tfAccessoryList:fileList
          }
          this.setState({ 
            data:Object.assign(this.state.data,options)
          })
        }else{
          this.setState({ 
            data:Object.assign(this.state.data,{tfAccessoryList:fileList.slice(0,[fileList.length-1])})
          })
        }
      }else{
        message.warning('查看详情时不能删除!')
      }
    }
    //-----------------上传结束-------------------------------
    
    componentWillMount =() =>{
        const { maintainGuid , editState} =this.props;
        //获取资产编号相关信息
        if(maintainGuid){
          this.getDetailAjax({maintainGuid})
        }
        // this.getTreeData();//获取弹窗树状结构
        this.getOneModule();
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
            let tabledata =data.result.maintainDetailList;
            this.setState({
              data:retData,
              tableData:tabledata 
            })
            if(this.state.editState){this.props.callback(tabledata) }
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
    getTreeData =()=>{
      let options = {
        body:'',
        success: data => {
          if(data.status){
            let retData = data.result;
            this.formatTreeData(retData)
            this.setState({
              treeData:retData //改变树状结构
            })
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      }
      request(upkeep.getTreeData, options)
    }
    formatTreeData=(data)=>{
      let b = _.map(data,function(item){
          item.key=item.id;
          item.title=item.name;
          if(item.subList){
            _.map(item.subList,function(subItem){
              subItem.key=subItem.maintainTypeId;
              subItem.title = subItem.templateTypeName;
              return subItem
            })
          }
          item.children = item.subList;
          return item
      })
      console.log(b)
    }
    
    componentWillReceiveProps = (nextProps)=> {
      if(nextProps.formInfo.assetsRecordGuid===""){//重置表格中的内容
        this.setState({
          data:nextProps.formInfo,
          tableData:[]
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
      // let newData = this.findDetailInfo();
      let newData = this.state.checkedKeys;
      setTimeout(() => {//含清空tree勾选内容
        this.setState((prevState)=>{ 
        
          //let uniqTableData = _.uniqBy(prevState.tableData.concat(newData),'maintainTypeId');
          this.props.callback(newData)
          return{
            loading: false, 
            visible: false ,
            checkedKeys:[],
            tableData:newData
          }
        });
      }, 1000);
    }
    findDetailInfo =(checkedKeys)=>{
      let b = _.cloneDeep(this.state.treeData);
      let checkedKeyState = _.uniq(this.state.checkedKeys);
      let relArray = [];
      _.map(checkedKeyState,function(ItemKey){
          let c =_.find(b,function(item){
              if(item.key === ItemKey && item.children.length!==0){
                return 
              }else if(item.key !== ItemKey  && item.children.length!==0){
                let rel = _.map(item.children,function(childrenItem){
                   if(childrenItem.key=== ItemKey){
                    relArray.push(childrenItem)
                    return childrenItem
                   } 
                })
                return rel ;//此处才是真的子集数据
              } 
          })
          return c
      })
      console.log('relArray',relArray)
      return relArray
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
      let v = keyName==="maintainResult" ? value: value.target.value;
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
    //获取添加项目的一级下拉框
  getOneModule = () =>{
    let options = {
      body:'',
      success: data => {
        if(data.status){
          
          this.setState({
            'selectDropData':data.result
          })
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(basicdata.queryOneModule,options)
  }
  //获取添加项目的一级下拉框 带出的二级数据
  changeOneModule =(value)=>{
    console.log(value)
    let json ={
      'maintainTemplateId':value
    }
    //发出请求获取对应二级项目内容 并给弹窗中的table
    let options = {
      body:querystring.stringify(json),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          this.setState({
            'prjTableData':data.result
          })
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    }
    request(basicdata.queryTwoModule,options)

  }

    render() {
      const { getFieldDecorator } = this.props.form;
      const { prjTableData ,selectDropData , data , editState , visible, loading , tableData} = this.state;
      const { previewVisible, previewImage } = this.state;
      const mapOption = data => data.map((item)=>{
        return <Option value={item.maintainTemplateId} key={item.maintainTemplateId}>{item.maintainTemplateName}</Option>
      })
      const columns = [
        {
          title: '序号',
          dataIndex: 'index',
          width:100,
          render:(text, record, index) => index + 1
        },
        {
          title: '操作',
          dataIndex: 'maintainOrderDetailGuid',
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
          dataIndex: 'templateTypeName',
        },
        {
          title: '结果',
          dataIndex: 'maintainResult',
          width:250,
          render:(text,record)=>{
            if(editState){
              return( <Select value={record.maintainResult} name='maintainResult' onSelect={(value)=>this.changeTableRow(value,record,'maintainResult')}>
                  <Option value="">请选择结果</Option>
                  <Option value="00">合格</Option>
                  <Option value="01">不合格</Option>
                  <Option value="02">保养后合格</Option>
                </Select>)
              }else{
                return UnStateTable(upkeepDetailsTable[record.maintainResult].text)
              }
          }
        },
        {
          title: '备注',
          dataIndex: 'tfRemark',
          render:(text,record)=>{
            if(editState){
                return(
                  <Input value={record.tfRemark} onChange={(e)=>this.changeTableRow(e,record,'tfRemark')} />
                )
            }else{
              return UnStateTable(record.tfRemark)
            }
            
          }
        },
      ]
     
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      
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
      const formItemRowLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
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
                  <Col span={8}>
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

          <Card title="保养信息" bordered={false} style={{marginTop:30}}>
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
                    <FormItem label='开始保养时间' {...formItemLayout}>
                      {getFieldDecorator(`maintainDate`,{initialValue:data.maintainDate})(
                        <DatePicker
                          showTime
                          format={"YYYY-MM-DD"}
                          placeholder="请选择开始保养时间"
                        /> 
                      )}
                    </FormItem>
                    : UnStateText('开始保养时间',moment(data.maintainDate).format('YYYY-MM-DD'))
                  }
                     
                </Col>
                <Col span={8}>
                  {editState ?
                    <FormItem label='结束保养时间' {...formItemLayout}>
                    {getFieldDecorator(`endMaintainDate`,{initialValue:data.endMaintainDate})(
                      <DatePicker
                        showTime
                        format={"YYYY-MM-DD"}
                        placeholder="请选择结束保养时间"
                      /> 
                    )}
                    </FormItem>
                    : UnStateText('结束保养时间',moment(data.endMaintainDate).format('YYYY-MM-DD'))                  
                  }
                </Col>
                <Col span={8}>
                {editState ?
                  <FormItem label='下次保养时间' {...formItemLayout}>
                  {getFieldDecorator(`nextMaintainDate`,{initialValue:data.nextMaintainDate})(
                    <DatePicker
                      showTime
                      format={"YYYY-MM-DD"}
                      placeholder="请选择下次保养时间"
                    /> 
                  )}
                  </FormItem>
                  : UnStateText('下次保养时间',moment(data.nextMaintainDate).format('YYYY-MM-DD'))
                }
                </Col>
              </Row>
              <Row>
                  <Col span={18}>
                    {editState ?
                      <FormItem label='备注（可选）' {...formItemRowLayout}>
                      {getFieldDecorator(`remark`,{initialValue:data.remark})(
                        <TextArea placeholder='请输入备注' style={{resize:'none'}}></TextArea>
                      )}
                      </FormItem>
                      : UnStateText('备注（可选）',data.remark)
                    }
                  </Col>
              </Row>
              <Row>
                <Col className="clearfix" span={18}>
                    <FormItem label='上传附件' {...formItemRowLayout}>
                      {getFieldDecorator(`tfAccessoryList`,{initialValue:data.tfAccessoryList})(//
                          <Upload
                            action={assets.picUploadUrl}
                            listType="picture-card"
                            fileList={data.tfAccessoryList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            beforeUpload={this.beforeUpload}
                          >
                            {editState ? uploadButton : null}
                          </Upload>
                      )}
                    </FormItem>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Col>
              </Row>
          </Card>
          
          <Card title="项目信息" bordered={false} style={{marginTop:30}}>
             <Row><Button type="buttom" onClick={this.toggleTree} disabled={!editState}>选择项目</Button></Row>
             <Row>
              <Table ref='tableItem' rowKey={'maintainTypeId'} columns={columns} dataSource={tableData} size="middle"  style={{marginTop:15}}>
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
                    {/*<Tree
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
                    </Tree>*/}
                    <Row>
                      <Col>
                        <Select name="fenlei" style={{ width: 250,marginBottom:15 }} 
                          onChange={(value)=>this.changeOneModule(value)} defaultValue="">
                          <Option value=''>请选择模板添加项目</Option>
                          {mapOption(selectDropData)}
                        </Select>
                      </Col>
                    </Row>
                    <Table 
                      rowKey={'templateDetailGuid'}
                      rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => {
                          this.setState({
                            'checkedKeys':selectedRows
                          })
                          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        },
                        getCheckboxProps: record => ({
                          disabled: record.name === 'Disabled User', // Column configuration not to be checked
                          name: record.name,
                        }),
                      }} 
                      columns={prjColumns} 
                      dataSource={prjTableData} />
             </Modal>
          </Card>
        </Form>
      );
    }
  }
