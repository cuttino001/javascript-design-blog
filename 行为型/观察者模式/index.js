// 观察者模式有一个“别名”，叫发布 - 订阅模式（之所以别名加了引号，是因为两者之间存在着细微的差异)
class Publisher {
  constructor() {
    this.observers = [];
    console.log("Publisher created");
  }
  add(observer) {
    console.log("Publisher .add invoked");
    this.observers.push(observer);
  }
  remove(observer) {
    console.log("Publisher .remove invoked");
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1);
      }
    });
  }
  notify() {
    console.log("Publisher .notify invoked");
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}

class Observer {
  constructor() {
    console.log("Observer created");
  }
  update() {
    console.log("Observer .update invoked");
  }
}

// 具体项目需求发布类
class PrdPublisher extends Publisher {
  constructor() {
    super();
    this.prdState = null;
    this.observers = [];
    console.log("prdPublisher created");
  }
  getState() {
    console.log("PrdPublisher.getState invoked");
    return this.prdState;
  }
  setState(state) {
    console.log("PrdPublisher.setState invoked");
    // prd的值发生改变
    this.prdState = state;
    // 需求文档变更，立刻通知所有开发者
    this.notify();
  }
}

// 作为订阅方，开发者的任务也变得具体起来：接收需求文档、并开始干活：
class DeveloperObserver extends Observer {
  constructor() {
    super();
    this.prdState = {};
    console.log("DeveloperObserver created");
  }
  update(publisher) {
    console.log("DeveloperObserver .update invoked");
    this.prdState = publisher;
    this.work();
  }
  work() {
    const prd = this.prdState;
    console.log("996 begins");
  }
}

// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver();
const A = new DeveloperObserver();
const B = new DeveloperObserver();
const hanMeiMei = new PrdPublisher();
const prd = { a: "xxw" };
const prd2 = { a: "xxw" };

hanMeiMei.add(liLei);
hanMeiMei.add(A);
hanMeiMei.add(B);
// 韩梅梅发送了需求文档，并@了所有人
hanMeiMei.setState(prd);
hanMeiMei.remove(A);
hanMeiMei.setState(prd2);

// 以上的应该是称做观察者模式
// EventBus 应该是发布订阅模式

/**
 * 回到我们上文的例子里。韩梅梅把所有的开发者拉了一个群，直接把需求文档丢给每一位群成员，这种发布者直接触及到订阅者的操作，叫观察者模式。但如果韩梅梅没有拉群，而是把需求文档上传到了公司统一的需求平台上，需求平台感知到文件的变化、自动通知了每一位订阅了该文件的开发者，这种发布者不直接触及到订阅者、而是由统一的第三方来完成实际的通信的操作，叫做发布-订阅模式。
 */
/**
 * 为什么要有观察者模式？观察者模式，解决的其实是模块间的耦合问题，有它在，即便是两个分离的、毫不相关的模块，也可以实现数据通信。但观察者模式仅仅是减少了耦合，并没有完全地解决耦合问题——被观察者必须去维护一套观察者的集合，这些观察者必须实现统一的方法供被观察者调用，两者之间还是有着说不清、道不明的关系。
 * 而发布-订阅模式，则是快刀斩乱麻了——发布者完全不用感知订阅者，不用关心它怎么实现回调方法，事件的注册和触发都发生在独立于双方的第三方平台（事件总线）上。发布-订阅模式下，实现了完全地解耦。
但这并不意味着，发布-订阅模式就比观察者模式“高级”。在实际开发中，我们的模块解耦诉求并非总是需要它们完全解耦。如果两个模块之间本身存在关联，且这种关联是稳定的、必要的，那么我们使用观察者模式就足够了。而在模块与模块之间独立性较强、且没有必要单纯为了数据通信而强行为两者制造依赖的情况下，我们往往会倾向于使用发布-订阅模式。
 */
