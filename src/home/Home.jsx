import styles from "./Home.module.css"
import { useAppContext } from "../communication/Context"
import { Link } from "react-router-dom"

function Home() {
  const { results, players } = useAppContext().context

  // count matches
  let sumMatches = 0
  Object.keys(results).forEach(function (key) {
    if (!results[key]) return
    sumMatches += 1
  })

  // sort based on points
  players.sort((p1, p2) =>
    p1.playerInfo.points < p2.playerInfo.points
      ? 1
      : p1.playerInfo.points > p2.playerInfo.points
      ? -1
      : 0
  )

  return (
    <section className={`${styles["home"]}`}>
      <div className={`${styles["heading-row"]}`}>
        <div className={`${styles["row-item"]} ${styles["row-item-1"]}`}>
          Namn
        </div>
        <div className={`${styles["row-item"]} ${styles["row-item-2"]}`}>M</div>
        <div className={`${styles["row-item"]} ${styles["row-item-3"]}`}>W</div>
        <div className={`${styles["row-item"]} ${styles["row-item-4"]}`}>L</div>
        <div
          className={`${styles["row-item"]} ${styles["row-item-5"]} ${"desk"}`}
        >
          %
        </div>
        <div className={`${styles["row-item"]} ${styles["row-item-6"]}`}>P</div>
      </div>
      {players.map((player, index) => {
        const { playerInfo } = player

        return (
          <div className={`${styles["row"]}`} key={index}>
            <div className={`${styles["row-item"]} ${styles["row-item-1"]}`}>
              <Link className={styles["row-item-1"]} to={playerInfo.name}>
                {`${index + 1 + ". "}`}
                <img
                  className={`${styles["player-icon"]}`}
                  src={playerInfo.icon}
                  alt="Icon"
                />
                <span className={styles["link"]}>{playerInfo.name}</span>
              </Link>
            </div>
            <div className={`${styles["row-item"]} ${styles["row-item-2"]}`}>
              {sumMatches}
            </div>
            <div className={`${styles["row-item"]} ${styles["row-item-3"]}`}>
              {playerInfo.win}
            </div>
            <div className={`${styles["row-item"]} ${styles["row-item-4"]}`}>
              {playerInfo.loss}
            </div>
            <div
              className={`${styles["row-item"]} ${
                styles["row-item-5"]
              }  ${"desk"}`}
            >
              {playerInfo.percent}%
            </div>
            <div className={`${styles["row-item"]} ${styles["row-item-6"]}`}>
              {playerInfo.points}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Home
