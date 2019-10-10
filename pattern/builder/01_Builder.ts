#!/usr/bin/env ts-node
/**
 * 生成器模式：将产品的生成步骤封装到一个对象中
 * 客户需要更多的领域知识
 */

// 生成器抽象类
abstract class AbstractBuilder {
  abstract buildDay(): void;
  abstract addHotel(): void;
  abstract addSpecialEvent(): void;
  abstract addTickets(): void;
}