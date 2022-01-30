import React, { Suspense, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber';

import Map from './components/Map';
import { Position } from './types/generic';
import { store } from './redux/store';
import { useAppSelector } from './redux/hooks';
import { selectNodeHUDOnHover } from './redux/reducers/nodeHUDSlice';

import './css/App.css';
import { Html, OrbitControls } from '@react-three/drei';
import GenericRect from './components/GenericRect';
import { MAP_HEIGHT, MAP_WIDTH } from './constants/map';
import { PerspectiveCamera } from '@react-three/drei';

// the z value is important in scaling the size of objects inside the canvas
const canvasCamera: Position = { position: [0, 0, 400] }

const mapPosition: Position = { position: [0, 0, 1] }

const App = () => {
    const nodeOnHover = useAppSelector(selectNodeHUDOnHover)

    const appRef = useRef()
    const camRef = useRef<THREE.PerspectiveCamera>(null!)
    const [hoverRectX, setHoverRectX] = useState(0)
    const [hoverRectY, setHoverRectY] = useState(0)
    const [rectWidth, setRectWidth] = useState(100)
    const [rectHeight, setRectHeight] = useState(100)

    const getVisibleHeight = () => {
        const cameraOffset = camRef.current.position.z

        // const vFOV = 1 / ((cameraOffset / 400) ** 2)
        const vFOV = window.screen.height / (1 / ((camRef.current.position.z / 400) ** 2))
        // console.log('zoomfromz: ', vFOV);
        
        // const vFOV = camRef.current.fov * Math.PI / 180

        return vFOV
        // return 2 * Math.tan(vFOV / 2) * Math.abs(cameraOffset)
    }

    const getVisibleWidth = () => {
        return window.screen.width / (1 / ((camRef.current.position.z / 400) ** 2))
        // const height = getVisibleHeight()
        // return height * camRef.current.aspect
    }

    const zoomChange = () => {
        // console.log('z: ', camRef.current.position.z);
        const vFOV = 1 / ((camRef.current.position.z / 400) ** 2)
        console.log('zoomfromz: ', vFOV);
        
        // console.log('z^2: ', 1 / (camRef.current.position.z * camRef.current.position.z));
        
        // logs the camera's x, y, and z when zooming in or out via OrbitControls
        console.log('cam position: ', camRef && camRef.current ? camRef.current.position : undefined);
        console.log('visibleHeight: ', getVisibleHeight());
        console.log('visibleWidth: ', getVisibleWidth());

        const rectHeight = getVisibleHeight() * 0.3
        const rectWidth = getVisibleWidth() * 0.3

        const rectX = (getVisibleWidth() / 2)
        const rectY = (getVisibleHeight() / 2)
        // const rectX = camRef.current.position.x + (getVisibleWidth() / 2)
        // const rectY = camRef.current.position.y - (getVisibleHeight() / 2)

        console.log('rect x: ', rectX);
        console.log('rect y: ', rectY);

        // relative positioning is still a bit wonky
        setHoverRectX(rectX)
        setHoverRectY(rectY)
        // setHoverRectX(camRef.current.position.x + (getVisibleWidth() / 2) - 50 - 10)
        // setHoverRectY(camRef.current.position.y - (getVisibleHeight() / 2) + 50 + 10)

        // TODO: also set the height and width of the rectangle itself to scale with the camera FOV
        // can probably use percentage values to determine sizing
        setRectHeight(rectHeight)
        setRectWidth(rectWidth)
    }

    return (
        <div className="App">

            <Canvas className="Canvas">
                <Provider store={store}>
                    <Suspense fallback={null}>
                        <PerspectiveCamera
                            ref={camRef}
                            makeDefault
                            aspect={1920 / 1080}
                            fov={45}
                            position={[0, 0, 400]}
                            zoom={1}
                            onUpdate={self => self.updateProjectionMatrix()}
                        />
                        <OrbitControls
                            enableRotate={false}
                            onChange={() => zoomChange()}
                        />
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
                            nodeOnHover && camRef && camRef.current
                                ?
                                <>
                                    <mesh position={[hoverRectX,hoverRectY, 2]}>
                                        <planeGeometry args={[5, 5]} />
                                        <meshBasicMaterial color='red' />
                                    </mesh>
                                    <GenericRect
                                        width={rectWidth}
                                        height={rectHeight}
                                        rest={{
                                            position: [
                                                hoverRectX,
                                                hoverRectY,
                                                0
                                            ]
                                            // position: [MAP_WIDTH - 105, 105 - MAP_HEIGHT, 0]
                                        }} />
                                </>
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
