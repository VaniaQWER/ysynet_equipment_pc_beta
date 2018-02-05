/**
 * 维修记录详情
 */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router'
import BaseInfo from './baseInfo'; //基本信息
import { connect } from 'react-redux';
import { ledger as ledgerService } from '../../../../service';
import assets from '../../../../api/assets';

class AllDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      BaseInfoInfoData: {},
    }
  }

  //获取id 根据id号查详情
  componentWillMount = () =>{
    const rrpairOrderGuid = this.props.match.params.id;
    const { getSelectRrpairDetailList } = this.props;
    const params = { rrpairOrderGuid: rrpairOrderGuid };
    getSelectRrpairDetailList(assets.selectRrpairDetailList , params,(data) => {
      this.setState( { BaseInfoInfoData : data.result[0] })
    })
  }

  render() {
    return (
      <BaseInfo BaseInfoInfoData = {this.state.BaseInfoInfoData}/>
    )
  }
}

export default withRouter(connect(null, dispatch => ({
  getSelectRrpairDetailList : (url,values,success) => ledgerService.getInfo(url,values,success),
}))(AllDetail));