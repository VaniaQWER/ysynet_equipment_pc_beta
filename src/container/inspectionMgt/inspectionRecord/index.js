import React, { Component } from 'react';

import {Layout, Card, Icon, Button, Row} from 'antd';

import {Link} from 'react-router-dom';

import InspectionForm from './component/inspectionForm';

const {Content} = Layout;


class InspectionRecord extends Component {
    setQuery = (query) => {
        console.log(query)
    }
    render() {
        return (
            <Content>
                <Card style={{margin: '16px 16px 0'}} bordered={false}>
                    <InspectionForm setQuery={this.setQuery} />
                    <Row>
                        <Link to={{ pathname: `/inspectionMgt/inspectionRecord/newRegister` }}><Button type="primary"><Icon type="plus"/>新建</Button></Link>
                    </Row>
                </Card>
            </Content>
        )
    }
}

export default InspectionRecord;