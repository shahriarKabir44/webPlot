import { select, DRAG, INSERTION, ROTATE, attachEventListeners } from "./utils/index.js";
import Line from "./shapes/Line.js";
import Circle from './shapes/Circle.js'
import Ellipse from './shapes/Ellipse.js';
import Shape from './shapes/Shape.js';
Shape.init()


select('confirmSelection').onclick = () => {
    let newShape = null;
    switch (select('shapesOption').value) {
        case 'circle':
            newShape = new Circle()

            break;

        case 'ellipse':
            newShape = new Ellipse()
            break;
        case 'line':
            newShape = new Line()
            break
    }
    Shape.lastShape = newShape;
    select('container').innerHTML += newShape.renderHTML()
    setTimeout(() => {
        attachEventListeners()
    }, 200);
}

let point1 = null
let point2 = null
let dragStart = false

select('myCanvas').onmousedown = (e) => {


    let point = [
        (e.clientX - select('myCanvas').getBoundingClientRect().x), 500 -
        e.clientY - select('myCanvas').getBoundingClientRect().y
    ]
    point1 = point
    point2 = point
    checkDragStatus()
    dragStart = true

}
select('myCanvas').onmouseup = e => {
    dragStart = false
    if (Shape.operationMode != INSERTION) {
        Shape.selectedShapeForOperation.color = "#000000"
        Shape.selectedShapeForOperation.deactive()
        //Shape.selectedShapeForOperation = null
    }
    Shape.operationMode = INSERTION
    if (Shape.lastShape) {
        Shape.lastShape.deactive()
    }
}


select('myCanvas').onmousemove = e => {
    if (dragStart) {
        let point = [e.clientX - select('myCanvas').getBoundingClientRect().x, 500 -
            e.clientY - select('myCanvas').getBoundingClientRect().y];
        point2 = point
    }
    // 
};
keepRefreshingCanvas()
function keepRefreshingCanvas() {

    Shape.removePreviousPixels()
    setTimeout(() => {
        keepRefreshingCanvas()
    }, 200);

}

function checkDragStatus() {
    setTimeout(() => {
        if (dragStart) {
            if (Shape.canReRender) {
                mainHandler()
            }

            checkDragStatus()
        }
        else {
            return
        }

    }, 100)
}

function mainHandler() {
    if (Shape.operationMode == INSERTION) {
        plottingHandler()
    }
    else if (Shape.operationMode == DRAG) {
        draggingHandler()
    }
    else if (Shape.operationMode == ROTATE) {
        Shape.selectedShapeForOperation.rotateTo(point2)
    }

}

function plottingHandler() {
    if (Shape.lastShape == null) return

    else {
        Shape.lastShape.showEndPoints(point1, point2)
        Shape.lastShape.points = []
        try {

            Shape.handlePlot(Shape.lastShape.id)
        } catch (error) {

        }
    }
}



function draggingHandler() {
    Shape.selectedShapeForOperation.dragTo(point2)
    //console.log(point2)
}

function rotationHandler() {
    Shape.selectedShapeForOperation.rotateTo(point2)
}