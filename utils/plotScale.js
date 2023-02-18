import { _putPixel } from "./index.js"
export default function plotScale(height, width) {
    for (let n = 0; n < width; n++) {
        if (n % 50 == 0) {
            for (let k = 0; k < height; k++) {
                _putPixel(n, k, '#158f9e')
            }
        }
        else if (n % 5 == 0) {
            for (let k = 0; k < height; k++) {
                _putPixel(n, k, '#7eefd1')
            }
        }
    }
    for (let n = 0; n < height; n++) {
        if (n % 50 == 0) {
            for (let k = 0; k < width; k++) {
                _putPixel(k, n, '#158f9e')
            }
        }
        else if (n % 5 == 0) {
            for (let k = 0; k < width; k++) {
                _putPixel(k, n, '#7eefd1')
            }
        }
    }


}