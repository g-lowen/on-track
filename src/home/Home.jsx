import styles from "./Home.module.css"
import { useAppContext } from "../communication/Context"

function Home() {
  const { results, playerBets } = useAppContext().context
  console.log("Results in home: ", results)
  console.log("PlayerBets in home: ", playerBets)
  return (
    <div className={`${styles["home"]}`}>
      {playerBets.map((player, index) => {
        console.log(player)
        return <div key={index}>{player.player}</div>
      })}
    </div>
  )
}

export default Home
