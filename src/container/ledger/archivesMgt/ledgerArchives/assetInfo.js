/**
 * 档案管理-资产档案-详情-基本信息-资产信息
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
class AssetInfo extends Component {
  render () {
    const { AssetInfoData } = this.props;
    return (
      <Row type="flex" style={{marginTop: 16}} className='table-row'>
        <Col span={4} className='table-span'>资产名称</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.equipmetStandarName } </Col>
        <Col span={4} className='table-span'>资产编号</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.assetsRecord }</Col>
        <Col span={4} className='table-span'>通用名称</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.productType }</Col>
        <Col span={4} className='table-span'>状态</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.useFstate }</Col>
        <Col span={4} className='table-span'>型号</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.useFstate }</Col>
        <Col span={4} className='table-span'>规格</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.useFstate }</Col>
        <Col span={4} className='table-span'>资产分类</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.productType }</Col>
        <Col span={4} className='table-span'>使用科室</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.useDeptCode }</Col>
        <Col span={4} className='table-span'>保管员</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.useDeptCode }</Col>
        <Col span={4} className='table-span'>存放地址</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.deposit }</Col>
        <Col span={4} className='table-span'>管理科室</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.bDept }</Col>
        <Col span={4} className='table-span'>注册证号</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.certGuid }</Col>
        <Col span={4} className='table-span'>品牌</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.product }</Col>
        <Col span={4} className='table-span'>生产商</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.product }</Col>
        <Col span={4} className='table-span'>生产商国家</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.product }</Col>
        <Col span={4} className='table-span'>出厂日期</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.productionDate }</Col>
        <Col span={4} className='table-span'>供应商</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.productionDate }</Col>
        <Col span={4} className='table-span'>购置日期</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.productionDate }</Col>
        <Col span={4} className='table-span'>合同编号</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.productionDate }</Col>
        <Col span={4} className='table-span'>计量单位</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.productionDate }</Col>
        <Col span={4} className='table-span'>购买金额</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.buyPrice }</Col>
        <Col span={4} className='table-span'>安装费</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.installPrice }</Col>
        <Col span={4} className='table-span'>经费来源</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.sourceFunds }</Col>
        <Col span={4} className='table-span'>维修分类</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.sourceFunds }</Col>
        <Col span={4} className='table-span'>保养分类</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.sourceFunds }</Col>
        <Col span={4} className='table-span'>计量分类</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.sourceFunds }</Col>
        <Col span={4} className='table-span'>保养周期</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.custodian }</Col>
        <Col span={4} className='table-span'>下次保养</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.custodian }</Col>
        <Col span={4} className='table-span'>保修截止期</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.custodian }</Col>
        <Col span={4} className='table-span'>折旧方式</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.depreciationType }</Col>
        <Col span={4} className='table-span'>原值</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.enableDate }</Col>
        <Col span={4} className='table-span'>净值</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.recodrDate }</Col>
        <Col span={4} className='table-span'>残值率</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.qalevel }</Col>
        <Col span={4} className='table-span'>残值</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.residualValue }</Col>
        <Col span={4} className='table-span'>预计使用年限</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.useLimit }</Col>
        <Col span={4} className='table-span'>有无备用</Col>
        <Col span={8} className='table-span'>{ AssetInfoData.acctDate }</Col>
      </Row>
    )
  }
}

export default AssetInfo;
