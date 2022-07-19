import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sortType: 0,
    sortTypeActive: false,
    sortOrder: true,
    currentPage: 1,
    searchText: '',
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
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setFilters: (state, action) => {
            state.currentPage = parseInt(action.payload.page)
            state.sortOrder = JSON.parse(action.payload.order)
            state.categoryId = parseInt(action.payload.category)
            state.sortType = parseInt(action.payload.sortBy)
            state.searchText = action.payload.search
        },
    },
})

const { actions, reducer } = filterSlice

export const selectSort = (state) => state.filter.sortType

export const {
    setCategoryId,
    setSortType,
    setSortTypeActive,
    setSortOrder,
    setCurrentPage,
    setFilters,
    setSearchText,
} = actions

export default reducer
