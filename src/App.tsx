import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber';

import Map from './components/Map';
import { Position } from './types/generic';
import { store } from './redux/store';
import { useAppSelector } from './redux/hooks';
import { selectNodeHUDOnHover } from './redux/reducers/nodeHUDSlice';

import './css/App.css';
import { Html } from '@react-three/drei';
import GenericRect from './components/GenericRect';

// the z value is important in scaling the size of objects inside the canvas
const canvasCamera: Position = { position: [0, 0, 400] }

const mapPosition: Position = { position: [0, 0, 1] }

const App = () => {
    const nodeOnHover = useAppSelector(selectNodeHUDOnHover)

    return (
        <div className="App">

            <Canvas className="Canvas" camera={canvasCamera}>
                <Provider store={store}>
                    <Suspense fallback={null}>

                        <ambientLight />
                        <pointLight position={[10, 10, 10]} />
                        {/* <group position={[0, 0, 0]}> */}
                            {/* <Html fullscreen occlude center>
                                {
                                    nodeOnHover
                                        ?
                                        <div style={{
                                            backgroundColor: 'white',
                                            width: 100,
                                            height: 100,
                                            // bottom: 0,
                                            // right: 0
                                        }}>
                                            <p>This is Node HUD</p>
                                        </div>
                                        : null
                                }
                            </Html> */}
                            {
                                nodeOnHover
                                ?
                                <GenericRect rest={{position: [0, 0, 0]}} />
                                : null
                            }
                        {/* </group> */}
                        <Map rest={mapPosition} />
                        
                    </Suspense>
                </Provider>
            </Canvas>
        </div>
    );
}

export default App;
