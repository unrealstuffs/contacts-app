import { FC, ReactNode } from 'react'

import styles from './Layout.module.scss'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={styles.layout}>{children}</div>
}

export default Layout
