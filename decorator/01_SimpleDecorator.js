/**
 * 装饰者模式
 * 星巴克饮料的场景：饮料为被装饰者，饮料有如咖啡、奶茶等；调料为装饰者，调料有如摩卡、奶泡等
 * 装饰者模式的优势：可以在运行时动态地扩展对象，而非像继承在编译时扩展，比继承方式更有弹性
 */

// 饮料抽象类
class Beverage {
  constructor() {
    this.description = 'unkown beverage'; // 饮料描述
  }

  getDescription() {
    return this.description;
  }

  cost() {} // 返回花费
}

// 调料品接口 继承自饮料抽象类：主要因为需要与饮料同类型而非继承
class CondimentDecorator extends Beverage {
  getDescription() {}
  cost() {}
}

// 具体饮料类-浓缩咖啡
class Espreeso extends Beverage {
  constructor() {
    super();

    this.description = 'Espreeso';
  }

  cost() {
    return 1.99;
  }
}

// 具体饮料类-综合咖啡
class HouseBlend extends Beverage {
  constructor() {
    super();

    this.description = 'HouseBlend';
  }

  cost() {
    return 0.89;
  }
}

// 具体饮料类-深焙咖啡
class DarkRost extends Beverage {
  constructor() {
    super();

    this.description = 'DarkRoast';
  }

  cost() {
    return 0.99;
  }
}

// 具体饮料类-低咖啡因
class Decaf extends Beverage {
  constructor() {
    super();

    this.description = 'Decaf';
  }

  cost() {
    return 1.05;
  }
}

// 具体调料类-摩卡
class Mocha extends CondimentDecorator {
  constructor(beverage) {
    super();

    this.beverage = beverage;
  }

  getDescription() {
    return this.beverage.getDescription() + ', Mocha';
  }

  cost() {
    return 0.2 + this.beverage.cost();
  }
}

// 具体调料类-牛奶
class Milk extends CondimentDecorator {
  constructor(beverage) {
    super();

    this.beverage = beverage;
  }

  getDescription() {
    return this.beverage.getDescription() + ' ,Milk';
  }

  cost() {
    return this.beverage.cost() + 0.1;
  }
}

// 具体饮料类-豆浆
class Soy extends CondimentDecorator {
  constructor(beverage) {
    super();

    this.beverage = beverage;
  }

  getDescription() {
    return this.beverage.getDescription() + ', Soy';
  }

  cost() {
    return this.beverage.cost() + 0.15;
  }
}

// 具体饮料类-奶泡
class Whip extends CondimentDecorator {
  constructor(beverage) {
    super();

    this.beverage = beverage;
  }

  getDescription() {
    return this.beverage.getDescription() + ', Whip';
  }

  cost() {
    return this.beverage.cost() + 0.1;
  }
}

// 主程序类
class Main {
  constructor() {
    // 01 单点一份浓缩咖啡，不加调料
    let beverage = new Espreeso();
    console.log(beverage.getDescription() + ': $' + beverage.cost());
    
    // 02 点一份深焙咖啡，加两份摩卡和一份奶泡
    let beverage2 = new DarkRost();
    beverage2 = new Mocha(beverage2);
    beverage2 = new Mocha(beverage2);
    beverage2 = new Whip(beverage2);
    console.log(beverage2.getDescription() + ': $' + beverage2.cost());

    // 03 点一份综合咖啡，加一份豆浆、摩卡和奶泡
    let beverage3 = new HouseBlend();
    beverage3 = new Soy(beverage3);
    beverage3 = new Mocha(beverage3);
    beverage3 = new Whip(beverage3);
    console.log(beverage3.getDescription() + ': $' + beverage3.cost());
  }
}


new Main();