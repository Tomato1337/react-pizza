import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sortType: 0,
    sortTypeActive: false,
    sortOrder: true,
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setSortType: (state, action) => {
            state.sortType = action.payload
        },
        setSortTypeActive: (state, action) => {
            state.sortTypeActive = action.payload
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload
        },
    },
})

const { actions, reducer } = filterSlice

export const { setCategoryId, setSortType, setSortTypeActive, setSortOrder } =
    actions

export default reducer
