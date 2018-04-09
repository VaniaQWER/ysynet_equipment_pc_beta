/**保养登记--添加*/
import React from 'react';
import AddUpKeepForm from './addForm.js';
import { Form, Button ,Layout,Affix ,message} from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import request from '../../../utils/request';
import upkeep from '../../../api/upkeep';
const { Content } = Layout; 

const WrappedAdvancedSearchForm = Form.create()(AddUpKeepForm);

class AddUpKeep extends React.Component{
    state={
      formInfo:{},
      dataSource: []
		}
		clearArray=(data)=>{
      for(let i=0;i<data.length;i++){
        for(let item in data[i]){
          if(item ==='key'|| item==='levelr'||item ==='key'||item==='maintainTemplateId'
            || item ==='templateDetailGuid' || item ==='templateTypeName'
            || item ==='title'
          ){
            delete data[i][item]
          }
        }
      }
      return data
    }
    handleSubmit = (fstate) =>{
			this.refs.getFormData.validateFieldsAndScroll((err, values) => {
				if (!err) {
          if(this.state.dataSource.length===0){
            message.warning('请最少添加一条项目!')
            return false
          }
          values.maintainDate = moment(values['maintainDate']).format('YYYY-MM-DD HH:mm') 
          values.endMaintainDate = moment(values['endMaintainDate']).format('YYYY-MM-DD HH:mm') 
          if(values['nextMaintainDate']){
            values.nextMaintainDate = moment(values['nextMaintainDate']).format('YYYY-MM-DD') 
          }else{
            values.nextMaintainDate = ''
          }
          values.fstate = fstate;
          values.maintainOrderDetailList =this.clearArray(this.state.dataSource);//此处为下方表格附带

          let thumburl = []
          if(values.tfAccessoryList){
            for(let i =0;i<values.tfAccessoryList.fileList.length;i++){
              let files = values.tfAccessoryList.fileList[i];
              if(files.thumbUrl){thumburl.push(files.thumbUrl)}
            }
          }	
          values.tfAccessoryList = thumburl;
          this.sendAjax(values)
				}
			});
    }
    sendAjax = (value) =>{
      let options = {
        body:JSON.stringify(value),
        success: data => {
          if(data.status){
            message.success('操作成功')
            this.handleReset();
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      }
      request(upkeep.submitAssetInfo,options)
    }
    //重置表单
    handleReset = () => {
      this.setState({
        formInfo:{
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
          equipmentStandardName:"",
        }
      })
      this.refs.getFormData.resetFields();
		}
		componentWillMount = () =>{
			this.setState({
				formInfo:{}
			})
		}
    render(){
        const {formInfo}  = this.state;
        return(
          <div>
            <Affix>
              <div style={{background:'#fff',padding:'10px 20px',marginBottom:10,display:'flex',alignContent:'center',justifyContent:'flex-end'}}>
                <Button type="default" onClick={()=>this.handleSubmit('00')}>保存</Button>
                <Button type="primary" style={{marginLeft:15}} onClick={()=>this.handleSubmit('01')}>完成</Button>
              </div>
            </Affix>
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
                <WrappedAdvancedSearchForm  
                formInfo={formInfo} 
                ref='getFormData' 
                editState = {true}
                callback={dataSource => this.setState({ dataSource })}/>
            </Content>
          </div>
        )
    }
}

export default withRouter(AddUpKeep);