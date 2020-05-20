import React from 'react'
import styles from './index.module.css'

function Logo ({className}){
    const classNames = [styles.container , className].join(' ') 

    return( 
        <div
            className={classNames}
        >
            Logo
        </div>
    )
}

Logo.defaultProps = {
    className: ' '
}

export default Logo