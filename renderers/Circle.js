import { putPixel, select } from "../utils/index.js";
import Shape from "./Shape.js";

export default class Circle extends Shape {
    constructor() {
        super()
        this.radius = []
        this.center = 0
        this.points = []
        this.type = 'circle'
    }
    static _putPixels(center, x, y) {

        let dirs = [-1, 1]
        for (let n of dirs) {
            for (let k of dirs) {
                putPixel(center[0] + x * n, center[1] + y * k)
                putPixel(center[0] + y * n, center[1] + x * k)
            }
        }
    }
    render() {

        this.points.forEach(([x, y]) => {
            Circle._putPixels(this.center, x, y)
        })
    }
    renderHTML() {
        return `<div class="plotter" id="curcleInputs${this.id}"  >
                <h3>Plot circle</h3>

                <div class="flex">
                    <input type="text" name="" placeholder="center x" id="centerX${this.id}">
                    <input type="text" name="" placeholder="center y" id="centerY${this.id}">

                </div>
                <div class="flex">
                    <input type="text" name="" placeholder="circle radius" id="circleRad${this.id}">

                </div>
                <button class="plotterbtn" id="plotCircleBtn-${this.id}">Plot</button>
            </div>`
    }
    handleOnRender() {
        let center = [
            select('centerX' + this.id).value * 1,
            select('centerY' + this.id).value * 1
        ]
        console.log(center)
        let radius = select('circleRad' + this.id).value * 1
        this.center = center
        this.drawCircleBresenham(radius)
        this.render()
        select(`curcleInputs${this.id}`).innerHTML = ` <h3>Circle</h3>
            <button class="deleteShapeBtn" id="delete-${this.id}" >delete</button>
            radius=${radius}
            center=(${center[0]},${center[1]})
        `
    }
    removeHTML() {
        select('container').removeChild(select(`curcleInputs${this.id}`))
    }
    drawCircleBresenham(r) {

        let x = 0
        let y = r
        let d = 2 * (x + 1) ** 2 + y ** 2 + (y - 1) ** 2 - 2 * r * r

        while (x <= y) {
            this.points.push([x, y])

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
            this.points.push([x, y])
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