// api/main.ts
import request from './request';

// get
console.warn(request);

export function GET(params:any,url:string) {
    return request({
        method:'get',
        url: 'https://test.iclass30.com/homework/stuhomework/getStuWorkList',
        params
    });
}

export function POST(params:any,url:string) {
  return request({
    method:'post',
    url: 'https://test.iclass30.com/homework/stuhomework/getStuWorkList',
    params
  });
}
