import styles from '../styles/components/Profile.module.css'

export default function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src ="https://github.com/Pedro-M-Santos.png" alt="Matias" />
            <div>
                <strong>Pedro Matias</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    Level 1
                </p>
            </div>
        </div>
    )
}