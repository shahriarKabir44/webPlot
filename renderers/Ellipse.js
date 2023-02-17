import { putPixel } from "../utils/index.js";

export default class Ellipse {
    static _putPixel(center, x, y) {
        for (let n of [-1, 1]) {
            for (let k of [-1, 1]) {
                putPixel(center[0] + x * n, center[1] + y * k, '#000000')
            }


        }
    }
    static midpointPlot(center, a, b) {
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
            Ellipse._putPixel(center, x, y)
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
            Ellipse._putPixel(center, x, y)
        }
    }
}