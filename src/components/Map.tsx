import React, { FC, useEffect, useRef, useState } from 'react'
import { Vector3 } from '@react-three/fiber'

import Node from './Node'
import { MAP_HEIGHT, MAP_WIDTH, MAX_NODES, MIN_NODES } from '../constants/map'

import '../css/Map.css'
import '../css/Sector.css'
import { MeshProps, Position, Vector3Arr } from '../types/generic'
import { NodeData } from '../types/node'

interface MapProps extends MeshProps {}

type CoordType = 'x' | 'y' | 'z'

const Map: FC<MapProps> = ({ rest }) => {
    const mesh = useRef<THREE.Mesh>(null!)
    // holds the Node elements
    const [nodes, setNodes] = useState<JSX.Element[]>([])
    // holds the Node elements' data
    const [nodeData, setNodeData] = useState<NodeData[]>([])

    // Math.floor(Math.random() * (MAX_ACTIVITIES_TIMER - MIN_ACTIVITIES_TIMER + 1) + MIN_ACTIVITIES_TIMER);
    const generateNodes = () => {
        const localNodes: JSX.Element[] = []
        const localNodeData: NodeData[] = []

        // the randomly-generated number of nodes the map will have
        const randNum = Math.floor(Math.random() * (MAX_NODES - MIN_NODES + 1) + MIN_NODES)
        console.log('randNum: ', randNum);

        for (let i = 0; i < randNum; i++) {
            // randomly-generated values in a vector array
            const randLoc = generateNodeLocation()

            // for testing purposes
            if (i % 40 === 0) {
                console.log('randLoc: ', randLoc);
            }
            
            const position: Position = { position: randLoc }

            localNodes.push(
                <Node key={i} id={i} x={randLoc[0]} y={randLoc[1]} rest={position} />
            )

            localNodeData.push({
                id: i,
                x: randLoc[0],
                y: randLoc[1]
            })
        }

        setNodes(localNodes)
        setNodeData(localNodeData)

        return localNodes;
    }

    const generateNodeLocation = (): Vector3Arr => {
        // TODO: prevent a node from having the same location (within 11 + 5 buffer)
        // TODO: also implement check to kill node generation loop if it cannot find
        // any suitable locations for new nodes anymore

        return [getRandomCoordinate('x'), getRandomCoordinate('y'), 1]
    }

    const getRandomCoordinate = (coordType: CoordType) => {
        const isPositive = Math.round(Math.random())
        
        let coordRange = 1
        switch (coordType) {
            case 'x':
                coordRange = MAP_WIDTH
                break
            case 'y':
                coordRange = MAP_HEIGHT
                break
        }

        console.log(`coordRange (${coordType}): `, coordRange);
        

        return Math.random() * (coordRange + 1) * (isPositive ? 1 : -1);
    }

    useEffect(() => {
        generateNodes()
    }, [])

    // for testing purposes
    useEffect(() => {
        console.table(nodeData.slice(0, MIN_NODES));
    }, [nodeData])

    return (
        <mesh {...rest} ref={mesh}>
            {nodes}
        </mesh>
    )
}

export default Map
