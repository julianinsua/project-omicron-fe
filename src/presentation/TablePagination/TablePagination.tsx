import { FC, ReactNode } from 'react'
import c from 'classnames'
import PaginatorStore from 'stores/PaginatorStore'

import styles from './tablePagination.module.scss'

interface PropTypes {
  handlePageChange: (n: number) => void
  paginator: PaginatorStore
  maxPagesAtOnce?: number
  prevIcon?: ReactNode
  nextIcon?: ReactNode
  displayResultsMessage?: string
}

const TablePagination: FC<PropTypes> = ({
  handlePageChange,
  paginator,
  maxPagesAtOnce = 10,
  prevIcon = '<',
  nextIcon = '>',
  displayResultsMessage,
}) => {
  const { currentPage, totalPages } = paginator

  let fromPage = 1
  let toPage = totalPages

  if (totalPages > maxPagesAtOnce) {
    const halfPages = maxPagesAtOnce / 2

    if (currentPage > halfPages) {
      fromPage = currentPage - halfPages - 1
      toPage = currentPage + halfPages

      if (toPage > totalPages) {
        fromPage = totalPages - maxPagesAtOnce - 1
        toPage = totalPages
      }
    } else {
      toPage = maxPagesAtOnce
    }
  }

  const pages = []
  for (let i = fromPage; i <= toPage; i++) {
    pages.push(i)
  }
  return (
    <div className={styles.paginatorContainer}>
      {paginator.totalPages > 1 && (
        <ol className={styles.tablePagination}>
          {currentPage > 1 && (
            <li
              className={styles.page}
              onClick={() => handlePageChange(currentPage - 1)}
              role="menuitem"
            >
              {prevIcon}
            </li>
          )}
          {pages.map((page) => (
            <li
              key={`pager_${page}`}
              className={c(styles.page, page === currentPage && styles.active)}
              onClick={() => handlePageChange(page)}
              role="menuitem"
            >
              {page}
            </li>
          ))}
          {currentPage < totalPages && (
            <li
              className={c(styles.page, styles.nextPageButton)}
              onClick={() => handlePageChange(currentPage + 1)}
              role="menuitem"
            >
              {nextIcon}
            </li>
          )}
        </ol>
      )}
      {displayResultsMessage && <div className={styles.resultsData}>{displayResultsMessage}</div>}
    </div>
  )
}

TablePagination.defaultProps = {
  maxPagesAtOnce: 10,
  prevIcon: '<',
  nextIcon: '>',
  displayResultsMessage: undefined,
}

export default TablePagination
