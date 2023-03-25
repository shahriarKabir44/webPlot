import plotScale from "../utils/plotScale.js";
import { clearCanvas, putPixel, select, _putPixel, DRAG, ROTATE, INSERTION } from "../utils/index.js";



export default class Shape {
    static state = []
    static shapeCount = 1
    static lastShape = null;
    static grid = {}
    static selectedShapeForOperation = null
    static operationMode = 0
    static canReRender = true
    type = ""
    oldPoints = []
    points = []
    center = []
    static init() {
        this.grid = new Array(600).fill(0)
        for (let n = 0; n < 600; n++)this.grid[n] = {}
        plotScale()
    }
    static setGridVal(x, y, val) {
        try {
            Shape.grid[x][y] = val

        } catch (error) {

        }
    }
    completeRendering() { }
    calculatePoints() { }
    static getEndpoints(id) {
        try {
            return [
                [select(`startx${id}`).innerHTML * 1,
                select(`starty${id}`).innerHTML * 1],

                [select(`endx${id}`).innerHTML * 1,
                select(`endy${id}`).innerHTML * 1]
            ]
        } catch (error) {
        }

    }
    static getSize(id) {
        let endPoints = this.getEndpoints(id)
        let dx = Math.abs(endPoints[0][0] - endPoints[1][0])
        let dy = Math.abs(endPoints[0][1] - endPoints[1][1])
        return [dx, dy]
    }
    /**
     * 
     * @param {Shape} targetShape 
     */
    static removePreviousPixels() {

        clearCanvas()

        this.state.forEach(shape => {
            Shape.handlePlot(shape)
        })


    }
    constructor() {
        this.color = "#000000"
        Shape.state.push(this)
        this.id = Shape.shapeCount;
        Shape.shapeCount++;

    }
    dragTo(newCenter) {


    }
    removeHTML() { }

    reRenderOnMove() { }

    static selectShapeForDrag(shapeId) {
        this.operationMode = DRAG
        this.selectedShapeForOperation = this.state.filter(shape => shape.id == shapeId)[0]
        this.selectedShapeForOperation.enableOperation()
    }
    enableOperation() {
        this.color = "#eb1809"
    }
    removeAndRender() {
        let target = Shape.state.filter(shape => shape.id == this.id)[0]
        target.removeHTML()
        Shape.state = Shape.state.filter(shape => shape.id != this.id)
        Shape.state.forEach((shape) => {
            shape.render()
        })
    }
    handleOnRender() {

    }
    getPointsCopy() {
        return JSON.parse(JSON.stringify(this.points))
    }
    renderHTML() {
        return `<div class="plotter" id="inputs${this.id}"  >
                <h3>Plot ${this.type}</h3>
                <div class="plotterContainer">
                    <div class="flex">
                        <div class="flex">
                            <p>startX= </p> <p id="startx${this.id}">0</p>
                        </div>
                        <div class="flex">
                             <p>startY=</p> <p  id="starty${this.id}">0</p>
                        </div>
                    </div>
                        
                    
                    <div class="flex">
                        <div class="flex">
                            <p>endX= </p> <p id="endx${this.id}">0</p>
                        </div>
                        <div class="flex">
                            <p>endY=</p> <p  id="endy${this.id}">0</p>
                        </div>
                    </div>
                </div>
                
                <button class="dragBtn" id="shape-${this.id}">drag</button>
            </div>`
    }
    render() {
        this.points.forEach(([x, y]) => {
            putPixel(x, y, this.color)
        })
    }
    showEndPoints(start, end) {
        select(`startx${this.id}`).innerHTML = start[0]
        select(`starty${this.id}`).innerHTML = start[1]

        select(`endx${this.id}`).innerHTML = end[0]
        select(`endy${this.id}`).innerHTML = end[1]

    }

    static handlePlot(shape) {
        shape.handleOnRender()

    }

}
