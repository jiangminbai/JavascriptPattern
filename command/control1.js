/**
 * 这里模拟的是遥控器 遥控 电灯场景，一个基本命令模式的实现
 * 角色：
 * 1.遥控器-Invoker
 * 2.电灯-Receiver
 * 3.人-Client
 * 4.命令类-Command
 * 命令模式将Invoker和Receiver解耦
 */

/**
 * 创建Command接口
 * 接口的概念与Typescript中的Interface一致
 */
class Command {
  // @override
  execute () {

  }
}

/**
 * 创建一个具体Command类-电灯开Command类
 */
class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  // @override
  execute() {
    this.light.on();
  }
}

/**
 * 创建一个具体Command类-电灯关Command类
 */
class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  // @override
  execute() {
    this.light.off();
  }
}

/**
 * 创建一个Receiver类-Light类
 */
class Light {
  on() {
    console.log('light on');
  }
  off() {
    console.log('light off');
  }
}

/**
 * 创建一个Invoker类-遥控器类
 */
class Control {
  constructor() {
    this.slot = null; // 插槽持有命令
  }
  setCommand(command) {
    this.slot = command;
  }
  pressdown() {
    this.slot.execute();
  }
}

/**
 * 创建一个Client类
 */
class Client {
  constructor () {
    // 1.创建一个遥控器
    const control = new Control();
    // 2.创建一个电灯对象,是命令的接受者
    const light = new Light();
    // 3.创建一个具体的命令对象，将接受者传给他
    const lightOnCommand = new LightOnCommand(light);
    // 4.将命令传递给调用者
    control.setCommand(lightOnCommand);
    // 5.执行命令
    control.pressdown();
  }
}

// 执行程序
new Client();