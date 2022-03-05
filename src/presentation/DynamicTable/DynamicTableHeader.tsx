import { FC, ReactNode } from 'react'
import c from 'classnames'
import { DynamicTableColumnInterface } from 'Entities/interfaces/DynamicTableColumnInterface'
import SorterStore from 'stores/SorterStore'
const styles = require('./dynamicTable.module.scss')

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
    <div className={c(styles.rowItem, styles.headerRow)} style={gridStyle}>
      {columns.map((column, i) => {
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
            key={i}
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

interface PropTypes {
  columns: Array<DynamicTableColumnInterface>
  gridStyle: any
  t: (key?: string, data?: Object) => string
  handleSortChange: Function
  sortAscendingIcon: ReactNode
  sortDescendingIcon: ReactNode
  sorter: SorterStore
}

export default DynamicTableHeader
