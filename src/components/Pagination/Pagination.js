import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import { useSelector } from 'react-redux'

const Pagination = ({ onChangePage }) => {
    const currentPage = useSelector((state) => state.filter.currentPage)

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
        />
    )
}

export default Pagination
