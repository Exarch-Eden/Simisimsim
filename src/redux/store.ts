import { configureStore } from "@reduxjs/toolkit";

import nodeHUDReducer from './reducers/nodeHUDSlice'

export const store = configureStore({
    reducer: {
        nodeHUD: nodeHUDReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
