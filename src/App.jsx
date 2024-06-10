import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";


function App() {


  return (
    <BrowserRouter>
     <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
