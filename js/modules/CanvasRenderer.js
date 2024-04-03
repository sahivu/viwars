import { range, SimpleEventProvider } from './Utilities/Utilities.js'
import { RoomInfo, TPlayer } from './HelpersNComponents/BoardConstants.js'
import { CanvasFunctions, CanvasObject, CanvasSymbols } from './Utilities/CanvasFunctions.js'
import { VirusWarsTable } from './HelpersNComponents/CanvasTable.js'

// import { _fabric } from 'fabric' // in code editing this should comment
/** @alias _fabric */
fabric

const width = document.body.clientWidth
const height = document.body.clientHeight
const size = Math.min(width, height)
// Math.min(document.body.clientHeight, document.body.clientWidth)

class staticObj {
    constructor(additionals={}, pointer) {
        return Object.assign({
            hoverCursor: pointer?'pointer':'default', 
            lockMovementX: true,
            lockMovementY: true,
            hasBorders: false,
            hasControls: false
        })
    }
}
/**
 * @callback tryMoveCB
 * @param {int} x
 * @param {int} y
 * @returns {TPLayer} Player which step
 */
/** */
export class BoardCanvas extends CanvasFunctions {
    /** событие при клике на одну из клеток */
    onClick = new SimpleEventProvider()


    /** @param {RoomInfo} RoomInfo */ 
    constructor(RoomInfo, {tryMove}) { 
        super('GameCanvas')
        const {canvas} = this;
        this.canvas.setWidth(size);
        this.canvas.setHeight(size);

        /** @type {{tryMove:tryMoveCB}} */
        this.gc = {tryMove};

        this.Table = new VirusWarsTable(canvas, RoomInfo.sizeOfTable.x, 
                                                RoomInfo.sizeOfTable.y, [], this.gc)
    }
    /**
     * установить вирус в ячейку
     * вообще не обязательно установить вирус в ячейку, тут просто клик от какого-то игрока на клетку
     * ну хз, конкретно этот метод по идее должна запрашивать логика у канваса, а не канвас вызывать у себя
     * Игрок кликает по клетке -> Канвас спрашивают у Логики, можно ли данному игроку сюда сходить -> если да, то ходит.
     * Я вспомниаю всякие моды от Фёдора, думаю там и правый клик для создания мегаклетки может понадобится, но это потом // =D
     * @param {int} x
     * @param {int} y
     * @param {string} Symbol символ вируса
     
     */
    set(x, y, Symbol) {

    }
}