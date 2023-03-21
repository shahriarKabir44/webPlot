import plotScale from "../utils/plotScale.js";
import { clearCanvas, putPixel, select, _putPixel } from "../utils/index.js";
export default class Shape {
    static state = []
    static shapeCount = 1
    static lastShape = null;
    static grid = {}
    static init() {
        this.grid = new Array(600).fill(0)
        for (let n = 0; n < 600; n++)this.grid[n] = {}
        plotScale()
    }
    static setGridVal(x, y, val) {
        Shape.grid[x][y] = val

    }
    completeRendering() { }
    static canReRender = true
    type = ""
    oldPoints = []
    points = []
    calculatePoints() { }
    static getEndpoints(id) {
        try {
            return [
                [select(`startx${id}`).value * 1,
                select(`starty${id}`).value * 1],

                [select(`endx${id}`).value * 1,
                select(`endy${id}`).value * 1]
            ]
        } catch (error) {
            console.log(id)
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
            Shape.handlePlot(shape.id)
        })


    }
    constructor() {

        Shape.state.push(this)
        this.id = Shape.shapeCount;
        Shape.shapeCount++;

    }
    removeHTML() { }

    reRenderOnMove() {

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

                <div class="flex">
                    <input type="text" name="" placeholder="start x" id="startx${this.id}">
                    <input type="text" name="" placeholder="start y" id="starty${this.id}">

                </div>
                <div class="flex">
                    <input type="text" name="" placeholder="end x" id="endx${this.id}">
                    <input type="text" name="" placeholder="end y" id="endy${this.id}">

                </div>
            </div>`
    }
    render() {
        this.points.forEach(([x, y]) => {
            putPixel(x, y)
        })
    }
    showEndPoints(start, end) {
        select(`startx${this.id}`).value = start[0]
        select(`starty${this.id}`).value = start[1]

        select(`endx${this.id}`).value = end[0]
        select(`endy${this.id}`).value = end[1]

    }

    static handlePlot(id) {

        let targetShape = this.state.filter(shape => shape.id == id)[0]
        targetShape.handleOnRender()

    }
}
