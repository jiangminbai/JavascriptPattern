#!/usr/bin/env ts-node

/**
 * 抽象工厂模式：提供一个接口，用于创建相关或依赖对象的家族，而不需要明确指定具体类
 * 角色：原料工厂接口和具体原料工厂类、披萨抽象类和具体披萨类、披萨店抽象类和具体披萨店类、原料接口和原料类
 */

/**
 * 一系列原料接口和原料类
 */
interface Dough {}
class ThinCrustDough implements Dough {}
class ThickCrustDough implements Dough {}
interface Sauce {}
class MarinaraSauce implements Dough {}
class PlumTomatoSauce implements Dough {}
interface Cheese {}
class ReggiaoCheese implements Cheese {}
class Mozzarella implements Cheese {}
interface Veggies {}
class Garlic implements Veggies {}
class Onion implements Veggies {}
class Mushroom implements Veggies {}
class RedPepper implements Veggies {}
class BlackOlives implements Veggies {}
class Spinach implements Veggies {}
class Eggplant implements Veggies {}
interface Pepperoni {}
class SlicedPepperoni implements Pepperoni {}
interface Clam {}
class FreshClam implements Clam {}
class FrozenClam implements Clam {}

// 抽象工厂-披萨原料工厂接口
interface PizzaIngredientFactory {
  createDough(): Dough; // 创建面团
  createSauce(): Sauce; // 创建酱
  createCheese(): Cheese; // 创建芝士
  createVeggies(): Veggies; // 创建蔬菜
  createPepperoni(): Pepperoni; // 创建意大利辣味香肠
  createClam(): Clam; // 创建蛤蜊
}

// 具体工厂类-纽约原料工厂类
class NYPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough() {
    return new ThinCrustDough(); // 薄皮面团
  }

  createSauce() {
    return new MarinaraSauce(); // 番茄酱
  }

  createCheese() {
    return new ReggiaoCheese(); // 乳酪芝士
  }

  createVeggies() {
    const veggies: Veggies[] = [new Garlic(), new Onion(), new Mushroom(), new RedPepper()]; // 大蒜, 洋葱，蘑菇，辣椒
    return veggies;
  }

  createPepperoni() {
    return new SlicedPepperoni(); // 切片意大利辣香肠
  }

  createClam() {
    return new FreshClam(); // 新鲜蛤蜊
  }
}

// 具体工厂类-芝加哥原料工厂类
class ChicagoPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough() {
    return new ThickCrustDough(); // 厚皮面团
  }

  createSauce() {
    return new PlumTomatoSauce(); // 紫色的番茄酱
  }

  createCheese() {
    return new Mozzarella(); // 马苏里拉芝士
  }

  createVeggies() {
    const veggies: Veggies[] = [new BlackOlives(), new Spinach(), new Eggplant()] // 黑橄榄、菠菜、茄子、
    return veggies;
  }

  createPepperoni() {
    return new SlicedPepperoni(); // 切片意大利辣香肠
  }

  createClam() {
    return new FrozenClam(); // 冷冻蛤蜊
  }
}

// 披萨抽象类
abstract class Pizza {
  name: string;
  dough: Dough;
  sauce: Sauce;
  cheese: Cheese;
  veggies: Veggies[];
  pepperoni: Pepperoni;
  clam: Clam;

  abstract prepare(): void;
  
  // 烘焙
  bake(): void {
    console.log('bake');
  }

  // 切片
  cut(): void {
    console.log('cut');
  }

  // 装盒
  box(): void {
    console.log('box');
  }

  setName(name: string): void {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
}

// 具体披萨类-芝士披萨类
class CheesePizza extends Pizza {
  ingredientFactory: PizzaIngredientFactory;

  constructor(ingredientFactory: PizzaIngredientFactory) {
    super();

    this.ingredientFactory = ingredientFactory;
  }

  prepare() {
    console.log('preparing ingredient');
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
  }
}

// 具体披萨类-蛤蜊披萨类
class ClamPizza extends Pizza {
  ingredientFactory: PizzaIngredientFactory;

  constructor(ingredientFactory: PizzaIngredientFactory) {
    super();

    this.ingredientFactory = ingredientFactory;
  }

  prepare() {
    console.log('preparing ingredient');
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
    this.clam = this.ingredientFactory.createClam();
  }
}

// 披萨店抽象类
abstract class PizzaStore {
  pizza: Pizza;
  constructor(type: string) {
    console.log(`making ${type} pizza`);
    this.pizza = this.createPizza(type);

    this.pizza.prepare();
    this.pizza.bake();
    this.pizza.cut();
    this.pizza.box();
  }

  abstract createPizza(type: string): Pizza;
}

// 披萨店具体类-纽约披萨店
class NYPizzaStore extends PizzaStore {
  createPizza(type: string) {
    let ingredientFactory = new NYPizzaIngredientFactory();
    let pizza: Pizza;

    switch(type) {
      case 'cheese':
        pizza = new CheesePizza(ingredientFactory);
      case 'clam':
        pizza = new ClamPizza(ingredientFactory);
    }
    return pizza;
  }
}

// 披萨店具体类-芝加哥披萨店
class ChicagoPizzaStore extends PizzaStore {
  createPizza(type: string) {
    let ingredientFactory = new ChicagoPizzaIngredientFactory();
    let pizza: Pizza;

    switch(type) {
      case 'cheese':
        pizza = new CheesePizza(ingredientFactory);
      case 'clam':
        pizza = new ClamPizza(ingredientFactory);
    }
    return pizza;
  }
}

new ChicagoPizzaStore('cheese');


export {}