import { BoardCanvas } from './CanvasRenderer.js';
import { BoardConstants, Cell, TPlayer, RoomInfo } from './BoardConstants.js';
import { range, SimpleEventProvider } from './Utilities.js'

// Логика получает клик от пользоватя на клетку
// Логика чекает корректный ли это ход
// // Логика чекает пользователя
// // Логика чекает тип клетки
// // Логика чекает есть ли живые клетки или сети рядом (BFS)
// // Если пустая клетка - меняем клетку на клетку пользователя
// // Если чужая клетка меняем клетку на сеть пользователя
// // Иначе отказ
// Логика выдаёт новый State или ошибку в том или ином виде

/** Логика игры, при выполнении расчётов должен принимать `GameState` */
class BoardLogic {
    onStepComplete = new SimpleEventProvider()
    constructor() {

    }
    /**
     * @param {GameState} GameState
     * @param {int} x
     * @param {int} y
     * @returns {boolean} if Move acceptable returns true else false
     */
    tryMove(GameState, x, y) {
        return false;
    }
}

/**
 * Breadth-first search, Используется для графов, но нам тоже пойдёт, 
 *          это для того чтобы чекать есть ли рядом что-то живое нужного цвета
 * @param {GameState} gameState 
 * @returns {boolean}
 *
 */
function checkBFS (gameState, {x, y}){
    if 
}

/** Текущее состояние игры, по идее оно и руководит игрой, просто записями что в ней хранятся*/ 
class GameState {
    /** Стол игры @type {Cell[][]}*/
    table
    get players() { return this.RoomInfo.players; }
    /** @type {int} */
    activeplayerid
    get ActivePlayer() { return this.players[this.activeplayerid]; }
    /**
     * @param {RoomInfo} RoomInfo
     */
    constructor(RoomInfo) {
        const {sizeOfTable} = RoomInfo;
        table = range(sizeOfTable.y).map(x=>range(sizeOfTable.x).map(y=>new Cell(x, y)))
    }
}

/** посредник между Канвасом, Логикой и Сетевой частями приложения */
export class GameProvider {
    /**
     * @param {RoomInfo} RoomInfo
     */
    constructor(RoomInfo) {
        this.GameState = new GameState(RoomInfo);
        this.GameCanvas = new BoardCanvas(RoomInfo, {
            tryMove:(x,y)=>this.Board.tryMove(this.GameState, x, y)&&this.GameState.ActivePlayer,
        });
        this.Board = new BoardLogic();
    }
}