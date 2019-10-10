#!/usr/bin/env ts-node
/**
 * 责任链模式：让一个以上的对象有机会处理某个请求。
 * 责任链模式为某个请求创建一个对象链，每个对象依次检查此请求，并对其进行处理或将它传给链中的下一个对象。
 * 每个对象就是一个处理器
 */

// 责任处理器抽象类
abstract class Handler {
  nextHandler: Handler;

  setNextHandler(nextHandler: Handler) {
    this.nextHandler = nextHandler;
  }

  abstract handleRequest(request: any): void;
}

class HandlerA extends Handler {
  handleRequest(request: any) {
    if (request === 'requesta') {
      console.log(`get message is ${request}`);
      return;
    }

    if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    }
  }
}

class HandlerB extends Handler {
  handleRequest(request: any) {
    if (request === 'requestb') {
      console.log(`get message is ${request}`);
      return;
    }

    if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    }
  }
}

class Client {
  constructor() {
    const handlerA = new HandlerA();
    const handlerB = new HandlerB();
    handlerA.setNextHandler(handlerB);
    handlerA.handleRequest('requesta');
  }
}

new Client();

export {}