export const BoardConstants = { //=D
    // здесь будут будущие наши константы
}
export class TCRColour {
    /** @type {int} */
    id
    /** example '#0bf392' @type {string} */
    htmlcode
}
export class TPlayer {
    /** @type {string} */
    username
    /** Знак игрока, крестик, ножик, треугольник или например даже крюк@type {string} */ 
    Symbol
    /** @type {string} */
    SymbolImageSrc
    /** @type {TCRColour} */
    Colour
}
export class Cell {
    /** человек который установил здесь вирус @type {TPlayer} */
    Virus
    /** игрок который установил здесь свою цепочку @type {TPlayer} */
    Chain
    constructor(x, y) {
        /** @type {int} */
        this.x = x;
        /** @type {int} */
        this.y = y;
    }
}
class sizeOfTableRecord {
    constructor(x, y) {
        /** @type {int} */
        this.x = x;
        /** @type {int} */
        this.y = y;
    }
    get width() {return this.x }
    get height() {return this.y }
}
/** Информация об изначальных данных для создания игры */
export class RoomInfo { // да и зачем нам дефолты, по идее размеры нам сервер будет сообщать // Я думал это информация от пользователя, какой размер доски
    /** @type {sizeOfTableRecord} */
    sizeOfTable
    /** @type {TPlayers[]} */
    players = []
    /** @param {RoomInfo||undefined} RoomInfo */
    constructor(RoomInfo = {}) {
        for(const [key, vlaue] of RoomInfo) {
            if(key === 'sizeOfTable') this.sizeOfTable = new sizeOfTableRecord(value)
            else this[key] = value
        }
    }
}