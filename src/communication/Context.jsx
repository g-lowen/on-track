import React, { useState, useEffect, createContext, useContext } from "react"
import axios from "axios"

const AppContext = createContext()

function useAppContext() {
  return useContext(AppContext)
}

function ContextProvider({ children }) {
  const [bettingData, setBettingData] = useState([])
  const [results, setResults] = useState([])

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

  return (
    <AppContext.Provider value={{ context }}>{children}</AppContext.Provider>
  )
}

export { useAppContext, ContextProvider }
