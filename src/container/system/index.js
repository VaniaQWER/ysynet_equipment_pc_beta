import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../common/404'
class System extends Component {
  render() {
    const { routes } = this.props;
    return (
      <Switch>
        {
          routes.map((route, index) => (
            <Route key={index} path={route.path} component={() => (<route.component routes={route.children}/>)}/>
          ))
        }
        <Route component={NotFound}/>
      </Switch>
    )
  }
}
export default System;