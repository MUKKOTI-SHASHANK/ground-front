import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";
import Vibratoryroller from "./gitpages/Vibratoryroller";


function App() {


  return (
    <BrowserRouter>
     <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path ="techniques/vibratoryroller" element={<Vibratoryroller/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
