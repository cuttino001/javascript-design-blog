// npm install babel-preset-env babel-plugin-transform-decorators-legacy --save-dev


// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
    target.hasDecorator = true
  	return target
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
    // Button类的相关逻辑
}

// 验证装饰器是否生效
console.log('Button 是否被装饰了：', Button.hasDecorator)

// babel decorator.js --out-file decorator_babel.js

/**
 * 装饰器函数执行的时候，Button 实例还并不存在。这是因为实例是在我们的代码运行时动态生成的，而装饰器函数则是在编译阶段就执行了。所以说装饰器函数真正能触及到的，就只有类这个层面上的对象。
 * 在编写类装饰器时，我们一般获取一个target参数就足够了。但在编写方法装饰器时，我们往往需要至少三个参数：
 function funcDecorator(target, name, descriptor) {
    let originalMethod = descriptor.value
    descriptor.value = function() {
    console.log('我是Func的装饰器逻辑')
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

 */
/**
 * 装饰器实践
 * 1. React中的装饰器：HOC、connect
 * 2. 优质的源码阅读材料——core-decorators
 */