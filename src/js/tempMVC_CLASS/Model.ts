
  // напиши розподілену чергу повідомлень з балансуванням навантаження робочих серверів. Комунікацію між клієнтом і вузлами здійснювати по протоколу HTTP. Передбачити клієнтський  API напиши на пайтоні
  // require 
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/paho-mqtt/paho-mqtt-tests.ts

"use strict";
import {Message} from './index.d';
import {viewMQTT} from './View'

import { TClient, TOptionsMqtt, TObjectTopicElement } from './type';


 
export class ModelMQTT {

  nameClient:string = "clientId-" + String(Math.random());
  client:TClient;
  zero: number = 0;
  objectTopicElement: TObjectTopicElement[] = [];
  messageErrorInputKotel: string;
  kotelServo1: string;


  constructor(){
    this.client = new Paho.MQTT.Client("broker.hivemq.com", 8000, this.nameClient);
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.client.connect(this.options);
    this.messageErrorInputKotel  = 'Error format 123- od 0 do 150';
    this.kotelServo1 = 'kotel-servo-1';
    setInterval(this.lastTimeMessage, 1000);

  }

  doFail(e:any):void {
    console.log(e);
  }

   options:TOptionsMqtt = {
    onSuccess: this.onConnect,
    onFailure: this.doFail
  };

  onConnect() {
    const arraySpanElements: NodeListOf<HTMLSpanElement> = document.querySelectorAll<HTMLSpanElement>('[data-topic]') || [];
    // Once a connection has been made, make a subscription and send a message.
    arraySpanElements?.forEach((e:HTMLSpanElement) => {
    // console.log(typeof e.getAttribute('data-topic'));
    const topic:string = e.getAttribute('data-topic') || "";
    modelMqtt.client.subscribe(topic)
      const obj:TObjectTopicElement = {
        nameTopic: e.getAttribute('data-topic') || "",
        element: e,
        lastTime: 0,
      };
      modelMqtt.objectTopicElement.push(obj);
    });
    console.log("onConnect");
  };

  onConnectionLost(responseObject:any):void {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  onMessageArrived(message:Message):void {
    // console.log(typeof message);
    const indexOfElement = modelMqtt.objectTopicElement.findIndex((topic) =>  topic.nameTopic === message.destinationName);
    const realTime:number =new Date().getTime();
    modelMqtt.objectTopicElement[indexOfElement].element.innerText = message.payloadString;// Вииводимо температуру
    viewMQTT.printTemp(modelMqtt.objectTopicElement[indexOfElement].element, message.payloadString);// Вииводимо температуру

    modelMqtt.objectTopicElement[indexOfElement].lastTime = realTime; //записуємо час коли прийшло повідомлення для кожного елемента
    const _temp = Number(message.payloadString);
    modelMqtt.changeColor(_temp, modelMqtt.objectTopicElement[indexOfElement].element,  message.payloadString)
  }

  changeColor(_temp:number, element:HTMLSpanElement, nameTopic:string){
    if (nameTopic != "kotelservo-1/degres" && nameTopic != "bak/rele" && nameTopic != "bak/flag_rele" && nameTopic != "kotel-servo-1/stled") {
      if (_temp <= -40)  element.style.color = "#0000ff";
      else if (_temp > -40 && _temp <= -30) viewMQTT.changeColor(element, "#2530dc") ;
      else if (_temp > -30 && _temp <= -20) viewMQTT.changeColor(element , '#414ad8');
      else if (_temp > -20 && _temp <= -10) viewMQTT.changeColor(element , '#5b62d0');
      else if (_temp > -10 && _temp <= -5) viewMQTT.changeColor(element , '#777cce');
      else if (_temp > -5 && _temp <= 0) viewMQTT.changeColor(element , '#7379b0');  
      else if (_temp > 0 && _temp <= 5) viewMQTT.changeColor(element , '#7478af');
      else if (_temp > 5 && _temp <= 10) viewMQTT.changeColor(element , '#737593');
      else if (_temp > 10 && _temp <= 15) viewMQTT.changeColor(element , '#000000');
      else if (_temp > 15 && _temp <= 20) viewMQTT.changeColor(element , '#f6c7c7');
      else if (_temp > 20 && _temp <= 30) viewMQTT.changeColor(element , '#e69898');
      else if (_temp > 30 && _temp <= 40) viewMQTT.changeColor(element , '#e65a5a');
      else if (_temp > 40 && _temp <= 50) viewMQTT.changeColor(element , '#f03c3c');
      else if (_temp > 50 && _temp <= 60) viewMQTT.changeColor(element , '#e92020');
      else if (_temp > 60 && _temp <= -70) viewMQTT.changeColor(element , '#e91313');
      else if (_temp > 70) viewMQTT.changeColor(element , '#ff0000');
    }
  }

  lastTimeMessage():void {
    let flag:boolean = false;
    // console.log(modelMqtt.objectTopicElement)
    modelMqtt.objectTopicElement.forEach((e:any)=> {
      //перебираємо всі обєкти масива
      let lastTimeTemp:number = 0;
      const lastTime:number = e.lastTime
      if(lastTime !== 0){
        lastTimeTemp = Number(((new Date().getTime() - e.lastTime) / 1000).toFixed(2)); //Вираховуємо різницю в часі між тим, коли прийшло повідомлення і зараз
      }
      viewMQTT.printLastTime(e.element, lastTimeTemp)
      if (lastTimeTemp > 15) {
        flag = true;
      }
    });
    if (flag) location.reload();
  }

  sendMessageTopic(topic:string, message:string):void {
    const mes = new Paho.MQTT.Message(message);
    mes.destinationName = topic;
    mes.qos = 0;
    // console.log(message)
    this.client.send(mes);
  }

   sendDataKotel(e:Event):void{
    console.log(e)
    e.preventDefault();
    const target = e.target as HTMLButtonElement
    const input = target.previousElementSibling as HTMLInputElement
    const valueDegres:string = input.value;

    if (valueDegres.match(/^\d{1,3}-/)) {
      const num:number = Number(valueDegres.match(/^\d{1,3}/));//Вводимо тільки числа від 1 до 3 знаків
      if (num >= 0 && num <= 180) {
        this.sendMessageTopic(this.kotelServo1, num.toString());
      } else {
        input.value = this.messageErrorInputKotel;
      }
    } else {
      input.value = this.messageErrorInputKotel;
    }
  }

   sendDataTank(e:Event):void{
    e.preventDefault();
    const target = e.target as HTMLButtonElement
    const input = target.previousElementSibling as HTMLInputElement
    modelMqtt.sendMessageTopic('flag_obigriv', input.value);
  }

}

export const modelMqtt = new ModelMQTT();
