import * as API from '../test'

// promise
export const getList=(params:any,url:string)=>{
  return  API.POST(params,url);
}
