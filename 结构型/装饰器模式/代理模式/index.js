// 类似于vpn代理上网
// 前置知识 ES6 proxy
// 事件代理就是代理模式的应用之一


// 保护代理，保护隐私信息
// 规定礼物的数据结构由type和value组成
const present = {
      type: '巧克力',
    value: 60,
}
// 未知妹子
const girl = {
    // 姓名
    name: '小美',
    // 自我介绍
    aboutMe: '...',
    // 年龄
    age: 24,
    // 职业
    career: 'teacher',
    // 假头像
    fakeAvatar: 'xxxx',
    // 真实头像
    avatar: 'xxxx',
    // 手机号
    phone: 123456,
    // 礼物数组
    presents: [],
    // 拒收50块以下的礼物
    bottomValue: 50,
    // 记录最近一次收到的礼物
    lastPresent: present,
  };

  // 普通私密信息
const baseInfo = ['age', 'career']
// 最私密信息
const privateInfo = ['avatar', 'phone']

// 用户（同事A）对象实例
const user = {
    isValidated: true,
    isVIP: false,
}

// 掘金婚介所登场了
const JuejinLovers = new Proxy(girl, {
  get: function(girl, key) {
      if(baseInfo.indexOf(key)!==-1 && !user.isValidated) {
          console.log('您还没有完成验证哦')
          return
      }
      
      //...(此处省略其它有的没的各种校验逻辑)
    
      // 此处我们认为只有验证过的用户才可以购买VIP
      if(user.isValidated && privateInfo.indexOf(key) && !user.isVIP) {
          console.log('只有VIP才可以查看该信息哦')
          return
      }
  },
  set: function(girl, key, val) {
 
    // 最近一次送来的礼物会尝试赋值给lastPresent字段
    if(key === 'lastPresent') {
      if(val.value < girl.bottomValue) {
          console.log('sorry，您的礼物被拒收了')
          return
      }
    
      // 如果没有拒收，则赋值成功，同时并入presents数组
      girl.lastPresent = val
      girl.presents = [...girl.presents, val]
    }
  }
})

console.log(JuejinLovers.get(girl,'age'));