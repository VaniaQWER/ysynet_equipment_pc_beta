/**
 * @file 档案管理-资产档案-详情-证件信息
 */

import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './style.css';

class CertInfo extends Component {
  render () {
    return (
        <Row>
          <Col offset={3} span={18}>
            <h1 className="text-align-center">中华人民共和国医疗器械注册证</h1>
            <span>证件号{'123132131232'}</span>
            <Row type="flex" style={{marginTop: 16}} className='table-row'>
              <Col span={8} className='table-span'>生产者名称</Col>
              <Col span={16} className='table-span'>{  } </Col>
              <Col span={8} className='table-span'>生产者地址</Col>
              <Col span={16} className='table-span'>{  }</Col>
              <Col span={8} className='table-span'>生产地址</Col>
              <Col span={16} className='table-span'>{  }</Col>
              <Col span={8} className='table-span'>代理人名称</Col>
              <Col span={16} className='table-span'>{  }</Col>
              <Col span={8} className='table-span'>代理人地址</Col>
              <Col span={16} className='table-span'>{  }</Col>
              <Col span={8} className='table-span'>产品名称</Col>
              <Col span={16} className='table-span'>{ }</Col>
              <Col span={8} className='table-span'>型号、规格</Col>
              <Col span={16} className='table-span'>{  }</Col>
              <Col span={8} className='table-span'>产品标准</Col>
              <Col span={16} className='table-span'>{ }</Col>
              <Col span={8} className='table-span'>产品性能结构组成</Col>
              <Col span={16} className='table-span'>{  }</Col>
              <Col span={8} className='table-span'>产品适用范围</Col>
              <Col span={16} className='table-span'>{ }</Col>
              <Col span={8} className='table-span'>其他内容</Col>
              <Col span={16} className='table-span'>{  }</Col>
              <Col span={8} className='table-span'>备注</Col>
              <Col span={16} className='table-span'>{  }</Col>
            </Row>
            <div className="text-align-right">
              <p>批准日期:二O一六年三月一日</p>
              <p>批准日期:二O二一年二月二十八日</p>
            </div>
          </Col>
        </Row>
    )
  }
}
export default CertInfo;