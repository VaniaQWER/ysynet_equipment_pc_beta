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
    componentWillMount = () => {
        const maintainGuid = this.props.match.params.id;
        this.setState({
            maintainGuid:maintainGuid
        })
    }
    render(){
        const {formInfo , maintainGuid}  = this.state;
        return(
          <div>
            <Content className='ysynet-content ysynet-common-bgColor' style={{padding:20}}>
                <WrappedAdvancedSearchForm  
                showPrint={true}
                formInfo={formInfo} 
                maintainGuid = {maintainGuid} 
                editState = {false}
                ref='getFormData'
                />
            </Content>
          </div>
        )
    }
}

export default withRouter(UpKeepDetails);