import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface FilterSliceState {
    categoryId: number
    sortType: number
    sortTypeActive?: boolean
    sortOrder: boolean
    currentPage: number
    searchText: string
}

const initialState: FilterSliceState = {
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
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSortType: (state, action: PayloadAction<number>) => {
            state.sortType = action.payload
        },
        setSortTypeActive: (state, action: PayloadAction<boolean>) => {
            state.sortTypeActive = action.payload
        },
        setSortOrder: (state, action: PayloadAction<boolean>) => {
            state.sortOrder = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.currentPage = action.payload.currentPage
            state.sortOrder = action.payload.sortOrder
            state.categoryId = action.payload.categoryId
            state.sortType = action.payload.sortType
            state.searchText = action.payload.searchText
        },
    },
})

const { actions, reducer } = filterSlice

export const selectSort = (state: RootState) => state.filter.sortType

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
