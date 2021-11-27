import React from 'react'

import { MAP_DIMENSIONS } from '../constants/map'

import '../css/Node.css'

const Node = () => {
    return (
        <div className="Node" style={{
            height: MAP_DIMENSIONS,
            width: MAP_DIMENSIONS,
        }}>
            <p>Node</p>
        </div>
    )
}

export default Node
