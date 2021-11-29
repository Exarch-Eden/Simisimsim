import React, { FC, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from "@react-three/fiber";
import { Circle } from '@react-three/drei';

import { MAP_DIMENSIONS } from '../constants/map'

import '../css/Node.css'

interface NodeProps {
    rest?: JSX.IntrinsicElements['mesh']
}

const Node: FC<NodeProps> = ({
    rest
}) => {
    const mesh = useRef<THREE.Mesh>(null!)

    return (
        <mesh {...rest} ref={mesh}>
            {/* <planeGeometry attach="geometry" args={} /> */}
            <circleGeometry args={[1, 32]} />
            <meshBasicMaterial color="orange" />
            {/* <Circle>
                <meshBasicMaterial color="orange" />
            </Circle> */}
                {/* <meshStandardMaterial color="black" /> */}
        </mesh>
    )
}

export default Node
