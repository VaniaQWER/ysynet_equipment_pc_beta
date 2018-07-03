import React from 'react';
import { Tooltip , } from 'antd';//message
import { _local,FTP } from '../api/local';
import querystring from 'querystring';
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
function compareUp(property){
  return function(a,b){
      var value1 = timeToStamp(a[property]);
      var value2 = timeToStamp(b[property]);
      return  value1  - value2 ;
  }
}
function compareDown(property){
  return function(a,b){
      var value1 = timeToStamp(a[property]);
      var value2 = timeToStamp(b[property]);
      return  value2 - value1;
  }
}
export function sortUpByKey(arr,key){
  return  arr.sort(compareUp(key))
}
export function sortDownByKey(arr,key){
  return  arr.sort(compareDown(key))
}

export const CommonData = (type, cb, params={}, url) => {
  if(localStorage.getItem(type)) {
    cb(JSON.parse(localStorage.getItem(type)));
  } else {
    fetch(url || `${_local}/StaticDataController/selectStaticDataList?code=` + type, {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify(params)
    })
    .then((res) => res.json())
    .then((json) => {
      cb(json.result)
      localStorage.setItem(type, JSON.stringify(json.result));
    })
    .catch((err) => cb(err))
  }
}