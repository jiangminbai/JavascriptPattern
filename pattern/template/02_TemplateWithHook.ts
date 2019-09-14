#!/usr/bin/env ts-node

/**
 * 带钩子函数的模版模式
 * 钩子函数：模式为空或者默认值，他可以影响抽象类中算法的流程
 */

 // 咖啡因饮料抽象类-茶类和咖啡类都继承了此类
abstract class CoffeeineBeverageWithHook {
  prepareRecipe() {
    this.boilWater(); // 煮水
    this.brew(); // 泡饮料
    this.pourInCup(); // 将泡好的饮料倒进杯子
    if (this.customerWantsCondiments()) {
      this.addCondiments(); // 给饮料加调料
    }
  }

  abstract brew(): void;
  abstract addCondiments(): void;

  boilWater() {
    console.log('boil water');
  }

  pourInCup() {
    console.log('pour in cup');
  }

  customerWantsCondiments() { // 钩子函数
    return true;
  }
}

// 咖啡类
class Coffee extends CoffeeineBeverageWithHook {
  brew() {
    console.log('brew coffee');
  }

  addCondiments() {
    console.log('add suger and milk');
  }
}

// 茶类
class Tea extends CoffeeineBeverageWithHook {
  brew() {
    console.log('brew tea');
  }

  addCondiments() {
    console.log('add lemon');
  }

  customerWantsCondiments() {
    return false;
  }
}

const tea = new Tea();
tea.prepareRecipe();

export {};