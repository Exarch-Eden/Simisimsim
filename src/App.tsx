import React, { Suspense } from 'react';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber';

import Map from './components/Map';
import { Position } from './types/generic';

import './css/App.css';

// the z value is important in scaling the size of objects inside the canvas
const canvasCamera: Position = { position: [0, 0, 400] }

const mapPosition: Position = { position: [0, 0, 0] }

const App = () => {
    

    return (
        <div className="App">

            <Canvas className="Canvas" camera={canvasCamera}>
                <Suspense fallback={null}>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Map rest={mapPosition} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;
