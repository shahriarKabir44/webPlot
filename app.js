import plotScale from './utils/plotScale.js'
import { select, clearCanvas } from "./utils/index.js";
import Line from "./renderers/Line.js";
import Circle from './renderers/Circle.js'
import Ellipse from './renderers/Ellipse.js';
import Shape from './renderers/Shape.js';
let states = []
let plotType = null;
let start = null
let end = null
const { height, width } = select('myCanvas').getBoundingClientRect()
plotScale(height, width)

// select('plotEllipse').onclick = () => {
//     hideAll()
//     plotType = 'ellipse'
//     select('ellipseInputs').style.display = 'block'
// }

// select('plotLine').onclick = () => {
//     hideAll()
//     plotType = 'line'
//     start = null
//     end = null
//     select('lineInputs').style.display = 'block'
// }

// select('plotCircle').onclick = () => {
//     hideAll()
//     plotType = 'circle'
//     select('curcleInputs').style.display = 'block'

// }



// select('plotLineBtn').onclick = () => {
//     Line.plotLineBresenham([
//         select('p1x1').value * 1,
//         select('p1y1').value * 1
//     ], [
//         select('p1x2').value * 1,
//         select('p1y2').value * 1
//     ])
// }



select('confirmSelection').onclick = () => {
    let newShape = new Shape();
    switch (select('shapesOption').value) {
        case 'circle':
            newShape = new Circle()

            break;

        case 'ellipse':
            newShape = new Ellipse()
            break;
    }
    // console.log(newShape.renderHTML())
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
    mainHandler(e, plotType)
})

function mainHandler(e, eventType) {
    let point = [e.clientX - select('myCanvas').getBoundingClientRect().x, 500 -
        e.clientY - select('myCanvas').getBoundingClientRect().y]
    if (eventType == 'line') {

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
    else if (eventType == 'circle') {
        select('centerX').value = point[0]
        select('centerY').value = point[1]
    }
    else if (eventType == 'ellipse') {
        select('centerXEl').value = point[0]
        select('centerYEl').value = point[1]
    }
}

