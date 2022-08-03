import './scss/app.scss'
import Home from './pages/Home'
import { Routes, Route, useLocation } from 'react-router-dom'
import {
    addItems
} from './redux/slices/cartSlice'
import { lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MainLayout from './components/MainLayout'

const Cart = lazy(() => import(/* webpackChunckName: "Cart" */'./pages/Cart'))
const FullPizza = lazy(() => import(/* webpackChunckName: "FullPizza" */'./pages/FullPizza'))
const NotFound = lazy(() => import(/* webpackChunckName: "NotFound" */'./pages/NotFound'))

const App: React.FC = () => {
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

export default App
