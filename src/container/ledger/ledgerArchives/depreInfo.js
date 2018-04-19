/**
 * 档案管理-资产档案-详情-基本信息-资产信息
 */
import React, { Component } from 'react';
import { Row, Col,message,Tooltip ,DatePicker } from 'antd';
import InputWrapper from '../../../component/inputWrapper'
import styles from './style.css';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { ledger as ledgerService } from '../../../service';
import assets from '../../../api/assets';
import querystring from 'querystring';
import moment, { isMoment } from 'moment';
import { depreciationTypeData } from '../../../constants';
const { MonthPicker} = DatePicker;

class DepreInfo extends Component {
  handleUpdateAssetsRecordInfo = (data,field) =>{
    console.log(data,'data')
    if(isMoment(data)){
        data = moment(data).format('YYYY-MM')
    }
    const { updateAssetsRecordInfo,AssetInfoData } = this.props;
    let params = { };
    params.value = field;
    params.text = data;
    params.assetsRecordGuid = AssetInfoData.assetsRecordGuid;
    console.log(params,'params')

    updateAssetsRecordInfo(assets.updateAssetsRecordInfo, querystring.stringify(params),(data) => {
     if(data.status){
      message.success("修改成功")
     }else{
      message.error(data.msg);
     }
   },{
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
   })
  }
  
  render () {
    const { AssetInfoData } = this.props;
    return (
      <Row type="flex" style={{marginTop: 16}}  className={styles['table-row']}>
        <Col span={4} className={styles['table-span']}>折旧方式</Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.depreciationType ? depreciationTypeData[AssetInfoData.depreciationType].text : null }</Col>
        <Col span={4} className={styles['table-span']}>原值</Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.originalValue }</Col>
        <Col span={4} className={styles['table-span']}>
        <Tooltip placement="top" title='自筹资金：233.00 财政拨款：26366.00' arrowPointAtCenter>累计折旧</Tooltip>
        </Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.assetsRecord }</Col>
        <Col span={4} className={styles['table-span']}>净值</Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.carryingAmount }</Col>
        <Col span={4} className={styles['table-span']}>净残值率</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'JINGCHANZHILV')} text={ AssetInfoData.jingcanzhilv } /></Col>
        <Col span={4} className={styles['table-span']}>净残值</Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.carryingAmount }</Col>
        <Col span={4} className={styles['table-span']}>月折旧率</Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.carryingAmount }</Col>
        <Col span={4} className={styles['table-span']}>
            <Tooltip placement="top" title='自筹资金：233.00 财政拨款：26366.00' arrowPointAtCenter>月折旧额</Tooltip>
        </Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.assetsRecord }</Col>
        <Col span={4} className={styles['table-span']}>预计使用年限</Col>
        <Col span={8} className={styles['table-span']}>{ AssetInfoData.useLimit }</Col>
        <Col span={4} className={styles['table-span']}>计提开始时间</Col>
        <Col span={8} className={styles['table-span']}><MonthPicker onChange={(data) =>this.handleUpdateAssetsRecordInfo(data,'JITIKAISHISHIJIAN')}  text={ AssetInfoData.JITIKAISHISHIJIAN } placeholder="选择计提开始时间"></MonthPicker></Col>

        <Col span={24} className={styles['table-span']}>资金结构</Col>
        <Col span={0} className={styles['table-span']}></Col>

        <Col span={4} className={styles['table-span']} style={{textAling:'center'}}> 自筹资金</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}  style={{textAling:'center'}}>财政拨款</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}>自筹资金原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}>财政拨款原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}>科研经费</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}>教学资金</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}>科研经费原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}>教学资金原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}>接收捐赠</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}>其他</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}>接收捐赠原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
        <Col span={4} className={styles['table-span']}>其他原值</Col>
        <Col span={8} className={styles['table-span']}><InputWrapper onEndEdit={(data) => this.handleUpdateAssetsRecordInfo(data,'EQUIPMENT_NAME')} text={ AssetInfoData.equipmentName } /></Col>
        
    </Row>
    )
  }
}


 export default withRouter(connect(null, dispatch => ({
  updateAssetsRecordInfo: (url,values,success,type) => ledgerService.getInfo(url,values,success,type),
}))(DepreInfo));


