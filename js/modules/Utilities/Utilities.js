
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const range = (from, len) => len?range(len).map(x => x + from):[...Array(from).keys()];
const __getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomInt = (min, max) => __getRandomInt(Math.ceil(min), Math.floor(max));


export const OEPromise = ()=>{
    let resolve, reject;
    const promise = new Promise((r,e)=>(resolve=r)&&(reject=e));
    return [promise, (...args)=>resolve(...args), (...args)=>reject(...args)];
}
export const FCPromise = ()=>{
    const [promise, resolve, reject] = OEPromise();
    return Object.assign(promise, {promise, resolve, reject});
}


/** Простое событие */
export class SimpleEventProvider {
    constructor() {
        const EventListeners = []
        /** Подписка на событие */
        const subsrcibe = (CB)=>EventListeners.push(CB);
        /** Подписка на событие @type {(CB:Function)=>{}} */
        subsrcibe.subsrcibe = subsrcibe
        /** Оповещение о событии */
        subsrcibe.send = (...args)=>EventListeners.map(CB=>CB?.(...args));
        /** Оповещение о событии */
        subscribe.fire = subscribe.send;
        return subsrcibe;
    }
}