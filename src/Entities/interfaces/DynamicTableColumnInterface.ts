export interface DynamicTableColumnInterface {
  title: string
  key: string
  size: string
  dataAccessor: Function
  titleAccessor: string
  sortable: boolean
  customTitleAlt: Function
  titleConfig?: (str: string) => string
}
