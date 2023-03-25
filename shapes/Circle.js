import { putPixel, select } from "../utils/index.js";
import Shape from "./Shape.js";

export default class Circle extends Shape {
    constructor() {
        super()
        this.radius = []
        this.type = 'circle'
    }
    completeRendering() {
        select(`inputs${this.id}`).innerHTML = ` <h3>Circle</h3>

            radius=${this.radius}
            center=(${this.center[0]},${this.center[1]})
            <button class="deleteShapeBtn" id="delete-${this.id}" >delete</button>`

    }
    putPixelUtil(x, y) {
        Shape.setGridVal(this.center[0] + x, this.center[1] + y, 1 << this.id)
        this.points.push([this.center[0] + x, this.center[1] + y])

    }
    dragTo(newCenter) {
        select(`startx${this.id}`).innerHTML = newCenter[0]
        select(`starty${this.id}`).innerHTML = newCenter[1]

        select(`endx${this.id}`).innerHTML = newCenter[0] * 1 + this.radius
        select(`endy${this.id}`).innerHTML = newCenter[1] * 1 + this.radius
        this.center = newCenter
    }

    handleOnRender() {
        let [p1, p2] = Shape.getEndpoints(this.id)
        let [dx, dy] = Shape.getSize(this.id)
        let radius = Math.min(dx, dy)
        this.radius = radius
        this.center = p1

        this.drawCircleBresenham()

        this.render()
    }
    removeHTML() {
        select('container').removeChild(select(`curcleInputs${this.id}`))
    }
    addPoints(x, y) {
        let dirs = [-1, 1]
        for (let n of dirs) {
            for (let k of dirs) {
                this.putPixelUtil(x * n, y * k)
                this.putPixelUtil(y * n, x * k)
            }
        }

    }
    drawCircleBresenham() {
        this.oldPoints = this.points
        this.points = []
        let x = 0
        let y = this.radius
        let d = 2 * (x + 1) ** 2 + y ** 2 + (y - 1) ** 2 - 2 * this.radius * this.radius
        while (x <= y) {
            this.addPoints(x, y)
            if (d < 0)
                d += (4 * x + 6)
            else {
                d += 4 * (x - y) + 10
                y -= 1
            }
            x += 1
        }

    }
    midpointCircle() {

        let x = 0
        let y = this.radius
        let d = (5 / 4) - this.radius

        while (x <= y) {
            this.addPoints(x, y)
            if (d < 0)
                d += 2 * (x + 1) + 1
            else {
                d += 2 * (x - y) + 5
                y -= 1
            }
            x += 1
        }

    }
}