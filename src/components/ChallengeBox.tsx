import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const hasActiveChallenge = true

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>

          <main>
            <img src="icons/body.svg" alt="" />
            <strong>Novo desafio</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              reprehenderit?
            </p>
          </main>

          <footer>
            <button type="button" className={styles.challengeFailButton}>
              Falhei
            </button>
            <button type="button" className={styles.challengeSucceededButton}>
              Completei!
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de nível completando desafios!
          </p>
        </div>
      )}
    </div>
  )
}
