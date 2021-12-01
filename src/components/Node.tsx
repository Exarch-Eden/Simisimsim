import { Vector3 } from '@react-three/fiber';
import React, { FC, useRef } from 'react'
import * as THREE from 'three'

import { OUTLINE_COLOR } from '../constants/colors';
import { NODE_IN_RADIUS, NODE_OUT_RADIUS, NODE_SEGMENTS } from '../constants/node';

import '../css/Node.css'

interface NodeProps {
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
    rest
}) => {
    const mesh = useRef<THREE.Mesh>(null!)

    // refer to above interface "RingGeometryArgs" for args to pass
    const ringArgs: RingGeometryArgs = [
        NODE_IN_RADIUS,
        NODE_OUT_RADIUS,
        NODE_SEGMENTS
    ]

    return (
        <mesh {...rest} ref={mesh}>
            {/* functioning test: */}
            {/* <circleGeometry args={[1, 32]} />
            <meshBasicMaterial color="orange" /> */}
            {/* testing circle outline: */}
            <ringGeometry args={ringArgs} />
            <meshBasicMaterial color={OUTLINE_COLOR} side={THREE.FrontSide} />
        </mesh>
    )
}

export default Node
