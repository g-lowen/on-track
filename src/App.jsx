import { Routes, Route } from "react-router-dom"
import { ContextProvider } from "./communication/Context"
import Home from "./home/Home"
import Player from "./player/Player"

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:playerName" element={<Player />}></Route>
        </Routes>
      </div>
    </ContextProvider>
  )
}

export default App
