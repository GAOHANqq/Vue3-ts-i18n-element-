// api/main.ts
import request from './request';
// import ajax from './ajax'

// get
console.warn(request);
const BASE_URL = 'https://test.iclass30.com/';

export function GET(params:any,url:string) {
    return request({
        method:'get',
        url: BASE_URL+url,
        params
    });
}

export function POST(params:any,url:string) {
    return request({
        method:'post',
        url: BASE_URL+url,
        params
    });
}

