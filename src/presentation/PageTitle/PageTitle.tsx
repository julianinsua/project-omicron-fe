import { FC, memo, ReactNode } from 'react'
import styles from './pageTitle.module.scss'

interface PropTypes {
  title: string
  rightSection?: ReactNode
}

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

PageTitle.defaultProps = {
  rightSection: undefined,
}

export default memo(PageTitle)
