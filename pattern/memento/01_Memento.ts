#!/usr/bin/env ts-node
/**
 * 备忘录模式：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样就可以将对象恢复到原先保存的状态。
 * 备忘录是一个状态对象，存储着另一个对象的状态；而后者称为原发器，持有备忘录对象。
 * 场景：以游戏为例
 */

// 备忘录类-游戏角色对象
class Memento {
  level: number = 1;
  point: number = 0;
}

// 原发器类-游戏系统对象
class Originator {
  memento: Memento;

  constructor() {
    this.memento = new Memento();
    console.log(`当前游戏level：${this.memento.level}, point: ${this.memento.point}`);
  }

  // 获取当前状态
  getCurrentState() {
    return Object.assign({}, this.memento);
  }

  // 恢复当前状态
  restoreState(memento: Memento) {
    this.memento = memento;
    console.log(`当前游戏level：${this.memento.level}, point: ${this.memento.point}`);
  }

  // 游戏升级
  upgrade() {
    this.memento.level++
    this.memento.point += 5;
    console.log(`当前游戏level：${this.memento.level}, point: ${this.memento.point}`);
  }
}

// 客户类-外部对象，存储游戏系统对象的状态即备忘录
class Client {
  constructor() {
    // 初始化游戏
    const game = new Originator();

    // 升级一次
    game.upgrade();

    // 存储当前状态
    const saveState = game.getCurrentState();

    // 升级第二次
    game.upgrade();

    // 恢复状态
    game.restoreState(saveState);
  }
}

new Client();

export {}