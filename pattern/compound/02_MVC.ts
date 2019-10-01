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
class BeatBar extends Widget {
  elemBeatBar: HTMLElement;
  elemBeatBarChart: HTMLElement;
  render() {
    const tpl = 
    `<div class="beat-bar">
      <div class="beat-bar__chart"></div>
    </div>`
    this.el = this.createFragment(tpl);

    this.elemBeatBar = this.el.querySelector('.beat-bar');
    this.elemBeatBarChart = this.el.querySelector('.beat-bar_chart');
  }

  setValue(val: number) {
    this.elemBeatBarChart.style.width = '100%';
  }
}

// 拍子数显示类
class BPMStatus extends Widget {
  elemBPMStatus: HTMLElement;
  elemBPMStatusText: HTMLElement;
  elemBPMStatusCount: HTMLElement;

  render() {
    const tpl = 
    `<div class="bpm-status">
      <div class="bpm-status__text">Current BPM: <span class="bpm-status__count"><span></div>
    </div>`
    this.el = this.createFragment(tpl);

    this.elemBPMStatus = this.el.querySelector('.bpm-status');
    this.elemBPMStatusText = this.el.querySelector('.bpm-status__text');
    this.elemBPMStatusCount = this.el.querySelector('.bpm-status__count');
  }

  setText(val: string) {
    this.elemBPMStatusCount.innerHTML = val;
  }
}

// DJ 控制器类
class DJController extends Widget {
  elemDJController: HTMLElement;
  elemStart: HTMLElement;
  elemStop: HTMLElement;
  elemQuit: HTMLElement;

  render() {
    const tpl = 
    `<div class="dj-controller">
      <div>DJ Controller </div>
      <button class="dj-controller-start">Start</button>
      <button class="dj-controller-stop">Stop</button>
      <button class="dj-controller-quit">Quit</button>
    </div>`
    this.el = this.createFragment(tpl);

    this.elemDJController = this.el.querySelector('.dj-controller');
    this.elemStart = this.el.querySelector('.dj-controller-start');
    this.elemStop = this.el.querySelector('.dj-controller-stop');
    this.elemQuit = this.el.querySelector('.dj-controller-quit');
  }

  setStartEnabled(enable: boolean) {
    this.elemStart.setAttribute('disabled', String(!enable));
  }

  setStopEnabled(enable: boolean) {
    this.elemStop.setAttribute('disabled', String(!enable));
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

// 视图类
class DJView implements BeatObserver, BPMObserver {
  model: BeatModelInterface;
  controller: ControllerInterface;
  beatBar: BeatBar;
  bpmStatus: BPMStatus;
  djController: DJController;
  djInput: DJInput;
  djButton: DJButton;
  djSetting: DJSetting;

  constructor(model: BeatModelInterface, controller: ControllerInterface) {
    this.model = model;
    this.controller = controller;

    this.model.registerBPMObserver(this);
    this.model.registerBeatObserver(this);
  }

  // 创建显示视图部分
  createView() {
    const showView = document.createElement('div');
    showView.classList.add('show-view');
    this.bpmStatus = new BPMStatus();
    this.beatBar = new BeatBar();
    this.beatBar.mounted(showView);
    this.bpmStatus.mounted(showView);
  }

  // 创建控制视图部分
  createControls() {
    const controllerView = document.createElement('div');
    controllerView.classList.add('controller-view');
    this.djController = new DJController();
    this.djInput = new DJInput();
    this.djButton = new DJButton();
    this.djSetting = new DJSetting();
    this.djController.mounted(controllerView);
    this.djInput.mounted(controllerView);
    this.djButton.mounted(controllerView);
    this.djSetting.mounted(controllerView);
  }

  updateBPM() {
    const bpm = this.model.getBPM();
    if (bpm === 0) {
      this.bpmStatus.setText('offline');
    } else {
      this.bpmStatus.setText(String(bpm));
    }
  }

  updateBeat() {
    this.beatBar.setValue(100);
  }

  enableStartBeat() {
    this.djController.setStartEnabled(true);
  }

  disableStartBeat() {
    this.djController.setStartEnabled(false);
  }

  enableStopBeat() {
    this.djController.setStopEnabled(true);
  }

  disableStopBeat() {
    this.djController.setStopEnabled(false);
  }

  setBPM(bpm: number) {
    this.controller.setBPM(bpm);
  }

  increaseBPM() {
    this.controller.increaseBPM();
  }

  decreaseBPM() {
    this.controller.decreaseBPM();
  }
}

// 控制器接口
interface ControllerInterface {
  start(): void;
  stop(): void;
  increaseBPM(): void;
  decreaseBPM(): void;
  setBPM(bpm: number): void;
}

// 节拍控制器类
class BeatController implements ControllerInterface {
  model: BeatModelInterface;
  view: DJView;

  constructor(model: BeatModelInterface) {
    this.model = model;
    this.view = new DJView(model, this);
    this.view.createView();
    this.view.createControls();
    this.view.disableStopBeat();
    this.view.enableStartBeat();
    this.model.initialize();
  }

  start() {
    this.model.on();
    this.view.enableStartBeat();
    this.view.disableStopBeat();
  }

  stop() {
    this.model.off();
    this.view.enableStopBeat();
    this.view.disableStartBeat();
  }

  increaseBPM() {
    const bpm = this.model.getBPM();
    this.model.setBPM(bpm + 1);
  }

  decreaseBPM() {
    const bpm = this.model.getBPM();
    this.model.setBPM(bpm - 1);
  }

  setBPM(bpm: number) {
    this.model.setBPM(bpm);
  }
}

// test
class MainDrive {
  model: BeatModelInterface;
  controller: ControllerInterface;

  constructor() {
    this.model = new BeatModel();
    this.controller = new BeatController(this.model);
  }
}

new MainDrive();