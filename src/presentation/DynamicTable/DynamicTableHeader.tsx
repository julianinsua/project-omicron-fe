import { FC, ReactNode } from 'react'
import c from 'classnames'
import { DynamicTableColumnInterface } from 'Entities/interfaces/DynamicTableColumnInterface'
import SorterStore from 'stores/SorterStore'
import styles from './dynamicTable.module.scss'

interface PropTypes {
  columns: Array<DynamicTableColumnInterface>
  gridStyle: any
  t: (key?: string, data?: Record<string, unknown>) => string
  handleSortChange: (key: string) => void
  sortAscendingIcon: ReactNode
  sortDescendingIcon: ReactNode
  sorter: SorterStore
}

const DynamicTableHeader: FC<PropTypes> = ({
  columns,
  gridStyle,
  t,
  handleSortChange,
  sortAscendingIcon,
  sortDescendingIcon,
  sorter,
}) => {
  const handleClickRowCell = ({ sortable, key }: { sortable: boolean; key: string }) => {
    if (sortable) {
      handleSortChange(key)
    }
  }

  return (
    <div className={c(styles.rowItem, styles.contentRow)} style={gridStyle}>
      {columns.map((column) => {
        const { title, titleConfig, sortable, key } = column

        let value
        if (titleConfig) {
          value = titleConfig(t(title))
        } else {
          value = t(title)
        }

        return (
          <div
            className={c(styles.headerRowCell, sortable && styles.hasSort)}
            onClick={() => handleClickRowCell(column)}
            role="button"
            tabIndex={0}
            key={column.key}
          >
            {value}
            {sortable && (
              <span
                className={c(styles.sortIcon, sorter.sortField === key && styles.sortIconActive)}
              >
                {!sorter.isASC && sorter.sortField === key ? sortDescendingIcon : sortAscendingIcon}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default DynamicTableHeader
