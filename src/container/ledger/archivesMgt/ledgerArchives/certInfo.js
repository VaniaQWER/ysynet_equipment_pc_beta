/**
 * @file 档案管理-资产档案-详情-证件信息
 */

import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styles from './style.css';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { ledger as ledgerService } from '../../../../service';
import assets from '../../../../api/assets';
import querystring from 'querystring';

class CertInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certInfoData: {},
    }
  }
  //获取id 根据证件号查证件信息
  componentWillMount = () =>{
    const { getSearchCertList ,certGuid } = this.props;
    const params = { certGuid: certGuid };
    getSearchCertList(assets.searchCertList , querystring.stringify(params),(data) => {
      this.setState( { certInfoData : data[0] })
    },{
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    })
  }
  render () {
    const { certInfoData } = this.state;

    return (
        <Row>
          <Col offset={3} span={18}>
            <h1 className={styles['text-align-center']}>中华人民共和国医疗器械注册证</h1>
            <span>证件号 : { certInfoData ? certInfoData.registerNo : null }</span>
            <Row type="flex" style={{marginTop: 16}} className={styles['table-row']}>
              <Col span={8} className={styles['table-span']}>生产者名称</Col>
              <Col span={16} className={styles['table-span']}>{ certInfoData ? certInfoData.produceName : null} </Col>
              <Col span={8} className={styles['table-span']}>生产者地址</Col>
              <Col span={16} className={styles['table-span']}>{ certInfoData  ? certInfoData.enterpriseRegAddr :null }</Col>
              <Col span={8} className={styles['table-span']}>生产地址</Col>
              <Col span={16} className={styles['table-span']}>{certInfoData  ? certInfoData.produceAddr : null}</Col>
              <Col span={8} className={styles['table-span']}>代理人名称</Col>
              <Col span={16} className={styles['table-span']}>{certInfoData  ? certInfoData.agentName : null}</Col>
              <Col span={8} className={styles['table-span']}>代理人地址</Col>
              <Col span={16} className={styles['table-span']}>{certInfoData  ? certInfoData.agentAddr : null}</Col>
              <Col span={8} className={styles['table-span']}>产品名称</Col>
              <Col span={16} className={styles['table-span']}>{certInfoData  ? certInfoData.materialName: null }</Col>
              <Col span={8} className={styles['table-span']}>型号、规格</Col>
              <Col span={16} className={styles['table-span']}>{ certInfoData  ?certInfoData.registerNo : null}</Col>
              <Col span={8} className={styles['table-span']}>产品标准</Col>
              <Col span={16} className={styles['table-span']}>{ certInfoData  ?certInfoData.productStandard : null}</Col>
              <Col span={8} className={styles['table-span']}>产品性能结构组成</Col>
              <Col span={16} className={styles['table-span']}>{certInfoData  ? certInfoData.productStructure: null }</Col>
              <Col span={8} className={styles['table-span']}>产品适用范围</Col>
              <Col span={16} className={styles['table-span']}>{certInfoData  ? certInfoData.productScope: null  }</Col>
              <Col span={8} className={styles['table-span']}>其他内容</Col>
              <Col span={16} className={styles['table-span']}>{certInfoData  ? certInfoData.registerNo: null }</Col>
              <Col span={8} className={styles['table-span']}>备注</Col>
              <Col span={16} className={styles['table-span']}>{ certInfoData  ?certInfoData.tfRemark : null}</Col>
            </Row>
            <div  className={styles['text-align-right']}>
              <p>批准日期:{certInfoData  ? certInfoData.firstTime: null }</p>
              <p>批准日期:{ certInfoData  ? certInfoData.lastTime: null }</p>
            </div>
          </Col>
        </Row>
    )
  }
}
//export default CertInfo;

export default withRouter(connect(null, dispatch => ({
  getSearchCertList: (url,values,success,type) => ledgerService.getInfo(url,values,success,type),
}))(CertInfo));