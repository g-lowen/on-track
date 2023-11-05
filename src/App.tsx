import { Routes, Route } from "react-router-dom";
import { ContextProvider } from "./communication/Context";
import Home from "./home/Home";
import Player from "./player/Player";
import PageNotFound from "./pageNotFound/PageNotFound";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:playerName" element={<Player />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;
