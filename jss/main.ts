
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/paho-mqtt/paho-mqtt-tests.ts

"use strict";
// напиши розподілену чергу повідомлень з балансуванням навантаження робочих серверів. Комунікацію між клієнтом і вузлами здійснювати по протоколу HTTP. Передбачити клієнтський  API напиши на пайтоні

console.log('123456')
const NAME_CLIENT:string = "clientId-" + String(Math.random());
console.log("clientId-" + String(Math.random()))
const client = new Paho.MQTT.Client("broker.hivemq.com", 8000, NAME_CLIENT);
 
const sendKolelBtn = document.querySelector('.kotel-form__send') as HTMLButtonElement;
const sendTankBtn = document.querySelector('.tank__send') as HTMLButtonElement;

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

type TOptions = {
  onSuccess: ()=>void;
  onFailure: (e: any)=>void;
}

const options = {
  onSuccess: onConnect,
  onFailure: doFail
};

interface IObjectTopicElement {
	nameTopic: string,
  lastTime:number,
	element: HTMLSpanElement
}

let objectTopicElement: IObjectTopicElement[]  = [];
// connect the client
client.connect(options);

// called when the client connects

function onConnect() {
  
  const arraySpanElements: NodeListOf<HTMLSpanElement> = document.querySelectorAll<HTMLSpanElement>('[data-topic]') || [];
  // Once a connection has been made, make a subscription and send a message.
  arraySpanElements?.forEach(function (e:HTMLSpanElement) {
    // console.log(typeof e.getAttribute('data-topic'))
    const topic = e.getAttribute('data-topic') || ""
    console.log(topic)
    client.subscribe(topic);
    const obj:IObjectTopicElement = {
      nameTopic: e.getAttribute('data-topic') || "",
      element: e,
      lastTime: 0,
    };
    objectTopicElement.push(obj);
  });
  console.log("onConnect");
};

console.log(objectTopicElement);

function doFail(e:any) {
  console.log(e);
}

// called when the client loses its connection
function onConnectionLost(responseObject:any):void {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message:any):void {
  const indexOfElement = objectTopicElement.findIndex((topic) =>  topic.nameTopic === message.destinationName);
  const realTime:number =new Date().getTime()
  objectTopicElement[indexOfElement].element.innerText = message.payloadString;// Вииводимо температуру
  objectTopicElement[indexOfElement].lastTime = realTime; //записуємо час коли прийшло повідомлення для кожного елемента
  const _temp = Number(message.payloadString);
  if (message.destinationName != "kotelservo-1/degres" && 
  message.destinationName != "bak/rele" && 
  message.destinationName != "bak/flag_rele" &&
   message.destinationName != "kotel-servo-1/stled") {
    if (_temp <= -40) objectTopicElement[indexOfElement].element.style.color = "#0000ff";
    else if (_temp > -40 && _temp <= -30) objectTopicElement[indexOfElement].element.style.color = "#2530dc";
    else if (_temp > -30 && _temp <= -20) objectTopicElement[indexOfElement].element.style.color = "#414ad8";
    else if (_temp > -20 && _temp <= -10) objectTopicElement[indexOfElement].element.style.color = "#5b62d0";
    else if (_temp > -10 && _temp <= -5) objectTopicElement[indexOfElement].element.style.color = "#777cce";
    else if (_temp > -5 && _temp <= 0) objectTopicElement[indexOfElement].element.style.color = "#7379b0";
    else if (_temp > 0 && _temp <= 5) objectTopicElement[indexOfElement].element.style.color = "#7478af";
    else if (_temp > 5 && _temp <= 10) objectTopicElement[indexOfElement].element.style.color = "#737593";
    else if (_temp > 10 && _temp <= 15) objectTopicElement[indexOfElement].element.style.color = "#000000";
    else if (_temp > 15 && _temp <= 20) objectTopicElement[indexOfElement].element.style.color = "#f6c7c7";
    else if (_temp > 20 && _temp <= 30) objectTopicElement[indexOfElement].element.style.color = "#e69898";
    else if (_temp > 30 && _temp <= 40) objectTopicElement[indexOfElement].element.style.color = "#e65a5a";
    else if (_temp > 40 && _temp <= 50) objectTopicElement[indexOfElement].element.style.color = "#f03c3c";
    else if (_temp > 50 && _temp <= 60) objectTopicElement[indexOfElement].element.style.color = "#e92020";
    else if (_temp > 60 && _temp <= -70) objectTopicElement[indexOfElement].element.style.color = "#e91313";
    else if (_temp > 70) objectTopicElement[indexOfElement].element.style.color = "#ff0000";
  }

}


document.querySelector('.kotel-form__number')?.addEventListener('focus',  function(e ) {
  const target = e.target as HTMLInputElement
target.value = '';
});


document.querySelector('.tank__input')?.addEventListener('focus', function (e) {
  const target = e.target as HTMLInputElement
  target.value = '';
});


sendKolelBtn?.addEventListener('click', function (e) {
  const target = e.target as HTMLButtonElement
  e.preventDefault();
  const input = target.previousElementSibling as HTMLInputElement
  if (input.value.match(/^\d{1,3}-/)) {
    const num:number = Number(input.value.match(/^\d{1,3}/));//Вводимо тільки числа від 1 до 3 знаків
    if (num >= 0 && num <= 180) {
      sendMessageTopic('kotel-servo-1', input.value);
    } else {
      input.value = 'Error format 123- od 0 do 150';
    }
  } else {
    input.value = 'Error format 123- od 0 do 150';
  }
});


sendTankBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target as HTMLButtonElement
  const input = target.previousElementSibling as HTMLInputElement
  sendMessageTopic('flag_obigriv', input.value);
});


function sendMessageTopic(topic:string, message:string):void {
  const mes = new Paho.MQTT.Message(message);
  mes.destinationName = topic;
  mes.qos = 0;
  client.send(mes);
}


setInterval(lastTimeMessage, 1000);

function lastTimeMessage():void {
  let flag:boolean = false;
  objectTopicElement.forEach((e,i)=> {
    //перебираємо всі обєкти масива
    let lastTimeTemp:number = 0;
    const lastTime:number = objectTopicElement[i].lastTime
    if(lastTime !== 0){
      lastTimeTemp = Number(((new Date().getTime() - objectTopicElement[i].lastTime) / 1000).toFixed(2)); //Вираховуємо різницю в часі між тим, коли прийшло повідомлення і зараз
    }
    const nextEl = objectTopicElement[i].element.nextElementSibling as HTMLSpanElement
    if (lastTimeTemp) nextEl.innerText = String(lastTimeTemp); //друкуємо час коли прийшло остання повідомлення секунд назад
    if (lastTimeTemp > 15) {
      flag = true;
    }
  });
  if (flag) location.reload();
}

