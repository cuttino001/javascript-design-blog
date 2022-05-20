// 和策略模式很像
// const stateToProcessor = {
//   american() {
//     console.log("我只吐黑咖啡");
//   },
//   latte() {
//     this.american();
//     console.log("加点奶");
//   },
//   vanillaLatte() {
//     this.latte();
//     console.log("再加香草糖浆");
//   },
//   mocha() {
//     this.latte();
//     console.log("再加巧克力");
//   },
// };

class CoffeeMaker {
  getLeftMilk() {
    console.log("咖啡机现在的牛奶剩余量是:", this.leftMilk);
  }
  constructor() {
    /**
      这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
    **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
    // 初始化牛奶的存储量
    this.leftMilk = 500;
  }

  stateToProcessor = {
    that: this,
    american() {
      // 尝试在行为函数里拿到咖啡机实例的信息并输出
      console.log("【美式】");
      console.log("出一些黑咖啡");
    },
    addMild() {
      console.log("加点奶");
      this.that.leftMilk--;
      this.that.getLeftMilk();
    },
    latte() {
      console.log("【拿铁】");
      this.american();
      this.addMild();
    },
    vanillaLatte() {
      console.log("【香草咖啡】");
      this.latte();
      this.american();
      console.log("再加香草糖浆");
    },
    mocha() {
      console.log("摩卡");
      this.latte();
      console.log("再加巧克力");
    },
  };

  // 关注咖啡机状态切换函数
  changeState(state) {
    this.state = state;
    if (!this.stateToProcessor[state]) {
      return;
    }
    this.stateToProcessor[state]();
  }
}

const mk = new CoffeeMaker();
mk.changeState("latte");
console.log("------");
mk.changeState("mocha");

// 状态模式(State Pattern) ：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。
// 状态模式主要解决的是当控制一个对象状态的条件表达式过于复杂时的情况。把状态的判断逻辑转移到表示不同状态的一系列类中，可以把复杂的判断逻辑简化。
// 唯一的区别在于，定义里强调了”类“的概念。但我们的示例中，包括大家今后的实践中，一个对象的状态如果复杂到了你不得不给它的每 N 种状态划分为一类、一口气划分很多类这种程度，我更倾向于你去反思一个这个对象是不是做太多事情了。事实上，在大多数场景下，我们的行为划分，都是可以像本节一样，控制在”函数“这个粒度的。
