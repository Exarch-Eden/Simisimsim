import React from 'react'

import Node from './Node'
import Sector from './Sector'
import { MAP_DIMENSIONS } from '../constants/map'

import '../css/Map.css'
import '../css/Sector.css'

const Map = () => {
    const generateNodes = () => {

    }

    const renderSectors = () => {
        const numSectors = MAP_DIMENSIONS * MAP_DIMENSIONS;
        const sectors = []
        const sectorRows = []

        // assumes MAP_DIMENSIONS constant is always even
        // may add even check later

        for (let i = 0; i < numSectors; i++) {
            console.log('i: ', i);
            
            sectors.push(
                <Sector>
                    {i}
                    {/* {(i + 1) % 8 === 0 ? i + 1 : null} */}
                    {renderNodes(4)}
                </Sector>
            )
        }

        for (let i = 0; i < numSectors; i += MAP_DIMENSIONS) {
            sectorRows.push(
                <div className="SectorRow">
                    {sectors.slice(i, i + MAP_DIMENSIONS)}
                </div>
            )
        }

        return sectorRows;
    }

    const renderNodes = (numNodes: number) => {
        const nodes = []

        for (let i = 0; i < numNodes; i++) {
            nodes.push(
                <Node key={i} />
            )
        }

        return nodes;
    }

    return (
        <div className="Map">
            {/* {renderNodes()} */}
            {renderSectors()}
        </div>
    )
}

export default Map
