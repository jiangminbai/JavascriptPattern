#!/usr/bin/env ts-node

/**
 * 迭代器模式
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

// 女招待员类
class Waitress {
  pancakeHouseMenu: Menu;
  dinerMenu: Menu;

  constructor(pancakeHouseMenu: Menu, dinerMenu: Menu) {
    this.pancakeHouseMenu = pancakeHouseMenu;
    this.dinerMenu = dinerMenu;
  }

  printMenu() {
    const pacakeIterator: MyIterator = this.pancakeHouseMenu.createIterator();
    const dinerIterator: MyIterator = this.dinerMenu.createIterator();
    console.log('...pacakeHouseMenu...');
    this.iteratorMenu(pacakeIterator);
    console.log('...dinerMenu...');
    this.iteratorMenu(dinerIterator);
  }

  iteratorMenu(iterator: MyIterator) {
    while(iterator.hasNext()) {
      console.log(iterator.next().getName());
    }
  }
}
const pancakeMenu = new PancakeHouseMenu();
const dinerMenu = new DinerMenu();
const waitress = new Waitress(pancakeMenu, dinerMenu);
waitress.printMenu();