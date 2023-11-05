// @ts-ignore
import styles from "./Home.module.css";
import { useAppContext } from "../communication/Context";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BetKeys, PlayerInfoKeys } from "../communication/Context.types";

function Home() {
  const { results, bettingData } = useAppContext().context;
  const [switchSort, setSwitchSort] = useState(false);

  // count matches
  let sumMatches = 0;
  Object.keys(results).forEach(function (key) {
    if (!results[key as BetKeys]) return;
    sumMatches += 1;
  });

  // sort table
  function clickHandler(e: any) {
    const sortKey = e.target.value as PlayerInfoKeys;
    console.log({ sortKey });
    if (switchSort === true) {
      bettingData?.players?.sort((a, b) =>
        a.playerInfo[sortKey] < b.playerInfo[sortKey]
          ? 1
          : a.playerInfo[sortKey] > b.playerInfo[sortKey]
          ? -1
          : 0
      );
      setSwitchSort(false);
    } else if (switchSort === false) {
      bettingData?.players?.sort((a, b) =>
        a.playerInfo[sortKey] < b.playerInfo[sortKey]
          ? -1
          : a.playerInfo[sortKey] > b.playerInfo[sortKey]
          ? 1
          : 0
      );
      setSwitchSort(true);
    }
  }

  return (
    <section className={`${styles["home"]}`}>
      <h1>Keeping bets On Track</h1>
      <div className={`${styles["heading-row"]}`}>
        <div
          className={`${styles["row-item-1"]}`}
          style={{ marginLeft: "10px" }}
        >
          <button
            className={`${styles["btn"]} ${styles["link"]}`}
            onClick={clickHandler}
            value="name"
          >
            {switchSort ? <>▲</> : <>▼</>} nmaN
          </button>
        </div>
        <div className={`${styles["row-item"]}`}>
          <button
            className={`${styles["btn"]} ${styles["link"]}`}
            onClick={clickHandler}
            value="name"
          >
            {switchSort ? <>▲</> : <>▼</>} M
          </button>
        </div>
        <div className={`${styles["row-item"]}`}>
          <button
            className={`${styles["btn"]} ${styles["link"]}`}
            onClick={clickHandler}
            value="win"
          >
            {switchSort ? <>▲</> : <>▼</>} W
          </button>
        </div>
        <div className={`${styles["row-item"]}`}>
          <button
            className={`${styles["btn"]} ${styles["link"]}`}
            onClick={clickHandler}
            value="loss"
          >
            {switchSort ? <>▲</> : <>▼</>} L
          </button>
        </div>
        <div className={`${styles["row-item"]} ${"desk"}`}>
          <button
            className={`${styles["btn"]} ${styles["link"]}`}
            onClick={clickHandler}
            value="percent"
          >
            {switchSort ? <>▲</> : <>▼</>} %
          </button>
        </div>
        <div className={`${styles["row-item"]}`}>
          <button
            className={`${styles["btn"]} ${styles["link"]}`}
            onClick={clickHandler}
            value="points"
          >
            {switchSort ? <>▲</> : <>▼</>} P
          </button>
        </div>
      </div>
      {bettingData?.players?.map((player, index) => {
        const { playerInfo } = player;

        return (
          <div className={`${styles["row"]}`} key={index}>
            <Link className={styles["row-item-1"]} to={playerInfo.name}>
              <div
                className={`${styles["row-item-1"]}`}
                style={{ marginLeft: "10px" }}
              >
                {`${index + 1 + ". "}`}
                <img
                  className={`${styles["player-icon"]}`}
                  src={playerInfo.icon}
                  alt="Icon"
                />
                <span className={styles["link"]}>{playerInfo.name}</span>
              </div>
            </Link>
            <div className={`${styles["row-item"]}`}>{sumMatches}</div>
            <div className={`${styles["row-item"]}`}>{playerInfo.win}</div>
            <div className={`${styles["row-item"]}`}>{playerInfo.loss}</div>
            <div className={`${styles["row-item"]}  ${"desk"}`}>
              {playerInfo.percent}%
            </div>
            <div className={`${styles["row-item"]}`}>{playerInfo.points}</div>
          </div>
        );
      })}
    </section>
  );
}

export default Home;
