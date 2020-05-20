import React from 'react'
import logo from '../../../assets/images/logo_text_white.png'
import styles from './index.module.css'
import Button from '../../../components/common/Button'

function WelcomeInfo (){

    return(

        <div className={styles.container}>
            <img src={logo} alt="Logo" className={styles.logo}/>
            <h3 className={styles.title} >¡ Bienvenido !</h3>
            <p className={styles.paragraph}>
                La red social para universitarios,<br/>
                egresados y estudiantes mas<br/> 
                completa de latinoamerica.
            </p>
            <div className={styles['btns-container']}>
                <Button className={styles.call_to_action} typeStyle="transparent"  width="200px" padding="15px">Leer Mas</Button>
            </div>
        </div>
    )
}

export default WelcomeInfo