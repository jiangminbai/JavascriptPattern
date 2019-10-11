#!/usr/bin/env ts-node
/**
 * 享元模式：运用共享技术有效地支持大量细粒度的对象
 * 实现思路：将‘所有’树实例的内部状态分离出来，用一个树管理类统一管理
 */

// 树管理器类
class TreeManager {
  treeStatusArray = []; // 存储所有树的状态
  tree: Tree; // 可以被重复利用的树对象

  displayTrees() {
    this.treeStatusArray = [{x: 0, y: 0, age: 1}, {x: 1, y: 1, age: 2}, {x: 3, y: 4, age: 5}];
    for (let i = 0; i < this.treeStatusArray.length; i++) {
      const treeStatus = this.treeStatusArray[i];
      if (!this.tree) this.tree = new Tree();
      this.tree.display(treeStatus.x, treeStatus.y, treeStatus.age);
    }
  }
}

// 树类
class Tree {
  display(x: number, y: number, age: number) {
    console.log(`xcoord is ${x}, ycoord is ${y}, age is ${age}`);
  }
}

class Client {
  constructor() {
    const treeManager = new TreeManager();
    treeManager.displayTrees();
  }
}

new Client();