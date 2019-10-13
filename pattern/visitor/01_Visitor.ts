#!/usr/bin/env ts-node
/**
 * 访问者模式：表示作用于一个对象结构各元素的操作。将操作都封装在一个访问者对象中，而无需改变对象结构各元素的类。
 * 对象结构各元素只需要提供getState方法。所有的操作或新增操作都在visitor对象中进行
 */

// 元素接口
interface Element {
  getState(): any;
}

// 菜单项类
class MenuItem implements Element {
  state: any;

  constructor(state: any) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

// 原料类
class Material implements Element {
  state: any;

  constructor(state: any) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

// 访问者类
class Visitor {
  element: Element;
  state: any;
  
  constructor(element: Element) {
    this.element = element;
    this.state = this.element.getState();
  }

  // 获取蛋白质
  getProtein() {
    return this.state.protein;
  }

  // 获取维他命
  getVitamin() {
    return this.state.vitamin;
  }
}

export {};