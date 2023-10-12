// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/paho-mqtt/paho-mqtt-tests.ts
// напиши розподілену чергу повідомлень з балансуванням навантаження робочих серверів. Комунікацію між клієнтом і вузлами здійснювати по протоколу HTTP. Передбачити клієнтський  API напиши на пайтоні
// require 

"use strict";

import {controllerMQTT} from "./Controller";

export class VIewMQTT{
  sendKotelBtn: HTMLButtonElement;
  sendTankBtn: HTMLButtonElement;
  kotelFormNumber: HTMLInputElement;
  tankInput: HTMLInputElement;
 
  constructor(){

    this.sendKotelBtn = document.querySelector('.kotel-form__send') as HTMLButtonElement;
    this.sendTankBtn = document.querySelector('.tank__send') as HTMLButtonElement;
    this.kotelFormNumber = document.querySelector('.kotel-form__number') as HTMLInputElement;
    this.tankInput = document.querySelector('.tank__input') as HTMLInputElement;

    this.kotelFormNumber?.addEventListener('focus', function(){controllerMQTT.clearInput(this)});
    this.tankInput?.addEventListener('focus', function(){controllerMQTT.clearInput(this)});
    this.sendKotelBtn?.addEventListener('click', function(e){controllerMQTT.sendKotelBtn(e)});
    this.sendTankBtn?.addEventListener('click', function(e){controllerMQTT.sendTankBtn(e)});
  } 

  printTemp(element:HTMLSpanElement, temp:string): void{
    element.innerText = temp;
  }

  printLastTime(element:HTMLSpanElement, time:number): void{
    const nextEl = element.nextElementSibling as HTMLSpanElement
      if (time) nextEl.innerText = String(time); //друкуємо час коли прийшло остання повідомлення секунд назад
  }

  changeColor(element:HTMLSpanElement, color:string): void{
    element.style.color = color;
  }

}

export const viewMQTT = new VIewMQTT();
