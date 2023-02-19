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
    static _putPixel(center, x, y) {
        for (let n of [-1, 1]) {
            for (let k of [-1, 1]) {
                putPixel(center[0] + x * n, center[1] + y * k, '#000000')
            }
        }
    }
    render() {
        console.log(this.center)
        this.points.forEach(([x, y]) => {

            Ellipse._putPixel(this.center, x, y)
        })
    }
    removeHTML() {
        select('container').removeChild(select(`ellipseInputs${this.id}`))
    }
    renderHTML() {
        return `<div class="plotter" id="ellipseInputs${this.id}"  >
                <h3>Plot ellipse</h3>
                <div class="flex">
                    <input type="text" name="" placeholder="center x" id="centerXEl${this.id}">
                    <input type="text" name="" placeholder="center y" id="centerYEl${this.id}">

                </div>
                <div class="flex">
                    <input type="text" name="" placeholder="a" id="ellipseA${this.id}">
                    <input type="text" name="" placeholder="b" id="ellipseB${this.id}">

                </div>
                <button class="plotterbtn" id="plotEllipseBtn-${this.id}">Plot</button>
            </div>`
    }
    handleOnRender() {
        let center = [
            select(`centerXEl${this.id}`).value * 1,
            select(`centerYEl${this.id}`).value * 1
        ]
        let a = select(`ellipseA${this.id}`).value * 1
        let b = select(`ellipseB${this.id}`).value * 1
        this.center = center
        this.midpointPlot(center, a, b)
        this.render()
        select(`ellipseInputs${this.id}`).innerHTML = ` <h3>Ellipse</h3>
            a=${a}
            b=${b}
            center=(${center[0]},${center[1]})
            <button class="deleteShapeBtn" id="delete-${this.id}" >delete</button>

        `
    }
    midpointPlot(center, a, b) {

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
            this.points.push([x, y])

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
            this.points.push([x, y])
        }

    }
}