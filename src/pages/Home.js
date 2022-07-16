import { useHttp } from '../hooks/http.hook'
import Skeleton from '../components/Skeleton/Skeleton'
import { nanoid } from 'nanoid'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Categories from '../components/Categories/Categories'
import Sort from '../components/Sort/Sort'
import { useEffect, useState, useContext, useRef } from 'react'
import Pagination from '../components/Pagination/Pagination'
import { AppContext } from '../App'
import { useSelector } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import {
    setCurrentPage,
    setSortType,
    setSortOrder,
    setCategoryId,
    setFilters,
} from '../redux/slices/filterSlice'
import { setItems, fetchPizzas } from '../redux/slices/pizzasSlice'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const { searchValue } = useContext(AppContext)
    // const [pizzas, setPizzas] = useState([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(false)
    // const [categoryId, setCategoryId] = useState(0)
    // const [orderType, setOrderType] = useState(true)
    const categoryId = useSelector((state) => state.filter.categoryId)
    const sortType = useSelector((state) => state.filter.sortType)
    const orderType = useSelector((state) => state.filter.sortOrder)
    const currentPage = useSelector((state) => state.filter.currentPage)
    const searchValue = useSelector((state) => state.filter.searchText)
    const pizzas = useSelector((state) => state.pizzas.items)
    const loading = useSelector((state) => state.pizzas.loadingPizzas)
    const error = useSelector((state) => state.pizzas.errorPizzas)
    const errorMessage = useSelector((state) => state.pizzas.errorMessage)
    // const [sortType, setSortType] = useState(0)
    // const [currentPage, setCurrentPage] = useState(1)

    // useEffect(() => {
    //     dispatch(setCurrentPage(searchParams.get('page')))
    //     dispatch(setSortType(searchParams.get('sortBy')))
    //     dispatch(setSortOrder(searchParams.get('order')))
    //     dispatch(setCategoryId(searchParams.get('category')))
    // }, [searchParams.get('page')])

    // const { request } = useHttp()
    const sortNames = ['rating', 'price', 'title']
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            console.log(params)
            dispatch(setFilters(params))
            isSearch.current = true
        } //TODO:Допилить localStorage
        // else if (localStorage.length > 0) {
        //     const obj = {
        //         category: localStorage.getItem('category'),
        //         order: localStorage.getItem('order'),
        //         page: localStorage.getItem('page'),
        //         search: localStorage.getItem('search'),
        //         sortBy: localStorage.getItem('sortBy'),
        //     }
        //     dispatch(setFilters(obj))
        //     isSearch.current = true
        // } else {
        //     localStorage.setItem('category', categoryId)
        //     localStorage.setItem('order', orderType)
        //     localStorage.setItem('page', currentPage)
        //     localStorage.setItem('search', searchValue)
        //     localStorage.setItem('sortBy', sortType)
        // }
    }, [])

    useEffect(() => {
        if (categoryId === 0) {
            navigate('')
        } else {
            if (isMounted.current) {
                const queryString = qs.stringify({
                    sortBy: sortType,
                    category: categoryId,
                    page: currentPage,
                    order: orderType,
                    search: searchValue,
                })
                navigate(`?${queryString}`)

                //TODO: localStorage.setItem('category', categoryId)
                // localStorage.setItem('order', orderType)
                // localStorage.setItem('page', currentPage)
                // localStorage.setItem('search', searchValue)
                // localStorage.setItem('sortBy', sortType)
            }
        }

        console.log('render')
        isMounted.current = true
        // console.log(queryString)
    }, [categoryId, sortType, orderType, searchValue, currentPage])

    useEffect(() => {
        if (!isSearch.current) {
            // setLoading(true)
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sortType, orderType, searchValue, currentPage])

    const getPizzas = async () => {
        const categories = categoryId === 0 ? '' : `category=${categoryId}`
        const sort = sortNames[parseInt(sortType)]
        const order = orderType ? 'asc' : 'desc'
        const search = searchValue
            ? `&search=${searchValue.toLowerCase().replace(/\s/gi, '')}`
            : ''
        console.log(categories, sort, order, search)
        dispatch(
            fetchPizzas({
                categories,
                sort,
                order,
                search,
                currentPage,
            })
        )

        // try {
        //     // const { data } = await axios.get(
        //     //     `https://62c875e00f32635590d909c9.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sort}&order=${order}${search}`
        //     //

        //     // updatePizzas(data)
        // } catch (err) {
        //     updatePizzasError()
        //     throw new Error(err)
        // }
    }

    // const updatePizzas = (item) => {
    //     setLoading(false)
    //     setError(false)
    //     dispatch(setItems(item))
    // }

    // const updatePizzasError = () => {
    //     setError(true)
    //     setLoading(false)
    // }

    const skeleton = [...new Array(4)].map((obj) => {
        return <Skeleton key={nanoid()} />
    })

    const pizzasBlock = pizzas
        // .filter((item) =>
        //     item.title
        //         .toLowerCase()
        //         .replace(/\s/gi, '')
        //         .includes(searchValue.toLowerCase().replace(/\s/gi, ''))
        // )
        .map((obj) => {
            return (
                <PizzaBlock
                    key={obj.id}
                    {...obj}
                    // price={price}
                    // title={title}
                    // category={category}
                    // imageUrl={imageUrl}
                    // sizes={sizes}
                    // types={types}
                />
            )
        })

    const pizzaBlocks = loading ? skeleton : pizzasBlock

    const errorBlock =
        !loading && error ? (
            <div className="error_block">
                <img
                    src="https://cdn4.iconfinder.com/data/icons/symbol-blue-set-1/100/Untitled-2-71-256.png"
                    alt="error"
                />
                <p>Произошла ошибка!</p>
                <h4>
                    Ошибка: <span>{errorMessage}</span>
                </h4>
            </div>
        ) : null

    const errorStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <>
            <div className="content__top">
                <Categories
                // value={categoryId}
                // onClickCategory={setCategoryId}
                />
                <Sort
                // orderType={orderType}
                // setOrderType={setOrderType}
                // value={sortType}
                // onClickSort={setSortType}
                />
                <div />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div
                style={errorBlock ? errorStyles : null}
                className="content__items"
            >
                {!errorBlock ? (
                    pizzaBlocks.length === 0 ? (
                        <h2>Ничего не найдено</h2>
                    ) : (
                        pizzaBlocks
                    )
                ) : (
                    errorBlock
                )}
            </div>
            <Pagination onChangePage={(id) => dispatch(setCurrentPage(id))} />
        </>
    )
}

export default Home
