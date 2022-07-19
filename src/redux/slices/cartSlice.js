import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            )
            // const findItemByLocalStorage = JSON.parse(localStorage.getItem('cart')).find(obj => obj.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce(
                (sum, obj) => sum + obj.price * obj.count,
                0
            )
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        minusItem: (state, action) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            )

            if (findItem.count > 1) {
                findItem.count--
            }
            state.totalPrice = state.items.reduce(
                (sum, obj) => sum + obj.price * obj.count,
                0
            )
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            )
            state.totalPrice = state.items.reduce(
                (sum, obj) => sum + obj.price * obj.count,
                0
            )
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        addItems: (state, action) => {
            state.items = action.payload
            state.totalPrice = state.items.reduce(
                (sum, obj) => sum + obj.price * obj.count,
                0
            )
        },
    },
})

const { actions, reducer } = cartSlice

export const selectCart = (state) => state.cart

export const { addItem, removeItem, clearItems, minusItem, addItems } = actions

export default reducer
