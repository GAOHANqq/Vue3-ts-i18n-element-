//ts 封装ajax
/**
 * $.ajax({
 * type: 'post',
 * url: '/user/12345',
 * data: {
 *  firstName: 'Fred',
 *  lastName: 'Flintstone'
 * },
 * dataType:'json'
 * })
 */
//  interface Config{
//    type:string,
//    url:string
//    data?:string,
//    dataType:string
// }

// export function ajax(config:Config){
//    const xhr = new XMLHttpRequest()
//    xhr.open(config.type,config.url,true)
//    xhr.send(config.data)
//    xhr.onreadystatechange = function(){
//        if(xhr.readyState == 4 && xhr.status == 200){
//            console.log('成功')
//            if(config.dataType == 'json'){
//                JSON.parse(xhr.responseText)
//            }else{
//                console.log(xhr.responseText)
//            }
//        }
//    }
// }

// ajax({
//    type:'get',
//    url: 'https://homeworkh5test.iclass30.com:3000/list',
//    data:'name=zhangsan',
//    dataType:'json'
// })
