#!/usr/bin/env ts-node

/**
 * 策略模式(strategy):定义了算法簇，分别封装起来，让它们之间可以相互替换，此模式让算法的变化独立于使用算法的客户。
 * 场景：
 */

// 飞行动作接口
interface FlyBehavior {
  fly(): void;
}

// 飞行类
class FlyWithWings implements FlyBehavior {
  public fly() {
    console.log('i am flying');
  }
}

// 不会飞类
class FlyNoWays implements FlyBehavior {
  public fly() {
    console.log('i cannot flying');
  }
}

// 叫动作接口
interface QuackBehavior {
  quack(): void;
}

// 呱呱叫类
class Quack implements QuackBehavior {
  public quack(): void {
    console.log('呱呱叫');
  }
}

// 沉默类
class MuteQuack implements QuackBehavior {
  public quack(): void {
    console.log('沉默');
  }
}

// 吱吱叫
class Squeak implements QuackBehavior {
  public quack(): void {
    console.log('吱吱叫');
  }
}

// 鸭子抽象类
abstract class Duck {
  flyBehavior: FlyBehavior;
  quackBehavior: QuackBehavior;

  public swim(): void {
    console.log('游泳');
  }

  public performFly(): void {
    this.flyBehavior.fly();
  }

  public performQuack(): void {
    this.quackBehavior.quack();
  }

  // 外观
  public abstract display(): void;
}

// 绿头鸭
class MallardDuck extends Duck {
  constructor() {
    super();
    this.flyBehavior = new FlyWithWings();
    this.quackBehavior = new Quack();
  }

  public display(): void {
    console.log('外观是绿头');
  }
}

// 红头鸭
class RedHeadDuck extends Duck {
  constructor() {
    super();
    this.flyBehavior = new FlyWithWings();
    this.quackBehavior = new Quack();
  }

  public display(): void {
    console.log('外观是红头');
  }
}

// 橡皮鸭
class RubberDuck extends Duck {
  constructor() {
    super();
    this.flyBehavior = new FlyNoWays();
    this.quackBehavior = new Squeak();
  }

  public display(): void {
    console.log('外观是橡皮鸭');
  }
}