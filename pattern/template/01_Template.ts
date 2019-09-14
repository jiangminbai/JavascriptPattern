#!/usr/bin/env ts-node

/**
 * 模板方法模式：在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以在不改变算法结构的前提下，重新定义算法中的某些步骤。
 * 场景：冲茶和泡咖啡
 * 角色：咖啡因饮料抽象类、茶类、咖啡类
 * 优势：模板方法定义了一组算法步骤，模式将模板方法与具体实现解耦了
 */

// 咖啡因饮料抽象类-茶类和咖啡类都继承了此类
abstract class CoffeeineBeverage {
  prepareRecipe() {
    this.boilWater(); // 煮水
    this.brew(); // 泡饮料
    this.pourInCup(); // 将泡好的饮料倒进杯子
    this.addCondiments(); // 给饮料加调料
  }

  abstract brew(): void;
  abstract addCondiments(): void;

  boilWater() {
    console.log('boil water');
  }

  pourInCup() {
    console.log('pour in cup');
  }
}

// 咖啡类
class Coffee extends CoffeeineBeverage {
  brew() {
    console.log('brew coffee');
  }

  addCondiments() {
    console.log('add suger and milk');
  }
}

// 茶类
class Tea extends CoffeeineBeverage {
  brew() {
    console.log('brew tea');
  }

  addCondiments() {
    console.log('add lemon');
  }
}

const tea = new Tea();
tea.prepareRecipe();

export {};