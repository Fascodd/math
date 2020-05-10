import React from 'react';

class PresentationSpace extends React.Component {
    constructor() {
        super();
        this.state = {
            shapeArray: [{ id: 1, classes: "shape", img: "parallelogram", shape: "parallelogram" },
            { id: 2, classes: "shape", img: "square", shape: "square" },
            { id: 3, classes: "shape", img: "rectangle", shape: "rectangle" },
            { id: 4, classes: "shape", img: "circle", shape: "circle" },
            { id: 5, classes: "shape", img: "triangle", shape: "triangle-up" },
            ],
            shapeStorage: [],
            mouseDown: false,
        }
        this.addShape = this.addShape.bind(this);
    }
    addShape = (e) => {
        e.persist();
        let canvas = document.getElementById("drawing-space-wrapper");
        let div = document.createElement("div");
        const drawingSpace = document.getElementById('drawing-space');
        div.classList = e.target.id;
        canvas.appendChild(div);
        div.style.left = `${drawingSpace.getBoundingClientRect().width / 2 + document.getElementById('drawing-space').getBoundingClientRect().left - div.getBoundingClientRect().width / 2}px`;
        div.style.top = `${drawingSpace.getBoundingClientRect().height / 2 + document.getElementById('drawing-space').getBoundingClientRect().top - div.getBoundingClientRect().height / 2}px`;
        div.addEventListener("mousedown", (q) => {
            let mouseDown = true;
            if (q.button == 0) {
                this.setState(state => { return { mouseDown: !state.mouseDown } })
                window.addEventListener('mousemove', function movingPointer(e) {
                    div.style.left = `${e.clientX - (div.getBoundingClientRect().width / 2)}px`;
                    div.style.top = `${e.clientY - (div.getBoundingClientRect().height / 2)}px`;
                    if (!mouseDown) { window.removeEventListener('mousemove', movingPointer) }
                })
            }
            window.addEventListener("mouseup", () => {
                mouseDown = false;
                this.setState(state => { return { mouseDown: !state.mouseDown } })
            })
        });
        let shapeBoundClient = div.getBoundingClientRect();
    }
    render() {

        return (
            <div id="presentation-space" >
                <div id="object-wrapper">
                    <div id="object-selector">
                        {/* have the hright of classes by ceiling of totalNum/2 */}
                        {this.state.shapeArray.map(item =>
                            <div key={item.id} className={item.classes} id={item.shape}
                                onClick={this.addShape}>{item.img}</div>
                        )}
                    </div>
                    <div id="object-selector-fill" />
                </div>
                <div id="drawing-space-wrapper">
                    <div id="drawing-space">

                    </div>
                </div>
            </div>
        )
    }
}
export default PresentationSpace;