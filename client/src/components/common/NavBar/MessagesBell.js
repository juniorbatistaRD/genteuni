import React from 'react'
import styles from './MessagesBell.module.css'
import bellImg from '../../../assets/icons/message.svg'

function MessagesBell() {

    return(
        <div>
            <img className={styles.message} src={bellImg} alt="Messages"/>
        </div>
    )
}



export default MessagesBell