import plotScale from "./plotScale.js";
import Shape from "../shapes/Shape.js";
export const canvasContext = select('myCanvas').getContext('2d')
export const DRAG = 1;
export const ROTATE = 2;
export const INSERTION = 0;
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
    plotScale(select('myCanvas').width, select('myCanvas').height)

}


export function attachEventListeners() {
    document.querySelectorAll('.plotterbtn').forEach(e => {
        e.addEventListener('click', el => {
            const shapeId = el.target.id.split('-')[1]
            //console.log()
            Shape.handlePlot(shapeId)
        })
    })
    document.querySelectorAll('.dragBtn').forEach(e => {
        e.addEventListener('click', el => {
            const shapeId = el.target.id.split('-')[1]

            Shape.selectShapeForDrag(shapeId)
        })
    })
    document.querySelectorAll('.rotateBtn').forEach(e => {
        e.addEventListener('click', el => {
            const shapeId = el.target.id.split('-')[1]

            Shape.selectShapeForRotation(shapeId)
        })
    })

    document.querySelectorAll('.scalebtnxup').forEach(e => {
        e.addEventListener('click', el => {
            const shapeId = el.target.id.split('-')[1]
            select(`sx-${shapeId}`).innerHTML = select(`sx-${shapeId}`).innerHTML * 1 + 1
            Shape.scale(shapeId)
        })
    })
    document.querySelectorAll('.scalebtnxdn').forEach(e => {
        e.addEventListener('click', el => {
            const shapeId = el.target.id.split('-')[1]
            select(`sx-${shapeId}`).innerHTML = Math.max(select(`sx-${shapeId}`).innerHTML * 1 - 1, 1)
            Shape.scale(shapeId)
        })
    })
    document.querySelectorAll('.scalebtnyup').forEach(e => {
        e.addEventListener('click', el => {
            const shapeId = el.target.id.split('-')[1]
            select(`sy-${shapeId}`).innerHTML = select(`sy-${shapeId}`).innerHTML * 1 + 1
            Shape.scale(shapeId)
        })
    })
    document.querySelectorAll('.scalebtnydn').forEach(e => {
        e.addEventListener('click', el => {
            const shapeId = el.target.id.split('-')[1]
            select(`sy-${shapeId}`).innerHTML = Math.max(select(`sy-${shapeId}`).innerHTML * 1 - 1, 1)
            Shape.scale(shapeId)
        })
    })

}