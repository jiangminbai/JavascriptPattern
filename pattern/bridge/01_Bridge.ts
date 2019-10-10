#!usr/bin/env ts-node
/**
 * 桥接模式：将抽象部分与实现部分分离，以实现抽象部分与实现部分相互隔离，独立变化。这个桥即为聚合关系。
 * 类图：分为两个层级类-遥控器抽象类和电视机抽象类，可以在这两个维度方向进行扩展
 */

// 遥控器抽象类-持有tv
abstract class RemoteControl {
  implementor: TV;

  constructor(implementor: TV) {
    this.implementor = implementor;
  }

  on() {
    this.implementor.on();
  }

  off() {
    this.implementor.off();
  }

  setChanel(n: number) {
    this.implementor.tuneChanel(n);
  }
}

// 电视机抽象类
abstract class TV {
  tuneChanel(n: number) {
    console.log(`切到频道${n}`)
  }

  off() {
    console.log('关闭电视机');
  }

  on() {
    console.log('打开电视机');
  }
}