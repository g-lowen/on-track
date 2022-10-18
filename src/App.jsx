import { Routes, Route } from "react-router-dom"
import "./App.css"
import { ContextProvider } from "./communication/Context"
import Home from "./home/Home"
import Navbar from "./navbar/Navbar"
import Player from "./player/Player"

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:playerName" element={<Player />}></Route>
        </Routes>
      </div>
    </ContextProvider>
  )
}

export default App
