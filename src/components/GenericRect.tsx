import React, { FC, useRef } from 'react'
import * as THREE from 'three'
import { OUTLINE_COLOR } from '../constants/colors'

import { MeshProps } from '../types/generic'

interface GenericRectProps extends MeshProps {

}

const GenericRect: FC<GenericRectProps> = ({ rest }) => {
    const meshRef = useRef<THREE.Mesh>(null!)

    return (
        <mesh {...rest} ref={meshRef}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color='white' side={THREE.FrontSide} />
        </mesh>
    )
}

export default GenericRect
