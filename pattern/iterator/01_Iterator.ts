#!/usr/bin/env ts-node

/**
 * 迭代器模式:提供了一种方法可以顺序访问聚合对象中的各个元素，而又不暴露其内部实现。
 * 角色：迭代器接口-具体迭代器类、菜单接口(创建一个迭代器)-具体菜单类、女招待员类
 * 注意：对于迭代器来说，数据结构可以是用顺序或者无序的，不可以对迭代器所取出元素大小顺序做假设。
 * es6 增加了新语法 for/of, 不需要显式创建迭代器，就可以遍历集合
 */

// 菜单项类
class MenuItem {
  name: string;
  description: string;
  vegetarian: boolean;
  price: number;

  constructor(name: string, description: string, vegetarian: boolean, price: number) {
    this.name = name;
    this.description = description;
    this.vegetarian = vegetarian;
    this.price = price;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  isVegetarian(): boolean {
    return this.vegetarian;
  }

  getPrice(): number {
    return this.price;
  }
}

// 迭代器接口
interface MyIterator {
  hasNext(): boolean;
  next(): MenuItem;
}

// 具体迭代器类-煎饼屋菜单迭代器类
class PancakeHouseMenuIterator implements MyIterator {
  position: number;
  items: object;

  constructor(items: object) {
    this.position = 0;
    this.items = items;
  }

  hasNext(): boolean {
    if (this.items[this.position]) return true;
    return false;
  }

  next(): MenuItem {
    const item: MenuItem = this.items[this.position];
    this.position++;
    return item;
  }
}

// 具体迭代器类-餐厅菜单迭代器类
class DinerMenuIterator implements MyIterator {
  position: number;
  items: MenuItem[];

  constructor(items: MenuItem[]) {
    this.position = 0;
    this.items = items;
  }

  hasNext(): boolean {
    if (this.position > this.items.length - 1) return false;
    return true;
  }

  next(): MenuItem {
    const menuItem: MenuItem = this.items[this.position];
    this.position++;
    return menuItem;
  }
}

// 具体迭代器类-咖啡菜单迭代器类
class CafeMenuIterator implements MyIterator {
  position: number;
  items: Map<number, MenuItem>;

  constructor(items: Map<number, MenuItem>) {
    this.position = 0;
    this.items = items;
  }

  hasNext(): boolean {
    if (this.items.get(this.position)) return true;
    return false;
  }

  next(): MenuItem {
    const menuItem = this.items.get(this.position);
    this.position++;
    return menuItem;
  }
}

// 菜单接口
interface Menu {
  createIterator(): MyIterator;
}

// 煎饼屋菜单类 -> menuItem存储在object中
class PancakeHouseMenu implements Menu {
  menuItems: object;
  index: number;

  constructor() {
    this.menuItems = {};
    this.index = 0;
    this.addItem('K&B Pancake Breakfast', 'Pancake with scrambled eggs and toast', true, 2.99);
    this.addItem('Regular Pancake Breakfast', 'Pancakes with fried eggs, sausage', false, 2.99);
    this.addItem('Blueberry Pancake', 'Pancake made with fresh blueberries', true, 3.49);
    this.addItem('Waffles', 'Waffles with your choice of blueberries or strawberries', true, 3.59);
  }

  addItem(name: string, description: string, vegetarian: boolean, price: number) {
    const menuItem = new MenuItem(name, description, vegetarian, price);
    this.menuItems[this.index] = menuItem;
    this.index++;
  }

  // 不需要这个方法，暴露了内部的实现
  // getMenuItems() {
  //   return this.menuItems;
  // }

  // 相当于持有一个迭代器对象，与其是关联关系
  createIterator(): MyIterator {
    return new PancakeHouseMenuIterator(this.menuItems);
  }
}

// 餐厅菜单类 -> menuItem存储在array中
class DinerMenu implements Menu {
  MAX_ITEMS: number;
  numberOfItems: number;
  menuItems: MenuItem[];

  constructor() {
    this.menuItems = [];
    this.MAX_ITEMS = 6;
    this.numberOfItems = 0;
    this.addItem('Vegetarian BLT', 'Fakin Bacon with lettuce & tomato on whole wheat', true, 2.99);
    this.addItem('BLT', 'Bacon with lettuce & tomato on whole wheat', false, 2.99);
    this.addItem('Soup of the day', 'Soup of the day, with a side of potato salad', false, 3.29);
    this.addItem('Hotdog', 'a hot dog, with saurkraut, relish, onoions, topped with cheese', false, 3.05);
  }

  addItem(name: string, description: string, vegetarian: boolean, price: number) {
    const menuItem = new MenuItem(name, description, vegetarian, price);
    if (this.numberOfItems > this.MAX_ITEMS) {
      console.log('sorry, menu is full');
    } else {
      this.menuItems[this.numberOfItems] = menuItem;
      this.numberOfItems++;
    }
  }

  // 不需要这个方法，暴露了内部的实现
  // getMenuItems() {
  //   return this.menuItems;
  // }

  // 返回一个迭代器对象
  createIterator(): MyIterator {
    return new DinerMenuIterator(this.menuItems);
  }
}
// 咖啡菜单类 -> menuItem存储在Map中
class CafeMenu implements Menu {
  menuItems: Map<number, MenuItem>;
  numberOfItems: number;

  constructor() {
    this.numberOfItems = 0;
    this.menuItems = new Map();

    this.addItem('veggie burger and air fries', 'veggie burger on a whole wheat bun, lettuce, tomato and fries', true, 3.99);
    this.addItem('soup of the day', 'a cup of the soup of the day, with a side salad', false, 3.69);
    this.addItem('burrito', 'a large burrito, with whole pinto beans, salsa, guacamole', true, 4.29);
  }

  addItem(name: string, description: string, vegetarian: boolean, price: number) {
    const item = new MenuItem(name, description, vegetarian, price);
    this.menuItems.set(this.numberOfItems, item);
    this.numberOfItems++;
  }

  createIterator(): MyIterator {
    return new CafeMenuIterator(this.menuItems);
  }
}

// 女招待员类
class Waitress {
  menuArr: Menu[]; // 使用数组的方式存储菜单集合

  constructor(menuArr: Menu[]) {
    this.menuArr = menuArr;
  }

  printMenu() {
    this.iteratorMenu(this.menuArr);
  }

  iteratorMenu(menuArr: Menu[]) {
    for (let i=0; i<menuArr.length; i++) {
      const iterator = menuArr[i].createIterator();
      console.log(i);
      while(iterator.hasNext()) {
        console.log(iterator.next().getName());
      }
    }
  }
}
const pancakeMenu = new PancakeHouseMenu();
const dinerMenu = new DinerMenu();
const cafeMenu = new CafeMenu();
const waitress = new Waitress([pancakeMenu, dinerMenu, cafeMenu]);
waitress.printMenu();