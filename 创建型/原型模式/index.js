// 创建一个Dog构造函数
function Dog(name, age) {
    this.name = name
    this.age = age
}
Dog.prototype.eat = function() {
    console.log('肉骨头真好吃')
}
// 使用Dog构造函数创建dog实例
const dog = new Dog('旺财', 3)


// prototype指向
console.log(Dog.prototype === dog.__proto__)
console.log(Dog.prototype.constructor === Dog)
console.log(dog.__proto__.constructor === Dog)
// 几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例，除了Object.prototype（当然，如果我们手动用Object.create(null)创建一个没有任何原型的对象，那它也不是 Object 的实例）。