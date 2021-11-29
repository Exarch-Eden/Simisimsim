import React, { FC, useRef } from 'react'

import Node from './Node'
import Sector from './Sector'
import { MAP_DIMENSIONS } from '../constants/map'

import '../css/Map.css'
import '../css/Sector.css'

interface MapProps {
    rest?: JSX.IntrinsicElements['mesh']
}

const Map: FC<MapProps> = ({ rest }) => {
    const mesh = useRef<THREE.Mesh>(null!)

    return (
        <mesh {...rest} ref={mesh}>
            <Node />
        </mesh>
    )
}

export default Map
