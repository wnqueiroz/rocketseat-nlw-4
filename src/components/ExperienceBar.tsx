import { useContext } from 'react'
import { motion } from 'framer-motion'

import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const {
    hasIncreasedLevel,
    currentExperience,
    experienceToNextLevel,
    hasCompletedChallenge,
  } = useContext(ChallengesContext)

  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <motion.div
          initial={false}
          animate={{
            width: hasIncreasedLevel
              ? ['0%', `${percentToNextLevel}%`]
              : `${percentToNextLevel}%`,
          }}
          {...(!hasIncreasedLevel
            ? { transition: { width: { ease: 'easeInOut', duration: 2 } } }
            : {})}
        />
        <motion.span
          className={styles.currentExperience}
          initial={{
            left: `${percentToNextLevel}%`,
          }}
          animate={{
            left: hasIncreasedLevel
              ? ['0%', `${percentToNextLevel}%`]
              : `${percentToNextLevel}%`,
          }}
          {...(!hasIncreasedLevel
            ? { transition: { left: { ease: 'easeInOut', duration: 2 } } }
            : {})}
        >
          {hasCompletedChallenge && <span />}
          {currentExperience} xp
        </motion.span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}
