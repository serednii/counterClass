
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/paho-mqtt/paho-mqtt-tests.ts

"use strict";

import { modelMqtt } from "./Model";

export class ControllerMQTT{

  constructor(){
  }

 clearInput(contest:HTMLInputElement): void{
  contest && (contest.value = '');
}

 sendKotelBtn(e:Event):void {
  modelMqtt.sendDataKotel(e);
}
 
 sendTankBtn(e:Event):void {
  modelMqtt.sendDataTank(e);
}

}

export const controllerMQTT = new ControllerMQTT();

