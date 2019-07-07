/**
 * 一个比较完整的命令模式，并且携带撤销命令功能
 */

 /**
  * 遥控器类
  * Invoker类的拥有装载命令对象的容器，并且可以对命令对象进行相应的操作
  */
 class ControlWithUndo {
  constructor() {
    this.onCommands = []; // 装载开命令对象的容器
    this.offCommands = []; // 装载关命令对象的容器
    this.undoCommand = new NoCommand(); // 装载撤销命令对象的容器，初始化为空命令对象
  }

  // 装载命令对象，此处slot 表示为插槽的位置
  setCommand(slot, onCommand, offCommand) {
    this.onCommands[slot]  = onCommand;
    this.offCommands[slot] = offCommand;
  }

  pressOn(slot) {
    this.onCommands[slot].execute();
    this.undoCommand = this.onCommands[slot];
  }

  pressOff(slot) {
    this.offCommands[slot].execute();
    this.undoCommand = this.offCommands[slot];
  }

  undoPress() {
    this.undoCommand.undo();
  }
}

/**
 * Receiver类
 */

/**
 * Light类
 */
class Light {
  // type 表示不同房间的灯
  constructor(type) {
    this.type = type || '';
  }

  on() {
    console.log(`${this.type} light is on`);
  }

  off() {
    console.log(`${this.type} light is off`);
  }
}

/**
 * 吊扇类
 */
class CellingFan {
  on() {
    console.log('cellingFan is on');
  }

  off() {
    console.log('cellingFan is off');
  }
}

/**
 * 车库类
 */
class GarageDoor {
  up() {
    console.log('garageDoor is up');
  }

  down() {
    console.log('garageDoor is down');
  }
}

/**
 * 音箱类
 */
class Stereo {
  on() {
    console.log('stereo is on');
  }

  off() {
    console.log('stereo is off');
  }
}

/**
 * Command 接口
 * 为具体的Command类提供必须的接口
 */
class Command {
  execute() {
  }

  undo() {
  }
}

/**
 * 空命令对象
 */
class NoCommand extends Command {}

/**
 * 具体Command类
 * 存储相应的receiver对象，并且叫receiver对象执行相应的命令
 */

/**
 * LightOnCommand类
 */
class LightOnCommand extends Command {
  constructor(receiver) {
    super();
    this.light = receiver;
  }

  execute() {
    this.light.on();
  }

  undo() {
    this.light.off();
  }
}

/**
 * LightOffCommand类
 */
class LightOffCommand extends Command {
  constructor(receiver) {
    super();
    this.light = receiver;
  }

  execute() {
    this.light.off();
  }

  undo() {
    this.light.on();
  }
}

/**
 * CellingFanOnCommand类
 */
class CellingFanOnCommand extends Command {
  constructor(cellingFan) {
    super();
    this.cellingFan = cellingFan;
  }
  execute() {
    this.cellingFan.on();
  }

  undo() {
    this.cellingFan.off();
  }
}

/**
 * CellingFanOffCommand类
 */
class CellingFanOffCommand extends Command {
  constructor(cellingFan) {
    super();
    this.cellingFan = cellingFan;
  }
  execute() {
    this.cellingFan.off();
  }

  undo() {
    this.cellingFan.on();
  }
}

/**
 * GarageDoorUpCommand类
 */
class GarageDoorUpCommand extends Command {
  constructor(garageDoor) {
    super();
    this.garageDoor = garageDoor;
  }
  
  execute() {
    this.garageDoor.up();
  }

  undo() {
    this.garageDoor.down();
  }
}

/**
 * GarageDoorDownCommand类
 */
class GarageDoorDownCommand extends Command {
  constructor(garageDoor) {
    super();
    this.garageDoor = garageDoor;
  }
  
  execute() {
    this.garageDoor.down();
  }

  undo() {
    this.garageDoor.up();
  }
}

/**
 * StereoOnCommand类
 */
class StereoOnCommand extends Command {
  constructor(stereo) {
    super();
    this.stereo = stereo;
  }

  execute() {
    this.stereo.on();
  }

  undo() {
    this.stereo.off();
  }
}

/**
 * StereoOffCommand类
 */
class StereoOffCommand extends Command {
  constructor(stereo) {
    super();
    this.stereo = stereo;
  }

  execute() {
    this.stereo.off();
  }

  undo() {
    this.stereo.on();
  }
}

/**
 * Client类
 */
class Client {
  constructor() {
    // 1.创建调用类
    const control = new ControlWithUndo();

    // 2.创建接受类
    const livingRoomLight = new Light('living room');
    const kitchenLight = new Light('kitchen');
    const cellingFan = new CellingFan();
    const garageDoor = new GarageDoor();
    const stereo = new Stereo();

    // 3.创建相应的命令类
    const livingRoomLightOnCommand = new LightOnCommand(livingRoomLight);
    const livingRoomLightOffCommand = new LightOffCommand(livingRoomLight);
    const kitchenLightOnCommand = new LightOnCommand(kitchenLight);
    const kitchenLightOffCommand = new LightOffCommand(kitchenLight);
    const cellingFanOnCommand = new CellingFanOnCommand(cellingFan);
    const cellingFanOffCommand = new CellingFanOffCommand(cellingFan);
    const garageDoorUpCommand = new GarageDoorUpCommand(garageDoor);
    const garageDoorDownCommand = new GarageDoorDownCommand(garageDoor);
    const stereoOnCommand = new StereoOnCommand(stereo);
    const stereoOffCommand = new StereoOffCommand(stereo);

    // 4.加载命令对象到遥控器对象的相应插槽中
    control.setCommand(0, livingRoomLightOnCommand, livingRoomLightOffCommand);
    control.setCommand(1, kitchenLightOnCommand, kitchenLightOffCommand);
    control.setCommand(2, cellingFanOnCommand, cellingFanOffCommand);
    control.setCommand(3, garageDoorUpCommand, garageDoorDownCommand);
    control.setCommand(4, stereoOnCommand, stereoOffCommand);

    // 5.打开遥控器对象插槽上的开关
    control.pressOn(0);
    control.pressOff(0);
    control.pressOn(1);
    control.pressOff(1);
    control.pressOn(2);
    control.pressOff(2);
    control.pressOn(3);
    control.pressOff(3);
    control.pressOn(4);
    control.pressOff(4);
    control.undoPress();
    control.undoPress();
  }
}

// 执行程序
new Client();