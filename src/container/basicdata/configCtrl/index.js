/*  yuwei
 * 配置管理 
 */
import React , { PureComponent }  from 'react';
import { Row,Col,Input , Layout,Button,message,Form,Select,Modal} from 'antd';
import TableGrid from '../../../component/tableGrid';
import basicdata from '../../../api/basicdata';
import request from '../../../utils/request';
import queryString from 'querystring';
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RemoteTable } = TableGrid;
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
const styles ={
    'mb-middle':{
        marginBottom: 20
    },
    'buttonGap':{
        marginRight: 15
    },
    'wapper':{
        textAlign: 'right',
        padding: 15,
        background: '#fff'
    },
    'bgf':{
        background: '#fff' 
    }
}
class ConfigCtrl extends PureComponent {
    state={
      query:{},
    }
    searchTable = (val) => {
      this.setState({query:val})
    }
    changeTableRow = (value,record) => {
        // console.log("changeTableRow",value,record)
        const { query } = this.state;
        record.tfCloValue=value;
        record.bDeptId=query.bDeptId;
        console.log(JSON.stringify({"list":[record]}),'changeTableRow')
        Modal.confirm({
            title:'您正在修改参数的配置',
            content:'修改参数配置会使影响自动打印，您还要继续吗？',
            onOk:()=>{
                request(basicdata.updateStoragePrintConfig,{
                  body:JSON.stringify({"list":[record]}),
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  success: data => {
                    if(data.status){
                      message.success('修改成功')
                      this.refs.table.fetch(query);
                    }else{
                      message.error(data.msg)
                    }
                  },
                  error: err => {console.log(err)}
                })
            },
            onCancel:()=>{
                this.refs.table.fetch(query);
                
            }
        })
    }   
    render(){
        const columns =[
            {
                title:'参数名',
                dataIndex:'tfCloName'
            },
            {
                title:'参数值',
                dataIndex:'tfCloValue',
                render:(text,record,index)=>{
                    return (
                        <Select 
                        // defaultValue='02'
                        value={text==="01"?"01":"02"}
                        style={{width:150}}
                        onSelect={(value)=>this.changeTableRow(value,record)}>
                            <Option value='02'>否</Option>
                            <Option value='01'>是</Option>
                        </Select>
                    )
                }
            },
            {
                title:'备注',
                dataIndex:'tfRemark'
            }
        ]
        return(
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding: 24}}>
                <SearchFormWapper query={(val)=>this.searchTable(val)} ref='form'></SearchFormWapper>
                {
                  this.state.query && this.state.query.bDeptId &&
                  <RemoteTable
                      ref='table'
                      query={this.state.query}
                      url={basicdata.selectStoragePrintConfigList}
                      isList={true}
                      scroll={{x: '100%', y : document.body.clientHeight}}
                      columns={columns}
                      showHeader={true}
                      rowKey={'tfCloCode'}
                      size="small"
                  />
                }
            </Content>
        )
    }
}
export default ConfigCtrl;

class SearchForm extends PureComponent {

    state={
      manageSelect:[]
    }
    componentDidMount = () => {
      this.getManageSelect();
    }
  
    getManageSelect = () => {
      request(basicdata.queryManagerDeptListByUserId,{
        body:queryString.stringify({}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: data => {
          if(data.status){
            this.setState({manageSelect:data.result})
            this.props.form.setFieldsValue({bDeptId:data.result[0]?data.result[0].value:''});
            this.props.query({bDeptId:data.result[0]?data.result[0].value:''});
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      })
    }
  
    handleSearch = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        this.props.query(values);
      });
    }
    handleReset = ()=>{
        this.props.form.resetFields(['tfCloName']);
        let  bDeptId = this.props.form.getFieldsValue(['bDeptId']);
        this.props.query(bDeptId)
    }
    render(){
      const { getFieldDecorator } = this.props.form;
      return (
        <Form  onSubmit={this.handleSearch}>
          <Row>
            <Col span={8}> 
              <FormItem
                {...formItemLayout}
                label="管理科室"
              >
                {getFieldDecorator('bDeptId',{
                  initialValue:''
                })(
                  <Select 
                    showSearch
                    placeholder={'请选择'}
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    >
                      {
                          this.state.manageSelect.map((item,index) => {
                          return <Option key={index} value={item.value}>{item.text}</Option>
                          })
                      }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem
                {...formItemLayout}
                label="参数名"
              >
                {getFieldDecorator('tfCloName')(
                  <Input placeholder='请输入'/>
                )}
              </FormItem>
            </Col>
            <Col span={8} style={{textAlign:'right', paddingTop:5}}> 
                <Button type="primary" style={styles.buttonGap} htmlType="submit">搜索</Button>
                <Button type="primary" onClick={this.handleReset}>重置</Button>
            </Col>
          </Row>
        </Form>
      )
    }
}
const SearchFormWapper = Form.create()(SearchForm);
  