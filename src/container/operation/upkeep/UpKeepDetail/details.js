/**
 * 保养列表-》详情信息
 */
import React from 'react'
import AddUpKeepForm from '../addUpKeep/addForm.js';
import { Form ,Layout} from 'antd';
import { withRouter  } from 'react-router-dom';
const { Content } = Layout; 

const WrappedAdvancedSearchForm = Form.create()(AddUpKeepForm);

class UpKeepDetails extends React.Component{
    state={
			formInfo:{}
		}
    render(){
        const formInfo  = this.state;
        return(
          <div>
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
                <WrappedAdvancedSearchForm  formInfo={formInfo} ref='getFormData'/>
            </Content>
          </div>
        )
    }
}

export default withRouter(UpKeepDetails);