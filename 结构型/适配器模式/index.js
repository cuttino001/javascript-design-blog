// 兼容接口就是一把梭——适配器的业务场景
function Ajax(type, url, data, success, failed){
    // 创建ajax对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

   
   var type = type.toUpperCase();
    
    // 识别请求类型
    if(type == 'GET'){
        if(data){
          xhr.open('GET', url + '?' + data, true); //如果有数据就拼接
        } 
        // 发送get请求
        xhr.send();
 
    } else if(type == 'POST'){
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // 发送post请求
        xhr.send(data);
    }
 
    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else {
                if(failed){
                    failed(xhr.status);
                }
            }
        }
    }
}

export default class HttpUtils {
    // get方法
    static get(url) {
      return new Promise((resolve, reject) => {
        // 调用fetch
        fetch(url)
          .then(response => response.json())
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
    
    // post方法，data以object形式传入
    static post(url, data) {
      return new Promise((resolve, reject) => {
        // 调用fetch
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          // 将object类型的数据格式化为合法的body参数
          body: this.changeData(data)
        })
          .then(response => response.json())
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
    
    // body请求体的格式化方法
    static changeData(obj) {
      var prop,
        str = ''
      var i = 0
      for (prop in obj) {
        if (!prop) {
          return
        }
        if (i == 0) {
          str += prop + '=' + obj[prop]
        } else {
          str += '&' + prop + '=' + obj[prop]
        }
        i++
      }
      return str
    }
  }

  // Ajax适配器函数，入参与旧接口保持一致
async function AjaxAdapter(type, url, data, success, failed) {
    const type = type.toUpperCase()
    let result
    try {
         // 实际的请求全部由新接口发起
         if(type === 'GET') {
            result = await HttpUtils.get(url) || {}
        } else if(type === 'POST') {
            result = await HttpUtils.post(url, data) || {}
        }
        // 假设请求成功对应的状态码是1
        result.statusCode === 1 && success ? success(result) : failed(result.statusCode)
    } catch(error) {
        // 捕捉网络错误
        if(failed){
            failed(error.statusCode);
        }
    }
}

// 用适配器适配旧的Ajax方法, 我们只需要编写一个适配器函数AjaxAdapter，并用适配器去承接旧接口的参数，就可以实现新旧接口的无缝衔接了~
async function Ajax(type, url, data, success, failed) {
    await AjaxAdapter(type, url, data, success, failed)
}


/** axios 也有适配器模式 , 兼容浏览器和node环境，并且可以自定义适配器  config.adapter
 * 在 axios 的核心逻辑中，我们可以注意到实际上派发请求的是 dispatchRequest 方法。该方法内部其实主要做了两件事：
1. 数据转换，转换请求体/响应体，可以理解为数据层面的适配；
2. 调用适配器。
*/
