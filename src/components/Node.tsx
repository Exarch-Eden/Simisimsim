import React, { FC, useEffect, useRef, useState } from 'react'
import { Html } from '@react-three/drei';
import { useFrame, useThree, Vector3 } from '@react-three/fiber';
import * as THREE from 'three'
import { Font, FontLoader } from 'three';

import { OUTLINE_COLOR } from '../constants/colors';
import { NODE_FONT_URL, NODE_IN_RADIUS, NODE_OUT_RADIUS, NODE_SEGMENTS } from '../constants/node';

import '../css/Node.css'

interface NodeProps {
    id?: number
    rest?: JSX.IntrinsicElements['mesh']
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

const Node: FC<NodeProps> = ({
    id,
    rest
}) => {
    const ringMeshRef = useRef<THREE.Mesh>(null!)
    const textMeshRef = useRef<THREE.Mesh>(null!)
    const groupRef = useRef<JSX.IntrinsicElements>(null!)
    const [ringVector, setRingVector] = useState<[x: number, y: number]>([0, 0])

    const [ringColor, setRingColor] = useState(OUTLINE_COLOR)

    const [font, setFont] = useState<Font>()

    useEffect(() => {
        const fontLoader = new FontLoader()

        fontLoader.load(NODE_FONT_URL, (font) => {
            setFont(font)
        })


    }, [])


    // refer to above interface "RingGeometryArgs" for args to pass
    const ringArgs: RingGeometryArgs = [
        NODE_IN_RADIUS,
        NODE_OUT_RADIUS,
        NODE_SEGMENTS
    ]

    const calcMiddle = (boundBox: any) => {
        if (!boundBox) return;

        return [(boundBox?.max.x + boundBox?.min.x) / 2, boundBox?.min.y]
    }

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

        if (ringMeshRef && textMeshRef) {
            // const offset = textMeshRef.current.geometry.center()

            // offset.computeBoundingBox()
            // const boundMax = offset.boundingBox?.max
            // const boundMin = offset.boundingBox?.min
            // // console.log('boundMax: ', boundMax);
            // // console.log('boundMin: ', boundMin);


            // if (boundMax && boundMin) {
            //     const centerVector = new THREE.Vector3(
            //         boundMax.x,
            //         boundMax.y,
            //         0
            //     )

            //     // console.log('offsetvector: ', centerVector.toArray());

            //     textMeshRef.current.geometry.translate(-centerVector.x, -centerVector.y, 0)
            // }


            // textMeshRef.current.geometry.translate(offset.x, offset.y, 0)
            if (id && id % 40 === 0) {
                // console.log('offset: ', offset.attributes.position.array);


                // textMeshRef.current.geometry.computeBoundingBox()
                // const boundBox = textMeshRef.current.geometry.boundingBox;
                // // ringMeshRef.current.geometry.center()
                // const calcBox = calcMiddle(boundBox);
                // console.log('box get center: ', boundBox?.getCenter)
                // console.log('middle x: ', calcBox ? calcBox[0] : null);
                // console.log('middle y: ', calcBox ? calcBox[1] : null);

                // textMeshRef.current.position.set()
            }
        }

    }, [ringMeshRef, textMeshRef])

    const onMouseOver = () => {
        setRingColor('#8420c7')
        console.log('onpointerenter: ', id);
    }

    const onPointerLeave = () => {
        setRingColor(OUTLINE_COLOR)
        console.log('onpointerout: ', id);
    }

    // useFrame((state) => {
    //     if (Math.abs((Math.abs(ringVector[0]) - Math.abs(state.mouse.x))) <= NODE_OUT_RADIUS
    //         && Math.abs(Math.abs(ringVector[1]) - Math.abs(state.mouse.y)) <= NODE_OUT_RADIUS
    //     ) {
    //         console.log('intersecting with node: ', id);
    //     }
    // })

    // TODO: center the id text (such that it is inside the ring)
    return (
        <group ref={groupRef}>
            <mesh {...rest}  onPointerOver={onMouseOver} onPointerLeave={onPointerLeave}>
                <circleGeometry args={[11, 32]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <mesh {...rest} ref={ringMeshRef}>
                {/* functioning test: */}
                {/* <circleGeometry args={[1, 32]} />
            <meshBasicMaterial color="orange" /> */}
                {/* testing circle outline: */}
                <ringGeometry args={ringArgs} />

                <meshBasicMaterial color={ringColor} side={THREE.FrontSide} />
            </mesh>
            <mesh {...rest} ref={textMeshRef}>
                {
                    font
                        ? (
                            <>
                                <textGeometry args={[`${id}`, { font: font, size: 8, height: 1 }]} />
                                <meshBasicMaterial color={OUTLINE_COLOR} side={THREE.FrontSide} />
                            </>
                        )
                        : null
                }
            </mesh>
        </group>

    )
}

export default Node
