import { FC } from 'react'
import styles from './logo.module.scss'

interface Props {
  big?: boolean
  small?: boolean
  smallest?: boolean
}

const Logo: FC<Props> = ({ big, small, smallest }) => {
  return <div>logo</div>
}

Logo.defaultProps = {
  big: false,
  small: false,
  smallest: false,
}

export default Logo
