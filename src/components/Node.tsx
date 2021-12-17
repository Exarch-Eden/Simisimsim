import React, { FC, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Font, FontLoader } from 'three';

import { OUTLINE_COLOR } from '../constants/colors';
import { useAppDispatch } from '../redux/hooks';
import { setNodeHUDData, setNodeHUDOnHover } from '../redux/reducers/nodeHUDSlice';
import { NODE_CIRC_RADIUS, NODE_CIRC_SEGMENTS, NODE_FONT_URL, NODE_IN_RADIUS, NODE_OUT_RADIUS, NODE_SEGMENTS } from '../constants/node';
import { MeshProps } from '../types/generic';
import GenericRect from './GenericRect';

import '../css/Node.css'

interface NodeProps extends MeshProps {
    id: number,
    x: number,
    y: number
}

// the args in order passed as an array of numbers to the ringGeometry element
type RingGeometryArgs = [
    innerRadius?: number,
    outerRadius?: number,
    thetaSegments?: number,
    phiSegments?: number,
    thetaStart?: number,
    thetaLength?: number,
]

// args passed as an array to the circleGeometry element
type CircleGeometryArgs = [
    radius?: number,
    segments?: number,
    thetaStart?: number,
    thetaLength?: number,
]

// refer to above interface "RingGeometryArgs" for args to pass
const ringArgs: RingGeometryArgs = [
    NODE_IN_RADIUS,
    NODE_OUT_RADIUS,
    NODE_SEGMENTS
]

// refer to above interface "CircleGeometryArgs" for args to pass
const circleArgs: CircleGeometryArgs = [
    NODE_CIRC_RADIUS,
    NODE_CIRC_SEGMENTS
]

const Node: FC<NodeProps> = ({
    id,
    x,
    y,
    rest
}) => {
    const ringMeshRef = useRef<THREE.Mesh>(null!)
    const textMeshRef = useRef<THREE.Mesh>(null!)
    const groupRef = useRef<JSX.IntrinsicElements>(null!)
    const [ringVector, setRingVector] = useState<[x: number, y: number]>([0, 0])

    const [ringColor, setRingColor] = useState(OUTLINE_COLOR)
    const [onHover, setOnHover] = useState(false)
    const dispatch = useAppDispatch()

    const [font, setFont] = useState<Font>()

    useEffect(() => {
        const fontLoader = new FontLoader()

        fontLoader.load(NODE_FONT_URL, (font) => {
            setFont(font)
        })


    }, [])

    useEffect(() => {
        if (ringMeshRef) {
            const newVec = new THREE.Vector3()
            newVec.setFromMatrixPosition(ringMeshRef.current.matrixWorld)
            setRingVector([newVec.x, newVec.y])
        }
    }, [ringMeshRef])

    // retrieves the position of the current node mesh relative to the map
    useEffect(() => {
        if (ringMeshRef) {
            if (id && id % 40 === 0) {
                const meshVector = new THREE.Vector3()
                meshVector.setFromMatrixPosition(ringMeshRef.current.matrixWorld)
                console.log(`mesh coordinates: [${meshVector.x}, ${meshVector.y}]`);
            }
        }
    }, [ringMeshRef, textMeshRef])

    const onMouseOver = () => {
        setRingColor('#8420c7')
        setOnHover(true)
        console.log('onpointerenter: ', id);
        dispatch(setNodeHUDData({ id, x, y }))
        dispatch(setNodeHUDOnHover(true))
    }

    const onPointerLeave = () => {
        setRingColor(OUTLINE_COLOR)
        setOnHover(false)
        dispatch(setNodeHUDOnHover(false))
        console.log('onpointerout: ', id);
    }

    // TODO: center the id text (such that it is inside the ring)
    return (
        <group ref={groupRef}>
            {/* Used to detect mouse pointer on hover */}
            <mesh {...rest} onPointerOver={onMouseOver} onPointerLeave={onPointerLeave}>
                <circleGeometry args={circleArgs} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <mesh {...rest} ref={ringMeshRef}>
                <ringGeometry args={ringArgs} />
                <meshBasicMaterial color={ringColor} side={THREE.FrontSide} />
            </mesh>
            <mesh {...rest} ref={textMeshRef}>
                {
                    font
                        ? (<>
                            <textGeometry args={[`${id}`, { font: font, size: 8, height: 1 }]} />
                            <meshBasicMaterial color={OUTLINE_COLOR} side={THREE.FrontSide} />
                        </>)
                        : null
                }
            </mesh>
            {/* {
                onHover
                    ? <GenericRect rest={rest} />
                    : null
            } */}
        </group>

    )
}

export default Node
