export const BoardConstants = { //=D
    // здесь будут будущие наши константы
}
export class TCRColour {
    /** @type {int} */
    id
    /** @type {string} */
    htmlcode
}
export class TPlayer {
    /** @type {string} */
    username
    /** @type {string} */ // символ это что, типа тип клетки? (пустая клетка, клетка, сеть и т.д.) // символ это типа крестик/нолик и другие гендеры // тогда почему строка, если это по идее изображение //ну ээ, временно, пока проще так наверно, потом легко переделаем
    Symbol
    /** @type {string} */
    SymbolImageSrc
    /** @type {TCRColour} */
    Colour
}
export class Cell { 
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