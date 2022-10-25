import styles from "./Player.module.css"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useAppContext } from "../communication/Context"

function Player() {
  const param = useParams().playerName
  const paramLowerCase = param.toLowerCase()
  const navigate = useNavigate()
  const { playerBets } = useAppContext().context
  const contentRef = useRef("")
  const [isLoading, setIsLoading] = useState(true)

  playerBets.forEach((player) => {
    if (!player.playerInfo.name === param) return
    // setPlayerImage(param)
    // return playerBets

    // console.log(player.playerInfo.name)
  })

  const findPlayer = playerBets.find(
    (player) => player.playerInfo.name === param
  )
  const something = []
  Object.keys(findPlayer.bets).map((test) => {
    // console.log(test)
    if (test.startsWith("p")) {
      // console.log(test)
      something.push(test)
    }
  })
  console.log(something)

  // console.log(findPlayer.bets)
  const playerImage = findPlayer.playerInfo.iconLarge

  const betsTableGroup = [
    {
      g11: [
        "Marie Agerhäll & Fritte Fritzson",
        "Hanna Hellquist & Ina Lundström",
        "18 november 2022",
        "Gruppspel"
      ],
      g12: [
        "Hanna Hellquist & Ina Lundström",
        "Niklas Källner & Lena Nordlund",
        "26 november 2022",
        "Gruppspel"
      ],
      g13: [
        "Niklas Källner & Lena Nordlund",
        "Marie Agerhäll & Fritte Fritzson",
        "2 december 2022",
        "Gruppspel"
      ],
      g21: [
        "Christopher Garplind & Emma Peters",
        "Hasse Aro & Camilla Läckberg",
        "16 december 2022",
        "Gruppspel"
      ],
      g22: [
        "Hasse Aro & Camilla Läckberg",
        "Cecilia Düringer & Jonatan Unge",
        "23 december 2022",
        "Gruppspel"
      ],
      g23: [
        "Cecilia Düringer & Jonatan Unge",
        "Christopher Garplind & Emma Peters",
        "30 december 2022",
        "Gruppspel"
      ],
      g31: [
        "Jason Diakité & Marcus Samuelsson",
        "Marit Bergman & Karin Bojs",
        "6 januari 2023",
        "Gruppspel"
      ],
      g32: [
        "Johar Bendjelloul & Josefin Johansson",
        "Jason Diakité & Marcus Samuelsson",
        "13 januari 2023",
        "Gruppspel"
      ],
      g33: [
        "Marit Bergman & Karin Bojs",
        "Johar Bendjelloul & Josefin Johansson",
        "20 januari 2023",
        "Gruppspel"
      ]
    }
  ]

  const betsTablePlayoffs = [
    {
      p1: ["Marit Bergman & Karin Bojs", "27 januari 2023", "Andra chansen"],
      p2: ["-", "3 februari 2023", "Semifinal"],
      p3: ["-", "10 februari 2023", "Semifinal"],
      p4: ["-", "17 februari 2023", "Final"]
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
        <h1
          className={`${styles["player-heading"]}`}
          style={{ color: `var(--${paramLowerCase})` }}
        >
          {param}
        </h1>
        <img
          className={`${styles["player-icon"]}`}
          src={playerImage}
          alt="Icon"
        />
        <p
          className={styles["player-text"]}
          style={{ color: `var(--${paramLowerCase})` }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          ducimus enim consequatur dolore fugiat illum excepturi illo pariatur
          repellendus distinctio sed, neque, ab incidunt laborum expedita
          deserunt totam necessitatibus modi.
        </p>
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
                      <div
                        className={styles["picked"]}
                        style={{
                          backgroundColor: `var(--${paramLowerCase})`
                        }}
                      ></div>
                    </div>
                    <div className={`${styles["row-item"]} ${styles["last"]}`}>
                      {teams[1]}
                      {/* jämföra med resultatet ? x : x > default */}
                      {/* <div id={styles["cross"]}>x</div> */}
                      <div className={styles["check"]}></div>
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
                // console.log(teams)
                // console.log("Här", Object.values(findPlayer.bets))
                // Object.values(findPlayer.bets).map((m) => {
                //   console.log("m", m)
                //   console.log("teams[0]", teams[0])
                //   if (m === teams[0]) {
                //     console.log(m)
                //     test = m
                //   }
                //   return test
                // })
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
                      {}

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
