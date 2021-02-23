import styles from '../styles/components/Countdown.module.css'
import React from 'react'


export default function Countdown(){
    const [time, setTime] = React.useState(25*60)
    const [active, setActive] = React.useState(false)

    React.useEffect(() => {
        if(active && time > 0){
            setTimeout(() => setTime(time => time-1), 1000);
        }
        // return () => (console.log("Unmounting!"))
    }, [active,time])

    const minutes = Math.floor(time/60)
    const seconds = time % 60
    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('')

    const startCountdown= () => setActive(active => true)

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            <button type="button" onClick={()=>startCountdown()} className={styles.countdownButton}>
                    Iniciar um ciclo
            </button>
        </div>

    )
}