import styles from "./Player.module.css"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useAppContext } from "../communication/Context"

function Player() {
  const param = useParams().playerName
  const paramLowerCase = param.toLowerCase()
  const navigate = useNavigate()
  const { bettingData, results } = useAppContext().context
  const contentRef = useRef("")
  const findPlayer = bettingData?.players?.find(
    (player) => player.playerInfo.name === param
  )
  const playerImage = findPlayer?.playerInfo?.iconLarge

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value)
  }

  function compareResult(winningTeam) {
    if (results) {
      const newResult = [...bets].filter(
        (current) => current.team === winningTeam
      )
      setWin(newResult)
    }
  }

  // console.log(compareResult("Marie Agerhäll & Fritte Fritzson"))

  // const newState = bettingData?.players[0]?.bets?.g11

  // console.log(newState)

  return (
    <section className={`${styles["player"]}`}>
      <section className={`${styles["player-section"]}`}>
        <button
          className={`${styles["go-back-btn"]}`}
          onClick={() => navigate(-1)}
          style={{ color: `var(--${paramLowerCase})` }}
        >
          x
        </button>
        <img
          className={`${styles["player-icon"]}`}
          src={playerImage}
          alt="Icon"
        />
        <h1
          className={`${styles["player-heading"]}`}
          style={{ color: `var(--${paramLowerCase})` }}
        >
          {param}
        </h1>
        <p
          className={styles["player-text"]}
          style={{ color: `var(--${paramLowerCase})` }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          ducimus enim consequatur dolore fugiat illum excepturi illo pariatur
          repellendus distinctio sed, neque, ab incidunt laborum expedita
          deserunt totam necessitatibus modi.
        </p>
        {/* om du orkar: förtydliga de olika markeringarna */}
        {/* <ul className={styles["guess-marks"]}>
          <li className={styles["guess-mark"]}>
            <div className={styles["check"]}></div>
          </li>
          <li className={styles["guess-mark"]}>
            <div id={styles["cross"]}>x</div>
          </li>
          <li className={styles["guess-mark"]}>
            <div
              className={styles["picked"]}
              style={{
                backgroundColor: `var(--${paramLowerCase})`
              }}
            ></div>
          </li>
        </ul> */}
        <button
          className={`${styles["skip-content-btn"]} ${"mob"}`}
          onClick={() =>
            contentRef.current.scrollIntoView({ behavior: "smooth" })
          }
        >
          <div
            className={styles["arrow"]}
            style={{
              borderColor: `var(--${paramLowerCase})`
            }}
          ></div>
        </button>
      </section>
      <section className={`${styles["result-section"]}`} ref={contentRef}>
        <div className={`${styles["heading-row"]}`}>
          <div className={`${styles["row-item"]} ${"mob"}`}>#</div>
          <div className={`${styles["row-item"]} ${styles["first"]} ${"desk"}`}>
            Avsnitt
          </div>
          <div className={`${styles["row-item"]} ${"desk"}`}>Datum</div>
          <div className={`${styles["row-item"]} ${"desk"}`}>Matchtyp</div>
          <div className={`${styles["row-item"]} `}>1:a klass</div>
          <div className={`${styles["row-item"]} `}>Dressinen</div>
        </div>

        {/* Mapping matches from the groups */}
        {bettingData?.betsTableGroup?.map((match, index) => {
          return (
            <div key={index}>
              {/* Mapping both teams in each group match */}
              {Object.values(match).map((teams, index) => {
                return (
                  <div className={`${styles["row"]}`} key={index}>
                    <div className={`${styles["row-item"]} ${styles["first"]}`}>
                      {index + 1}
                    </div>
                    <div className={`${styles["row-item"]} ${"desk"}`}>
                      {teams[2]}
                    </div>
                    <div className={`${styles["row-item"]} ${"desk"}`}>
                      {teams[3]}
                    </div>
                    <div className={`${styles["row-item"]} `}>
                      {teams[0]}
                      {/* Mapping player bet of each group match (left col) */}
                      {Object.values(findPlayer.bets).map(
                        (playerBet, index) => {
                          if (
                            teams[0] === playerBet &&
                            JSON.stringify(index) === teams[4]
                          ) {
                            return (
                              <div
                                className={styles["picked"]}
                                key={index}
                                style={{
                                  backgroundColor: `var(--${paramLowerCase})`
                                }}
                              ></div>
                            )
                          }
                        }
                      )}
                    </div>
                    <div className={`${styles["row-item"]} ${styles["last"]}`}>
                      {teams[1]}
                      {/* Mapping player bet of each group match (right col) */}
                      {Object.values(findPlayer?.bets)?.map(
                        (playerBet, index) => {
                          // console.log(playerBet)

                          // Min tanke:
                          // Testa att göra si och sen så.

                          // console.log(results)
                          // if (
                          //   playerBet === "Marie Agerhäll & Fritte Fritzson"
                          // ) {
                          //   function getKeyByValue(object, value) {
                          //     return Object.keys(object).find(
                          //       (key) => object[key] === value
                          //     )
                          //   }
                          //   console.log(
                          //   )
                          // }
                          // console.log(
                          //   getKeyByValue(findPlayer?.bets, playerBet)
                          // )

                          // console.log(results)

                          // Här behöver du se om nycklarna i stämmer överens
                          // dvs jämföra results med varje spelares bets

                          // Object.keys(results).map((resultKey) => {
                          // })
                          // console.log(results.g11)
                          // console.log(
                          //   "results: ",
                          //   results,
                          //   "playerBet: ",
                          //   playerBet
                          // )
                          // if (results.g11 === playerBet) {
                          //   console.log("hallå")
                          // }

                          if (
                            teams[1] === playerBet &&
                            JSON.stringify(index) === teams[4]
                          ) {
                            return (
                              <div
                                className={styles["picked"]}
                                key={index}
                                style={{
                                  backgroundColor: `var(--${paramLowerCase})`
                                }}
                              ></div>
                            )
                          }
                        }
                      )}
                      {/* <div className={styles["check"]}></div> */}
                      {/* <div id={styles["cross"]}>x</div> */}
                      {/* <div
                        className={styles["picked"]}
                        style={{
                          backgroundColor: `var(--${paramLowerCase})`
                        }}
                      ></div> */}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}

        {/* Mapping matches from the playoffs */}
        {bettingData?.betsTablePlayoffs?.map((match, index) => {
          return (
            <div key={index}>
              {/* Mapping both teams in each playoff match */}
              {Object.values(match).map((teams, index) => {
                return (
                  <div className={`${styles["row-playoffs"]}`} key={index}>
                    <div className={`${styles["row-item"]} ${styles["first"]}`}>
                      {index + 10}
                    </div>
                    <div className={`${styles["row-item"]} ${"desk"}`}>
                      {teams[1]}
                    </div>
                    <div className={`${styles["row-item"]} ${"desk"}`}>
                      {teams[2]}
                    </div>
                    <div className={`${styles["row-item"]} ${styles["last"]}`}>
                      {/* Mapping player bet of each playoff matches */}
                      {Object.keys(findPlayer.bets)?.map((betKey, index) => {
                        if (betKey === "p1" && betKey === teams[0]) {
                          return <div key={index}>{findPlayer.bets.p1}</div>
                        } else if (betKey === "p2" && betKey === teams[0]) {
                          return <div key={index}>{findPlayer.bets.p2}</div>
                        } else if (betKey === "p3" && betKey === teams[0]) {
                          return <div key={index}>{findPlayer.bets.p3}</div>
                        } else if (betKey === "p4" && betKey === teams[0]) {
                          return <div key={index}>{findPlayer.bets.p4}</div>
                        }
                      })}
                      {/* Här är picked bara by default */}
                      <div
                        className={styles["picked"]}
                        style={{
                          backgroundColor: `var(--${paramLowerCase})`
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </section>
    </section>
  )
}

export default Player
