// 记住getInstance方法、记住instance变量、记住闭包和静态方法
function SingleDesign(){

}
SingleDesign.prototype.showDialog = function(){
    console.log('我是个单例对象')
}
SingleDesign.getInstance = (function() {
    var instance = null;
    return function (){
        if(!instance) {
            instance = new SingleDesign();
        }
        return instance;
    }
})()
// 另一种写法
// class SingleDesign{
//     showDialog(){
//         console.log('我是个单例对象')
//     }
//     static getInstance() {
//         if(!SingleDesign.instance) {
//             SingleDesign.instance = new SingleDesign();
//         }
//         return SingleDesign.instance;
//     }
// }

const s1 = SingleDesign.getInstance();

const s2 = SingleDesign.getInstance();

console.log(s1 === s2)