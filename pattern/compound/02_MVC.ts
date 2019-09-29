#!/usr/bin/env ts-node
/**
 * MVC模式(模型-视图-控制器):
 */

 // 定序器类-用来产生节拍的
class Sequencer {
  intervalID: number;
  delay: number;
  callback: Function;

  // 设置节拍数
  setBPM(beatCount: number) {
    clearInterval(this.intervalID);
    this.start(beatCount);
  }

  // 开始定序器
  start(beatCount: number) {
    this.delay = 60 * 1000 / beatCount;
    this.intervalID = setInterval(() => {
      if (this.callback) this.callback();
    }, this.delay || 1000);
  }

  // 停止定序器
  stop() {
    clearInterval(this.intervalID);
  }

  // 节拍调用
  setBeatCallback(cb: Function) {
    this.callback = cb;
  }
}

// 节拍监听器接口
interface BeatObserver {
  updateBeat(): void;
}

// 节拍数监听器接口
interface BPMObserver {
  updateBPM(): void;
}

// 节拍模型接口
interface BeatModelInterface {
  // 给控制器调用的方法，对模型做出适当的处理
  initialize(): void;
  on(): void;
  off(): void;
  setBPM(bpm: number): void;
  
  // 允许视图和控制器获得状态并变成观察者的
  getBPM(): number;
  registerBeatObserver(o: BeatObserver): void;
  removeBeatObserver(o: BeatObserver): void;
  registerBPMObserver(o: BPMObserver): any;
  removeBPMObserver(o: BPMObserver): void;
}

// 节拍模型类
class BeatModel implements BeatModelInterface {
  sequencer: Sequencer;
  bpm: number;
  beatObservers: BeatObserver[];
  bpmObservers: BPMObserver[];

  // 给控制器调用的方法，对模型做出适当的处理
  initialize(): void {
    this.sequencer = new Sequencer();
    this.sequencer.setBeatCallback(() => this.beatEvent);
  }

  on(): void {
    this.sequencer.start(60);
  }

  off(): void {
    this.sequencer.stop();
  }

  setBPM(bpm: number) {
    this.bpm = bpm;
    this.sequencer.setBPM(this.bpm);
    this.notifyBPMObservers();
  }

  beatEvent(): void {
    this.notifyBeatObservers();
  }

  // 允许视图和控制器获取状态并注册为观察者 
  getBPM(): number {
    return this.bpm;
  }

  registerBeatObserver(o: BeatObserver): void {
    this.beatObservers.push(o);
  }

  removeBeatObserver(o: BeatObserver): void {
    const i = this.beatObservers.indexOf(o);
    if(i > -1) this.beatObservers.splice(i, 1);
  }

  registerBPMObserver(o: BPMObserver): void {
    this.bpmObservers.push(o);
  }

  removeBPMObserver(o: BPMObserver): void {
    const i = this.bpmObservers.indexOf(o);
    if (i > -1) this.bpmObservers.splice(i, 1);
  }

  notifyBeatObservers() {
    for (let i = 0; i < this.beatObservers.length; i++) {
      this.beatObservers[i].updateBeat();
    }
  }

  notifyBPMObservers() {
    for (let i = 0; i < this.bpmObservers.length; i++) {
      this.bpmObservers[i].updateBPM();
    }
  }
}

// 视图控件抽象类
abstract class Widget {
  el: DocumentFragment;

  constructor() {
    this.render();
  }

  // 渲染
  abstract render(): void;

  // 挂载
  mounted(container: HTMLElement) {
    container.appendChild(this.el);
  }

  // 将html字符串转换为DocumentFragment对象
  createFragment(template: string): DocumentFragment {
    return document.createRange().createContextualFragment(template);
  }
}

/**
 * 视图控件类系列
**/

