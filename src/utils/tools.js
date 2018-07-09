import React from 'react';
import { Tooltip } from 'antd';//message
import { _local,FTP } from '../api/local';
import querystring from 'querystring';
export default function textTips(width,text) {
  return <Tooltip placement="topLeft" title={text}>
            <div style={{whiteSpace:"nowrap",width:width+"px",textOverflow:"ellipsis",overflow:"hidden"}}>{text}</div>
         </Tooltip>
}
/*时间str转换为时间戳 */
export function timeToStamp(timeStr){
    if(timeStr){
      return Date.parse(new Date(timeStr)) / 1000 
    }else{
      return timeStr
    }
}
export function moneyValid( val,message="请输入非0正数,最多保留两位小数！",maxmessage="输入数值过大, 不能超过100000000",max=99999999){
  let num = Number(val)
  if (/^\d+$/.test(num) ||  /(\d+\.\d{1}$)/.test(num) || /(\d+\.\d{2}$)/.test(num)) {
    if (num > 99999999.99) {
      message.warn(maxmessage)
      return false
    }else{
      return true
    }
  } else {
      message.warn(message)
      return  false
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
/*查询字典*/
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