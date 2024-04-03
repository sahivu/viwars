import { GameState } from "../GameLogistics.js";
import { range } from "../Utilities/Utilities.js";


/*  Здесь хранятся типы и классы для взаимодействия с интернетами 
                    и перевода их в локальный типы данных для игры */
/** @typedef {[int, int]} slotinfo */
export class slotinfo extends Array {
    /**
     * @param {int} x 
     * @param {int} y
     */
    constructor(x, y) {
        return super([x, y]);
    }
}

export class GameStateSnapshot {
    /** @type {TableInfoType} */
    Table
    /** @type {int} */
    ActivePlayerID = 0
    /**
     * Создаёт снапшот игры
     * @param {TableInfoType} Table 
     * @param {int} ActivePlayer 
     */
    constructor(Table, ActivePlayerID) {
        this.Table = Table;
        this.ActivePlayerID = ActivePlayerID;
    }
    /** 
     * Создаёт дефолтный снапшот для тестов
     * @param {[int, int]} TableSize
     */
    static default([w, h]=[10, 10]) {
        return new GameStateSnapshot(range(w).map(x=>range(h).map(y=>new slotinfo(x, y))))
    }
    /**
     * @param {GameState} GameState 
     */
    static gen(GameState) {
        throw 'TODO: snapshotig of GameState if need';
    }
}