import React, { useState, useEffect, createContext, useContext } from "react"
import axios from "axios"

const AppContext = createContext()

function useAppContext() {
  return useContext(AppContext)
}

function ContextProvider({ children }) {
  const [bettingData, setBettingData] = useState([])
  const [results, setResults] = useState([])

  const betKeys = []

  let sumMatches = 0
  Object.keys(results).forEach(function (key) {
    // Checks if the value is true. If so, +1 to sumMatches
    if (!results[key]) return
    sumMatches += 1
  })

  const context = {
    bettingData: bettingContext(),
    results: resultsContext()
  }

  // ------------------------------------------------------
  // Betting Context
  // ------------------------------------------------------

  function bettingContext() {
    useEffect(() => {
      const fetchData = async () => {
        await axios.get("/PlayerBets.json").then((result) => {
          setBettingData(result.data)
        })
      }

      fetchData()
    }, [])

    return bettingData
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

  useEffect(() => {
    if (bettingData.players) {
      Object.keys(bettingData?.players[0]?.bets).map((betKey) =>
        betKeys.push(betKey)
      )
    }

    bettingData?.players?.forEach((player) => {
      const { playerInfo, bets } = player
      for (let i = 0; i < betKeys.length; i++) {
        if (bets[betKeys[i]] === results[betKeys[i]]) {
          playerInfo.win += 1
          if (betKeys[i].startsWith("g")) {
            playerInfo.points += 1
          } else if (betKeys[i].startsWith("p4")) {
            playerInfo.points += 5
          } else if (betKeys[i].startsWith("p")) {
            playerInfo.points += 3
          }
        } else if (
          bets[betKeys[i]] !== results[betKeys[i]] &&
          results[betKeys[i]] !== false &&
          results[betKeys[i]] !== undefined
        ) {
          playerInfo.loss += 1
        }
        if (!sumMatches) return
        playerInfo.percent = Math.round((playerInfo.win / sumMatches) * 100)
      }
    })

    // default sorting by points
    bettingData?.players?.sort((a, b) =>
      a.playerInfo.points < b.playerInfo.points
        ? 1
        : a.playerInfo.points > b.playerInfo.points
        ? -1
        : 0
    )
  }, [bettingData])

  return (
    <AppContext.Provider value={{ context }}>{children}</AppContext.Provider>
  )
}

export { useAppContext, ContextProvider }
