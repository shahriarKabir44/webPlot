import { putPixel } from "../utils/index.js";

export default class Line {
    static plotLineDDL(start, end) {
        if (start[0] > end[0]) {
            [start, end] = [end, start]
        }
        let slope = (end[1] - start[1]) / (end[0] - start[0])
        if (Math.abs(slope) <= 1) {
            console.log(slope)
            let y = start[1]
            for (let n = start[0]; n <= end[0]; n++) {
                putPixel(n, parseInt(y))
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
                putPixel(x, n)
                x += slope
            }
        }
    }
    static plotLineBresenham(start, end) {
        if (start[0] > end[0]) {
            [start, end] = [end, start]
        }
        let dx = Math.abs(end[0] - start[0])
        let dy = Math.abs(end[1] - start[1])
        let d = 2 * dy - dx
        let dt = 2 * (dy - dx)
        let ds = 2 * dy
        let slope = dy / dx

        if (slope <= 1) {
            let y = start[1]
            let step = 1
            if (start[1] > end[1])
                step = -1

            for (let n = start[0]; n <= end[0]; n++) {
                putPixel(n, y)
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
                putPixel(x, n)
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
