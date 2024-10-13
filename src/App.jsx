import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";
import Vibratoryroller from "./gitpages/Vibratoryroller";
import PingServer from './components/PingServer';


function App() {


  return (
    <BrowserRouter>
    
     <Routes>
      <Route path="/health" element={<PingServer/>}></Route>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path ="techniques/vibratoryroller" element={<Vibratoryroller/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
