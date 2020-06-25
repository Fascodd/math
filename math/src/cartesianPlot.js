import React from 'react'

class CartensianPlot extends React.Component {
    constructor() {
        super();
        this.state = {
            canvas_plot: "",

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

        let centerX = canvas_plot.getBoundingClientRect().width / 2;
        let centerY = canvas_plot.getBoundingClientRect().height / 2;
        // graphing start
        const start = 0
        const end = 4
        let x = start
        const amp = 10
        let funString
        let something
        let xCor
        let yCor
        function convert(string) {
            something = string.split("")
            something.forEach((str, i, arr) => str == "x" ? arr[i] = x : "")
            something = something.join("")
            return eval(something)
        }

        function PlotGraph() {
            x = start
            funString = document.getElementById("typing-box").value
            ctx_plot.beginPath();
            ctx_plot.moveTo(centerX + start * amp, centerY - convert(funString) * amp)
            for (x; x < end; x = x + .1) {
                xCor = centerX + x * amp;
                yCor = centerY + (-1 * convert(funString) * amp)
                console.log(xCor, yCor)
                ctx_plot.lineTo(xCor, yCor);
            }
            ctx_plot.stroke();
            // -- graphing end
        }
        document.getElementById("typing-box").addEventListener("keypress", (e) => {
            if (e.key === "Enter") { PlotGraph() }
        })

    }
    componentDidMount() {
        this.cartesianPlot();
        //document.gFetElementById("graph-container").style.display = "none"
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