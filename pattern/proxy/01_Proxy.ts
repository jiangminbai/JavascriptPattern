#!/usr/bin/env ts-node

/**
 * 代理模式：为另一个对象提供一个替身或占位符以控制对这个对象的访问。
 * 代理模式使用场景：被代理对象可以是远程对象、创建开销大的对象或需要安全控制的对象。
 * 本例场景：远程代理
 */

import { GumballMachine } from '../state/01_State';

// 糖果机监控器
class GumballMonitor {
  public machine: GumballMachine;

  public constructor(machine: GumballMachine) {
    this.machine = machine;
  }

  public report(): void {
    const state = this.machine.getState();
    const count = this.machine.getCount();
    console.log(`this machine state is ${state}`);
    console.log(`this machine count is ${count}`);
  }
}

const monitor = new GumballMonitor(new GumballMachine(10));
monitor.report();