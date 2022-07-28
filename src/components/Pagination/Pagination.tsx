import React, { memo } from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useWhyDidYouUpdate } from 'ahooks'

type PaginationProps = {
    onChangePage: (i: number) => void // onChangePage? - опциональный параметр
}

const Pagination: React.FC<PaginationProps> = memo(({ onChangePage }) => {
    // onChangePage.?(parametr) - если функции не будет, то ничего не произойдет
    const currentPage = useSelector((state: RootState) => state.filter.currentPage)

    useWhyDidYouUpdate('Pagination', { onChangePage, currentPage })

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            // renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
        />
    )
})

export default Pagination
