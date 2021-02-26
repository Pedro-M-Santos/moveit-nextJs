import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export default function Profile(){
    const {level} =useContext(ChallengesContext)
    return(
        <div className={styles.profileContainer}>
            <img src ="https://github.com/Pedro-M-Santos.png" alt="Matias" />
            <div>
                <strong>Pedro Matias</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}