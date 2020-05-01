import React from 'react';
import PresentationSpace from './presentationSpace.js'
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidUpdate(){
        // create canvas element and append it to document body
        var canvas = document.createElement('canvas');
        document.getElementById("drawing-space").appendChild(canvas);

        // some hotfixes... ( ≖_≖)

        canvas.style.position = 'relative';

        // get canvas 2D context and set him correct size
        var ctx = canvas.getContext('2d');
        resize();

        // last known position
        var pos = { x: 0, y: 0 };

        window.addEventListener('resize', resize);
        document.addEventListener('mousemove', draw);
        document.addEventListener('mousedown', setPosition);
        document.addEventListener('mouseenter', setPosition);

        // new position from mouse event
        function setPosition(e) {
            pos.x = e.clientX - document.getElementById("drawing-space").getBoundingClientRect().x;
            pos.y = e.clientY - document.getElementById("drawing-space").getBoundingClientRect().y;

        }

        // resize canvas
        function resize() {
            ctx.canvas.width = document.getElementById("drawing-space").getBoundingClientRect().width;
            ctx.canvas.height = document.getElementById("drawing-space").getBoundingClientRect().height;
        }

        function draw(e) {
            // mouse left button must be pressed
            if (e.buttons !== 1) return;

            ctx.beginPath(); // begin

            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#c0392b';

            ctx.moveTo(pos.x, pos.y); // from
            setPosition(e);
            ctx.lineTo(pos.x, pos.y); // to

            ctx.stroke(); // draw it!
        }
    }
    componentDidMount() {
        // create canvas element and append it to document body
        var canvas = document.createElement('canvas');
        document.getElementById("drawing-space").appendChild(canvas);

        // some hotfixes... ( ≖_≖)

        canvas.style.position = 'relative';

        // get canvas 2D context and set him correct size
        var ctx = canvas.getContext('2d');
        resize();

        // last known position
        var pos = { x: 0, y: 0 };

        window.addEventListener('resize', resize);
        document.addEventListener('mousemove', draw);
        document.addEventListener('mousedown', setPosition);
        document.addEventListener('mouseenter', setPosition);

        // new position from mouse event
        function setPosition(e) {
            pos.x = e.clientX - document.getElementById("drawing-space").getBoundingClientRect().x;
            pos.y = e.clientY - document.getElementById("drawing-space").getBoundingClientRect().y;

        }

        // resize canvas
        function resize() {
            ctx.canvas.width = document.getElementById("drawing-space").getBoundingClientRect().width;
            ctx.canvas.height = document.getElementById("drawing-space").getBoundingClientRect().height;
        }

        function draw(e) {
            // mouse left button must be pressed
            if (e.buttons !== 1) return;

            ctx.beginPath(); // begin

            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#c0392b';

            ctx.moveTo(pos.x, pos.y); // from
            setPosition(e);
            ctx.lineTo(pos.x, pos.y); // to

            ctx.stroke(); // draw it!
        }
    }
    render() {

        return (
            <div id="container" >
                {/* Typing area */}
                <div id="typing-wrapper">

                    {/* Fill in this array from a grid*/}
                    <div id="symbol-grid">
                    </div>
                    <div id="typing-area">
                        <textarea id="typing-box" type="text"> 3x + 3 +4 =4</textarea>
                    </div>
                </div>

                {/* Presentation space*/}
                <PresentationSpace/>
            </div>
        )
    }


}




export default App;
