import React from 'react'

import Node from './Node'
import { MAP_DIMENSIONS } from '../constants/map'

import '../css/Map.css'

const Map = () => {
    const renderNodes = () => {
        const nodes = []
        for (let i = 0; i < MAP_DIMENSIONS; i++) {
            nodes.push(
                <Node key={i} />
            )
        }

        return nodes;
    }

    return (
        <div className="Map">
            {renderNodes()}
        </div>
    )
}

export default Map
