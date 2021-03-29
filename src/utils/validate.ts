// 判断密码是否含有特殊字符
import {isNullOrUndefined} from "@/utils/index";
const validatePassWord  = (rule:any, value:string, callback:any): void => {
    var reg = /^([0-9]|[a-zA-Z]){6,16}$/;
    if ((value !== "" && reg.test(value) === false) || (value !== ""&&(value.length < 6||value.length>16))) {
        callback(new Error('格式不正确，必须为6-16位的英文或数字，且不能包含特殊字符'));
    } else {
        callback();
    }
}
const validateUserName = (role:any, value:string, cb: Function): void =>{
  if( isNullOrUndefined(value) ){
    cb(new Error('用户名不可为空!'))
  }else{
    cb()
  }
}
// 验证手机号
const validateMobile = (rule:any, value:string, callback:any): void => {
    value = value.trim();
    if (value !== "") {
        if (value.length === 11) {
            callback();
        } else {
            callback(new Error('手机号格式不正确'));
        }
    } else {
        callback();
    }
}
/**
 * 判断是否是数字
 */
const checkNumber = (rule:any, value:string, callback:any) : void => {
    let reg = new RegExp("^\\d+$");
    let reg2 = new RegExp("^((-\\d+)|(0+))$");
    if (value !== ""&&!reg.test(value) && !reg2.test(value)) {
        callback(new Error('请输入数字'));
    }else {
        callback();
    }
}

export {
  validatePassWord,
  validateUserName,
  validateMobile,
  checkNumber
}
