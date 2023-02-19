import plotScale from './utils/plotScale.js'
import { select, clearCanvas } from "./utils/index.js";
import Line from "./renderers/Line.js";
import Circle from './renderers/Circle.js'
import Ellipse from './renderers/Ellipse.js';
import Shape from './renderers/Shape.js';
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
    if (Shape.lastShape.type == 'line') {

        if (start == null) {
            start = point
            select('p1x1').value = point[0]
            select('p1y1').value = point[1]
        }
        else if (end == null) {
            end = point
            select('p1x2').value = point[0]
            select('p1y2').value = point[1]
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

