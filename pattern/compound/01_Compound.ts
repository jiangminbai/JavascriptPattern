#!/usr/bin/env ts-node
/**
 * 复合模式：在一个解决方案中结合两个或多个模式，以解决一般或重复发生的问题。
 */

// 鸭子叫的接口
interface Quackable {
  quack(): void;
}

// 装饰类
class QuackCounter implements Quackable {
  static numberOfQuacks: number = 0;
  duck: Quackable;

  constructor(duck: Quackable) {
    this.duck = duck;
  }

  quack(): void {
    this.duck.quack();
    QuackCounter.numberOfQuacks++;
  }

  public static getQuacks(): number {
    return QuackCounter.numberOfQuacks;
  }
}

// 生产鸭子的抽象工厂类
abstract class AbstractDuckFactory {
  public abstract createMallardDuck(): Quackable;
  public abstract createRedheadDuck(): Quackable;
  public abstract createDuckCall(): Quackable;
  public abstract createRubberDuck(): Quackable;
}

// 具体工厂类
class DuckFactory extends AbstractDuckFactory {
  public createMallardDuck(): Quackable {
    return new MallardDuck();
  }

  public createRedheadDuck(): Quackable {
    return new RedHeadDuck();
  }

  public createDuckCall(): Quackable {
    return new DuckCall();
  }

  public createRubberDuck(): Quackable {
    return new RubberDuck();
  }
}

// 装饰者工厂类
class CountingDuckFactory extends AbstractDuckFactory {
  public createMallardDuck(): Quackable {
    return new QuackCounter(new MallardDuck());
  }

  public createRedheadDuck(): Quackable {
    return new QuackCounter(new RedHeadDuck());
  }

  public createDuckCall(): Quackable {
    return new QuackCounter(new DuckCall());
  }

  public createRubberDuck(): Quackable {
    return new QuackCounter(new RubberDuck());
  }
}

// 绿头鸭类
class MallardDuck implements Quackable {
  quack() {
    console.log('quack');
  }
}

// 红头鸭类
class RedHeadDuck implements Quackable {
  quack() {
    console.log('quack');
  }
}

// 鸭鸣器类
class DuckCall implements Quackable {
  quack() {
    console.log('kwak'); // 不真的像呱呱叫
  }
}

// 橡皮鸭
class RubberDuck implements Quackable {
  quack() {
    console.log('squeak'); // 吱吱叫
  }
}

// 鹅类
class Goose {
  public honk(): void {
    console.log('honk');
  }
}

// 鹅适配器类
class GooseAdapter implements Quackable {
  goose: Goose;

  constructor(goose: Goose) {
    this.goose = goose;
  }

  public quack(): void {
    this.goose.honk();
  }
}

// 模拟器
class DuckSimulator {
  static simulator: DuckSimulator;

  mallardDuck: Quackable;
  redheadDuck: Quackable;
  duckCall: Quackable;
  rubberDuck: Quackable;
  gooseDuck: Quackable;

  public static main(): void {
    this.simulator = new DuckSimulator();
    const DuckFactory: AbstractDuckFactory = new CountingDuckFactory();
    this.simulator.simulate(DuckFactory);
  }

  public simulate(DuckFactory: AbstractDuckFactory):void {
    this.mallardDuck = DuckFactory.createMallardDuck();
    this.redheadDuck = DuckFactory.createRedheadDuck();
    this.duckCall = DuckFactory.createDuckCall();
    this.rubberDuck = DuckFactory.createRubberDuck();
    this.gooseDuck = new GooseAdapter(new Goose());

    console.log('duck simulator');

    this.simulatee(this.mallardDuck);
    this.simulatee(this.redheadDuck);
    this.simulatee(this.duckCall);
    this.simulatee(this.rubberDuck);
    this.simulatee(this.gooseDuck);

    console.log("the ducks quacked " + QuackCounter.getQuacks() + ' times');
  }

  public simulatee(duck: Quackable): void {
    duck.quack();
  }
}

DuckSimulator.main();

export {}