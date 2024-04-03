import { range, SimpleEventProvider } from './Utilities/Utilities.js'
import { RoomInfo, TPlayer } from './HelpersNComponents/BoardConstants.js'
import { CanvasFunctions, CanvasObject, CanvasSymbols } from './Utilities/CanvasFunctions.js'

// import { _fabric } from 'fabric' // in code editing this should comment
/** @alias _fabric */
fabric

const width = document.body.clientWitdth
const height = document.body.clientHeight
const size = Math.min(width, height)
// Клики от пользователя сделаны? yep ну сейчас тогда с провайдерю их в Логику
// R

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
 * Creates numeration of cells
 */
class AbcCell {
    /**
     * 
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     * @param {{left:int, top:int}} param3 
     * @returns 
     */
    constructor(x, y, size, {left, top}) {
        if(x===y) return new fabric.Rect(new staticObj({
                left, top,
                width:size, height:size, 
                fill: 'gray',
            }, true));
        const Alphabet = 'абвгдеёжзийклмнопрстуфхцчшщэюя';
        const abc = x===0?y:Alpabet[x];
        const Cell = new fabric.Rect({
            left:0, top:0,
            width:size, height:size, 
            fill: 'bisque',
            originX:'center', originY:'center'
        });
        const Label = new fabric.Text(`${abc}`,  {fill:'black', originX:'center', originY:'center'})
        return new fabric.Group([Cell, Label], new staticObj({left, top,}, true))
    }
}

class Cell {
    /** событие при клике на эту клетку */
    onClick = new SimpleEventProvider()
    /**
     * 
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     * @param {{left:int, top:int}} param3 
     * @returns
     */
    constructor(x, y, size, {left, top}) {
        const cellRect = new fabric.Rect({
            width:size, height:size, 
            fill: 'white',
            originX: 'center', originY: 'center'
        });
        this.content = new fabric.Group([cellRect], staticObj({
            left, top, 
            width:size, height:size, 
        }, true));
        this.content.on('mousedown', ()=>this.this.onclick.send(x,y))
    }
    appendObj(obj) {
        this.content.addWithUpdate(obj);
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

        this.Table = range(RoomInfo.sizeofTable.x).map(x=>range(RoomInfo.sizeofTable.y).map(y=>[]))
        /** @type {{tryMove:tryMoveCB}} */
        this.gc = {tryMove};

        this.InitTable(RoomInfo);
    }
    /** @param {RoomInfo} RoomInfo */ 
    InitTable(RoomInfo) {     
        const {width, height} = RoomInfo.sizeOfTable
        /** space between cells*/
        const margin = 5 
        const CellSize = size/Math.max(width, height)-margin; 
        range(width+1).map(x=>range(height+1).map(y=>{
            /** cell position taking into account margin */
            const pos = {
                left: margin/2 + x*(CellSize+margin), 
                top:  margin/2 + y*(CellSize+margin)
            };
            if([x,y].includes(0)) this.canvas.add(new AbcCell(x,y, CellSize, pos)); // if border cell create numeration cell
            else { // else normal cells
                const cell = new Cell(x, y, CellSize, pos)
                this.Table[x][y] = cell
                // cell.onClick.subscribe((x,y)=>this.onClick.send(x,y))
                cell.onClick.subscribe((x,y)=>{
                    const result = this.gc.tryMove(x,y);
                    if(!result) return;
                    const {Symbol, Colour} = result;
                    const SymbolLabel = new fabric.Text(result.Symbol, {
                        fill: Colour.htmlCode,
                    });
                    cell.appendObj(SymbolLabel);
                    this.canvas.renderAll()
                })
                this.canvas.add(cell.content);
            }
        }))
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