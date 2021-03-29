const retoteOrient:string = '?x-oss-process=image/auto-orient,1';

/**
 * @name: 获取路由参数
 * @param name 键值
 * @param url 路由地址
 * @description: 同时支持hash,history模式
 * @return: 参数值,或者undefined
 */
export const getQueryString = (name:string, url:string=location.href) : string|undefined =>{
  if( isNullOrUndefined(name) ){
    throw new Error('the param name is errored')
    return undefined
  }
  if( !isUrl(url) ){
    throw new Error('the param url is errored')
    return undefined
  }
  let _:any = {};
  name += '';
  url += '';
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi,(m:string, key:string, value:any):string => {
    _[key] = value;
    return url;
  });
  return _[name];
}
/**
 * @name: 判断是否为空或uneducated或null
 * @param val 判断的值
 * @return: 是否为空或uneducated或null
 */
export const isNullOrUndefined = (val:string): boolean => {
  return val === null || val === "" || typeof val === "undefined";
}
/**
 * @name: 判断是否数字
 * @return: 是否数字
 */
export const isNum = (arg: any): boolean => {
  return typeof (arg) === 'number';
}
/*
* @name 是否音频
* */
export const isAudio = (path: string): boolean => {
  let ext:Array<string> = [
    '.flv', '.asf', '.avi', '.mpg', '.3gp', '.mp4', '.wav',
    '.rm', '.ra', '.rmvb', '.rt', '.wmv', '.mov', '.mts', '.mp3'];
  let fileExt:string = path.substr(path.lastIndexOf('.')).toLowerCase();//获得文件后缀名
  return ext.indexOf(fileExt) !== -1
}
/*
* @name 是否图片
* */
export const isImage = (str: string=''): boolean => {
  if (str.indexOf('?') > -1) {
    str = str.substring(0, str.indexOf('?'));
  }
  return /\.(png|jpg|gif|jpeg|webp)$/.test(str);
}
/*
* @name 判断是否是url
* */
export const isUrl = (url: string): boolean => {
  if(url !== ''){
    let reg=/(http|ftp|https|file):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
    return reg.test(url)
  }
  return false
}
/*
* @name 中文转换
*
* */
export const arabToChinese = (section: number): string =>{
  if(section>=10 && section <20) {
    return '十' + arabToChinese(section % 10)
  }

  let chnNumChar: Array<string> = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let chnUnitChar: Array<string> = ['', '十', '百', '千']
  let strIns:string = '', chnStr:string = '' ,unitPos:number = 0, zero:boolean = true
  while(section > 0){
    let v = section % 10
    if(v === 0){
      if(!zero){
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    }else{
      zero = false
      strIns = chnNumChar[v]
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    section = Math.floor(section / 10)
  }
  return chnStr
}
/**
 * @name: 数组去重
 * */
export const unique = (arr: Array<any>, key:any): Array<any> => {
  let obj: any = {}
  arr = arr.reduce((item: Array<any>, next: Array<any>): Array<any> => {
    obj[next[key]] ? '' : (obj[next[key]] = true && item.push(next))
    return item
  }, [])
  return arr
}
/*
* @name 下载文件
* */
export const downLoadFile = (url:string): void =>{
  let a:any = document.createElement('a');
  a.href = url;
  a.click();
}
/*
* @name 图片旋转
* */
export const rotateImg = (pDom: HTMLDocument, imgDom:HTMLDocument):void =>{
  let $imgWrap: any = pDom
  let $img: any = imgDom
  let imgDeg: number = $img.data('rotate') ? $img.data('rotate') : 0
  let imgScale: number = 1
  imgDeg = (imgDeg + 90) % 360
  $img.data('rotate', imgDeg)
  // 避免旋转后长宽比例造成的遮挡  缩放相对应倍数
  if(imgDeg == 90 || imgDeg == 270) {
    if($img.width() / $imgWrap.height() > $img.height() / $imgWrap.width()){
      imgScale = $img.width() / $imgWrap.height();
    }else{
      imgScale = $img.height()/$imgWrap.width();
      // 可缩小不可放大
      imgScale = imgScale > 1 ? 1 : imgScale;
    }
  }
  $img.css("transform", "rotate("+imgDeg+"deg"+") scale("+imgScale+")")
}
/*
* @ name 设置阿里云图片旋转参数
* */
export const setRotateOrient = (url: string=''):string=>{
  if(isNullOrUndefined(url)){
    return ''
  }
  if (!/\?/g.test(url)) {
    url += retoteOrient;
  }
  return url
}
/*
* @ name 移除阿里云图片旋转参数
* */
export const removeRotateOrient = (url: string=''):string=>{
  if(isNullOrUndefined(url)){
    return ''
  }
  return url.replace(retoteOrient, '')
}
