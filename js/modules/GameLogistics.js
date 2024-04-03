import { BoardCanvas } from './CanvasRenderer.js';
import { BoardConstants, Cell, TPlayer, RoomInfo } from './HelpersNComponents/BoardConstants.js';
import { GameStateSnapshot } from './Scrap0/main.js';
import { range, SimpleEventProvider } from './Utilities/Utilities.js'

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
     * @returns {false|'Virus'|'Chain'} if Move acceptable returns true else false
     */
    tryMove(GameState, x, y) {
        const {table, ActivePlayer} = GameState;
        const Cell = table[x][y];
        if(!Cell.Virus) {
            Cell.Virus = ActivePlayer;
            return 'Virus';
        } else if(!Cell.Chain) {
            Cell.Chain = ActivePlayer;
            return 'Chain';
        } else return false;
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

/**
 * 
 * @param {GameState} gameState 
 * @param {{x:int, y:int}} param1 
 * @returns 
 */
function isAliveCellAround (gameState, {x, y}){
    currentPlayer = gameState.ActivePlayer;
    table = gameState.table;
    roomX = gameState.RoomInfo.sizeOfTable.x;
    roomY = gameState.RoomInfo.sizeOfTable.y
    for (i of range(-1, 1)) {
        for (j of range(-1, 1)){
            if (!(i < 0 || j < 0 || x + i > roomX || y + j > roomY)){
                if (table[x+i][y+j].Colour == currentPlayer.Colour && table[x+i][y+j].Symbol == "Alive") {
                    return true;
                }
            }
        }
    }
    return false;
}
/** @typedef {Cell[][]} TableType */
/** @typedef {slotinfo[][]} TableInfoType */
/** Текущее состояние игры, по идее оно и руководит игрой, просто записями что в ней хранятся*/ 
export class GameState {
    /** Данные при инициализации игры(создания комнаты) @type {RoomInfo} */
    RoomInfo
    /** Стол игры @type {TableType}*/
    table
    /** Идентификатор текущего игрока, нужен только в этом классе @type {int} */
    __activePlayerID = 0
    /** текущий игрок @type {TPlayer}*/
    get ActivePlayer() { return this.players[this.__activePlayerID]; }
    /** список игроков @type {TPlayer[]}*/
    get players() { return this.RoomInfo.players; }
    /**
     * @param {RoomInfo} RoomInfo
     */
    constructor(RoomInfo) {
        const {sizeOfTable} = RoomInfo;
        this.table = range(sizeOfTable.y).map(x=>range(sizeOfTable.x).map(y=>new Cell(x, y)));
        this.RoomInfo = RoomInfo
    }
    static Snapshot = GameStateSnapshot
}
/** посредник между Канвасом, Логикой и Сетевой частями приложения */
export class GameProvider {
    /**
     * @param {RoomInfo} RoomInfo
     * @param {GameStateSnapshot} RoomInfo
     */
    constructor(RoomInfo, GameStateSnapshot) {
        this.GameState = new GameState(RoomInfo);
        this.GameCanvas = new BoardCanvas(RoomInfo, this.shareds);
        this.Board = new BoardLogic();
    }

    /** Функции для сообщения между `Логикой`, `Канвасом` и `GameState` */
    shareds = new GameProvider.__sharedsT(this);
    static __sharedsT = class __sharedsT{
        constructor(GameProvider) {
            /** @returns {[TPlayer, 'Chain'|'Virus']|undefined} */
            this.tryMove = (x, y)=>{
                const result = GameProvider.Board.tryMove(GameProvider.GameState, x, y);
                if(!result) return;
                return [GameProvider.GameState.ActivePlayer, result];
            }
        }
    }
}