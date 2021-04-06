// api/main.ts
import request from './request';

// get
console.warn(request);

export function GET(params:any) {
    return request({
        method:'post',
        url: 'https://test.iclass30.com/homework/stuhomework/getStuWorkList',
        params
    });
}
