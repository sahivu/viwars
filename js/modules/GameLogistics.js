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
function isMoveAllowed (gameState, {x, y}){
    const {ActivePlayer, table} = gameState;
    const targetCell = table[x][y];
    if (ActivePlayer.Colour == targetCell.Colour){
        return false;
    }
    
}//ha, gron m from phonme, hm i scNscant delete stext 
function isAliveCellAround (gameState, {x, y}){
    currentPlayer = gameState.ActivePlayer;
    table = gameState.table;
    for (i of range(-1, 1)) {
        for (j of range(-1, 1)){
            if (table[i][j].Colour == currentPlayer.Colour && table[i][j].Symbol == "Alive") {
                return true;
            }
        }
    }
    return false;
}

/** Текущее состояние игры, по идее оно и руководит игрой, просто записями что в ней хранятся*/ 
class GameState {
    /** Данные при инициализации игры(создания комнаты) @type {RoomInfo} */
    RoomInfo
    /** Стол игры @type {Cell[][]}*/
    table
    /** Идентификатор текущего игрока, нужен только в этом классе @type {int} */
    __activePlayerID // что значит __? // **нужен только в этом классе** // типа приватный член
    /** текущий игрок @type {TPlayer}*/
    get ActivePlayer() { return this.players[this.__activePlayerID]; }
    /** список игроков @type {TPlayer[]}*/
    get players() { return this.RoomInfo.players; }
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