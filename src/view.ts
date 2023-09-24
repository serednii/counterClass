import {controller} from './main'
// const counterNode = document.querySelector('.js-counter');
// const incrementBtnNode = document.querySelector('.js-increment-btn');
// const decrementBtnNode = document.querySelector('.js-decrement-btn');
// const resetBtnNode = document.querySelector('.js-reset-btn');

type objCounter = {
    counter: number
}

interface ICreateView {
    render: (counter: objCounter)=>void
}

// export function createView():ICreateView{
//     return {
//         render({counter}){
//             counterNode && (counterNode.innerText = counter)
//             }
//     } 
// }

// incrementBtnNode?.addEventListener('click', onIncrementButtonClick);
// decrementBtnNode?.addEventListener('click', onDecrementButtonClick);
// resetBtnNode?.addEventListener('click', onResetButtonClick);




export class View implements objCounter{
    private counterNode:object;
    private incrementBtnNode:object;
    private decrementBtnNode:object;
    private resetBtnNode:object;
    constructor(){
        this.counterNode = document.querySelector('.js-counter');
        this.incrementBtnNode = document.querySelector('.js-increment-btn');
        this.decrementBtnNode = document.querySelector('.js-decrement-btn');
        this.resetBtnNode = document.querySelector('.js-reset-btn');
        this.incrementBtnNode && (this.incrementBtnNode.addEventListener('click', controller.onIncrementButtonClick));
        this.decrementBtnNode && (this.decrementBtnNode.addEventListener('click', controller.onDecrementButtonClick));
        this.resetBtnNode && (this.resetBtnNode.addEventListener('click', controller.onResetButtonClick));
    }
    render({counter}): void{
            this.counterNode && (this.counterNode.innerText = counter)
            }


}
