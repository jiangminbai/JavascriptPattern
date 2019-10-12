#!/usr/bin/env ts-node
/**
 * 中介者模式：使用中介者模式封装各个对象之间的交互。从而使各个对象不用相互引用，从而使其松耦合。
 */

// 交互对象抽象类
abstract class Collegue {
  abstract onEvent(mediator: Mediator): void;
}

// 闹钟类
class Alarm extends Collegue {
  onEvent(mediator: Mediator) {
    mediator.doEvent('alarm');
  }

  doAlarm() {
    console.log('alarm');
  }
}

// 咖啡类
class CoffeePot extends Collegue {
  onEvent(mediator: Mediator) {
    mediator.doEvent('coffeePot');
  }

  doCoffeePot() {
    console.log('coffeePot');
  }
}

// 日历
class Calender extends Collegue {
  onEvent(mediator: Mediator) {
    mediator.doEvent('calender');
  }

  doCalender() {
    console.log('calender');
  }
}

// 喷头类
class Sprinkler extends Collegue {
  onEvent(mediator: Mediator) {
    mediator.doEvent('sprinkler');
  }

  doSprinkler() {
    console.log('sprinkler');
  }
}

// 中介者类
class Mediator {
  alarm: Alarm;
  coffeePot: CoffeePot;
  calender: Calender;
  sprinkler: Sprinkler;

  constructor(alarm: Alarm, coffeePot: CoffeePot, calender: Calender, sprinkler: Sprinkler) {
    this.alarm = alarm;
    this.coffeePot = coffeePot;
    this.calender = calender;
    this.sprinkler = sprinkler;
  }

  // 处理各个交互对象的事件
  doEvent(type) {
    switch(type) {
      case 'alarm':
        this.doAlarmEvent();
        break;
      case 'coffeePot':
        this.doCoffeePotEvent();
        break;
      case 'calender':
        this.doCalenderEvent();
        break;
      case 'sprinkler':
        this.doSprinklerEvent();
        break;
    }
  }

  doAlarmEvent() {
    this.alarm.doAlarm();
    this.coffeePot.doCoffeePot();
    this.calender.doCalender();
    this.sprinkler.doSprinkler();
  }

  doCoffeePotEvent() {
    this.coffeePot.doCoffeePot();
  }

  doCalenderEvent() {
    this.calender.doCalender();
  }

  doSprinklerEvent() {
    this.sprinkler.doSprinkler();
  }
}

class Client {
  constructor() {
    const alarm = new Alarm();
    const coffeePot = new CoffeePot();
    const calender = new Calender();
    const sprinkler = new Sprinkler();
    const mediator = new Mediator(alarm, coffeePot, calender, sprinkler);
    alarm.onEvent(mediator);
  }
}

new Client();