/**
 * 维修记录详情
 */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router'
import BaseInfo from './baseInfo'; //基本信息
import { connect } from 'react-redux';
import { ledger as ledgerService } from '../../../../service';
import assets from '../../../../api/assets';
import querystring from 'querystring';
class AllDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      BaseInfoInfoData:{} ,
    }
  }

  //获取id 根据id号查详情
  componentWillMount = () =>{
    const rrpairOrderGuid = this.props.match.params.id || this.props.id;
    const { getSelectRrpairDetailList } = this.props;
    const params = { rrpairOrderGuid: rrpairOrderGuid };
    getSelectRrpairDetailList(assets.selectRrpairDetailList ,querystring.stringify(params),(data) => {
      this.setState({ 
        BaseInfoInfoData : {...data.result.selectRrpairDetailIsOrder,
                              ...data.result.selectRrpairDetailIsAssets,
                              ...data.result.selectRrpairDetailIsAcce,
                              ...data.result.selectRrpairDetailIsRrpair,
                              ...data.result.selectRrpairDetailIsCall,
                              ...this.props.location.state
                            }
        })
    },{
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    })
  }

  render() {
    return (
      <div>
          {
            JSON.stringify(this.state.BaseInfoInfoData) === '{}'? null
            :
            <BaseInfo BaseInfoInfoData = {this.state.BaseInfoInfoData}/>
          }
      </div>
    )
  }
}

export default withRouter(connect(null, dispatch => ({
  getSelectRrpairDetailList : (url,values,success,type) => ledgerService.getInfo(url,values,success,type),
}))(AllDetail));