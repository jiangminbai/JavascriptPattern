/**
 * 简单工厂-严格来说，这不算是一个设计模式，更像一种编程习惯
 * 场景：披萨店做披萨的过程分为两个部分，1创建某一种类型的披萨对象，类型比如有希腊披萨、素食披萨 2.制造披萨，制造流程比如切片烘焙
 * 创建披萨对象部分是易于修改的，而制造披萨的流程一直都是固定的，抽离出来的易于修改的这部分就是一个简单的披萨工厂
 * 角色：披萨店类、披萨工厂类、披萨超类和具体披萨类
 */

// 披萨店类
class PizzaStore {
  constructor(factory) {
    this.factory = factory;
  }

  orderPizza(type) {
    // 通过披萨工厂创建特定类型的披萨
    const pizza = this.factory.createPizza(type);

    // 披萨的制造流程：准备、烘烤、切片、装盒
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }
}

// 披萨工厂类
class SimplePizzaFactory {
  createPizza(type) {
    let pizza;
    switch(type) {
      case 'cheese': // 芝士披萨
        pizza = new CheesePizza();
        break;
      case 'pepperoni': // 意大利披萨
        pizza = new PepperoniPizza();
        break;
      case 'clam': // 蛤蜊披萨
        pizza = new ClamPizza();
        break;
      case 'veggie': // 素食披萨
        pizza = new VeggiePizza();
        break;
    }

    return pizza;
  }
}

// 披萨超类
class Pizza {
  prepare() {
    console.log('prepare');
  }

  bake() {
    console.log('bake');
  }

  cut() {
    console.log('cut');
  }

  box() {
    console.log('box');
  }
}

// 具体披萨类-芝士披萨
class CheesePizza extends Pizza {
  constructor() {
    super();

    console.log('create cheese pizza');
  }
}

// 具体披萨类-意大利披萨
class PepperoniPizza extends Pizza {
  constructor() {
    super();

    console.log('create pepperoni pizza');
  }
}

// 具体披萨类-蛤蜊披萨
class ClamPizza extends Pizza {
  constructor() {
    super();

    console.log('create clam pizza');
  }
}

// 具体披萨类-素食披萨
class VeggiePizza extends Pizza {
  constructor() {
    super();
    
    console.log('create veggie pizza');
  }
}

const factory = new SimplePizzaFactory();
const pizzaStore = new PizzaStore(factory);
pizzaStore.orderPizza('veggie');