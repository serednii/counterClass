
import { Model } from "./model";
import { View } from "./view";
import { Controller } from './controler';
const INITIAL_COUNTER = 0;

// export const counter = createCounter(INITIAL_COUNTER);
// export const view = createView();
// view.render({counter: 54});

export const controller = new Controller();
export const counter = new Model(INITIAL_COUNTER); 
export const view = new View();
console.log(counter.getCounter())
view.render({counter: counter.getCounter()});