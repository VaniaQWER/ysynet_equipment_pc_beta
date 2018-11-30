/**
 * 保养列表--》完成页面
 */
import React from 'react'
import AddTaskForm from '../addUpKeep/addTaskForm.js';
import { Button ,Layout,Affix ,message} from 'antd'
import moment from 'moment';
import {withRouter  } from 'react-router-dom';
import upkeep from '../../../api/upkeep';
import request from '../../../utils/request';
import { FTP } from '../../../api/local';
const { Content } = Layout; 

class UpKeepFinish extends React.Component{
    state={
			formInfo:{},
      maintainPlanDetailId:'',
      dataSource:[]
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
    formatAccessory=(fileList)=>{//obj  此处直接接收的为fileList的值
      if(fileList&&fileList.length){//保留上传时返回的 24321/的地址路径
        let retList = fileList.map(item=>{
            if(item.response){
              return item.response.result
            }else{
              return item.url.replace(FTP,'')
            }
        })
        return retList
      }else{
        return null
      }
    }
    //提交数据
    handleSubmit = (fstate) =>{
			this.refs.getFormData.validateFieldsAndScroll((err, values) => {
				if (!err) {
            if(this.state.dataSource.length===0){
              message.warning('请最少添加一条项目!')
              return false
            }
						const startTime = values['maintainDate'];
						const endTime = values['endMaintainDate'];
						const nextTme = values['nextMaintainDate'];
						values.maintainDate = moment(startTime).format('YYYY-MM-DD') 
						values.endMaintainDate = moment(endTime).format('YYYY-MM-DD') 
            if(nextTme&& nextTme!=="Invalid date"){
              values.nextMaintainDate = moment(nextTme).format('YYYY-MM-DD') 
            }else{
              values.nextMaintainDate = ''
            }
            values.fstate = fstate;
            values.maintainPlanDetailId = this.state.maintainPlanDetailId;
            values.maintainOrderDetailList =this.clearArray(this.state.dataSource);//此处为下方表格附带
						//更改附件格式
            // let thumburl = []
            // let fileString ='';
						// if(values.tfAccessoryList){
						// 	for(let i =0;i<values.tfAccessoryList.fileList.length;i++){
            //     let file = values.tfAccessoryList.fileList[i] ;
            //     if(file.thumbUrl){
            //       thumburl.push(file.thumbUrl)
            //     }else{
            //       fileString+= (cutFtpUrl(file.url)+';')
            //       thumburl.push('')
            //     }
						// 	}
						// }	
            // values.tfAccessoryList = thumburl;
            // values.tfAccessory = fileString;
            values.maintainType = values.maintainMode!=="03"? "00":"01";
            values.tfAccessoryList = this.formatAccessory(values.tfAccessoryList)
            this.sendAjax(values)
				}
			});
		}
		//发出请求
		sendAjax = (value) =>{
      let options = {
        body:JSON.stringify(value),
        success: data => {
          if(data.status){
            message.success( '操作成功')
            setTimeout(()=>{
              this.props.history.push('/upkeep/upkeepTask')
            },1000)
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      }
      request(upkeep.doPlanDetails, options)
      
    }
		//获取详情数据
		componentWillMount = () =>{
			const maintainPlanDetailId = this.props.match.params.id;
			this.setState({
        maintainPlanDetailId
			})
		}
    render(){
        const {formInfo , maintainPlanDetailId}  = this.state;
        return(
          <div>
            <Affix>
              <div style={{background:'#fff',padding:'10px 20px',marginBottom:10,display:'flex',alignContent:'center',justifyContent:'flex-end'}}>
                <Button type="primary" style={{marginLeft:15}} onClick={()=>this.handleSubmit('40')}>完成</Button>
              </div>
            </Affix>
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
              <AddTaskForm  
                formInfo={formInfo} 
                maintainPlanDetailId = {maintainPlanDetailId} 
                editState = {true}
                ref='getFormData'
                callback={dataSource=>this.setState({dataSource})}
                />
            </Content>
          </div>
        )
    }
}

export default withRouter(UpKeepFinish);