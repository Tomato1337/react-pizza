import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItem = {
    id: number
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
}

interface CartSliceState {
    totalPrice: number
    items: CartItem[]
}

const initialState: CartSliceState = {
    items: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            )

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
        },
        minusItem: (state, action: PayloadAction<CartItem>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            )

            if (findItem && findItem.count > 1) {
                findItem.count--
            }
            state.totalPrice = state.items.reduce(
                (sum, obj) => sum + obj.price * obj.count,
                0
            )
        },
        removeItem: (state, action: PayloadAction<CartItem>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            )
            state.totalPrice = state.items.reduce(
                (sum, obj) => sum + obj.price * obj.count,
                0
            )
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        },
        addItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload
            state.totalPrice = state.items.reduce(
                (sum, obj) => sum + obj.price * obj.count,
                0
            )
        },
    },
})

const { actions, reducer } = cartSlice

export const selectCart = (state: RootState) => state.cart

export const { addItem, removeItem, clearItems, minusItem, addItems } = actions

export default reducer
