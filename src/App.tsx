import './scss/app.scss'
import Header from './components/Header'
import Home from './pages/Home'
// import Cart from './pages/Cart'
// import NotFound from './pages/NotFound'
// import FullPizza from './pages/FullPizza'
import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import {
    addItem,
    minusItem,
    addItems,
    clearItems,
    removeItem,
} from './redux/slices/cartSlice'
import { lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { useState, createContext } from 'react'
import MainLayout from './components/MainLayout'
import { useWhyDidYouUpdate } from 'ahooks'

// const AppContext = createContext('')

const Cart = lazy(() => import(/* webpackChunckName: "Cart" */'./pages/Cart')) // Подгрузит тогда, когда это необходимо
const FullPizza = lazy(() => import(/* webpackChunckName: "FullPizza" */'./pages/FullPizza'))
const NotFound = lazy(() => import(/* webpackChunckName: "NotFound" */'./pages/NotFound'))

const App: React.FC = () => {
        // const [searchValue, setSearchValue] = useState('')
        const dispatch = useDispatch()
        const location = useLocation()
        console.log(location)

        useEffect(() => {
            const storage = localStorage.getItem('cart')
            if (storage) {
                dispatch(addItems(JSON.parse(storage)))
            } else {
                localStorage.setItem('cart', JSON.stringify([]))
            }
        }, [])


    
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
                    <Route path="cart" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <Cart />
                        </Suspense>
                    } />
                    <Route path="pizza/:id" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <FullPizza />
                        </Suspense>
                    } />
                    <Route path="*" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <NotFound />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        )
}

// export { AppContext }
export default App
