import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

import { LevelUpModal } from '../components/LevelUpModal'

import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  experienceToNextLevel: number
  activeChallenge: Challenge
  hasCompletedChallenge: boolean
  hasIncreasedLevel: boolean
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
  closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
  level: number
  currentExperience: number
  challengesCompleted: number
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  )
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  )
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const [hasCompletedChallenge, setHasCompletedChallenge] = useState(false)
  const [hasIncreasedLevel, setHasIncreasedLevel] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  const playAudio = async (url) => {
    const context = new AudioContext()
    let gainNode = context.createGain()

    const source = context.createBufferSource()
    const audioBuffer = await fetch(url)
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => context.decodeAudioData(ArrayBuffer))

    source.buffer = audioBuffer

    source.connect(gainNode)
    gainNode.connect(context.destination)
    gainNode.gain.setValueAtTime(0.4, context.currentTime) // volume, 0 means mute

    source.start()
  }

  function levelUp() {
    playAudio('/level-up.mp3')

    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
    setHasIncreasedLevel(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)

    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
    setHasCompletedChallenge(false)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio iniciado 🎉', {
        body: `Valendo ${challenge.amount} xp!`,
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
    setHasCompletedChallenge(false)
  }

  function completeChallenge() {
    if (!activeChallenge) return

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    } else {
      setHasIncreasedLevel(false)
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
    setHasCompletedChallenge(true)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
        hasCompletedChallenge,
        hasIncreasedLevel,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}
