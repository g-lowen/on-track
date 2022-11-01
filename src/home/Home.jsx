import styles from "./Home.module.css"
import { useAppContext } from "../communication/Context"
import { useState } from "react"
import { Link } from "react-router-dom"

function Home() {
  const { results, bettingData } = useAppContext().context
  const [switchSort, setSwitchSort] = useState(false)
  const [test, setTest] = useState(true)

  // setTimeout(loadThePage, 500)
  // function loadThePage() {
  // setSwitchSort(true)
  //   console.log("Den körs")
  // }

  // count matches
  let sumMatches = 0
  Object.keys(results).forEach(function (key) {
    if (!results[key]) return
    sumMatches += 1
  })

  // sort table
  function clickHandler(e) {
    let sortKey = e.target.value
    if (switchSort === true) {
      bettingData?.players?.sort((a, b) =>
        a.playerInfo[sortKey] < b.playerInfo[sortKey]
          ? 1
          : a.playerInfo[sortKey] > b.playerInfo[sortKey]
          ? -1
          : 0
      )
      setSwitchSort(false)
    } else if (switchSort === false) {
      bettingData?.players?.sort((a, b) =>
        a.playerInfo[sortKey] < b.playerInfo[sortKey]
          ? -1
          : a.playerInfo[sortKey] > b.playerInfo[sortKey]
          ? 1
          : 0
      )
      setSwitchSort(true)
    }
  }

  return (
    <section className={`${styles["home"]}`}>
      {test ? <button onClick={() => setTest(false)}>Click</button> : <></>}
      <div className={`${styles["heading-row"]}`}>
        <div className={`${styles["row-item"]} ${styles["row-item-1"]}`}>
          <button className={styles["btn"]} onClick={clickHandler} value="name">
            Namn
          </button>
        </div>
        <div className={`${styles["row-item"]} ${styles["row-item-2"]}`}>
          <button className={styles["btn"]} onClick={clickHandler} value="name">
            M
          </button>
        </div>
        <div className={`${styles["row-item"]} ${styles["row-item-3"]}`}>
          <button className={styles["btn"]} onClick={clickHandler} value="win">
            W
          </button>
        </div>
        <div className={`${styles["row-item"]} ${styles["row-item-4"]}`}>
          <button className={styles["btn"]} onClick={clickHandler} value="loss">
            L
          </button>
        </div>
        <div
          className={`${styles["row-item"]} ${styles["row-item-5"]} ${"desk"}`}
        >
          <button
            className={styles["btn"]}
            onClick={clickHandler}
            value="percent"
          >
            %
          </button>
        </div>
        <div className={`${styles["row-item"]} ${styles["row-item-6"]}`}>
          <button
            className={styles["btn"]}
            onClick={clickHandler}
            value="points"
          >
            P
          </button>
        </div>
      </div>
      {bettingData?.players?.map((player, index) => {
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
              {/* {win} */}
            </div>
            <div className={`${styles["row-item"]} ${styles["row-item-4"]}`}>
              {playerInfo.loss}
              {/* {loss} */}
            </div>
            <div
              className={`${styles["row-item"]} ${
                styles["row-item-5"]
              }  ${"desk"}`}
            >
              {playerInfo.percent}%{/* {percent}% */}
            </div>
            <div className={`${styles["row-item"]} ${styles["row-item-6"]}`}>
              {playerInfo.points}
              {/* {points} */}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Home
