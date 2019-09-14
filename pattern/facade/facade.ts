#!/usr/bin/env ts-node

/**
 * 外观模式：提供一个统一的接口，用来访问子系统的一群接口。外观定义了一个高层接口，让子系统更容易使用。
 * 场景：家庭电影院中有DVD播放器、投影机、自动屏幕、环绕立体声等，看电影变得非常麻烦
 * 角色：外观接口、子系统类群
 * 优点：1.让接口变得简单；2.让客户与子系统解耦，但是不隔离。
 */

// 屏幕类
class Screen {
  down() {
    console.log('the screen is down');
  }

  up() {
    console.log('the screen is on');
  }
}

// 投影机类
class Projector {
  on() {
    console.log('the projector is on');
  }

  // 投影仪功放的输入设置为DVD
  setInputDVD() {
    console.log('the projector is set DVD');
  }

  // 宽屏模式
  windScreenMode() {
    console.log('the projector is set wind screen mode');
  }

  off() {
    console.log('the projector is off');
  }
}

// 功放类
class Amp {
  on() {
    console.log('the amp is on');
  }

  // 功放的输入设置为DVD
  setDVD() {
    console.log('the amp is set DVD');
  }

  // 设置为环绕立体声
  setSurroundSoud() {
    console.log('the amp is set surround soud');
  }

  setVolume(volume: number) {
    console.log(`the amp volume is set ${volume}`);
  }

  off() {
    console.log('the amp is off');
  }
}

// DVD类
class DVD {
  on() {
    console.log('the dvd is on');
  }

  off() {
    console.log('the dvd is off');
  }
}

// 外观类-家庭影院类
class HomeTheatherFacade {
  screen: Screen;
  projector: Projector;
  amp: Amp;
  dvd: DVD;

  constructor(screen: Screen, projector: Projector, amp: Amp, dvd: DVD) {
    this.screen = screen;
    this.projector = projector;
    this.amp = amp;
    this.dvd = dvd;
  }

  watchMovie() {
    this.screen.down();
    this.projector.on();
    this.projector.setInputDVD();
    this.projector.windScreenMode();
    this.amp.on();
    this.amp.setDVD();
    this.amp.setSurroundSoud();
    this.amp.setVolume(5);
    this.dvd.on();
  }

  endMovie() {
    this.screen.up();
    this.projector.off();
    this.amp.off();
    this.dvd.off();
  }
}

// 客户端类
class Client {
  constructor() {
    const screen = new Screen();
    const projector = new Projector();
    const amp = new Amp();
    const dvd = new DVD();
    const homeTheatherFacade = new HomeTheatherFacade(screen, projector, amp, dvd);
    homeTheatherFacade.watchMovie();
  }
}

new Client();

export {}