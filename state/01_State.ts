#!/usr/bin/env ts-node
/**
 * 状态模式
 * 场景：糖果机投放25美分，转动曲柄，糖果机就会派送糖果。包含4种状态和4种动作。
 *      4种状态：没有25美分、有25美分、糖果售罄、售出糖果；
 *      4种动作：投入25美分、退回25美分、转动曲柄、派送糖果。调用每个动作都会触发状态之间的转换。
 * 角色：
 */

// 状态接口
interface State {
  insertQuarter(): void; // 投入25美分
  ejectQaurter(): void; // 取回25美分
  turnCrank(): void; // 转动曲柄
  dispense(): void; // 派送糖果
}

/**
 * 4种具体状态类
 */

// 没有25美分的状态类
class NoQuarterState implements State {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter(){
    this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
  }
  ejectQaurter() {}
  turnCrank() {}
  dispense(){}
}

// 有25美分的状态类
class HasQuarterState implements State {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {};
  ejectQaurter() {};
  turnCrank() {};
  dispense() {};
}

// 售出糖果的状态类
class SoldState implements State {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {};
  ejectQaurter() {};
  turnCrank() {};
  dispense() {};
}

// 糖果售罄的状态类
class SoldOutState implements State {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {};
  ejectQaurter() {};
  turnCrank() {};
  dispense() {};
}

// 糖果机类
class GumballMachine {
  // 糖果机的几种状态
  private readonly SOLD_OUT: SoldOutState;
  private readonly NO_QUARTER: NoQuarterState;
  private readonly HAS_QUARTER: HasQuarterState;
  private readonly SOLD: SoldState;

  // 当前的状态与糖果剩下的数量
  private state: State;
  private count: number = 0;

  constructor(gumballCount: number) {
    this.NO_QUARTER = new NoQuarterState(this);
    this.HAS_QUARTER = new HasQuarterState(this);
    this.SOLD = new SoldState(this);
    this.SOLD_OUT = new SoldOutState(this);

    this.state = this.SOLD_OUT;
    this.count = gumballCount;
  }

  // 各种动作代理
  insertQuarter(): void {
    this.state.insertQuarter();
  }

  ejectQuarter(): void {
    this.state.ejectQaurter();
  }

  turnCrank(): void {
    this.state.turnCrank();
    this.state.dispense();
  }

  // 这个动作不能暴露出来，因为这个动作是内部执行的，用户不可以要求直接派送糖果
  // dispense() {
  //   this.state.dispense();
  // }

  // 
  setState(state: State): void {
    this.state = state;
  }

  // 获取各种状态
  getHasQuarterState() {
    return this.HAS_QUARTER;
  }
}