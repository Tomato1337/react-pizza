import { useCallback, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'
import { RootState } from '../redux/store'
import { useWhyDidYouUpdate } from 'ahooks';


const Categories: React.FC = () => {
    // const [activeItem, setActiveItem] = useState('Все')
    const value = useSelector((state: RootState) => state.filter.categoryId)
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

    useWhyDidYouUpdate('Categories', { value })

    return (
        <div className="categories">
            <ul>{categoriesBlocks}</ul>
        </div>
    )
}

export default Categories
