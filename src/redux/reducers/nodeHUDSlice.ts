import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NodeData } from "../../types/node"
import { RootState } from "../store"

export interface NodeHUDState {
    data: NodeData,
    onHover: boolean
}

const initialState: NodeHUDState = {
    data: {
        id: -1,
        x: 0,
        y: 0
    },
    onHover: false
}

export const nodeHUDSlice = createSlice({
    name: 'nodeHUD',
    initialState,
    reducers: {
        setNodeHUDData: (state, action: PayloadAction<NodeData>) => {
            state.data = action.payload
        },
        setNodeHUDOnHover: (state, action: PayloadAction<boolean>) => {
            state.onHover = action.payload
        }
    }
})

// export setters here
export const { setNodeHUDData, setNodeHUDOnHover } = nodeHUDSlice.actions

// export selectors here
export const selectNodeHUDData = (state: RootState) => state.nodeHUD.data
export const selectNodeHUDOnHover = (state: RootState) => state.nodeHUD.onHover

export default nodeHUDSlice.reducer
