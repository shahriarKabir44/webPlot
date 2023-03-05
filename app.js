import plotScale from './utils/plotScale.js'
import { select, clearCanvas } from "./utils/index.js";
import Line from "./shapes/Line.js";
import Circle from './shapes/Circle.js'
import Ellipse from './shapes/Ellipse.js';
import Shape from './shapes/Shape.js';
const { height, width } = select('myCanvas').getBoundingClientRect()
plotScale(height, width)





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
    console.log(Shape.state)
    select('container').innerHTML += newShape.renderHTML()
    console.log(select('container'))

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



select('myCanvas').addEventListener('click', (e) => {
    mainHandler(e)
})

function mainHandler(e) {
    let point = [e.clientX - select('myCanvas').getBoundingClientRect().x, 500 -
        e.clientY - select('myCanvas').getBoundingClientRect().y]
    if (Shape.lastShape == null) return
    if (Shape.lastShape.type == 'line') {

        if (Shape.lastShape.start == null) {

            select('x1' + Shape.lastShape.id).value = point[0]
            select('y1' + Shape.lastShape.id).value = point[1]
            Shape.lastShape.start = point
        }
        else if (Shape.lastShape.end == null) {
            Shape.lastShape.end = point
            select('x2' + Shape.lastShape.id).value = point[0]
            select('y2' + Shape.lastShape.id).value = point[1]
        }
    }
    else if (Shape.lastShape.type == 'circle') {
        select('centerX' + Shape.lastShape.id).value = point[0]
        select('centerY' + Shape.lastShape.id).value = point[1]
    }
    else if (Shape.lastShape.type == 'ellipse') {
        select('centerXEl' + Shape.lastShape.id).value = point[0]
        select('centerYEl' + Shape.lastShape.id).value = point[1]
    }
}

