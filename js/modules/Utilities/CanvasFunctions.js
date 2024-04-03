import { fabric } from 'fabric'

export const CanvasSymbols = {
    Drawable: new Symbol('Drawable')
}
export class CanvasComponent {};
export class CanvasObject {
    get [CanvasSymbols.Drawable]() {//as default
        return this.picture;
    }
}

export class CanvasFunctions {
    /** @type {CanvasComponent[]} */
    Components = []
    /** @type {fabric.Canvas} */
    canvas


    /**
     * Инициализация канваса
     * @param {string} name Имя канваса в вёрстке html `<canvas id="$ИМЯ КАНВАСА$">`
     */
    constructor(name) {
        this.canvas = new fabric.Canvas('GameCanvas', {backgroundColor : "#cfd095"})
    }

    add(obj) {
        if(obj instanceof CanvasObject) {
            this.canvas.add(obj[CanvasSymbols.Drawable]);
        } else return false;
    }
    /** @param {CanvasComponent} Component */
    addComponent(Component) {
        this.Components.push(Component);
    }
}