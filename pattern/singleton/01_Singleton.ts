#!/usr/bin/env ts-node
/**
 * 单例模式：确保类只有一个实例，并提供一个全局访问点
 */

// 单例模式的标准姿势
class Singleton {
  private static uniqueInstance: Singleton; // 定一个静态成员用来存储单例，且只能在类内部访问
  
  private constructor() {  // 把构造器声明为私有的，只能在类内部调用
    console.log('init');
  }

  static getInstance(): Singleton { // getInstance方法被设置为公开的静态成员，被提供作为全局访问点
    if (!this.uniqueInstance) {
      this.uniqueInstance = new Singleton();
    }
    return this.uniqueInstance;
  }
}

// 多次调用只会初始化一次
Singleton.getInstance();
Singleton.getInstance();
