import React, { FC, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader, Vector3 } from "@react-three/fiber";
import { Circle, Line } from '@react-three/drei';

import { MAP_DIMENSIONS } from '../constants/map'

import '../css/Node.css'

interface NodeProps {
    rest?: JSX.IntrinsicElements['mesh']
}

const OUTLINE_COLOR = '#1f1c1f'

const Node: FC<NodeProps> = ({
    rest
}) => {
    const mesh = useRef<THREE.Mesh>(null!)
    
    return (
        <mesh {...rest} ref={mesh}>
            {/* functioning test: */}
            {/* <circleGeometry args={[1, 32]} />
            <meshBasicMaterial color="orange" /> */}
            {/* testing circle outline: */}
            <ringGeometry args={[1, 1.1, 32]} />
            <meshBasicMaterial color={OUTLINE_COLOR} side={THREE.FrontSide} />
        </mesh>
    )
}

export default Node
