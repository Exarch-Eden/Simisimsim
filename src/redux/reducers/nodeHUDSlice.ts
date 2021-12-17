import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NodeData } from "../../types/node"
import { RootState } from "../store"

export interface NodeHUDState {
    data: NodeData
}

const initialState: NodeHUDState = {
    data: {
        id: -1,
        x: 0,
        y: 0
    }
}

export const nodeHUDSlice = createSlice({
    name: 'nodeHUD',
    initialState,
    reducers: {
        setNodeHUDData: (state, action: PayloadAction<NodeData>) => {
            state.data = action.payload
        }
    }
})

export const { setNodeHUDData } = nodeHUDSlice.actions

export const selectNodeHUDData = (state: RootState) => state.nodeHUD.data

export default nodeHUDSlice.reducer
