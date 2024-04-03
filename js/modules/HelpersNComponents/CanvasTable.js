import { range, range2D, SimpleEventProvider } from '../Utilities/Utilities.js'
import { RoomInfo, TCRColour, TPlayer } from './BoardConstants.js'
import { CanvasFunctions, CanvasObject, CanvasSymbols } from '../Utilities/CanvasFunctions.js'
import { GameProvider } from '../GameLogistics.js'
// range2D

// import { _fabric } from 'fabric' // in code editing this should comment
/** @alias _fabric */
fabric

const width = document.body.clientWidth
const height = document.body.clientHeight
const size = Math.min(width, height)

function staticObj(additionals={}, pointer) {
    return Object.assign({
        hoverCursor: pointer?'pointer':'default', 
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        hasControls: false,
        selection: false
    })
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
        const Alphabet = ' абвгдеёжзийклмнопрстуфхцчшщэюя';
        const abc = y===0?(x===y?' ':x):Alphabet[y];

        this.content = new fabric.Group([
            new fabric.Rect({
                width:size, height:size, 
                fill: x===y?'#ffffff00':'#ffe4c490',
                originX:'center', originY:'center'
            }), 
            new fabric.Text(`${abc}`, {
                width:size, height:size, 
                fill:'black', 
                originX:'center', originY:'center'
            })
        ], staticObj({
            left, top,
            width:size, height:size, 
        }, true))
        this.content.left = left
        this.content.top = top
    }
}

class Cell {
    /** @type {fabric.Group} */
    content
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
        this.size = size;
        this.content = new fabric.Group([
            new fabric.Rect({
            width:size, height:size, 
            fill: '#FFFFFF50',
            originX: 'center', originY: 'center'
        })], staticObj({
            left, top, 
            width:size, height:size, 
        }, true));
        this.content.left = left
        this.content.top = top
        this.content.on('mousedown', ()=>this.onClick.send(x,y))
    }
    /**
     * @param {TPlayer} player
     */
    setVirus(player) {
        const Text = new fabric.Text(player.Symbol, {
            fill: player.Colour.htmlCode,
            originX: 'center', originY: 'center'
        });
        Text.fill = player.Colour.htmlCode
        this.appendObj(Text);
    }
    /**
     * @param {TPlayer} player
     */
    setChain(player) {
        const Chain = new fabric.Rect({
            width:this.size, height:this.size, 
            fill: player.Colour.htmlCode,
            originX: 'center', originY: 'center'
        })
        this.appendObj(Chain);
    }
    appendObj(obj) {
        obj.left = this.content.left + this.content.width/2
        obj.top = this.content.top + this.content.height/2
        this.content.addWithUpdate(obj);
        this.content.bringForward(obj);
    }
}

export class VirusWarsTable {
    /**
     * @param {fabric.Canvas} canvas 
     * @param {int} width 
     * @param {int} height 
     * @param {{x:int, y:int, Virus, Chain}[]} InitVals 
     * @param {GameProvider.__sharedsT} gc
     */
    constructor(canvas, width, height, InitVals=[], gc) {
        /** space between cells*/
        const margin = 5 
        /** cell position taking into account margin */
        const CellSize = size/Math.max(width, height)-margin;
        const pos = (x, y)=>({
            left: margin/2 + (x+1)*(CellSize+margin), 
            top:  margin/2 + (y+1)*(CellSize+margin)
        })
        /** @type {AbcCell[]} */
        this.abc = [
            ...range(-1,width+1).map(x=>new AbcCell(x+1, 0, CellSize, pos(x, -1))),
            ...range(-1,height+1).map(y=>new AbcCell(0, y+1, CellSize, pos(-1, y))),
        ]
        this.abc.map(obj=>canvas.add(obj.content));
        /** @type {Cell[][]} */
        this.content = range2D(width, height)
                            .map((x,y)=>{// else normal cells
                                const cell = new Cell(x, y, CellSize, pos(x, y))
                                cell.onClick.subsrcibe((x,y)=>{
                                    const result = gc.tryMove(x,y);
                                    if(!result) return;
                                    
                                    const [player, type] = result;
                                    cell[`set${type}`](player)
                                    canvas.renderAll()
                                })
                                return cell;
                            })
        for(const line of this.content) 
            for(const Cell of line) 
                canvas.add(Cell.content)
        
        canvas.renderAll()
    }
}