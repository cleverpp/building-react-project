## 发送请求
1. 原生的xhr（XMLHttpRequest）
```
var xhr = new XMLHttpRequest();
xhr.open('GET','www.test.com',true);  //open(method,url,async)
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); setRequestHeader(header,value)
xhr.withCredentials=true; // 跨域携带cookie时需设置
xhr.send();

xhr.onreadystatechange = function(){
    if(xhr.readyState===4 && xhr.status===200){
        console.log(xhr.responseText);
        console.log(xhr.responseXML);
    }
}
```
2. jquery 或 zepto 的ajax (对原生XHR进行了封装)
```
$.ajax({
    type:'POST',
    url:url,
    contentType: 'application/json',
    dataType: 'text/xml',
    data:data,
    success:function(){},
    beforeSend:function(req){
        req.setRequestHeader('header','value');
        req.withCredentials=true;  // 跨域携带cookie时需设置
    }
    error:function(){}
})
```
3. fetch （ES6,基于promise设计）
```
fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "same-origin"
}).then(function(response) {
  response.status     //=> number 100–599
  response.statusText //=> String
  response.headers    //=> Headers
  response.url        //=> String

  return response.text()
}, function(error) {
  error.message //=> String
})
```
>当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），  仅当网络故障时或请求被阻止时，才会标记为 reject。
 默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）.

4. axios (对原生xhr的封装，支持promise，提供了并发请求的接口)
```
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  },
  withCredentials: true  // 跨域携带cookie时需设置
}).then(function(response){
    console.log(response);
}).catch(function (error) {
      console.log(error);
});

// 并发处理
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
  
// 请求或相应拦截
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```

## [axios](https://github.com/axios/axios)
```
$ npm install --save axios
```
![兼容性](https://camo.githubusercontent.com/626c46cfd86214001b4143cda5d0ef27a25bd69f/68747470733a2f2f73617563656c6162732e636f6d2f6f70656e5f73617563652f6275696c645f6d61747269782f6178696f732e737667)

## 参考
1. [从ajax到fetch、axios](https://juejin.im/post/5acde23c5188255cb32e7e76)
2. [Jquery ajax, Axios, Fetch区别之我见](https://segmentfault.com/a/1190000012836882)
3. [axios全攻略](https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/)
