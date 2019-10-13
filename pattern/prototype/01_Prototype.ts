#!/usr/bin/env ts-node
/**
 * 原型模式：用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。
 */

// 怪兽基类
class Monster {
  blood: number;
  attack: number;
}

// 恶魔类
class Demon extends Monster {
  name: string;

  constructor() {
    super();

    this.name = 'demon';
    this.blood = 100;
    this.attack = 100;
  }
}

// 幽灵类
class Ghost extends Monster {
  name: string;

  constructor() {
    super();
    
    this.name = 'ghost';
    this.blood = 200;
    this.attack = 200;
  }
}

// 怪兽注册表类
class MonsterRegistry {
  cmd: any;

  constructor() {
    this.cmd = {
      demon: new Demon(),
      ghost: new Ghost()
    }
  }

  // 通过复制原型来创建新的实例
  getCorrectMonster(name) {
    return Object.assign({}, this.cmd[name]);
  }
}

class Client {
  constructor() {
    const registry = new MonsterRegistry();
    const demon1 = registry.getCorrectMonster('demon');
    const ghost1 = registry.getCorrectMonster('ghost');
  }
}

export {}