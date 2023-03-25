import { putPixel } from "../utils/index.js";
import Shape from "./Shape.js";
import { select } from "../utils/index.js";
export default class Line extends Shape {
    constructor() {
        super()
        this.type = "line"
        this.start = null
        this.end = null
    }
    plotLineDDL() {
        let { start, end } = this
        if (start[0] > end[0]) {
            [start, end] = [end, start]
        }
        let slope = (end[1] - start[1]) / (end[0] - start[0] + 1e-5)
        if (Math.abs(slope) <= 1) {
            let y = start[1]
            for (let n = start[0]; n <= end[0]; n++) {
                this.points.push([n, parseInt(y)])
                y += slope;
            }
        }
        else {
            slope = 1 / slope
            if (start[1] > end[1]) {
                [start, end] = [end, start]
            }
            let x = start[0]
            for (let n = start[1]; n <= end[1]; n++) {
                this.points.push([x, n])
                x += slope
            }
        }
    }

    completeRendering() {
        select(`lineInputs${this.id}`).innerHTML = ` <h3>Line</h3>
            start=${start}
            end=${end}
            <button class="deleteShapeBtn" id="delete-${this.id}" >delete</button>

        `
    }
    dragTo(newCenter) {
        let dx = -(this.center[0] - newCenter[0])
        let dy = -(this.center[1] - newCenter[1])
        this.start[0] += dx
        this.start[1] += dy

        this.end[0] += dx
        this.end[1] += dy
        select(`startx${this.id}`).innerHTML = this.start[0]
        select(`starty${this.id}`).innerHTML = this.start[1]

        select(`endx${this.id}`).innerHTML = this.end[0]
        select(`endy${this.id}`).innerHTML = this.end[1]
        this.center = newCenter
    }
    handleOnRender() {
        let [start, end] = Shape.getEndpoints(this.id)
        this.center = [
            (start[0] + end[0]) >> 1,
            (start[1] + end[1]) >> 1
        ]
        this.start = start
        this.end = end
        this.points = []
        this.plotLineBresenham()
        this.render()

    }
    removeHTML() {
        select('container').removeChild(select(`lineInputs${this.id}`))
    }
    plotLineBresenham() {
        let { start, end } = this
        if (start[0] > end[0]) {
            [start, end] = [end, start]
        }
        let dx = Math.abs(end[0] - start[0])
        let dy = Math.abs(end[1] - start[1])
        let d = 2 * dy - dx
        let dt = 2 * (dy - dx)
        let ds = 2 * dy
        let slope = dy / (dx + 1e-5)

        if (slope <= 1) {
            let y = start[1]
            let step = 1
            if (start[1] > end[1])
                step = -1

            for (let n = start[0]; n <= end[0]; n++) {
                this.points.push([n, y])
                if (d > 0) {
                    y += step
                    d += 2 * (dy - dx)
                }
                else
                    d += ds
            }
        }
        else {
            if (start[1] > end[1]) {
                [start, end] = [end, start]
            }
            let x = start[0]
            let step = 1
            if (start[0] > end[0]) {
                step = -1
            }
            for (let n = start[1]; n <= end[1]; n++) {
                this.points.push([x, n])
                if (d > 0) {
                    x += step
                    d += 2 * (dx - dy)
                } else {
                    d += 2 * dx
                }
            }
        }

    }
}
