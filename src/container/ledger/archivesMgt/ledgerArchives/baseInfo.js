/**
 * @file 档案管理-资产档案-详情-基本信息
 */
import React, { Component } from 'react';
import { Collapse } from 'antd';
import AssetInfo from './assetInfo';//资产信息
import AssetParts from './assetParts';//资产配件

const Panel = Collapse.Panel;

class BaseInfo extends Component {
  componentDidMount() {
    // Mock
  }
  render () {
    const { baseInfo } = this.props;
    return (
      <div>
        <Collapse defaultActiveKey={['1','2']}>
          <Panel header="资产图片" key="1">
            资产图片
          </Panel>
          <Panel header="资产信息" key="2">
              <AssetInfo AssetInfoData={baseInfo}/>
          </Panel>
          <Panel header="资产配件" key="3">
            <AssetParts />
          </Panel>
        </Collapse>
      </div>  
    )
  }
}
export default BaseInfo;