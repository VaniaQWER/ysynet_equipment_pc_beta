import React from 'react';
import { Tooltip } from 'antd';

export default function textTips(width,text) {
  return <Tooltip placement="topLeft" title={text}>
            <div style={{whiteSpace:"nowrap",width:width+"px",textOverflow:"ellipsis",overflow:"hidden"}}>{text}</div>
         </Tooltip>
}

export function timeToStamp(timeStr){
    if(timeStr){
      return Date.parse(new Date(timeStr)) / 1000 
    }else{
      return timeStr
    }
}