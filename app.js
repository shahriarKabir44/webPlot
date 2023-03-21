import { select, clearCanvas } from "./utils/index.js";
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
    console.log(Shape.getEndpoints(1))
    setTimeout(() => {
        document.querySelectorAll('.plotterbtn').forEach(e => {
            e.addEventListener('click', el => {
                const shapeId = el.target.id.split('-')[1]
                //console.log()
                Shape.handlePlot(shapeId)
            })
        })
    }, 100);
}

let point1 = null
let point2 = null
let dragStart = false

select('myCanvas').onmousedown = (e) => {
    checkDragStatus()

    let point = [e.clientX - select('myCanvas').getBoundingClientRect().x, 500 -
        e.clientY - select('myCanvas').getBoundingClientRect().y]
    point1 = point
    point2 = point
    dragStart = true

}
select('myCanvas').onmouseup = e => {
    dragStart = false
    Shape.removePreviousPixels()
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
    }, 100);

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

    if (Shape.lastShape == null) return
    // if (Shape.lastShape.type == 'line') {

    //     if (Shape.lastShape.start == null) {

    //         select('x1' + Shape.lastShape.id).value = point[0]
    //         select('y1' + Shape.lastShape.id).value = point[1]
    //         Shape.lastShape.start = point
    //     }
    //     else if (Shape.lastShape.end == null) {
    //         Shape.lastShape.end = point
    //         select('x2' + Shape.lastShape.id).value = point[0]
    //         select('y2' + Shape.lastShape.id).value = point[1]
    //     }
    // }
    else {
        Shape.lastShape.showEndPoints(point1, point2)
        Shape.lastShape.points = []
        try {

            Shape.handlePlot(Shape.lastShape.id)
        } catch (error) {

        }
    }
    // else if (Shape.lastShape.type == 'circle') {
    //     // select('centerX' + Shape.lastShape.id).value = point[0]
    //     // select('centerY' + Shape.lastShape.id).value = point[1]

    // }
    // else if (Shape.lastShape.type == 'ellipse') {
    //     select('centerXEl' + Shape.lastShape.id).value = point[0]
    //     select('centerYEl' + Shape.lastShape.id).value = point[1]

}

