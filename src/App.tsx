import React, { FC, useEffect, useRef } from 'react';
import CanvasObject from './data-classes/CanvasObject';

type NativeCanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

interface CanvasProps {
    items: CanvasObject[],
    rest?: NativeCanvasProps
}

const Canvas: FC<CanvasProps> = ({ items, rest }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null!)
    
    useEffect(() => {
        const context = canvasRef.current.getContext('webgl')



    }, [])

    return <canvas ref={canvasRef} {...rest}></canvas>;
};

const App = () => {
    return (
        <div className='App'>
            <Canvas items={[]} rest={{ height: 2000, width: 2000 }} />
        </div>
    );
};

export default App;
