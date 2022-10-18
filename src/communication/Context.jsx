import React, { useState, useEffect, createContext, useContext } from "react"
import axios from "axios"

const AppContext = createContext()

function useAppContext() {
  return useContext(AppContext)
}

function ContextProvider({ children }) {
  const [playerBets, setPlayerBets] = useState([])
  const [results, setResults] = useState([])

  const context = {
    playerBets: playerBetsContext(),
    results: resultsContext()
  }

  // ------------------------------------------------------
  // PlayerBets Context
  // ------------------------------------------------------
  function playerBetsContext() {
    useEffect(() => {
      axios.get("/PlayerBets.json").then((result) => {
        setPlayerBets(result.data.playerBets)
        console.log("PlayerBets: ", result.data.playerBets)
      })
    }, [])
    return playerBets
  }

  // ------------------------------------------------------
  // Results Context
  // ------------------------------------------------------
  function resultsContext() {
    useEffect(() => {
      axios.get("/Results.json").then((result) => {
        setResults(result.data.results)
        console.log("Results: ", result.data.results)
      })
    }, [])
    return results
  }

  return (
    <AppContext.Provider value={{ context }}>{children}</AppContext.Provider>
  )
}

export { useAppContext, ContextProvider }
