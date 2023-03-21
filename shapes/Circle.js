import { putPixel, select } from "../utils/index.js";
import Shape from "./Shape.js";

export default class Circle extends Shape {
    constructor() {
        super()
        this.radius = []
        this.center = 0
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



    handleOnRender() {
        let [p1, p2] = Shape.getEndpoints(this.id)
        let [dx, dy] = Shape.getSize(this.id)
        let radius = Math.min(dx, dy)
        this.center = p1

        this.drawCircleBresenham(radius)

        this.render()
        // select(`curcleInputs${this.id}`).innerHTML = ` <h3>Circle</h3>

        //     radius=${radius}
        //     center=(${center[0]},${center[1]})
        //     <button class="deleteShapeBtn" id="delete-${this.id}" >delete</button>
        // `
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
    drawCircleBresenham(r) {

        let x = 0
        let y = r
        let d = 2 * (x + 1) ** 2 + y ** 2 + (y - 1) ** 2 - 2 * r * r
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
    midpointCircle(r) {

        let x = 0
        let y = r
        let d = (5 / 4) - r

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