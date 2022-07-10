import { useHttp } from '../hooks/http.hook'
import Skeleton from '../components/Skeleton/Skeleton'
import { nanoid } from 'nanoid'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Categories from '../components/Categories/Categories'
import Sort from '../components/Sort/Sort'
import { useEffect, useState, useContext } from 'react'
import Pagination from '../components/Pagination/Pagination'
import { AppContext } from '../App'
import { useSelector } from 'react-redux'

const Home = () => {
    const categoryId = useSelector((state) => state.filter.categoryId)

    const { searchValue } = useContext(AppContext)
    const [pizzas, setPizzas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    // const [categoryId, setCategoryId] = useState(0)
    // const [orderType, setOrderType] = useState(true)
    const sortType = useSelector((state) => state.filter.sortType)
    const orderType = useSelector((state) => state.filter.sortOrder)
    // const [sortType, setSortType] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const { request } = useHttp()
    const sortNames = ['rating', 'price', 'title']

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setLoading(true)
        getPizzas()
    }, [categoryId, sortType, orderType, searchValue, currentPage])

    const getPizzas = () => {
        const categories = categoryId === 0 ? '' : `category=${categoryId}`
        const sort = sortNames[sortType]
        const order = orderType ? 'asc' : 'desc'
        const search = searchValue
            ? `&search=${searchValue.toLowerCase().replace(/\s/gi, '')}`
            : ''

        request(
            `https://62c875e00f32635590d909c9.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sort}&order=${order}${search}`
        )
            .then((item) => updatePizzas(item))
            .catch((err) => updatePizzasError())
    }

    const updatePizzas = (item) => {
        setLoading(false)
        setError(false)
        setPizzas(item)
    }

    const updatePizzasError = () => {
        setError(true)
        setLoading(false)
    }

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

    const errorBlock = !loading && error ? <h2>Error</h2> : null

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
            <div className="content__items">
                {errorBlock}
                {pizzaBlocks.length === 0 ? (
                    <h2>Ничего не найдено</h2>
                ) : (
                    pizzaBlocks
                )}
            </div>
            <Pagination onChangePage={setCurrentPage} />
        </>
    )
}

export default Home
