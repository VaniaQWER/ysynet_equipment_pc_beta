import React from 'react';
import { Route as R } from 'react-router-dom';
/**
 * @file 基于Route的二次封装
 */
class Route extends React.Component {
  render() {
    const { route } = this.props;
    return (
      <R 
        path={route.path} 
        component={() => (<route.component routes={route.children}/>)}
      />
    )
  }
}

export default Route;
