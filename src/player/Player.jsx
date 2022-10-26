import styles from "./Player.module.css"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useAppContext } from "../communication/Context"

function Player() {
  const param = useParams().playerName
  const paramLowerCase = param.toLowerCase()
  const navigate = useNavigate()
  const { playerBets, results } = useAppContext().context
  const contentRef = useRef("")
  // const [isLoading, setIsLoading] = useState(true)

  // console.log(results)
  const findPlayer = playerBets.find(
    (player) => player.playerInfo.name === param
  )

  const playerImage = findPlayer.playerInfo.iconLarge

  const betsTableGroup = [
    {
      g11: [
        "Marie Agerhäll & Fritte Fritzson",
        "Hanna Hellquist & Ina Lundström",
        "18 november 2022",
        "Gruppspel",
        "0"
      ],
      g12: [
        "Hanna Hellquist & Ina Lundström",
        "Niklas Källner & Lena Nordlund",
        "26 november 2022",
        "Gruppspel",
        "1"
      ],
      g13: [
        "Niklas Källner & Lena Nordlund",
        "Marie Agerhäll & Fritte Fritzson",
        "2 december 2022",
        "Gruppspel",
        "2"
      ],
      g21: [
        "Christopher Garplind & Emma Peters",
        "Hasse Aro & Camilla Läckberg",
        "16 december 2022",
        "Gruppspel",
        "3"
      ],
      g22: [
        "Hasse Aro & Camilla Läckberg",
        "Cecilia Düringer & Jonatan Unge",
        "23 december 2022",
        "Gruppspel",
        "4"
      ],
      g23: [
        "Cecilia Düringer & Jonatan Unge",
        "Christopher Garplind & Emma Peters",
        "30 december 2022",
        "Gruppspel",
        "5"
      ],
      g31: [
        "Jason Diakité & Marcus Samuelsson",
        "Marit Bergman & Karin Bojs",
        "6 januari 2023",
        "Gruppspel",
        "6"
      ],
      g32: [
        "Johar Bendjelloul & Josefin Johansson",
        "Jason Diakité & Marcus Samuelsson",
        "13 januari 2023",
        "Gruppspel",
        "7"
      ],
      g33: [
        "Marit Bergman & Karin Bojs",
        "Johar Bendjelloul & Josefin Johansson",
        "20 januari 2023",
        "Gruppspel",
        "8"
      ]
    }
  ]

  const betsTablePlayoffs = [
    {
      p1: ["p1", "27 januari 2023", "Andra chansen"],
      p2: ["p2", "3 februari 2023", "Semifinal"],
      p3: ["p3", "10 februari 2023", "Semifinal"],
      p4: ["p4", "17 februari 2023", "Final"]
    }
  ]

  return (
    <section className={`${styles["player"]}`}>
      <section className={`${styles["player-section"]}`}>
        <button
          className={`${styles["go-back-btn"]}`}
          style={{ color: `var(--${paramLowerCase})` }}
          onClick={() => navigate(-1)}
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
        {betsTableGroup.map((match, index) => {
          return (
            <div key={index}>
              {Object.values(match).map((teams, index) => {
                return (
                  <div className={`${styles["row"]}`} key={index}>
                    <div className={`${styles["row-item"]} ${styles["first"]}`}>
                      {index + 1}
                    </div>
                    <div
                      className={`${styles["row-item"]} ${
                        styles["row-item-2"]
                      } ${"desk"}`}
                    >
                      {teams[2]}
                    </div>
                    <div
                      className={`${styles["row-item"]} ${
                        styles["row-item-2"]
                      } ${"desk"}`}
                    >
                      {teams[3]}
                    </div>
                    <div className={`${styles["row-item"]} `}>
                      {teams[0]}
                      {Object.values(findPlayer.bets).map((objValue, index) => {
                        if (
                          teams[0] === objValue &&
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
                      })}
                    </div>
                    <div className={`${styles["row-item"]} ${styles["last"]}`}>
                      {teams[1]}
                      {Object.values(findPlayer.bets).map((objValue, index) => {
                        if (
                          teams[1] === objValue &&
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
                      })}
                      {/* <div className={styles["check"]}></div>
                      <div id={styles["cross"]}>x</div>
                      <div
                        className={styles["picked"]}
                        style={{
                          backgroundColor: `var(--${paramLowerCase})`
                        }}
                      ></div>*/}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
        {betsTablePlayoffs.map((match, index) => {
          return (
            <div key={index}>
              {Object.values(match).map((teams, index) => {
                return (
                  <div className={`${styles["row-playoffs"]}`} key={index}>
                    <div className={`${styles["row-item"]} ${styles["first"]}`}>
                      {index + 10}
                    </div>
                    <div
                      className={`${styles["row-item"]} ${
                        styles["row-item-2"]
                      } ${"desk"}`}
                    >
                      {teams[1]}
                    </div>
                    <div
                      className={`${styles["row-item"]} ${
                        styles["row-item-2"]
                      } ${"desk"}`}
                    >
                      {teams[2]}
                    </div>
                    <div className={`${styles["row-item"]} ${styles["last"]}`}>
                      {Object.keys(findPlayer.bets).map((objKey, index) => {
                        if (objKey === "p1" && objKey === teams[0]) {
                          return <div key={index}>{findPlayer.bets.p1}</div>
                        } else if (objKey === "p2" && objKey === teams[0]) {
                          return <div key={index}>{findPlayer.bets.p2}</div>
                        } else if (objKey === "p3" && objKey === teams[0]) {
                          return <div key={index}>{findPlayer.bets.p3}</div>
                        } else if (objKey === "p4" && objKey === teams[0]) {
                          return <div key={index}>{findPlayer.bets.p4}</div>
                        }
                      })}

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
