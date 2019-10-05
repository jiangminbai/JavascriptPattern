#!/usr/bin/env ts-node
/**
 * MVC模式(模型-视图-控制器):
 * 视图：负责呈现模型状态，通过观察者模式的方式接受模型状态的改变，通常也直接从模型中取得业务状态
 * 模型：模型持有所有的业务状态和处理业务逻辑
 * 控制器：负责改变视图UI状态和模型状态
 * 使用的模式：
 * 1.模型和视图|控制器之间使用的是观察者模式
 * 2.视图和控制器之间使用的是策略模式，视图只关心系统中可视的部分，对于任何界面的行为都委托给控制器处理，控制器负责和模型交互来传递用户请求。
 * 3.视图内部使用的是组合模式
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 定序器类-用来产生节拍的
var Sequencer = /** @class */ (function () {
    function Sequencer() {
    }
    // 设置节拍数
    Sequencer.prototype.setBPM = function (beatCount) {
        clearInterval(this.intervalID);
        this.start(beatCount);
    };
    // 开始定序器
    Sequencer.prototype.start = function (beatCount) {
        var _this = this;
        this.delay = 60 * 1000 / beatCount;
        this.intervalID = setInterval(function () {
            if (_this.callback)
                _this.callback();
        }, this.delay || 1000);
    };
    // 停止定序器
    Sequencer.prototype.stop = function () {
        clearInterval(this.intervalID);
    };
    // 节拍调用
    Sequencer.prototype.setBeatCallback = function (cb) {
        this.callback = cb;
    };
    return Sequencer;
}());
// 视图控件抽象类
var Widget = /** @class */ (function () {
    function Widget() {
        this.render();
    }
    // 挂载
    Widget.prototype.mounted = function (container) {
        container.appendChild(this.el);
    };
    // 将html字符串转换为DocumentFragment对象
    Widget.prototype.createFragment = function (template) {
        return document.createRange().createContextualFragment(template);
    };
    return Widget;
}());
/**
 * 视图控件类系列
**/
// 节拍条控件类
var BeatBar = /** @class */ (function (_super) {
    __extends(BeatBar, _super);
    function BeatBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeatBar.prototype.render = function () {
        var tpl = "<div class=\"beat-bar\">\n      <div class=\"beat-bar__chart\"></div>\n    </div>";
        this.el = this.createFragment(tpl);
        this.elemBeatBar = this.el.querySelector('.beat-bar');
        this.elemBeatBarChart = this.el.querySelector('.beat-bar_chart');
    };
    BeatBar.prototype.setValue = function (val) {
        this.elemBeatBarChart.style.width = '100%';
    };
    return BeatBar;
}(Widget));
// 拍子数显示类
var BPMStatus = /** @class */ (function (_super) {
    __extends(BPMStatus, _super);
    function BPMStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BPMStatus.prototype.render = function () {
        var tpl = "<div class=\"bpm-status\">\n      <div class=\"bpm-status__text\">Current BPM: <span class=\"bpm-status__count\"><span></div>\n    </div>";
        this.el = this.createFragment(tpl);
        this.elemBPMStatus = this.el.querySelector('.bpm-status');
        this.elemBPMStatusText = this.el.querySelector('.bpm-status__text');
        this.elemBPMStatusCount = this.el.querySelector('.bpm-status__count');
    };
    BPMStatus.prototype.setText = function (val) {
        this.elemBPMStatusCount.innerHTML = val;
    };
    return BPMStatus;
}(Widget));
// DJ 控制器类
var DJController = /** @class */ (function (_super) {
    __extends(DJController, _super);
    function DJController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DJController.prototype.render = function () {
        var tpl = "<div class=\"dj-controller\">\n      <div>DJ Controller </div>\n      <button class=\"dj-controller-start\">Start</button>\n      <button class=\"dj-controller-stop\">Stop</button>\n      <button class=\"dj-controller-quit\">Quit</button>\n    </div>";
        this.el = this.createFragment(tpl);
        this.elemDJController = this.el.querySelector('.dj-controller');
        this.elemStart = this.el.querySelector('.dj-controller-start');
        this.elemStop = this.el.querySelector('.dj-controller-stop');
        this.elemQuit = this.el.querySelector('.dj-controller-quit');
    };
    DJController.prototype.setStartEnabled = function (enable) {
        this.elemStart.setAttribute('disabled', String(!enable));
    };
    DJController.prototype.setStopEnabled = function (enable) {
        this.elemStop.setAttribute('disabled', String(!enable));
    };
    return DJController;
}(Widget));
// DJ 输入控件类
var DJInput = /** @class */ (function (_super) {
    __extends(DJInput, _super);
    function DJInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DJInput.prototype.render = function () {
        var tpl = "<div class=\"dj-input\">\n      Enter BPM <input class=\"dj-input-inner\" />\n    </div>";
        this.el = this.createFragment(tpl);
        this.elemDJInput = this.el.querySelector('.dj-input');
        this.elemDJInputInner = this.el.querySelector('.dj-input-inner');
    };
    return DJInput;
}(Widget));
// DJ 按钮类
var DJButton = /** @class */ (function (_super) {
    __extends(DJButton, _super);
    function DJButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DJButton.prototype.render = function () {
        var tpl = "<button class=\"dj-button\">Set</button>";
        this.el = this.createFragment(tpl);
        this.elemDJSettingButton = this.el.querySelector('button');
    };
    return DJButton;
}(Widget));
// DJ 设置类
var DJSetting = /** @class */ (function (_super) {
    __extends(DJSetting, _super);
    function DJSetting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DJSetting.prototype.render = function () {
        var tpl = "<div class=\"dj-setting\">\n      <button class=\"dj-setting-left\"><<</button><button class=\"dj-setting-right\">>></button>\n    </div>";
        this.el = this.createFragment(tpl);
        this.elemDJSetting = this.el.querySelector('.dj-setting');
        this.elemDJSettingLeft = this.el.querySelector('.dj-setting-left');
        this.elemDJSettingRight = this.el.querySelector('.dj-setting-right');
    };
    return DJSetting;
}(Widget));
// 节拍模型类
var BeatModel = /** @class */ (function () {
    function BeatModel() {
        this.beatObservers = [];
        this.bpmObservers = [];
    }
    // 给控制器调用的方法，对模型做出适当的处理
    BeatModel.prototype.initialize = function () {
        var _this = this;
        this.sequencer = new Sequencer();
        this.sequencer.setBeatCallback(function () { return _this.beatEvent; });
    };
    BeatModel.prototype.on = function () {
        this.sequencer.start(60);
    };
    BeatModel.prototype.off = function () {
        this.sequencer.stop();
    };
    BeatModel.prototype.setBPM = function (bpm) {
        this.bpm = bpm;
        this.sequencer.setBPM(this.bpm);
        this.notifyBPMObservers();
    };
    BeatModel.prototype.beatEvent = function () {
        this.notifyBeatObservers();
    };
    // 允许视图和控制器获取状态并注册为观察者 
    BeatModel.prototype.getBPM = function () {
        return this.bpm;
    };
    BeatModel.prototype.registerBeatObserver = function (o) {
        this.beatObservers.push(o);
    };
    BeatModel.prototype.removeBeatObserver = function (o) {
        var i = this.beatObservers.indexOf(o);
        if (i > -1)
            this.beatObservers.splice(i, 1);
    };
    BeatModel.prototype.registerBPMObserver = function (o) {
        this.bpmObservers.push(o);
    };
    BeatModel.prototype.removeBPMObserver = function (o) {
        var i = this.bpmObservers.indexOf(o);
        if (i > -1)
            this.bpmObservers.splice(i, 1);
    };
    BeatModel.prototype.notifyBeatObservers = function () {
        for (var i = 0; i < this.beatObservers.length; i++) {
            this.beatObservers[i].updateBeat();
        }
    };
    BeatModel.prototype.notifyBPMObservers = function () {
        for (var i = 0; i < this.bpmObservers.length; i++) {
            this.bpmObservers[i].updateBPM();
        }
    };
    return BeatModel;
}());
// 视图类
var DJView = /** @class */ (function () {
    function DJView(model, controller) {
        this.model = model;
        this.controller = controller;
        this.model.registerBPMObserver(this);
        this.model.registerBeatObserver(this);
    }
    // 创建显示视图部分
    DJView.prototype.createView = function () {
        var showView = document.createElement('div');
        showView.classList.add('show-view');
        this.bpmStatus = new BPMStatus();
        this.beatBar = new BeatBar();
        this.beatBar.mounted(showView);
        this.bpmStatus.mounted(showView);
        document.body.appendChild(showView);
    };
    // 创建控制视图部分
    DJView.prototype.createControls = function () {
        var controllerView = document.createElement('div');
        controllerView.classList.add('controller-view');
        this.djController = new DJController();
        this.djInput = new DJInput();
        this.djButton = new DJButton();
        this.djSetting = new DJSetting();
        this.djController.mounted(controllerView);
        this.djInput.mounted(controllerView);
        this.djButton.mounted(controllerView);
        this.djSetting.mounted(controllerView);
        document.body.appendChild(controllerView);
    };
    DJView.prototype.updateBPM = function () {
        var bpm = this.model.getBPM();
        if (bpm === 0) {
            this.bpmStatus.setText('offline');
        }
        else {
            this.bpmStatus.setText(String(bpm));
        }
    };
    DJView.prototype.updateBeat = function () {
        this.beatBar.setValue(100);
    };
    DJView.prototype.enableStartBeat = function () {
        this.djController.setStartEnabled(true);
    };
    DJView.prototype.disableStartBeat = function () {
        this.djController.setStartEnabled(false);
    };
    DJView.prototype.enableStopBeat = function () {
        this.djController.setStopEnabled(true);
    };
    DJView.prototype.disableStopBeat = function () {
        this.djController.setStopEnabled(false);
    };
    DJView.prototype.setBPM = function (bpm) {
        this.controller.setBPM(bpm);
    };
    DJView.prototype.increaseBPM = function () {
        this.controller.increaseBPM();
    };
    DJView.prototype.decreaseBPM = function () {
        this.controller.decreaseBPM();
    };
    return DJView;
}());
// 节拍控制器类
var BeatController = /** @class */ (function () {
    function BeatController(model) {
        this.model = model;
        this.view = new DJView(model, this);
        this.view.createView();
        this.view.createControls();
        this.view.disableStopBeat();
        this.view.enableStartBeat();
        this.model.initialize();
    }
    BeatController.prototype.start = function () {
        this.model.on();
        this.view.enableStartBeat();
        this.view.disableStopBeat();
    };
    BeatController.prototype.stop = function () {
        this.model.off();
        this.view.enableStopBeat();
        this.view.disableStartBeat();
    };
    BeatController.prototype.increaseBPM = function () {
        var bpm = this.model.getBPM();
        this.model.setBPM(bpm + 1);
    };
    BeatController.prototype.decreaseBPM = function () {
        var bpm = this.model.getBPM();
        this.model.setBPM(bpm - 1);
    };
    BeatController.prototype.setBPM = function (bpm) {
        this.model.setBPM(bpm);
    };
    return BeatController;
}());
// test
var MainDrive = /** @class */ (function () {
    function MainDrive() {
        this.model = new BeatModel();
        this.controller = new BeatController(this.model);
    }
    return MainDrive;
}());
new MainDrive();
