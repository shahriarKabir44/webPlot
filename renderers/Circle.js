import { putPixel } from "../utils/index.js";
export default class Circle {
    static _putPixels(center, x, y) {
        let dirs = [-1, 1]
        for (let n of dirs) {
            for (let k of dirs) {
                putPixel(center[0] + x * n, center[1] + y * k)
                putPixel(center[0] + y * n, center[1] + x * k)
            }
        }
    }
    static drawCircleBresenham(center, r) {
        let x = 0
        let y = r
        let d = 2 * (x + 1) ** 2 + y ** 2 + (y - 1) ** 2 - 2 * r * r

        while (x <= y) {
            Circle._putPixels(center, x, y)
            if (d < 0)
                d += (4 * x + 6)
            else {
                d += 4 * (x - y) + 10
                y -= 1
            }
            x += 1
        }
    }
    static midpointCircle(center, r) {
        let x = 0
        let y = r
        let d = (5 / 4) - r

        while (x <= y) {
            PlotCircle._putPixels(center, x, y)
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