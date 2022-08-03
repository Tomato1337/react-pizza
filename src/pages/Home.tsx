import { nanoid } from 'nanoid'

import {PizzaBlock, Skeleton, Categories, Pagination, NotFoundBlock, Sort} from '../components/'

import qs from 'qs'

import {
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'

import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from '../redux/store'
import { useSelector } from 'react-redux'

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const categoryId = useSelector((state: RootState) => state.filter.categoryId)
    const sortType = useSelector((state: RootState) => state.filter.sortType)
    const orderType = useSelector((state: RootState) => state.filter.sortOrder)
    const currentPage = useSelector((state: RootState) => state.filter.currentPage)
    const searchValue = useSelector((state: RootState) => state.filter.searchText)
    const pizzas = useSelector((state: RootState) => state.pizzas.items)
    const loading = useSelector((state: RootState) => state.pizzas.loadingPizzas)
    const error = useSelector((state: RootState) => state.pizzas.errorPizzas)
    const errorMessage = useSelector((state: RootState) => state.pizzas.errorMessage)

    const sortNames = ['rating', 'price', 'title']
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            console.log(params)
            const obj = {
                categoryId: parseInt(params.categoryId as string),
                sortType: parseInt(params.sortBy as string),
                sortOrder: JSON.parse(params.sortOrder as string),
                searchText: params.searchText as string,
                currentPage: parseInt(params.currentPage as string),
            }
            dispatch(setFilters(obj))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        if (categoryId === 0) {
            navigate('')
        } else {
            if (isMounted.current) {
                const queryString = qs.stringify({
                    sortType: sortType,
                    categoryId: categoryId,
                    currentPage: currentPage,
                    sortOrder: orderType,
                    searchText: searchValue,
                })
                navigate(`?${queryString}`)
            }
        }

        console.log('render')
        isMounted.current = true
    }, [categoryId, sortType, orderType, searchValue, currentPage])

    useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sortType, orderType, searchValue, currentPage])

    const getPizzas = async () => {
        const categories = categoryId === 0 ? '' : `category=${categoryId}`
        const sort = sortNames[sortType]
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
                currentPage: String(currentPage),
            })
        )
    }

    const skeleton = [...new Array(4)].map((obj) => {
        return <Skeleton key={nanoid()} />
    })

    const pizzasBlock = pizzas
        .map((obj) => {
            return (
                <PizzaBlock
                    key={obj.id}
                    {...obj}/>
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

    const onChangePage = useCallback((id: number) => {
        dispatch(setCurrentPage(id))
    }, [])

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
                <div />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div
                style={
                    errorBlock || pizzaBlocks.length === 0 ? errorStyles : {}
                }
                className="content__items"
            >
                {!errorBlock ? (
                    pizzaBlocks.length === 0 ? (
                        <NotFoundBlock />
                    ) : (
                        pizzaBlocks
                    )
                ) : (
                    errorBlock
                )}
            </div>
            <Pagination onChangePage={onChangePage} />
        </>
    )
}

export default Home
