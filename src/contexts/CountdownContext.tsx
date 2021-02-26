import React, { createContext, ReactNode, useContext } from "react"
import { ChallengesContext } from "./ChallengesContext"

interface CountdownContextData{
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountdown:()=>void,
    resetCountdown: ()=>void
}

interface CountdownProviderProps{
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)


export function CountdownProvider({children}: CountdownProviderProps) {
    let countdownTimeout = null;
    const {startNewChallenge} = useContext(ChallengesContext)
    const [time, setTime] = React.useState(0.1*60)
    const [isActive, setIsActive] = React.useState(false)
    const [hasFinished, setHasFinished] = React.useState(false)
    const minutes = Math.floor(time/60)
    const seconds = time % 60
    React.useEffect(() => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => setTime(time => time-1), 1000)
        }
        else if(isActive && time === 0){
            setHasFinished(hasFinished=>true)
            startNewChallenge()
        }
    }, [isActive,time])

    const startCountdown= () => setIsActive(isActive => true)

    const resetCountdown= () =>{
        clearTimeout(countdownTimeout)
        setIsActive(isActive => false)
        setTime(0.1*60)
        setHasFinished(false)
    }

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}
