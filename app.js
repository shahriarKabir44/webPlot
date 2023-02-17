import plotScale from './utils/plotScale.js'
import { select, clearCanvas } from "./utils/index.js";
import Line from "./renderers/Line.js";
import Circle from './renderers/Circle.js'
import Ellipse from './renderers/Ellipse.js';

let plotType = null;
let start = null
let end = null
const { height, width } = select('myCanvas').getBoundingClientRect()
plotScale(height, width)

select('plotEllipse').onclick = () => {
    if (plotType == null) {
        plotType = 'ellipse'
        select('ellipseInputs').style.display = 'block'

    }
    else {
        plotType = null
        select('ellipseInputs').style.display = 'none'
    }
}

select('plotLine').onclick = () => {
    if (plotType == null) {
        plotType = 'line'
        select('lineInputs').style.display = 'block'

    }
    else {
        plotType = null
        start = null
        end = null
        select('p1x1').value = null
        select('p1y1').value = null
        select('p1x2').value = null
        select('p1y2').value = null
        select('lineInputs').style.display = 'none'

    }
}
select('myCanvas').addEventListener('click', (e) => {
    mainHandler(e, plotType)
})
select('plotCircle').onclick = () => {

    if (plotType == null) {
        plotType = 'circle'
        select('curcleInputs').style.display = 'block'
    }
    else {
        plotType = null
        select('curcleInputs').style.display = 'none'
    }
}


select('plotCircleBtn').onclick = () => {
    console.log('here')
    Circle.drawCircleBresenham([
        select('centerX').value * 1,
        select('centerY').value * 1
    ], select('circleRad').value)
}
select('plotLineBtn').onclick = () => {
    //  console.log(start, end  )
    Line.plotLineBresenham([
        select('p1x1').value * 1,
        select('p1y1').value * 1
    ], [
        select('p1x2').value * 1,
        select('p1y2').value * 1
    ])
}
select('plotEllipseBtn').onclick = () => {
    Ellipse.midpointPlot([
        select('centerX').value * 1,
        select('centerY').value * 1
    ], select('ellipseA').value * 1, select('ellipseB').value * 1)
}


select('clear').onclick =
    function () {
        start = null
        end = null
        select('p1x1').value = null
        select('p1y1').value = null
        select('p1x2').value = null
        select('p1y2').value = null
        clearCanvas()
        plotScale(height, width)
    }


function mainHandler(e, eventType) {
    let point = [e.clientX - select('myCanvas').getBoundingClientRect().x,
    e.clientY - select('myCanvas').getBoundingClientRect().y]
    if (eventType == 'line') {

        console.log(point, start, end)
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
        select('centerX').value = point[0]
        select('centerY').value = point[1]
    }
}