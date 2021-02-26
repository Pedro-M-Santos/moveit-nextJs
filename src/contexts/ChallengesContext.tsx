import { randomBytes } from 'node:crypto'
import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'

interface ChallengesProviderProps{
    children: ReactNode
}

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengesContextData {
    level: number
    currentExperience: number
    experienceToNextLevel: number
    challengesCompleted: number
    activeChallenge: Challenge
    levelUp: () => void
    startNewChallenge: () => void
    resetChallenge: () => void
    completeChallenge: () => void
}


export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children}: ChallengesProviderProps): JSX.Element {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const[activeChallenge, setActiveChallenge] = useState(null)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    const levelUp = () => setLevel(level=>level+1)

    const startNewChallenge = () =>{
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(activeChallenge=>challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio! 🚴‍♂️',{
                body: `Valendo ${challenge.amount} xP!`,
            })
        }
    }
    const resetChallenge = () => setActiveChallenge(null)

    const completeChallenge = () => {
        if(!activeChallenge) return
        const {amount} = activeChallenge;
        let finalExperience = currentExperience + amount
        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }
        // console.log("amount,currentExperience,finalExperience,challengesCompleted",amount,currentExperience,finalExperience,challengesCompleted)
        setCurrentExperience(currentExperience => finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted => challengesCompleted+1)
    }

    return (
        <ChallengesContext.Provider
        value={{
            level,
            currentExperience,
            experienceToNextLevel,
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge
        }}
        >
        {children}
        </ChallengesContext.Provider>
    )
}
