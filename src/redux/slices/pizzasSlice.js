import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    items: [],
    loadingPizzas: true,
    errorPizzas: false,
    errorMessage: '',
}

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (params) => {
        const { categories, sort, order, search, currentPage } = params
        const { data } = await axios.get(
            `https://62c875e00f32635590d909c9.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sort}&order=${order}${search}`
        )
        return data
    }
)

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.loadingPizzas = true
            state.errorPizzas = false
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.loadingPizzas = false
            console.log(action.payload)
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.errorPizzas = true
            state.loadingPizzas = false
            state.errorMessage = action.error.message
        },
    },
})

const { actions, reducer } = pizzasSlice

export const { setItems } = actions

export default reducer
