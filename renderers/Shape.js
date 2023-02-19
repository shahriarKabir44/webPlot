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
    removeAndRender() {
        clearCanvas()
        plotScale()

        Shape.state = Shape.state.filter(shape => shape.id != this.id)
        Shape.state.forEach((shape) => {
            shape.render()
            console.log(shape.type)
        })

        plotScale()

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
        setTimeout(() => {
            document.querySelectorAll('.deleteShapeBtn').forEach(el => {
                el.addEventListener('click', (e) => {
                    const id = e.target.id.split('-')[1]
                    Shape.state.forEach(shape => {
                        if (shape.id == id) {
                            shape.removeAndRender()
                        }
                    })
                })
            })
        }, 100);
    }
}