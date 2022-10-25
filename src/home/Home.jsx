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

  // playerInfo.forEach((player) => {
  //   console.log(player)
  // })

  // Försök igen med Gustav
  // let sumWinGus = 0
  // setTimeout(() => {
  // console.log("playerBets[0].bets: ", playerBets[0]?.bets)
  // console.log("playerBets[0]: ", playerBets[0])
  // console.log("results: ", results)

  useEffect(() => {
    if (playerBets) {
      // let playerBetValues = Object.values(playerBets[0]?.bets)
      // let resultsValues = Object.values(results)

      const sortLoss = new Map(
        [...playerBets.entries()].sort((a, b) => b[1] - a[1])
        // [...playerBets].sort((a, b) => b[1] - a[1])
      )
      // console.log(sortLoss)
      // console.log("not sorted", playerBets.playerInfo)
      const sortName = "name"
      const sortPercent = "percent"
      const sortPoints = "points"
      const sortWin = "win"
    }
  }, [playerBets])
  // }, 2000)

  // playerBets.map((player) => {
  // console.log(player.playerInfo)
  // })

  // console.log(resultsValues)

  // for (let i = 0; i < playerBetValues.length; i++) {
  // if (playerBetValues === resultsValues) {
  // console.log("hallå")
  // player.win += 1
  //     console.log("player: ", playerBetKeys[i], ":", playerBetValues[i])
  //     console.log("results: ", resultsKeys[i], ":", resultsValues[i])
  // }
  //   player.loss = sumMatches - player.win
  // }

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

        let test = ""
        // console.log()
        // Här vill du jämföra Results och PlayerBets
        // Object.keys(player.bets).forEach(function (playerKey) {
        //   let playerBetting = player.bets[playerKey]
        //   Object.keys(results).forEach(function (resultsKey) {
        //     if (player.bets[resultsKey] === false) return
        //     if (!player.bets[resultsKey] === false) {
        //       console.log(playerBetting)
        //     }
        //   })
        // })
        // console.log(JSON.stringify(player.bets) === JSON.stringify(results))
        // let playerBetKeys = Object.keys(bets)
        // let resultsKeys = Object.keys(results)
        // let playerBetValues = Object.values(bets)
        // let resultsValues = Object.values(results)
        // console.log(
        //   JSON.stringify(playerBetKeys) === JSON.stringify(resultsKeys)
        // )
        // console.log("playerBetKeys", playerBetValues)
        // console.log("resultsKeys", resultsValues)

        // for (let i = 0; i < playerBetValues.length; i++) {
        //   console.log(
        //     player.name,
        //     ": ",
        //     playerBetKeys[i],
        //     "R: ",
        //     resultsKeys[i]
        //   )
        // if (playerBetKeys[i] === resultsKeys[i]) {
        // player.win += 1
        //     console.log("player: ", playerBetKeys[i], ":", playerBetValues[i])
        //     console.log("results: ", resultsKeys[i], ":", resultsValues[i])
        // }
        //   player.loss = sumMatches - player.win
        // }

        // Bara för 1
        // let testWinSum = 0

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
              {!test === "" ? playerInfo.loss : playerInfo.win}
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
