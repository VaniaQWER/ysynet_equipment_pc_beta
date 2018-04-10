import React from 'react';
import { Tooltip } from 'antd';
import { FTP } from '../api/local';
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

export function cutFtpUrl(fullUrl){
		if(new RegExp( FTP ).test(fullUrl)){
      let s = fullUrl.replace(new RegExp( FTP ), "")
      return s;
		}else{
      return fullUrl;
    }
}
