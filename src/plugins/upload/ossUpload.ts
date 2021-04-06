/*
 * @Descripttion: 阿里云上传工具类
 * @Author: liuyue
 * @Date: 2020-06-09 19:05:04
 * @LastEditors: liuyue
 * @LastEditTime: 2020-06-09 19:47:53
 */
import OSS from 'ali-oss'
import md5 from 'js-md5'
import { getSTSToken } from '@/service/api/user';
class OSSUpload {
    private client: any;//oss对象
    private accessKeyId: string;//授权id
    private accessKeySecret: string;//授权秘钥
    private stsToken: string;//临时token
    private region: string;//区域
    private bucket: string;//
    private stsKey = "m0b1ycd2ef3g4hi5jk6lm7op8d9fg1";//加密key
    initConfig(): void {
        //使用STS临时授权数据初始化OSS对象
        this.client = new OSS({
            accessKeyId: this.accessKeyId,
            accessKeySecret: this.accessKeySecret,
            stsToken: this.stsToken,
            region: this.region,
            bucket: this.bucket
        });
    };
    /**
     * @name: 获取STS授权数据信息
     * @param path 授权地址
     */
    getSTSToken(path: string): void {
      let timestamp = new Date().getTime().toString();
      let key = md5(this.stsKey + path + timestamp);
      let params = {
            path: path,
            timestamp: timestamp,
            secure: key.toUpperCase()
        }
        getSTSToken(params).then((res:any)=>{
          this.accessKeyId = res.accessKeyId;
          this.accessKeySecret = res.accessKeySecret;
          this.stsToken = res.securityToken;
          this.region = res.region;
          this.bucket = res.bucket;
          this.initConfig();
          setTimeout(()=> {
            this.getSTSToken(path);
          }, 1000 * 60 * 30);//避免失效，半小时请求一次权限
        })
    };
    /**
     * @name: 上传文件
     * @param file 文件对象
     * @param filePath 文件地址
     * @param cb 进度回调函数
     */
    uploadFile(file: File, filePath: string,cb?:Function): Promise<any> {
      return new Promise((resolve, reject) => {
        window.LOG.INFO("[oss] : 开始上传,文件地址:" + filePath);
        if (!this.client) {
          this.initConfig();
        }
        //调用OSS的上传方法，将file上传到res.filepath
        this.client.multipartUpload(filePath, file, {
          progress: async function(progress:any, file:any){
              //上传进度回调;
            cb&&cb(progress)
          }
        }).then((res:any) => {
          //上传完成;
          window.LOG.INFO("[oss] :上传成功,res:" + res);
          resolve(res)
        }).catch((err:any) => {
          //上传失败
          window.LOG.ERROR("[oss] :上传失败,res:" + err);
          reject(err)
        });
      })
    };
    /**
     * @name: 上传文件
     * @param base64 文件base64
     * @param filePath 文件地址
     * @param fileName 文件名称
     */
    uploadBase64File(base64: string, filePath: string, fileName: string): Promise<any> {
      return new Promise((resolve, reject) => {
        if (filePath.indexOf('?') >= 0) {
          filePath = filePath.substring(0, filePath.indexOf('?'));
        }
        let file = this.blobToFile(this.dataURLtoBlob(base64), fileName);
        this.uploadFile(file, filePath).then((res:any)=>{
          resolve(res)
        }).catch((err:any)=>{
          reject(err);
        });
      })
    };
    /**
     * @name: base64转blob
     * @param dataurl base64数据
     */
    dataURLtoBlob(dataurl: string): Blob {
        let arr: any = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    /**
     * @name: blob转file
     * @param theBlob blob数据
     * @param fileName 文件名称
     */
    blobToFile(theBlob: Blob, fileName: string): File {
        // theBlob.lastModifiedDate = new Date();
        // theBlob.name = fileName;
        // return theBlob;
        return new File([theBlob], fileName);
    };
    /*
    * @name 多文件上传
    * @params list Array<File>
    * @description file.path需要在外部手动拼接
    * */
    uploadListFile(list: Array<any>): Promise<any>{
      if( list.length == 0 ){
        return Promise.resolve()
      }
      let self:any = this;
      let promise:Promise<any> = Promise.all(
        list.map((file:any) => {
          return self.uploadFile(file, file.path)
        })
      )
      return promise.then((res:any) => {
        return  Promise.resolve(res)
      }).catch((err:Error)=>{
        return  Promise.reject(err)
      });
    }
}
export default new OSSUpload()
