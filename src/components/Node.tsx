import React, { FC, useEffect, useRef, useState } from 'react'
import { Html } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import * as THREE from 'three'
import { Font, FontLoader } from 'three';

import { OUTLINE_COLOR } from '../constants/colors';
import { NODE_FONT_URL, NODE_IN_RADIUS, NODE_OUT_RADIUS, NODE_SEGMENTS } from '../constants/node';

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
    const [font, setFont] = useState<Font>()

    useEffect(() => {
        const fontLoader = new FontLoader()

        fontLoader.load(NODE_FONT_URL, (font) => {
            console.log('font: \n', font);

            setFont(font)
        })

    }, [])


    // refer to above interface "RingGeometryArgs" for args to pass
    const ringArgs: RingGeometryArgs = [
        NODE_IN_RADIUS,
        NODE_OUT_RADIUS,
        NODE_SEGMENTS
    ]

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

    // TODO: center the id text (such that it is inside the ring)
    return (
        <group>
            <mesh {...rest} ref={mesh}>
                {/* functioning test: */}
                {/* <circleGeometry args={[1, 32]} />
            <meshBasicMaterial color="orange" /> */}
                {/* testing circle outline: */}
                <ringGeometry ref={ringRef} args={ringArgs} />
                <meshBasicMaterial color={OUTLINE_COLOR} side={THREE.FrontSide} />
            </mesh>
            <mesh>
                {
                    font
                        ? (
                            <>
                                <textGeometry args={['Test', { font: font, size: 8 }]} />
                                <meshBasicMaterial color={OUTLINE_COLOR} side={THREE.FrontSide} />
                            </>
                        )
                        : null
                }
            </mesh>
        </group>

    )
}

export default Node