// 节拍条控件类
class BeatLabel extends Widget {
  elemBeatLabel: HTMLElement;
  elemBeatLabelBar: HTMLElement;
  render() {
    const tpl = 
    `<div class="beat-label">
      <div class="beat-label__bar"></div>
    </div>`
    this.el = this.createFragment(tpl);

    this.elemBeatLabel = this.el.querySelector('.beat-label');
    this.elemBeatLabelBar = this.el.querySelector('.beat-label_bar');
  }
}

// 节拍显示条类
class BeatView extends Widget {
  elemBeatView: HTMLElement;
  elemBeatViewText: HTMLElement;
  elemBeatViewCount: HTMLElement;

  render() {
    const tpl = 
    `<div class="beat-view">
      <div class="beat-view__text">Current BPM: <span class="beat-view__count"><span></div>
    </div>`
    this.el = this.createFragment(tpl);

    this.elemBeatView = this.el.querySelector('.beat-view');
    this.elemBeatViewText = this.el.querySelector('.beat-view__text');
    this.elemBeatViewText = this.el.querySelector('.beat-view__count');
  }
}

// DJ 控制器类
class DJController extends Widget {
  elemDJController: HTMLElement;

  render() {
    const tpl = 
    `<div class="dj-controller">
      DJ Controller
    </div>`
    this.el = this.createFragment(tpl);

    this.elemDJController = this.el.querySelector('.dj-controller');
  }
}

// DJ菜单控件类
class DJMenus extends Widget {
  elemDJMenus: HTMLElement;
  elemDJMenusStart: HTMLElement;
  elemDJMenusStop: HTMLElement;
  elemDJMenusQuit: HTMLElement;

  render() {
    const tpl = 
    `<div class="dj-menus">
      <div class="dj-menus__start">Start</div>
      <div class="dj-menus__stop">Stop</div>
      <div class="dj-menus__quit">Quit</div>
    </div>`
    this.el = this.createFragment(tpl);

    this.elemDJMenus = this.el.querySelector('.dj-menus');
    this.elemDJMenusStart = this.el.querySelector('.dj-menus__start');
    this.elemDJMenusStop = this.el.querySelector('.dj-menus__stop');
    this.elemDJMenusQuit = this.el.querySelector('.dj-menus__quit');
  }
}

// DJ 输入控件类
class DJInput extends Widget {
  elemDJInput: HTMLElement;
  elemDJInputInner: HTMLElement;

  render() {
    const tpl = 
    `<div class="dj-input">
      Enter BPM <input class="dj-input-inner" />
    </div>`

    this.el = this.createFragment(tpl);
    this.elemDJInput = this.el.querySelector('.dj-input');
    this.elemDJInputInner = this.el.querySelector('.dj-input-inner');
  }
}

// DJ 按钮类
class DJButton extends Widget {
  elemDJSettingButton: HTMLElement;

  render() {
    const tpl = `<button>Set</button>`
    this.el = this.createFragment(tpl);
    this.elemDJSettingButton = this.el.querySelector('button');
  }
}

// DJ 设置类
class DJSetting extends Widget {
  elemDJSetting: HTMLElement;
  elemDJSettingLeft: HTMLElement;
  elemDJSettingRight: HTMLElement;

  render() {
    const tpl = 
    `<div class="dj-setting">
      <span class="dj-setting-left"><<</span><span class="dj-setting-right">>></span>
    </div>`
    this.el = this.createFragment(tpl);
    this.elemDJSetting = this.el.querySelector('.dj-setting');
    this.elemDJSettingLeft = this.el.querySelector('.dj-setting-left');
    this.elemDJSettingRight = this.el.querySelector('.dj-setting-right');
  }
}

// 视图类
class DJView implements BeatObserver, BPMObserver {
  model: BeatModelInterface;
  controller: ControllerInterface;

  constructor(model: BeatModelInterface, controller: ControllerInterface) {
    this.model = model;
    this.controller = controller;

    this.model.registerBPMObserver(this);
    this.model.registerBeatObserver(this);
  }

  // 创建所有的view组件
  createView() {

  }

  updateBPM() {

  }

  updateBeat() {

  }
}