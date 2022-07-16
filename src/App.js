import './scss/app.scss'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import {
    addItem,
    minusItem,
    addItems,
    clearItems,
    removeItem,
} from './redux/slices/cartSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useState, createContext } from 'react'

const AppContext = createContext('')

function App() {
    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch()

    if (localStorage.getItem('cart')) {
        dispatch(addItems(JSON.parse(localStorage.getItem('cart'))))
    } else {
        localStorage.setItem('cart', JSON.stringify([]))
    }

    return (
        <div className="wrapper">
            <AppContext.Provider value={{ searchValue, setSearchValue }}>
                <Header
                // searchValue={searchValue}
                // setSearchValue={setSearchValue}
                />
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </AppContext.Provider>
        </div>
    )
}

export { AppContext }
export default App
