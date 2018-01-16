import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
class Ledger extends Component {
  render() {
    const { routes } = this.props;
    return (
      <Switch>
        {
          routes.map((route, index) => (
            <Route key={index} path={route.path} component={() => (<route.component routes={route.children}/>)}/>
          ))
        }
      </Switch>
    )
  }
}
export default Ledger;