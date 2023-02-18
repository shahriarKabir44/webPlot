
export const canvasContext = select('myCanvas').getContext('2d')

export function putPixel(x, y, color = '#000000') {

    y = 500 - 16 - y
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, 1, 1);
    canvasContext.fillStyle = '#000000';

}
export function _putPixel(x, y, color = '#000000') {


    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, 1, 1);
    canvasContext.fillStyle = '#000000';

}
export function select(id) {
    return document.getElementById(id)
}



export function clearCanvas() {
    canvasContext.clearRect(0, 0, select('myCanvas').width, select('myCanvas').height)
}