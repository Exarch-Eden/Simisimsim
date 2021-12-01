import { Html } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import React, { FC, useEffect, useRef } from 'react'
import * as THREE from 'three'

import { OUTLINE_COLOR } from '../constants/colors';
import { NODE_IN_RADIUS, NODE_OUT_RADIUS, NODE_SEGMENTS } from '../constants/node';

import '../css/Node.css'

interface NodeProps {
    id?: number
    rest?: JSX.IntrinsicElements['mesh']
}

// the args in order passed as an array of numbers to the ringGeometry element
type RingGeometryArgs = [
    innerRadius?: number,
    outerRadius?: number,
    thetaSegments?: number,
    phiSegments?: number,
    thetaStart?: number,
    thetaLength?: number,
]

const Node: FC<NodeProps> = ({
    id,
    rest
}) => {
    const mesh = useRef<THREE.Mesh>(null!)
    const ringRef = useRef<THREE.BufferGeometry>(null!)

    // refer to above interface "RingGeometryArgs" for args to pass
    const ringArgs: RingGeometryArgs = [
        NODE_IN_RADIUS,
        NODE_OUT_RADIUS,
        NODE_SEGMENTS
    ]

    // useEffect(() => {
    //     if (ringRef) {
    //         // console.log('centering ring geometry');
    //         if (id && id % 40 === 0) {
    //             ringRef.current.computeBoundingBox()
    //             ringRef.current.computeBoundingSphere()
    //             console.log('box center: ', ringRef.current.boundingBox?.getCenter);
    //             console.log('sphere center: ', ringRef.current.boundingSphere?.center);
                
    //             // const posArr = ringRef.current.attributes.position.array;

    //             // console.log('position: ',
    //             //     posArr[id]    
    //             // );
    //         }
    //     }
    // }, [ringRef])

    // retrieves the position of the current node mesh relative to the map
    useEffect(() => {
        if (mesh) {
            if (id && id % 40 === 0) {
                const meshVector = new THREE.Vector3()
                meshVector.setFromMatrixPosition(mesh.current.matrixWorld)
                console.log(`mesh coordinates: [${meshVector.x}, ${meshVector.y}]`);
            }
        }
        
    }, [mesh])

    return (
        <mesh {...rest} ref={mesh}>
            {/* functioning test: */}
            {/* <circleGeometry args={[1, 32]} />
            <meshBasicMaterial color="orange" /> */}
            {/* testing circle outline: */}
            <Html>
                <p style={{}}>{id}</p>
            </Html>
            <ringGeometry ref={ringRef} args={ringArgs} />
            <meshBasicMaterial color={OUTLINE_COLOR} side={THREE.FrontSide} />
        </mesh>
    )
}

export default Node
