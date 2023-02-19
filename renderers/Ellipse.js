import { putPixel } from "../utils/index.js";
import Shape from "./Shape.js";

export default class Ellipse extends Shape {
    constructor(center) {
        super();
        this.type = 'ellipse';
        this.points = []
        this.center = center
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
    static midpointPlot(center, a, b) {
        let elipse = new Ellipse(center);
        console.log(center)
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
            elipse.points.push([x, y])

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

        }
        return elipse;
    }
}