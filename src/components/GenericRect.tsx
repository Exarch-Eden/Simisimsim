import React, { FC, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OUTLINE_COLOR } from '../constants/colors'

import { MeshProps } from '../types/generic'

interface GenericRectProps extends MeshProps {
    width?: number,
    height?: number
}

const GenericRect: FC<GenericRectProps> = ({ width, height, rest }) => {
    const meshRef = useRef<THREE.Mesh>(null!)

    useEffect(() => {
        // if (meshRef && meshRef.current) {
        //     console.log('updating center');
        //     meshRef.current.geometry.center()
        //     meshRef.current.updateMatrixWorld()
        // }
    })

    return (
        <mesh {...rest} ref={meshRef}>
            <planeGeometry args={[width || 100, height || 100]} />
            <meshBasicMaterial color='white' side={THREE.FrontSide} />
        </mesh>
    )
}

export default GenericRect
