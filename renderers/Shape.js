import plotScale from "../utils/plotScale";
import { clearCanvas } from "../utils";
export default class Shape {
    static state = []
    static shapeCount = 0
    constructor() {

        Shape.shapeCount++;
        this.id = Shape.shapeCount;
    }
    removeAndRender() {
        clearCanvas()
        Shape.state = Shape.state.filter(id != this.id)
        Shape.state.forEach((shape) => {
            shape.render()
        })
    }
    render() { }
}