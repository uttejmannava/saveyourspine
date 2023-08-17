import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import './App.css';
import Intro from "./Intro";
import Home from "./Home"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/fix" element={<Home />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
