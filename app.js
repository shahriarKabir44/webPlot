import plotScale from './utils/plotScale.js'
import { select, clearCanvas } from "./utils/index.js";
import PlotLine from "./renderers/plotLine.js";
import PlotCircle from './renderers/plotCircle.js'



let plotType = null;
let start = null
let end = null
const { height, width } = select('myCanvas').getBoundingClientRect()
plotScale(height, width)
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
    PlotCircle.drawCircleBresenham([
        select('centerX').value * 1,
        select('centerY').value * 1
    ], select('circleRad').value)
}
select('plotLineBtn').onclick = () => {
    //  console.log(start, end  )
    PlotLine.plotLineBresenham([
        select('p1x1').value * 1,
        select('p1y1').value * 1
    ], [
        select('p1x2').value * 1,
        select('p1y2').value * 1
    ])
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
    if (eventType == 'line') {
        let point = [e.clientX - select('myCanvas').getBoundingClientRect().x,
        e.clientY - select('myCanvas').getBoundingClientRect().y]
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
        let point = [e.clientX - select('myCanvas').getBoundingClientRect().x,
        e.clientY - select('myCanvas').getBoundingClientRect().y]
        console.log(point)

        select('centerX').value = point[0]
        select('centerY').value = point[1]
    }
}