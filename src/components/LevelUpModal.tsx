import { useContext } from 'react'
import { motion } from 'framer-motion'

import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext)

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1],
      }}
      className={styles.overlay}
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [0, 1],
          scale: [4, 1],
        }}
        className={styles.container}
      >
        <header>
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
            }}
            transition={{
              delay: 0.7,
            }}
          >
            {level}
          </motion.div>
        </header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="icons/close.svg" alt="Fechar modal" />
        </button>
      </motion.div>
    </motion.div>
  )
}
