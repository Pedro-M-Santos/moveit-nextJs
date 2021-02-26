import styles from '../styles/components/Countdown.module.css'
import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';


export default function Countdown(){
    const {minutes,seconds,hasFinished,isActive,startCountdown,resetCountdown} = useContext(CountdownContext)
    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('')

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
            {hasFinished?
                (
                    <button type="button" onClick={()=>startCountdown()}
                    className={`${styles.countdownButton}`}
                    disabled>
                        Ciclo encerrado
                    </button>
                ):
                (
                    <React.Fragment>
                        {!isActive?
                        (
                            <button type="button" onClick={()=>startCountdown()}
                            className={`${styles.countdownButton}`}>
                                Iniciar um ciclo
                            </button>
                        ):
                        (
                            <button type="button" onClick={()=>resetCountdown()} 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                                Abandonar o ciclo
                            </button>
                        )}
                    </React.Fragment>
                )
            }
        </div>

    )
}