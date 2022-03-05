import { FC, memo, ReactNode } from 'react'
const styles = require('./pageTitle.module.scss')

const PageTitle: FC<PropTypes> = ({ title, rightSection }) => {
  return (
    <div className={styles.pageTitleContainer}>
      <div>
        <div className={styles.sectionTitle}>{title}</div>
      </div>
      {rightSection && <div className={styles.rightSection}>{rightSection}</div>}
    </div>
  )
}

interface PropTypes {
  title: string
  rightSection?: ReactNode
}

export default memo(PageTitle)
