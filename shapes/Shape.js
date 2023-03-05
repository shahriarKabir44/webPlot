import plotScale from "../utils/plotScale.js";
import { clearCanvas } from "../utils/index.js";
export default class Shape {
    static state = []
    static shapeCount = 0
    static lastShape = null;
    type = ""
    constructor() {

        Shape.shapeCount++;
        Shape.state.push(this)
        this.id = Shape.shapeCount;
    }
    removeHTML() { }
    removeAndRender() {
        let target = Shape.state.filter(shape => shape.id == this.id)[0]
        target.removeHTML()
        Shape.state = Shape.state.filter(shape => shape.id != this.id)
        Shape.state.forEach((shape) => {
            shape.render()
        })
    }
    handleOnRender() { }
    renderHTML() { }
    render() { }
    static handlePlot(id) {
        for (let shape of this.state) {
            if (shape.id == id) {
                shape.handleOnRender()
            }
        }
        document.querySelectorAll('.deleteShapeBtn').forEach(el => {
            el.addEventListener('click', (e) => {
                clearCanvas()
                const id = e.target.id.split('-')[1]
                Shape.state.forEach(shape => {
                    if (shape.id == id) {
                        shape.removeAndRender()
                    }
                })
            })
        })
    }
}
