import React from 'react'
import { formatWithValidation } from 'next/dist/next-server/lib/utils'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ChallengeBox.module.css'
import { CountdownContext } from '../contexts/CountdownContext'


export default function ChallengeBox() {
    const { activeChallenge, completeChallenge , resetChallenge} = React.useContext(ChallengesContext)
    const {resetCountdown} = React.useContext(CountdownContext)
    // console.log(activeChallenge)

    const handleChallengeSucceeded = () =>{
        completeChallenge()
        resetCountdown()
    }

    const handleChallengeFailed = () =>{
        resetChallenge()
        resetCountdown()
    }  
    

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>
                        Ganhe {activeChallenge.amount} xP
                        </header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong> Novo Desafio!</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button type="button" className={styles.challengeSucceededButton} onClick={handleChallengeSucceeded}>Completei</button>
                        <button type="button" className={styles.challengeFailedButton} onClick={handleChallengeFailed}>Falhei</button>
                    </footer>
                </div>
            ) :
                (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                            Avance de level completando desafios!
                        </p>
                    </div>
                )}

        </div>
    )
}
