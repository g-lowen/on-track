import styles from "./Home.module.css"
import { useAppContext } from "../communication/Context"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"

function Home() {
  const { results, playerBets } = useAppContext().context
  const { sort, setSort } = useState("points")

  // count matches
  let sumMatches = 0
  Object.keys(results).forEach(function (key) {
    if (!results[key]) return
    sumMatches += 1
  })

  return (
    <section className={`${styles["home"]}`}>
      <div className={`${styles["heading-row"]}`}>
        <div
          className={`${styles["row-item"]} ${styles["row-item-1"]} ${styles["link"]}`}
        >
          Namn
        </div>
        <div
          className={`${styles["row-item"]} ${styles["row-item-2"]} ${styles["link"]}`}
        >
          M
        </div>
        <div
          className={`${styles["row-item"]} ${styles["row-item-3"]} ${styles["link"]}`}
        >
          W
        </div>
        <div
          className={`${styles["row-item"]} ${styles["row-item-4"]} ${styles["link"]}`}
        >
          L
        </div>
        <div
          className={`${styles["row-item"]} ${styles["row-item-5"]} ${"desk"} ${
            styles["link"]
          }`}
        >
          %
        </div>
        <div
          className={`${styles["row-item"]} ${styles["row-item-6"]} ${styles["link"]}`}
        >
          P
        </div>
      </div>
      {playerBets.map((player, index) => {
        const { playerInfo, bets } = player

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
              {/* {!test === "" ? playerInfo.loss : playerInfo.win} */}
              {10}
            </div>
            <div className={`${styles["row-item"]} ${styles["row-item-4"]}`}>
              {playerInfo.loss}
            </div>
            <div
              className={`${styles["row-item"]} ${
                styles["row-item-5"]
              }  ${"desk"}`}
            >
              {playerInfo.percent}
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
