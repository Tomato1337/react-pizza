import { useState } from 'react'
import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../../redux/slices/filterSlice'

const Categories = () => {
    // const [activeItem, setActiveItem] = useState('Все')
    const value = useSelector((state) => state.filter.categoryId)
    const dispatch = useDispatch()

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    const categoriesBlocks = categories.map((item, i) => {
        return (
            <li
                key={nanoid()}
                onClick={() => dispatch(setCategoryId(i))}
                className={value === i ? 'active' : ''}
            >
                {item}
            </li>
        )
    })

    return (
        <div className="categories">
            <ul>{categoriesBlocks}</ul>
        </div>
    )
}

export default Categories
