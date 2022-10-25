import React, { useState, useEffect, createContext, useContext } from "react"
import axios from "axios"

const AppContext = createContext()

function useAppContext() {
  return useContext(AppContext)
}

function ContextProvider({ children }) {
  const [playerBets, setPlayerBets] = useState([])
  const [playerInfo, setPlayerInfo] = useState([])
  const [results, setResults] = useState([])

  const context = {
    playerBets: playerBetsContext(),
    playerInfo: playerInfoContext(),
    results: resultsContext()
  }

  // ------------------------------------------------------
  // PlayerBets Context
  // ------------------------------------------------------
  function playerBetsContext() {
    useEffect(() => {
      const fetchData = async () => {
        await axios.get("/PlayerBets.json").then((result) => {
          setPlayerBets(result.data.players)
        })
      }

      fetchData()
    }, [])
    return playerBets
  }
  function playerInfoContext() {
    useEffect(() => {
      const fetchData = async () => {
        await axios.get("/PlayerBets.json").then((result) => {
          let players = []

          result.data.players.forEach((player) => {
            players.push(player.playerInfo)
          })

          setPlayerInfo(players)
        })
      }

      fetchData()
    }, [])
    return playerInfo
  }

  // ------------------------------------------------------
  // Results Context
  // ------------------------------------------------------
  function resultsContext() {
    useEffect(() => {
      axios.get("/Results.json").then((result) => {
        setResults(result.data.results)
      })
    }, [])
    return results
  }

  return (
    <AppContext.Provider value={{ context }}>{children}</AppContext.Provider>
  )
}

export { useAppContext, ContextProvider }
