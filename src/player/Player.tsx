import styles from "./Player.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAppContext } from "../communication/Context";
import PageNotFound from "../pageNotFound/PageNotFound";
import { BetKeys } from "../communication/Context.types";

function Player() {
  const param = useParams().playerName;
  const paramLowerCase = param?.toLowerCase();
  const navigate = useNavigate();
  const { bettingData, results } = useAppContext().context;
  const contentRef = useRef<HTMLButtonElement>(null);
  const findPlayer = bettingData?.players?.find(
    (player) => player.playerInfo.name === param
  );
  const playerImage = findPlayer?.playerInfo?.iconLarge;

  // comparing player bets with results and pushing outcome into a new array
  const betKeys: BetKeys[] = [];
  const correctBets: any[] = [];
  if (findPlayer) {
    Object.keys(findPlayer?.bets).map((betKey) =>
      betKeys.push(betKey as BetKeys)
    );
    for (let i = 0; i < betKeys.length; i++) {
      if (results[betKeys[i]] === false) {
        correctBets.push("Not played");
      } else if (findPlayer?.bets[betKeys[i]] === results[betKeys[i]]) {
        correctBets.push(true);
      } else {
        correctBets.push(false);
      }
    }
  }

  const handleScroll = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {!findPlayer ? (
        <PageNotFound />
      ) : (
        <section className={`${styles["player"]}`}>
          <section className={`${styles["player-section"]}`}>
            <div className={styles["btn-container"]}>
              <button
                className={`${styles["go-back-btn"]}`}
                onClick={() => navigate(-1)}
                style={{ color: `var(--${paramLowerCase})` }}
              >
                x
              </button>
            </div>
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
              {findPlayer?.playerInfo?.lore}
            </p>
            <button
              className={`${styles["skip-content-btn"]} ${"mob"}`}
              onClick={handleScroll}
              ref={contentRef}
            >
              <div
                className={styles["arrow"]}
                style={{
                  borderColor: `var(--${paramLowerCase})`
                }}
              ></div>
            </button>
          </section>
          <section className={`${styles["result-section"]}`}>
            <h2>Track {param}'s bets</h2>
            <div className={`${styles["heading-row"]}`}>
              <div
                className={`${styles["row-item"]} ${"mob"} ${styles["first"]}`}
              >
                #
              </div>
              <div
                className={`${styles["row-item"]} ${styles["first"]} ${"desk"}`}
              >
                Avsnitt
              </div>
              <div className={`${styles["row-item"]} ${"desk"}`}>Datum</div>
              <div className={`${styles["row-item"]} ${"desk"}`}>Matchtyp</div>
              <div className={`${styles["row-item"]} `}>1:a klass</div>
              <div className={`${styles["row-item"]}  ${styles["last"]}`}>
                Dressinen
              </div>
            </div>
            {/* Mapping matches from the groups */}
            {bettingData?.betsTableGroup?.map((match, index) => {
              return (
                <div key={index}>
                  {/* Mapping both teams in each group match */}
                  {Object.values(match).map((teams, index) => {
                    return (
                      <div className={`${styles["row"]}`} key={index}>
                        <div
                          className={`${styles["row-item"]} ${styles["first"]}`}
                        >
                          {index + 1}
                        </div>
                        <div className={`${styles["row-item"]} ${"desk"}`}>
                          {teams[2]}
                        </div>
                        <div className={`${styles["row-item"]} ${"desk"}`}>
                          {teams[3]}
                        </div>
                        <div className={`${styles["row-item"]}`}>
                          {teams[0]}
                          {/* Mapping player bet of each group match (left col) */}
                          {Object.values(findPlayer?.bets).map(
                            (playerBet, index) => {
                              if (
                                correctBets[index] &&
                                teams[0] === playerBet &&
                                JSON.stringify(index) === teams[4] &&
                                correctBets[index] !== "Not played"
                              ) {
                                return (
                                  <div
                                    className={styles["check"]}
                                    key={index}
                                  ></div>
                                );
                              } else if (
                                !correctBets[index] &&
                                teams[0] === playerBet &&
                                JSON.stringify(index) === teams[4]
                              ) {
                                return (
                                  <div id={styles["cross"]} key={index}>
                                    x
                                  </div>
                                );
                              } else if (
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
                                );
                              }
                            }
                          )}
                        </div>
                        <div
                          className={`${styles["row-item"]} ${styles["last"]}`}
                        >
                          {teams[1]}
                          {/* Mapping player bet of each group match (right col) */}
                          {Object.values(findPlayer?.bets)?.map(
                            (playerBet, index) => {
                              if (
                                correctBets[index] &&
                                teams[1] === playerBet &&
                                JSON.stringify(index) === teams[4] &&
                                correctBets[index] !== "Not played"
                              ) {
                                return (
                                  <div
                                    className={styles["check"]}
                                    key={index}
                                  ></div>
                                );
                              } else if (
                                !correctBets[index] &&
                                teams[1] === playerBet &&
                                JSON.stringify(index) === teams[4]
                              ) {
                                return (
                                  <div id={styles["cross"]} key={index}>
                                    x
                                  </div>
                                );
                              } else if (
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
                                );
                              }
                            }
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {/* Mapping matches from the playoffs */}
            {bettingData?.betsTablePlayoffs?.map((match, index) => {
              return (
                <div key={index}>
                  {/* Mapping both teams in each playoff match */}
                  {Object.values(match).map((teams, index) => {
                    return (
                      <div className={`${styles["row-playoffs"]}`} key={index}>
                        <div
                          className={`${styles["row-item"]} ${styles["first"]}`}
                        >
                          {index + 10}
                        </div>
                        <div className={`${styles["row-item"]} ${"desk"}`}>
                          {teams[1]}
                        </div>
                        <div className={`${styles["row-item"]} ${"desk"}`}>
                          {teams[2]}
                        </div>
                        <div
                          className={`${styles["row-item"]} ${styles["last"]}`}
                        >
                          {/* Mapping player bet of each playoff matches */}
                          {Object.keys(findPlayer.bets)?.map(
                            (betKey, index) => {
                              if (betKey === "p1" && betKey === teams[0]) {
                                return (
                                  <span key={index}>
                                    <div>{findPlayer.bets.p1}</div>
                                    {correctBets[9] === "Not played" ? (
                                      <div
                                        className={styles["picked"]}
                                        style={{
                                          backgroundColor: `var(--${paramLowerCase})`
                                        }}
                                      ></div>
                                    ) : correctBets[9] === true ? (
                                      <div className={styles["check"]}></div>
                                    ) : (
                                      correctBets[9] === false && (
                                        <div id={styles["cross"]} key={index}>
                                          x
                                        </div>
                                      )
                                    )}
                                  </span>
                                );
                              } else if (
                                betKey === "p2" &&
                                betKey === teams[0]
                              ) {
                                return (
                                  <span key={index}>
                                    <div>{findPlayer.bets.p2}</div>
                                    {correctBets[10] === "Not played" ? (
                                      <div
                                        className={styles["picked"]}
                                        style={{
                                          backgroundColor: `var(--${paramLowerCase})`
                                        }}
                                      ></div>
                                    ) : correctBets[10] === true ? (
                                      <div className={styles["check"]}></div>
                                    ) : (
                                      correctBets[10] === false && (
                                        <div id={styles["cross"]} key={index}>
                                          x
                                        </div>
                                      )
                                    )}
                                  </span>
                                );
                              } else if (
                                betKey === "p3" &&
                                betKey === teams[0]
                              ) {
                                return (
                                  <span key={index}>
                                    <div>{findPlayer.bets.p3}</div>
                                    {correctBets[11] === "Not played" ? (
                                      <div
                                        className={styles["picked"]}
                                        style={{
                                          backgroundColor: `var(--${paramLowerCase})`
                                        }}
                                      ></div>
                                    ) : correctBets[11] === true ? (
                                      <div className={styles["check"]}></div>
                                    ) : (
                                      correctBets[11] === false && (
                                        <div id={styles["cross"]} key={index}>
                                          x
                                        </div>
                                      )
                                    )}
                                  </span>
                                );
                              } else if (
                                betKey === "p4" &&
                                betKey === teams[0]
                              ) {
                                return (
                                  <span key={index}>
                                    <div>{findPlayer.bets.p4}</div>
                                    {correctBets[12] === "Not played" ? (
                                      <div
                                        className={styles["picked"]}
                                        style={{
                                          backgroundColor: `var(--${paramLowerCase})`
                                        }}
                                      ></div>
                                    ) : correctBets[12] === true ? (
                                      <div className={styles["check"]}></div>
                                    ) : (
                                      correctBets[12] === false && (
                                        <div id={styles["cross"]} key={index}>
                                          x
                                        </div>
                                      )
                                    )}
                                  </span>
                                );
                              }
                            }
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </section>
        </section>
      )}
    </>
  );
}

export default Player;
