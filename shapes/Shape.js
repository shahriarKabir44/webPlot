import plotScale from "../utils/plotScale.js";
import { clearCanvas, putPixel, select, _putPixel, DRAG, ROTATE, INSERTION } from "../utils/index.js";



export default class Shape {
    static state = []
    static shapeCount = 1
    static lastShape = null;
    static selectedShapeForOperation = null
    static operationMode = 0
    static canReRender = true
    axisAngle = Math.PI / 2
    isActive = false
    type = ""
    oldPoints = []
    points = []
    center = []
    static selectShape(id) {
        return this.state.filter(shape => shape.id == id)[0]
    }
    static init() {
        plotScale()
    }

    static calculateAngle(p1, p2) {
        if (p1[0] == p2[0]) {
            if (p1[1] > p2[1]) {
                return 3 * Math.PI / 2
            }
            else return Math.PI / 2
        }
        if (p1[1] == p2[0]) {
            if (p1[0] > p2[0]) return 0
            else return Math.PI
        }
        return Math.atan((p1[1] - p2[1]) / (p1[0] - p2[0]))
    }
    static rotatePoint(theta, T, p) {
        let [x, y] = p
        let [tx, ty] = T
        let [cosx, sinx] = theta
        return [
            Math.floor(cosx * (x - tx) - sinx * (ty - y) + tx),
            Math.floor(sinx * (tx - x) + cosx * (y - ty) + ty)
        ]
    }
    rotateTo(point) {
        point[1] = 500 - point[1]
        let angle = Shape.calculateAngle(point, this.center)
        angle = Math.abs(angle)
        select(`angle${this.id}`).innerHTML = angle * 180 / Math.PI
    }
    angleRotation() {
        let angle = select(`angle${this.id}`).innerHTML * 1 * Math.PI / 180
        let cosx = Math.cos(-angle)
        let sinx = Math.sin(-angle)
        this.points = this.points.map(point => {
            return Shape.rotatePoint([
                cosx, sinx
            ], this.center, point)
        })
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
        this.isActive = true
        this.color = "#000000"
        Shape.state.push(this)
        this.id = Shape.shapeCount;
        Shape.shapeCount++;
        this.axisAngle = 0

    }
    dragTo(newCenter) { }
    removeHTML() { }

    reRenderOnMove() { }


    deactive() {
        this.isActive = false
        this.runPipeline()


    }
    static selectShapeForDrag(shapeId) {
        this.operationMode = DRAG
        this.selectedShapeForOperation = this.selectShape(shapeId)
        this.selectedShapeForOperation.enableOperation()
        this.selectedShapeForOperation.isActive = true
    }
    static selectShapeForRotation(shapeId) {
        this.operationMode = ROTATE
        this.selectedShapeForOperation = this.selectShape(shapeId)
        this.selectedShapeForOperation.enableOperation()


    }
    enableOperation() {
        this.color = "#eb1809"
    }
    removeAndRender() {
        let target = Shape.state.filter(shape => shape.id == this.id)[0]
        Shape.state = Shape.state.filter(shape => shape.id != this.id)
        Shape.state.forEach((shape) => {
            shape.runPipeline()
        })
    }
    handleOnRender() {

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
                    <div class="flex">
                        <div class="flex">
                            <p>rotation(degree) = </p> <p id="angle${this.id}">0</p>
                        </div>
                          
                    </div>
                </div>
                
                <button class="dragBtn" id="shape-${this.id}">drag</button>
                <button class="rotateBtn" id="shape-${this.id}">rotate</button>
 
                <div class="flex">
                    <div class="scaleContainer">
                        <p>sx=</p>
                        <button class="scalebtnxup" id="shape-${this.id}">+</button>
                        <p id="sx-${this.id}">1</p>
                        <button class="scalebtnxdn" id="shape-${this.id}">-</button>
                    </div>
                    <div class="scaleContainer">
                        <p>sy=</p>
                        <button class="scalebtnyup" id="shape-${this.id}">+</button>
                        <p id="sy-${this.id}">1</p>
                        <button class="scalebtnydn" id="shape-${this.id}">-</button>
                    </div>
                </div>
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
        if (shape.isActive) {

            shape.runPipeline()
        }

        else {
            shape.render()
        }

    }
    static scale(shapeId) {
        this.selectShape(shapeId)
            .runPipeline()
    }
    scale() {
        let factorX = select(`sx-${this.id}`).innerHTML * 1
        let factorY = select(`sy-${this.id}`).innerHTML * 1
        let [h, k] = this.center
        this.points = this.points.map(([x, y]) => {
            return [
                x * factorX - h * (factorX - 1),
                y * factorY - k * (factorY - 1)
            ]
        })
    }
    runPipeline() {
        this.handleOnRender()
        this.scale()
        this.angleRotation()

        this.render()


    }

}
