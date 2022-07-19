import { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from 'react-redux'
import {
    setSortType,
    setSortTypeActive,
    setSortOrder,
    selectSort,
} from '../../redux/slices/filterSlice'

const Sort = () => {
    const value = useSelector(selectSort)
    const sortTypeActive = useSelector((state) => state.filter.sortTypeActive)
    const sortOrder = useSelector((state) => state.filter.sortOrder)
    const dispatch = useDispatch()
    const sortRef = useRef(false)
    // const [sortActive, setSortActive] = useState(false)
    // const [sortItemActive, setSortItemActive] = useState('популярности')
    const sortElem = ['популярности', 'цене', 'алфавиту']

    const changeStatus = (elem) => {
        // onClickSort(elem)
        // setSortActive(false)
        dispatch(setSortType(elem))
        dispatch(setSortTypeActive(false))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.composedPath().includes(sortRef.current)) {
                dispatch(setSortTypeActive(false))
            }
        }

        document.body.addEventListener('click', handleClickOutside)

        return () =>
            document.body.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div tabIndex={0} className="sort__label">
                <svg
                    onClick={() => dispatch(setSortOrder(!sortOrder))}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transform: `rotate(${sortOrder ? '0deg' : '180deg'})`,
                        cursor: 'pointer',
                    }}
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span
                    onClick={() => dispatch(setSortTypeActive(!sortTypeActive))}
                >
                    {sortElem[value]}
                </span>
            </div>
            {sortTypeActive && (
                <div className="sort__popup">
                    <ul>
                        {sortElem.map((elem, i) => {
                            return (
                                <li
                                    key={nanoid()}
                                    className={value === i ? 'active' : ''}
                                    onClick={() => {
                                        changeStatus(i)
                                    }}
                                >
                                    {elem}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Sort
