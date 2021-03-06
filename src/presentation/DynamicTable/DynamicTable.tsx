import { FC, memo, ReactNode, MouseEvent } from 'react'
import c from 'classnames'
import {
  DynamicTableColumnInterface,
  itemInterface,
} from 'Entities/interfaces/DynamicTableColumnInterface'
import { TFunction } from 'Entities/interfaces/Common'
import SorterStore from 'stores/SorterStore'
import PaginatorStore from 'stores/PaginatorStore'
import LoadingRing from 'presentation/LoadingRing'
import TablePagination from 'presentation/TablePagination'
import DynamicTableHeader from './DynamicTableHeader'
import styles from './dynamicTable.module.scss'

interface PropTypes {
  displayResultsMessage: string
  sortDescendingIcon: ReactNode
  sortAscendingIcon: ReactNode
  paginatorPrevIcon: ReactNode
  paginatorNextIcon: ReactNode
  handlePageChange: (page: number) => void
  handleSortChange: (key: string) => void
  noResultsMessage: ReactNode | string
  t: TFunction
  handleRowClick: (e: MouseEvent<HTMLDivElement>, item: itemInterface) => void
  paginator: PaginatorStore
  isLoading: boolean
  columns: Array<DynamicTableColumnInterface>
  sorter: SorterStore
  data: Array<itemInterface>
}

const DynamicTable: FC<PropTypes> = ({
  displayResultsMessage,
  sortDescendingIcon,
  sortAscendingIcon,
  paginatorPrevIcon,
  paginatorNextIcon,
  handlePageChange,
  handleSortChange,
  noResultsMessage,
  t,
  handleRowClick,
  paginator,
  isLoading,
  columns,
  sorter,
  data,
}) => {
  if (isLoading) {
    return <LoadingRing center />
  }

  const gridStyle = { gridTemplateColumns: columns.map(({ size = '1fr' }) => `${size}`).join(' ') }

  const tableHeader = (
    <DynamicTableHeader
      sortDescendingIcon={sortDescendingIcon}
      sortAscendingIcon={sortAscendingIcon}
      handleSortChange={handleSortChange}
      gridStyle={gridStyle}
      columns={columns}
      sorter={sorter}
      t={t}
    />
  )

  let tableContent = noResultsMessage

  if (data.length > 0) {
    tableContent = data.map((item) => (
      <div
        className={c(styles.rowItem, styles.contentRow)}
        onClick={(e) => handleRowClick(e, item)}
        key={`row_${item.id}`}
        style={gridStyle}
        role="button"
        tabIndex={0}
      >
        {columns.map(({ key, dataAccessor, customTitleAlt }) => {
          let value
          if (dataAccessor) {
            value = dataAccessor(item)
          } else {
            value = item[key]
          }
          let titleAlt = typeof value === 'string' ? value : ''

          if (customTitleAlt) {
            titleAlt = customTitleAlt(item)
          }

          return (
            <div className={styles.item} key={`id_${key}`} title={titleAlt}>
              {value !== '' && value !== null ? value : '-'}
            </div>
          )
        })}
      </div>
    ))
  }

  return (
    <>
      {tableHeader}
      {tableContent}
      {paginator.total > 0 && (
        <TablePagination
          displayResultsMessage={displayResultsMessage}
          handlePageChange={handlePageChange}
          prevIcon={paginatorPrevIcon}
          nextIcon={paginatorNextIcon}
          paginator={paginator}
        />
      )}
    </>
  )
}

export default memo(DynamicTable)
