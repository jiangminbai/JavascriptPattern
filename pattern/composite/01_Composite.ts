#!/usr/bin/env ts-node
/**
 * 组合模式：允许你将对象组合成树形结构来表现‘整体/部分’层次结构。组合能够让客户以一致的方式处理个别对象及对象组合。
 * 场景：女招待要遍历各种菜单集合，菜单集合中可能有子菜单和菜单项
 * 角色：菜单组件抽象类、菜单类、菜单项类、迭代器接口、组合迭代器类、女招待类
 * 冰箱贴：拥有子元素的节点被叫做【组合节点】-菜单，没有子元素的节点被叫做【叶节点】-菜单项,顶部的组合节点被叫做【根节点】
 */

// 菜单组件的抽象类-是为了给菜单组合节点和菜单叶节点提供一致的接口，所以内部既有组合节点的方法也有叶节点的方法
// 这种做法是牺牲单一设计原则来换取透明性，这是设计上的抉择，失去了安全性而获取了操作的一致性
abstract class MenuComponent {
  // 组合节点方法的默认实现
  add(menuComponent: MenuComponent): void {
    throw new Error('not support operation');
  }
  remove(i: number): void {
    throw new Error('not support operation');
  }
  getChild(i: number): MenuComponent {
    throw new Error('not support operation');
  }

  // 叶节点方法的默认实现
  getName(): string {
    throw new Error('not support operation');
  }
  getDescription(): string {
    throw new Error('not support operation');
  }
  getPrice(): number {
    throw new Error('not support operation');
  }
  isVegetarian(): boolean {
    throw new Error('not support operation');
  }
  print(): void {
    throw new Error('not support operation');
  }
}

// 菜单项类
class MenuItem extends MenuComponent {
  name: string;
  description: string;
  price: number;
  vegetarian: boolean;

  constructor(name: string, description: string, vegetarian: boolean, price: number) {
    super();

    this.name = name;
    this.description = description;
    this.price = price;
    this.vegetarian = vegetarian;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getPrice(): number {
    return this.price;
  }

  isVegetarian(): boolean {
    return this.vegetarian;
  }

  print(): void {
    console.log(`${this.getName()}${this.isVegetarian() ? '(v)': ''}: ${this.getPrice()}--${this.getDescription()}`);
  }
}

// 迭代器接口
interface MyIterator {
  hasNext(): boolean;
  next(): MenuComponent;  
}

// Composite迭代器具体类
class CompositeIterator implements MyIterator {
  allItems: MenuComponent[];
  index: number;

  constructor(allItems: MenuComponent[]) {
    this.allItems = allItems;
    this.index = 0;
  }

  hasNext(): boolean {
    if (this.allItems[this.index]) return true;
    return false;
  }

  next(): MenuComponent {
    const menuItem = this.allItems[this.index];
    this.index++;
    return menuItem;
  }
}

// 菜单类
class Menu extends MenuComponent {
  menuComponents: MenuComponent[];
  name: string;
  description: string;

  constructor(name: string, description: string) {
    super();

    this.name = name;
    this.description = description;
    this.menuComponents = [];
  }

  add(menuComponent: MenuComponent): void {
    this.menuComponents.push(menuComponent);
  }

  remove(i: number): void {
    this.menuComponents.splice(i, 1);
  }

  getChild(i: number): MenuComponent {
    return this.menuComponents[i];
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  print(): void {
    console.log(`${this.getName()}, ${this.getDescription()}-----------`);

    const myIterator: MyIterator = this.createIterator();
    while(myIterator.hasNext()) {
      const myMenuComponent = myIterator.next();
      myMenuComponent.print();
    }
  }

  // 迭代器
  createIterator(): MyIterator {
    return new CompositeIterator(this.menuComponents);
  }
}

// 女招待类
class Waitress {
  allMenus: MenuComponent;

  constructor() {
    this.allMenus = new Menu('ALL MENUS', 'ALL menus combined');
    
    const pancakeHouseMenu: MenuComponent = this.createPancakeHouseMenu();
    const dinerMenu: MenuComponent = this.createDinerMenu();
    const cafeMenu: MenuComponent = this.createCafeMenu();
    const dessertMenu: MenuComponent = this.createDessertMenu();
    dinerMenu.add(dessertMenu);

    this.allMenus.add(pancakeHouseMenu);
    this.allMenus.add(dinerMenu);
    this.allMenus.add(cafeMenu);

    this.print();
  }

  print() {
    this.allMenus.print();
  }

  createPancakeHouseMenu(): MenuComponent {
    const pancakeHouseMenu: MenuComponent = new Menu('pancake house menu', 'breakfast');
    pancakeHouseMenu.add(new MenuItem('K&B Pancake Breakfast', 'Pancake with scrambled eggs and toast', true, 2.99));
    pancakeHouseMenu.add(new MenuItem('Regular Pancake Breakfast', 'Pancakes with fried eggs, sausage', false, 2.99));
    pancakeHouseMenu.add(new MenuItem('Blueberry Pancake', 'Pancake made with fresh blueberries', true, 3.49));
    pancakeHouseMenu.add(new MenuItem('Waffles', 'Waffles with your choice of blueberries or strawberries', true, 3.59));
    return pancakeHouseMenu;
  }

  createDinerMenu(): MenuComponent {
    const dinerMenu: MenuComponent = new Menu('diner menu', 'lunch');
    dinerMenu.add(new MenuItem('Vegetarian BLT', 'Fakin Bacon with lettuce & tomato on whole wheat', true, 2.99));
    dinerMenu.add(new MenuItem('BLT', 'Bacon with lettuce & tomato on whole wheat', false, 2.99));
    dinerMenu.add(new MenuItem('Soup of the day', 'Soup of the day, with a side of potato salad', false, 3.29));
    dinerMenu.add(new MenuItem('Hotdog', 'a hot dog, with saurkraut, relish, onoions, topped with cheese', false, 3.05));
    return dinerMenu;
  }

  createCafeMenu(): MenuComponent {
    const cafeMenu: MenuComponent = new Menu('cafe menu', 'dinner');
    cafeMenu.add(new MenuItem('veggie burger and air fries', 'veggie burger on a whole wheat bun, lettuce, tomato and fries', true, 3.99));
    cafeMenu.add(new MenuItem('soup of the day', 'a cup of the soup of the day, with a side salad', false, 3.69));
    cafeMenu.add(new MenuItem('burrito', 'a large burrito, with whole pinto beans, salsa, guacamole', true, 4.29));
    return cafeMenu;
  }

  createDessertMenu(): MenuComponent {
    const dessertMenu: MenuComponent = new Menu('dessert menu', 'dessert of course');
    dessertMenu.add(new MenuItem('Apple Pie', 'Apple pie with a flakey crust, topped with vanilla ice cream', true, 1.59));
    dessertMenu.add(new MenuItem('Cheesecake', 'Creamy New York cheesecake, with a chocolate graham crust', true, 1.99));
    dessertMenu.add(new MenuItem('Sortbet', 'A scoop of raspberry and a scoop of lime', true, 1.89));
    return dessertMenu;
  }
}

new Waitress();

export {};