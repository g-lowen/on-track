import React, { useState, useEffect, createContext, useContext } from "react"
import axios from "axios"

const AppContext = createContext()

function useAppContext() {
  return useContext(AppContext)
}

function ContextProvider({ children }) {
  const [players, setPlayers] = useState([])
  const [results, setResults] = useState([])

  const context = {
    players: playersContext(),
    results: resultsContext()
  }

  // ------------------------------------------------------
  // PlayerBets Context
  // ------------------------------------------------------
  function playersContext() {
    useEffect(() => {
      const fetchData = async () => {
        await axios.get("/PlayerBets.json").then((result) => {
          setPlayers(result.data.players)
        })
      }

      fetchData()
    }, [])
    return players
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
