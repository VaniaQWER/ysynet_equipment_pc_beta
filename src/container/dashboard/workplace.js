/**
 * @file 工作台
 */
import React, { Component } from 'react';
class Workplace extends Component {
  componentWillUnmount() {
    alert(3333)
  }
  render() {
    return (
      <div style={{background: '#fff'}}>
        工作台
      </div>
    )
  }
}

export default Workplace;