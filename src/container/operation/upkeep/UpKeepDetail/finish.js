/**
 * 保养列表--》完成页面
 */
import React from 'react'
import AddUpKeepForm from '../addUpKeep/addForm.js';
import { Form, Button ,Layout,Affix ,message} from 'antd'
import moment from 'moment';
import {withRouter  } from 'react-router-dom';
import upkeep from '../../../../api/upkeep';
import request from '../../../../utils/request';

const { Content } = Layout; 

const WrappedAdvancedSearchForm = Form.create()(AddUpKeepForm);

class UpKeepFinish extends React.Component{
    state={
			formInfo:{},
      maintainGuid:'',
      dataSource:[]
		}
			//提交数据
    handleSubmit = (fstate) =>{
      console.log(this.state.dataSource)//下方表格附带内容[] --接口未对
			this.refs.getFormData.validateFieldsAndScroll((err, values) => {
				if (!err) {
					console.log('Received values of form: ', values);
						const startTime = values['maintainDate'];
						const endTime = values['endMaintainDate'];
						const nextTme = values['nextMaintainDate'];
						values.maintainDate = moment(startTime).format('YYYY-MM-DD') 
						values.endMaintainDate = moment(endTime).format('YYYY-MM-DD') 
						values.nextMaintainDate = moment(nextTme).format('YYYY-MM-DD') 
            values.fstate = fstate;
            values.maintainGuid = this.state.maintainGuid;
						console.log('发出修改请求')
						//更改附件格式
						let thumburl = []
						if(values.tfAccessoryList){
							for(let i =0;i<values.tfAccessoryList.fileList.length;i++){
								thumburl.push(values.tfAccessoryList.fileList[i].thumbUrl)
							}
						}	
						values.tfAccessoryList = thumburl;
						this.sendAjax(values)
				}
			});
		}
		//发出请求
		sendAjax = (value) =>{
			console.log('will SendAjax',JSON.stringify(value))
      let options = {
        body:JSON.stringify(value),
        success: data => {
          if(data.status){
            message.success( '操作成功')
            setTimeout(()=>{
              this.props.history.push('/operation/upkeep/upkeeplist')
            },1000)
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      }
      request(upkeep.submitAssetInfo, options)
      
    }
		//获取详情数据
		componentWillMount = () =>{
      console.log('表单组建装在details')
			const path = window.location.hash.split('#')[1].replace(/\s/g,'')
			const maintainGuid = path.split('/')[path.split('/').length-1];
			this.setState({
				maintainGuid:maintainGuid
			})
		}
    render(){
        const {formInfo}  = this.state;
        return(
          <div>
            <Affix>
              <div style={{background:'#fff',padding:'10px 20px',marginBottom:10,display:'flex',alignContent:'center',justifyContent:'flex-end'}}>
                <Button type="default" onClick={()=>this.handleSubmit('02')}>关闭</Button>
                <Button type="primary" style={{marginLeft:15}} onClick={()=>this.handleSubmit('01')}>完成</Button>
              </div>
            </Affix>
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
                <WrappedAdvancedSearchForm  formInfo={formInfo} ref='getFormData'
                callback={dataSource=>this.setState({dataSource})}/>
            </Content>
          </div>
        )
    }
}

export default withRouter(UpKeepFinish);