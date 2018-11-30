/**
 * 保养计划--》编辑页面
 */
import React from 'react'
import AddUpKeepPlanForm from './addPlanForm.js';
import { Form, Button ,Layout,Affix ,message} from 'antd'
import moment from 'moment';
import { FTP } from '../../../api/local';
import {withRouter  } from 'react-router-dom';
import upkeep from '../../../api/upkeep';
import request from '../../../utils/request';

const { Content } = Layout; 

const WrappedAdvancedSearchForm = Form.create()(AddUpKeepPlanForm);

class UpKeepFinish extends React.Component{
    state={
			formInfo:{},
      maintainPlanDetailId:'',
      dataSource:[],
      maintainData: {},
      tfCycleType: '',// 循环 (天, 月)
      loading: false
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
      console.log(this.state.dataSource)
			this.refs.getFormData.validateFieldsAndScroll((err, values) => {
				if (!err) {
            let postData = {}, maintainTypes = []
              values.maintainDate = moment(values.maintainDate).format('YYYY-MM');
              values.endMaintainDate = moment(values.endMaintainDate).format('YYYY-MM');
            if(values.nextMaintainDate){
              values.nextMaintainDate = moment(values.nextMaintainDate).format('YYYY-MM');
            }
            values.engineerName = this.state.engineerName;
            values.engineerUserid = values.engineerUserid;
            values.serviceId = this.state.maintainData.serviceId;
            values.tfAccessoryList = this.formatAccessory(values.tfAccessoryList)
            console.log(values,'values');
            // postData.maintainData = maintainData;
            postData.maintainOrder = { ...values };
            postData.maintainPlanDetailId = this.state.maintainPlanDetailId;
            postData.maintainTypes = this.state.dataSource;
            console.log(postData,'postData')
            // console.log(maintainOrder,'maintainOrder')
            // delete values['assetsRecord'];//删除资产编号

            // json.maintainPlanDetailId = this.state.maintainPlanDetailId;
            // json.fstate = '40';
            // json.maintainTypes =this.state.dataSource;//保养项目合集ID
						// json.maintainPlan = values;
						// console.log('will SendAjax',JSON.stringify(json))
						// this.sendAjax(json)
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
              this.props.history.push('/upkeep/plan')
            },1000)
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      }
      request(upkeep.editPlanDetails, options)
      
    }
		//获取详情数据
		componentWillMount = () =>{
			const maintainPlanDetailId = this.props.match.params.id;
			this.setState({
				maintainPlanDetailId:maintainPlanDetailId
      })
      
		}
    render(){
        const {formInfo , maintainPlanDetailId}  = this.state;
        return(
          <div>
            <Affix>
              <div style={{background:'#fff',padding:'10px 20px',marginBottom:10,display:'flex',alignContent:'center',justifyContent:'flex-end'}}>
                <Button type="primary" style={{marginLeft:15}} onClick={this.handleSubmit} loading={this.state.loading}>完成</Button>
              </div>
            </Affix>
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
                <WrappedAdvancedSearchForm  formInfo={formInfo} ref='getFormData'
                maintainPlanDetailId={maintainPlanDetailId}
                editState = {true}
                url={upkeep.queryPlanDetails}
                engineerName={(engineerName) => this.setState({ engineerName })}
                tfCycleType={(tfCycleType) => this.setState({ tfCycleType })}
                maintainData={(data) => this.setState({ maintainData: data })}
                callback={dataSource=>this.setState({dataSource})}/>
            </Content>
          </div>
        )
    }
}

export default withRouter(UpKeepFinish);