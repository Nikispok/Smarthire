
import Home from "./Home.jsx"
import Login from "./Login.jsx"
import Register from "./Register.jsx"
import Dashboard from "./Dashboard.jsx"
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/dashboard" element={<Dashboard />}/>


  </Routes>
  
  </BrowserRouter>
  )

}

export default App
