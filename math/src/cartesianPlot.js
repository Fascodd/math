import React from 'react'

class CartensianPlot extends React.Component {
    constructor() {
        super();
        this.state = {

        }
        this.cartesianPlot = this.cartesianPlot.bind(this);
        this.ToggleGraph = this.ToggleGraph.bind(this);
    }
    ToggleGraph() {
        const canvas_plot = document.getElementById("graph-container");
        canvas_plot.style.display === "none" ? canvas_plot.style.display = "block" : canvas_plot.style.display = "none";
        
    }

    cartesianPlot() {
        let getWidth = (object) => object.getBoundingClientRect().width;
        let getHeight = (object) => object.getBoundingClientRect().height
        let diff = (container, object) => container - object;
        const canvas_plot = document.createElement('canvas');
        const graphContainter = document.getElementById("graph-container");
        const dsWrapper = document.getElementById('drawing-space-wrapper');
        // -- Used for centering the canvas
        const dsWrapperW = getWidth(dsWrapper);
        const dsWrapperH = getHeight(dsWrapper);
        const gcW = getWidth(graphContainter);
        const gcH = getHeight(graphContainter);
        canvas_plot.style.position = 'absolute';
        //Center top and left of graph container
        graphContainter.style.left = `${graphContainter.getBoundingClientRect().left + diff(dsWrapperH, gcH) / 2}px`
        graphContainter.style.top = `${graphContainter.getBoundingClientRect().top + diff(dsWrapperH, gcH) / 2}px`
        // -- end of centering
        graphContainter.appendChild(canvas_plot);
        canvas_plot.id = "canvas-plot";
        const ctx_plot = canvas_plot.getContext('2d');
        canvas_plot.width = window.innerWidth / 2;
        canvas_plot.height = window.innerHeight / 2;
        ctx_plot.beginPath();
        let centerX = canvas_plot.getBoundingClientRect().width / 2;
        let centerY = canvas_plot.getBoundingClientRect().height / 2;
        // graphing start
        let start = 0
        let end = 4
        let x = start
        let amp = 10
        let funString = document.getElementById("typing-box").textContent
        function convert(string) {
            let something = string.split("")
            something.forEach((str, i, arr) => str == "x" ? arr[i] = x : "")
            something = something.join("")
            return eval(something)
        }
        function PlotGraph() {
            ctx_plot.moveTo(centerX + start * amp, centerY - convert(funString) * amp)
            for (x = start; x < end; x = x + .1) {
                ctx_plot.lineTo(centerX + x * amp, centerY + (-1 * convert(funString) * amp));
            }
            ctx_plot.stroke();
            // -- graphing end
        }
        PlotGraph()

    }
    componentDidMount() {
        this.cartesianPlot();
        //document.getElementById("graph-container").style.display = "none"
    }
    componentDidUpdate() {
        this.cartesianPlot();
    }
    render() {
        
        return (
            <span>
                <button onClick={this.ToggleGraph}>Toggle Graph</button>
                
            </span>

        )
    }
}

export default CartensianPlot;