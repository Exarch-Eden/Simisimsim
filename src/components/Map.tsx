import React, { FC, useRef } from 'react'

import Node from './Node'
import Sector from './Sector'
import { MAP_DIMENSIONS, MAX_NODES, MIN_NODES } from '../constants/map'

import '../css/Map.css'
import '../css/Sector.css'
import { Vector3 } from '@react-three/fiber'

interface MapProps {
    rest?: JSX.IntrinsicElements['mesh']
}

const Map: FC<MapProps> = ({ rest }) => {
    const mesh = useRef<THREE.Mesh>(null!)

    // Math.floor(Math.random() * (MAX_ACTIVITIES_TIMER - MIN_ACTIVITIES_TIMER + 1) + MIN_ACTIVITIES_TIMER);
    const generateNodes = () => {
        const nodes = []
        // the randomly-generated number of nodes the map will have
        const randNum = Math.floor(Math.random() * (MAX_NODES - MIN_NODES + 1) + MIN_NODES)
        console.log('randNum: ', randNum);

        for (let i = 0; i < randNum; i++) {
            // randomly-generated values in a vector array
            const randLoc = generateNodeLocation()

            if (i % 40 === 0) {
                console.log('randLoc: ', randLoc);
            }
            
            const position: {
                position: Vector3
            } = { position: randLoc }

            nodes.push(
                <Node key={i} rest={position} />
            )
        }

        return nodes;
    }

    const generateNodeLocation = (): Vector3 => {
        // TODO: prevent a node from having the same location (within 11 + 5 buffer)
        // TODO: also implement check to kill node generation loop if it cannot find
        // any suitable locations for new nodes anymore

        return [Math.random() * (MAP_DIMENSIONS + 1), Math.random() * (MAP_DIMENSIONS + 1), 0]
    }

    return (
        <mesh {...rest} ref={mesh}>
            {/* <Node /> */}
            {generateNodes()}
        </mesh>
    )
}

export default Map
