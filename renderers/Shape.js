import plotScale from "../utils/plotScale.js";
import { clearCanvas } from "../utils/index.js";
export default class Shape {
    static state = []
    static shapeCount = 0
    static lastShape = null;
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
    }
}