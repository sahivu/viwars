import { range } from './Utilities.js'


const INITS = {
    Size: 600
}
class AbcCell {
    constructor(x, y, size, {left, top}) {
        if(x===y) return new fabric.Rect({
                left, top,
                width:size, height:size, 
                fill: 'gray',
                hoverCursor: 'pointer', 
                lockMovementX: true,
                lockMovementY: true,
                hasBorders: false,
                hasControls: false
            });
        if(x===0) {
            const Cell = new fabric.Rect({
                left:0, top:0,
                width:size, height:size, 
                fill: 'bisque',
                originX:'center', originY:'center'
                // hoverCursor: 'pointer', 
                // lockMovementX: true,
                // lockMovementY: true,
                // hasBorders: false,
                // hasControls: false
            });
            const Label = new fabric.Text(`${y}`,  {fill:'black', originX:'center', originY:'center'})
            return new fabric.Group([Cell, Label], {left, top})
        }
        if(y===0) {
            const Cell = new fabric.Rect({
                left:0, top:0,
                width:size, height:size, 
                fill: 'bisque',
                originX:'center', originY:'center'
                // hoverCursor: 'pointer', 
                // lockMovementX: true,
                // lockMovementY: true,
                // hasBorders: false,
                // hasControls: false
            });
            const Label = new fabric.Text(`${x}`,  {fill:'black', originX:'center', originY:'center'})
            return new fabric.Group([Cell, Label], {left, top})
        }
    }
}
class Cell {
    constructor(size, {left, top}) {
        const picture = this.picture = new fabric.Rect({
                    left, top, 
                    width:size, height:size, 
                    fill: 'white',
                    hoverCursor: 'pointer', 
                    lockMovementX: true,
                    lockMovementY: true,
                    hasBorders: false,
                    hasControls: false
                });

        return picture;
    }
}
export class BoardCanvas {
    constructor() {
        const canvas = this.canvas = new fabric.Canvas('GameCanvas', {backgroundColor : "#cfd095"});
        this.canvas.setWidth(INITS.Size);
        this.canvas.setHeight(INITS.Size);

        const margin = 5
        const CellsCount = 11
        const CellSize = INITS.Size/CellsCount-margin;
        range(CellsCount).map(x=>range(CellsCount).map(y=>{
            if([x,y].includes(0)) canvas.add(new AbcCell(x,y,CellSize, {left:margin/2+x*(CellSize+margin), top:margin/2+y*(CellSize+margin)}));
            else canvas.add(new Cell(CellSize, {left:margin/2+x*(CellSize+margin), top:margin/2+y*(CellSize+margin)}));
        }))
    }
}