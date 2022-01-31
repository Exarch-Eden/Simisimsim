import React, { FC, useEffect, useRef } from 'react';
import CanvasObject from './data-classes/CanvasObject';
import Node from './data-classes/Node';
import Planet from './data-classes/Planet';
import Vector3 from './data-classes/Vector3';

type NativeCanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

interface CanvasProps {
    items: CanvasObject[],
    updateCallback: () => void
    rest?: NativeCanvasProps
}

const Canvas: FC<CanvasProps> = ({ items, updateCallback, rest }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null!)

    useEffect(() => {
        console.log('canvasRef.current is defined: ', canvasRef.current !== undefined);

        const context = canvasRef?.current?.getContext('2d')

        const interval = setInterval(() => {
            // console.log('context: ', context !== undefined);
            if (context) {
                updateCallback()
                context?.clearRect(0, 0, context.canvas.width, context.canvas.height)

                for (let item of items) {
                    item.draw(context)
                }
            }
        })

        return () => clearInterval(interval)
    }, [])

    return <canvas ref={canvasRef} {...rest}></canvas>;
};

const App = () => {
    const testPlanets: Planet[] = [
        new Planet('Medium', 'Test Planet 1', 'Terra'),
        new Planet('Medium', 'Test Planet 1', 'Arctic'),
    ]

    const items: CanvasObject[] = [
        new CanvasObject(new Vector3(0, 0)),
        new CanvasObject(new Vector3(100, 100)),
        new Node(new Vector3(200, 200), testPlanets)
    ]

    const updateCallback = () => {
        // console.log('updateCallback()');
        
        
    }

    return (
        <div className='App'>
            <Canvas items={items} updateCallback={updateCallback} rest={{ height: 2000, width: 2000 }} />
        </div>
    );
};

export default App;
