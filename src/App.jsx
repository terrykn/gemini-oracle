import './App.css';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Info from "./pages/Info";
import Prompt from "./pages/Prompt";
import Response from "./pages/Response";

// use HashRouter because it works 

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/prompt" element={<Prompt />} />
          <Route path="/response" element={<Response />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;