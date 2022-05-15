export interface itemInterface {
  id: string
  [x: string]: any
}

export interface DynamicTableColumnInterface {
  title: string
  key: string
  size: string
  dataAccessor: (item: itemInterface) => string | number
  titleAccessor: string
  sortable: boolean
  customTitleAlt: (item: itemInterface) => string
  titleConfig?: (str: string) => string
}
