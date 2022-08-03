import React, { memo } from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useWhyDidYouUpdate } from 'ahooks'

type PaginationProps = {
    onChangePage: (i: number) => void
}

const Pagination: React.FC<PaginationProps> = memo(({ onChangePage }) => {
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
            forcePage={currentPage - 1}
        />
    )
})

export default Pagination
