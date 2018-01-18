import React, { Component } from 'react';
import Switch from '../../../utils/Switch';
import Route from '../../../utils/Route';
/**
 * @file 订单详情
 */

class SystemUserDetail extends Component {
  render() {
    const { routes } = this.props;
    return (
      <Switch>
        { routes.map((route, index) => <Route key={index} route={route}/>) }
      </Switch>  
    )
  }
}

export default SystemUserDetail;