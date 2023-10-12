// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/paho-mqtt/paho-mqtt-tests.ts
"use strict";

const user = {
    userName: "jack",
    sayHi: function () {
        return this.userName
    }
}

const user1 = {
    userName: "kola",
}


const f1 = user.sayHi;
const f2 = f1.bind(user);
const f3 = f1.bind({ userName: "ola" });
console.log(f3());
console.log(f2());

const button = {
    type: 'button',
    text: "Кнопка",
    render: () => {
        const b = document.createElement(this.type);
        b.textContent = this.text;
        return b;
    }
}

document.querySelector('.out').append(button.render());

const renderElement = button.render;
const renderP = renderElement.bind(button);
const renderE = renderElement.bind({ type: "p", text: "testova knopka" });

document.querySelector('.out').append(renderP());
document.querySelector('.out').append(renderE());

function getWidth() {
    console.log(this.offsetWidth);
}

const getWidth2 = getWidth.bind(document.querySelector('.test-2'))
document.querySelector('.test-1').onclick = function () { console.log(this.textContent) }
function clk() {
    console.log(this)
}

// setTimeout(user.sayHi.bind(user), 1000);

// function f(a, b) {
//     console.log(this)
//     console.log(a + b)
// }

// const g = f.bind('Context')
// g(1, 2)
// const user = {
//     data: [
//         { name: "John" },
//         { name: "Max" },
//     ],
//     showFirst: function () {
//         console.log(this.data[1].name)
//     }
// }

// document.querySelector('.kotel-form__number').addEventListener('click', function () { console.log(this) })
// const f = user.showFirst
// f.bind(user)

// document.querySelector('#btn').addEventListener('click', function (e) {
//     e.preventDefault();
//     f()
//     console.log(this);
// })



