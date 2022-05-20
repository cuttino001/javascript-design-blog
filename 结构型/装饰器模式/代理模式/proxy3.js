// 缓存代理
const addAll = function(){
    console.log('进行了一次新计算');
    let result = 0
    const len = arguments.length
    for(let i = 0; i < len; i++) {
        result += arguments[i]
    }
    return result;
}
const proxyAddAll = (function(){    
    const resultCache = {};
    return function(){
        const args = Array.prototype.join.call(arguments, ',')
        if(args in resultCache){
            return resultCache[args]
        }
        return resultCache[args] = addAll(...arguments)
    }
})()



console.log(proxyAddAll(1,2,3));
console.log(proxyAddAll(1,2,3));


/**
 * 代理模式的目的是十分多样化的，既可以是为了加强控制、拓展功能、提高性能，也可以仅仅是为了优化我们的代码结构、实现功能的解耦。无论是出于什么目的，这种模式的套路就只有一个—— A 不能直接访问 B，A 需要借助一个帮手来访问 B，这个帮手就是代理器。需要代理器出面解决的问题，就是代理模式发光发热的应用场景。
 */