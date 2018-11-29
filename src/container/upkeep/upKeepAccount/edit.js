/**
 * 保养计划--》编辑页面
 */
import React from 'react'
import AddUpKeepPlanForm from '../addUpKeep/addPlanForm.js';
import { Form, Button ,Layout,Affix ,message} from 'antd'
import moment from 'moment';
import {withRouter  } from 'react-router-dom';
import upkeep from '../../../api/upkeep';
import request from '../../../utils/request';

const { Content } = Layout; 

const WrappedAdvancedSearchForm = Form.create()(AddUpKeepPlanForm);

class UpKeepFinish extends React.Component{
    state={
			formInfo:{},
      maintainPlanDetailId:'',
      dataSource:[]
		}
			//提交数据
    handleSubmit = (fstate) =>{
      console.log(this.state.dataSource)
			this.refs.getFormData.validateFieldsAndScroll((err, values) => {
				if (!err) {
            let json = {}
            if(values['loopFlag']==='00'){//单次循环
              delete values['maintainDate']
              // values.maintainDate = moment(values['maintainDate']).format('YYYY-MM-DD'); 
            }else{
              const endTime = values['endMaintainDate'];
              values.endMaintainDate = moment(endTime).format('YYYY-MM-DD');
              delete values['Date'];//删除数据中的Date
              delete values['maintainDate'];
            }
            delete values['assetsRecord'];//删除资产编号
            json.maintainPlanDetailId = this.state.maintainPlanDetailId;
            json.fstate = fstate;
            json.maintainTypes =this.state.dataSource;//保养项目合集ID
						json.maintainPlan = values;
						console.log('will SendAjax',JSON.stringify(json))
						this.sendAjax(json)
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
                <Button type="default" onClick={()=>this.handleSubmit('80')}>关闭</Button>
                <Button type="primary" style={{marginLeft:15}} onClick={()=>this.handleSubmit('20')}>保存计划</Button>
              </div>
            </Affix>
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
                <WrappedAdvancedSearchForm  formInfo={formInfo} ref='getFormData'
                maintainPlanDetailId={maintainPlanDetailId}
                editState = {true}
                callback={dataSource=>this.setState({dataSource})}/>
            </Content>
          </div>
        )
    }
}

export default withRouter(UpKeepFinish);