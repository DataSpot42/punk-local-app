import Navbar from "./components/Navbar"
import Shop from "./pages/Shop"
import Basket from "./pages/Basket"
import Login from "./pages/Login"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import './components/shopcards.css'
const App = () => {
  return (
    <div className="main">
      <BrowserRouter>
      
        <div className="toDoList">
        <Navbar />
        <Routes>
        <Route
            path='/'
            element={<Login />}
          />
          <Route
            path='/basket'
            element={<Basket />}
          />
          <Route
            path='/shop'
            element={<Shop />}
          />
         
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App