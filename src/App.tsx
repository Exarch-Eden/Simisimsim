import React, { FC, useEffect, useRef, useState } from 'react';
import CanvasObject from './data-classes/CanvasObject';
import Node from './data-classes/Node';
import Planet from './data-classes/Planet';
import Vector3 from './data-classes/Vector3';

const CANVAS_HEIGHT = window.innerHeight
const CANVAS_WIDTH = window.innerWidth

const testPlanets: Planet[] = [
    new Planet('Medium', 'Test Planet 1', 'Terra'),
    new Planet('Medium', 'Test Planet 1', 'Arctic'),
]

const items: CanvasObject[] = [
    new CanvasObject(new Vector3(0, 0)),
    new CanvasObject(new Vector3(100, 100)),
    new Node(new Vector3(200, 200), testPlanets)
]

// const CANVAS_HEIGHT = 2000
// const CANVAS_WIDTH = 2000

type NativeCanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

interface CanvasProps {
    items: CanvasObject[],
    updateCallback: () => void,
    isPaused?: boolean,
    rest?: NativeCanvasProps
}

const Canvas: FC<CanvasProps> = ({ items, updateCallback, isPaused, rest }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null!)

    useEffect(() => {
        console.log('canvasRef.current is defined: ', canvasRef.current !== undefined);

        const context = canvasRef?.current?.getContext('2d')

        const interval = setInterval(() => {
            if (isPaused) return;

            // console.log('context: ', context !== undefined);
            if (context) {
                updateCallback()
                // clear the canvas in every frame before drawing
                context?.clearRect(0, 0, context.canvas.width, context.canvas.height)

                for (let item of items) {
                    item.draw(context)
                }
            }
        })

        return () => clearInterval(interval)
    }, [isPaused])

    return <canvas ref={canvasRef} {...rest}></canvas>;
};

const App = () => {
    const [isPaused, setIsPaused] = useState(false)

    const updateCallback = () => {
        // console.log('updateCallback()');

        for (let i = 0; i < items.length; i++) {
            const curItem = items[i]
            curItem.move(new Vector3(2, 2))

            // if canvas objects have gone past canvas
            // reset their position to 0, 0
            if (
                Math.abs(curItem.position.x) > CANVAS_WIDTH ||
                Math.abs(curItem.position.y) > CANVAS_HEIGHT
            ) {
                curItem.position.x = 0
                curItem.position.y = 0
            }
        }
    }

    return (
        <div className='App'>
            <button style={{ position: 'absolute' }} onClick={() => setIsPaused(!isPaused)}>Pause/Unpause</button>
            <Canvas items={items} updateCallback={updateCallback} isPaused={isPaused} rest={{ height: CANVAS_HEIGHT, width: CANVAS_WIDTH }} />
        </div>
    );
};

export default App;
