import { range, range2D, SimpleEventProvider } from '../Utilities/Utilities.js'
import { RoomInfo, TPlayer } from './BoardConstants.js'
import { CanvasFunctions, CanvasObject, CanvasSymbols } from '../Utilities/CanvasFunctions.js'
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
        if(x===y) return new fabric.Rect(staticObj({
                left, top,
                width:size, height:size, 
                fill: 'gray',
            }, true));
        const Alphabet = 'абвгдеёжзийклмнопрстуфхцчшщэюя';
        const abc = x===0?y:Alphabet[x];
        const Cell = new fabric.Rect({
            width:size, height:size, 
            fill: 'bisque',
            originX:'center', originY:'center'
        });
        const Label = new fabric.Text(`${abc}`, {
            fill:'black', 
            originX:'center', originY:'center'
        })
        return new fabric.Group([Cell, Label], staticObj({
            left, top,
            width:size, height:size, 
        }, true))
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
        const cellRect = new fabric.Rect({
            width:size, height:size, 
            fill: 'white',
            originX: 'center', originY: 'center'
        });
        this.content = new fabric.Group([cellRect], staticObj({
            left, top, 
            width:size, height:size, 
        }, true));
        this.content.on('mousedown', ()=>this.onClick.send(x,y))
    }
    setVirus(Symbol, Colour) {
        this.appendObj(new fabric.Text(Symbol, {
            fill: Colour.htmlCode,
        }));
    }
    appendObj(obj) {
        this.content.addWithUpdate(obj);
    }
}

export class VirusWarsTable {
    /**
     * @param {fabric.Canvas} canvas 
     * @param {int} width 
     * @param {int} height 
     * @param {{x:int, y:int, Virus, Chain}[]} InitVals 
     */
    constructor(canvas, width, height, InitVals=[]) {
        /** space between cells*/
        const margin = 5 
        /** cell position taking into account margin */
        const CellSize = size/Math.max(width, height)-margin;
        const pos = (x, y)=>({
            left: margin/2 + (x+1)*(CellSize+margin), 
            top:  margin/2 + (y+1)*(CellSize+margin)
        })
        this.abc = [
            ...range(-1,width+1).map(x=>new AbcCell(x, 0, CellSize, pos(x, 0))),
            ...range(-1,height+1).map(y=>new AbcCell(0, y, CellSize, pos(0, y))),
        ]
        // this.abc.map(obj=>canvas.add(obj));
        this.content = range2D(width, height)
                            .map((x,y)=>{// else normal cells
                                const cell = new Cell(x, y, CellSize, pos(x, y))
                                cell.onClick.subsrcibe((x,y)=>{
                                    const result = this.gc.tryMove(x,y);
                                    if(!result) return;
                                    cell.setVirus(result.Symbol, result.Colour)
                                    canvas.renderAll()
                                })
                                return cell;
                            })
                            
        canvas.renderAll()
    }
}