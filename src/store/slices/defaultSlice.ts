import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type initialStatePropsType={
    value:boolean
}

const initialState:initialStatePropsType = {value:false}

export const defaultSlice = createSlice({
    name: 'default',
    initialState,
    reducers: {
        setDefault:(state,{payload}:PayloadAction<boolean>)=>{
            state.value=payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setDefault} = defaultSlice.actions

export default defaultSlice.reducer