
  import {SubscribeOptions} from './index.d';

export type TClient = {
  onConnectionLost(responseObject:any):void;
  onMessageArrived(message:any):void;
  connect(connectOptions:object):void;
  subscribe(filter: string, subcribeOptions?: SubscribeOptions): void;
  send(mes:any):void
}

  export type TOptionsMqtt = {
    onSuccess: ()=>void;
    onFailure: (e: any)=>void;
  }

  export type TObjectTopicElement = {
    nameTopic: string,
    lastTime:number,
    element: HTMLSpanElement
  }  

