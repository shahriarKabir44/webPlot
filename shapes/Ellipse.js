import { putPixel, select } from "../utils/index.js";
import Shape from "./Shape.js";

export default class Ellipse extends Shape {
    constructor() {
        super();
        this.center = null
        this.a = 0
        this.b = 0
        this.type = 'ellipse';
        this.points = []
    }
    completeRendering() {
        select(`inputs${this.id}`).innerHTML = ` <h3>Ellipse</h3>
            a=${a}
            b=${b}
            center=(${center[0]},${center[1]})
            <button class="deleteShapeBtn" id="delete-${this.id}" >delete</button>

        `
    }
    addPoint(x, y) {
        for (let n of [-1, 1]) {
            for (let k of [-1, 1]) {
                this.points.push([this.center[0] + x * n, this.center[1] + y * k])
            }
        }
    }

    removeHTML() {
        select('container').removeChild(select(`inputs${this.id}`))
    }

    handleOnRender() {
        let [p1, p2] = Shape.getEndpoints(this.id)
        let [dx, dy] = Shape.getSize(this.id)

        let a = dx
        let b = dy
        let center = p1
        this.center = center
        this.midpointPlot(a, b)
        this.render()

    }
    midpointPlot(a, b) {

        let bb = b * b
        let aa = a * a
        let bb2 = 2 * bb
        let aa2 = 2 * aa
        let d = bb - aa * b + aa * .25
        let fx = 0
        let fy = aa2 * b
        let x = 0;
        let y = b
        while (fx < fy) {
            x++
            fx += bb2
            if (d < 0) {
                d += fx + bb
            }
            else {
                fy -= aa2

                y--;
                d += fx + bb - fy
            }
            this.addPoint(x, y)

        }
        d = bb * (x + .5) * (x + .5) + aa * (y - 1) * (y - 1) - aa * bb
        d = parseInt(d)
        while (y) {
            y--
            fy -= aa2
            if (d > 0) {
                d += -fy + aa
            }
            else {
                fx += bb2
                x++
                d += fx - fy + aa
            }
            this.addPoint(x, y)
        }

    }
}