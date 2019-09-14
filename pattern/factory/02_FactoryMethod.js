/**
 * 工厂方法模式-定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个，工厂方法让类实例化推迟到了子类
 * 场景：披萨店制作披萨
 * 角色：披萨店抽象类，披萨店具体类、披萨抽象类、披萨具体类, 类图关系如图02.png
 * 优势：将产品的使用和实现解耦，当增加产品或者改变产品,Creator不会受到影响
 */

/**
 * 披萨店抽象类
 */
class PizzaStore {
  constructor(type) {
    this.pizza = this.createPizza(type);

    // 披萨制作流程
    this.pizza.prepare();
    this.pizza.bake();
    this.pizza.cut();
    this.pizza.box();
  }
  
  // 这里就是工厂方法,子类需要实现这个方法
  createPizza(type) {}
}

// 披萨店具体类-纽约披萨店
class NYPizzaStore extends PizzaStore {
  createPizza(type) {
    let pizza;
    switch(type) {
      case 'cheese':
        pizza = new NYStyleCheesePizza();
        break;
      case 'veggie':
        pizza = new NYStyleVeggiePizza();
        break;
      case 'clam':
        pizza = new NYStyleClamPizza();
        break;
      case 'pepperoni':
        pizza = new NYStylePepperoniPizza();
        break;
    }
    return pizza;
  }
}

// 披萨店具体类-芝加哥披萨店
class CgPizzaStore extends PizzaStore {
  createPizza(type) {
    let pizza;
    switch(type) {
      case 'cheese':
        pizza = new CgStyleCheesePizza();
        break;
      case 'veggie':
        pizza = new CgStyleVeggiePizza();
        break;
      case 'clam':
        pizza = new CgStyleClamPizza();
        break;
      case 'pepperoni':
        pizza = new CgStylePepperoniPizza();
        break;
    }
    return pizza;
  }
}

// 披萨抽象类
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

// 具体披萨类-纽约风味披萨
class NYStyleCheesePizza extends Pizza{}
class NYStyleClamPizza extends Pizza{}
class NYStyleVeggiePizza extends Pizza{}
class NYStylePepperoniPizza extends Pizza{}

// 具体披萨类-芝加哥风味披萨
class CgStyleCheesePizza extends Pizza{}
class CgStyleClamPizza extends Pizza{}
class CgStyleVeggiePizza extends Pizza{}
class CgStylePepperoniPizza extends Pizza{}

new NYPizzaStore('cheese');
new CgPizzaStore('cheese');
