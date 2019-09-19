#!/usr/bin/env ts-node
/**
 * 观察者模式：定义了对象之间的一对多依赖，当一个对象改变状态时，它的所有依赖者都会收到通知并自动更新。
 * 场景：实现气象站，气象数据对象获取气象数据，每次更新时，都会将数据传递给布告板并通知布告板自动更新。
 * 类图：主题接口、主题对象、观察者接口、观察者对象
 */

// 观察者接口
interface Observer {
  // 观察者更新 温度/湿度/气压
  update(temp: number, humidity: number, pressure: number): void;
}

// 主题接口
interface Subject {
  registerObserver(o: Observer): void; // 注册观察者
  removeObserver(o: Observer): void; // 注销观察者
  notifyObserver(o: Observer): void; // 通知观察者
}

// 公告板接口
interface DisplayElement {
  display(): void; // 显示
}

// 气象站类
class WheatherData implements Subject {
  private observers: Observer[] = [];
  private temp: number;
  private humidity: number;
  private pressure: number;

  registerObserver(o: Observer) {
    this.observers.push(o);
  }

  removeObserver(o: Observer) {
    const index = this.observers.indexOf(o);
    if (index > -1) this.observers.splice(index, 1);
  }

  notifyObserver() {
    for(let i = 0; i < this.observers.length; i++) {
      this.observers[i].update(this.temp, this.humidity, this.pressure);
    }
  }

  // 观测值变化
  measurementsChanged() {
    this.notifyObserver();
  }

  // 设置观测值
  setMeasurements(temp, humidity, pressure) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.measurementsChanged();
  }
}

// 当前状况布告板类
class CurrentConditionsDisplay implements Observer, DisplayElement {
  private temp: number;
  private humidity: number;
  private wheatherData: Subject;

  constructor(wheatherData: Subject) {
    this.wheatherData = wheatherData;
    this.wheatherData.registerObserver(this);
  }

  update(temp: number, humidity: number) {
    this.temp = temp;
    this.humidity = humidity;
    this.display();
  }

  display() {
    console.log(`the temp is ${this.temp}; the humidity is ${this.humidity}`);
  }
}

