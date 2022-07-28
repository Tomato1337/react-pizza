import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type PizzaItems = {
    id: number
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    price: number
    category: number
    rating: number
}

// enum Status {
//     LOADING = 'loading',
//     ERRROR = 'error',
//     SUCCESS = 'success'
// }

interface PizzaSliceState {
    items: PizzaItems[]
    loadingPizzas: boolean
    errorPizzas: boolean
    errorMessage: string
    // status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    loadingPizzas: true,
    errorPizzas: false,
    errorMessage: '',
    // status: Status.LOADING
}
//                            key      value
type FetchPizzasArgs = Record<string, string>

export const fetchPizzas = createAsyncThunk<PizzaItems[], FetchPizzasArgs>(
    'pizzas/fetchPizzas',
    async (params: FetchPizzasArgs, thunkApi) => {
        const { categories, sort, order, search, currentPage } = params
        const { data } = await axios.get<PizzaItems[]>(
            `https://62c875e00f32635590d909c9.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sort}&order=${order}${search}`
        )

        // console.log(thunkApi) // signal остановить запрос

        // if (data.length === 0) {
        //     return thunkApi.rejectWithValue('Not found')
        // }

        // return thunkApi.fulfillWithValue(data)

        return data //as PizzaItems[]
    }
)

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<PizzaItems[]>) => {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.loadingPizzas = true
            state.errorPizzas = false
            state.items = []
        })

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            console.log('fulfiled', action)
            state.items = action.payload
            state.loadingPizzas = false
            console.log(action.payload)
        })

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            console.log('rejected', action)
            state.errorPizzas = true
            state.loadingPizzas = false
            state.errorMessage = action.error.message || ''
        })
    }
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.loadingPizzas = true
    //         state.errorPizzas = false
    //         state.items = []
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         console.log('fulfiled', action)
    //         state.items = action.payload
    //         state.loadingPizzas = false
    //         console.log(action.payload)
    //     },
    //     [fetchPizzas.rejected]: (state, action) => {
    //         console.log('rejected', action)
    //         state.errorPizzas = true
    //         state.loadingPizzas = false
    //         state.errorMessage = action.error.message
    //     },
    // },
})

const { actions, reducer } = pizzasSlice

export const { setItems } = actions

export default reducer
