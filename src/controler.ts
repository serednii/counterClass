import { counter, view } from './main';



// export function onIncrementButtonClick():void{
//     counter.increment();
//     view.render({counter: counter.getCounter()});
// }

// export function onDecrementButtonClick():void{
//     counter.decrement();
//     view.render({counter: counter.getCounter()});
// }

// export function onResetButtonClick():void{
//     counter.reset();
//     view.render({counter: counter.getCounter()});
// }



export class Controller{
    onIncrementButtonClick():void{
        counter.increment();
        view.render({counter: counter.getCounter()});
    }
    
    onDecrementButtonClick():void{
        counter.decrement();
        view.render({counter: counter.getCounter()});
    }
    
    onResetButtonClick():void{
        counter.reset(22);
        view.render({counter: counter.getCounter()});
    }

}