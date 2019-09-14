#!/usr/bin/env ts-node

/**
 * 适配器模式-对象适配器：将一个类的接口，转换成客户所期望的另一个接口。适配器让原本接口不兼容的类可以合作无间
 * 场景：火鸡适配鸭子
 * 角色：鸭子接口(目标接口)、适配器类、火鸡接口(被适配者)
 * 装饰者：不改变接口，但是加入责任
 * 适配器：将一个接口转变为另一个接口
 * 外观模式：让接口简单
 */

// 鸭子接口
interface Duck {
  quack(): void; // 呱呱呱叫声
  fly(): void; // 飞翔，距离远
}

// 绿头鸭类
class MallarDuck implements Duck {
  quack() {
    console.log('quack');
  }

  fly() {
    console.log('flying a long distance');
  }
}

// 火鸡接口
interface Turkey {
  gobble(): void; // 咯咯叫
  fly(): void; // 飞翔，距离短
}

// 爷鸭子类
class WildTurkey implements Turkey {
  gobble() {
    console.log('gobble');
  }

  fly() {
    console.log('fly a short distance');
  }
}

// 火鸡适配器类-实现鸭子接口，且持有火鸡的实例
class TurkeyAdapter implements Duck {
  turkey: Turkey;
  constructor(turkey: Turkey) {
    this.turkey = turkey;
  }

  quack() {
    this.turkey.gobble();
  }

  fly() {
    for(let i=0; i<5; i++) this.turkey.fly();
  }
}

// 客户端类
class Main {
  constructor() {
    // 测试绿头鸭子
    const mallarDuck: MallarDuck = new MallarDuck();
    this.testDuck(mallarDuck);

    // 测试被适配的火鸡
    const wildTurkey: WildTurkey = new WildTurkey();
    const turkeyAdapter: Duck = new TurkeyAdapter(wildTurkey);
    this.testDuck(turkeyAdapter);
  }

  testDuck(duck: Duck) {
    duck.quack();
    duck.fly();
  }
}

new Main();