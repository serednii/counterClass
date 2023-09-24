// import { counter } from './main';



interface ICreateCounterReturn {
    counter: number;
    initialCounter: number;
    increment: ()=>void;
    decrement: ()=>void;
    reset: ()=>void;
    getCounter: ()=>number;
}

// export function createCounter(initialCounter: number):ICreateCounterReturn {
//     return {
//         counter: initialCounter,
//         increment: function () {
//              if(this.counter<10)this.counter++;
//         },
//         decrement: function () {
//             if(this.counter>0)this.counter--;
//         },
//         reset: function () {
//             this.counter = initialCounter;
//         },
//         getCounter: function () {
//             return this.counter
//         }
//     }
// }

export class Model implements ICreateCounterReturn {
    private counter;
    private initialCounter;
    constructor(initialCounter: number){
        this.counter = initialCounter;
        this.initialCounter = initialCounter;
    }

    increment(){
        if(this.counter<10){
            this.counter++;
        }
    }

    decrement(){
        if(this.counter>0){
            this.counter--;
        }
    }

    reset(){
        this.counter = this.initialCounter;
    }

    getCounter(){
        return this.counter;
    }

}