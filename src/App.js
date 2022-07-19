import './scss/app.scss'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import FullPizza from './pages/FullPizza'
import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
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
import MainLayout from './components/Layaouts/MainLayout'

const AppContext = createContext('')

function App() {
    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    console.log(location)

    if (localStorage.getItem('cart')) {
        dispatch(addItems(JSON.parse(localStorage.getItem('cart'))))
    } else {
        localStorage.setItem('cart', JSON.stringify([]))
    }

    // return (
    //     <div className="wrapper">
    //         <AppContext.Provider value={{ searchValue, setSearchValue }}>
    //             <Header
    //             // searchValue={searchValue}
    //             // setSearchValue={setSearchValue}
    //             />
    //             <div className="content">
    //                 <div className="container">
    //                     <Routes>
    //                         <Route path="/" element={<Home />} />
    //                         <Route path="/cart" element={<Cart />} />
    //                         <Route path="/pizza/:id" element={<FullPizza />} />
    //                         <Route path="*" element={<NotFound />} />
    //                     </Routes>
    //                 </div>
    //             </div>
    //         </AppContext.Provider>
    //     </div>
    // )

    // function Parent({ children }) {
    //     return (
    //         <>
    //             {/* <h1>Заголовоок</h1>
    //             {children}
    //             <h3>235423</h3> */}
    //             <h1>Заголовоок</h1>
    //             <Outlet/>
    //             <h3>235423</h3>
    //         </>
    //     )
    // }

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="pizza/:id" element={<FullPizza />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export { AppContext }
export default App
