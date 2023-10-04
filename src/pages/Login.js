import { useState } from "react"
import { createPunk } from "../api/createPunk"
import { useNavigate } from "react-router-dom"
import { faker } from '@faker-js/faker';
import '../components/shopcards.css'

const Login = () => {
    const [userInput, setUserInput] = useState("")
    const orderNumber =faker.number.int({ min: 1, max: 9999999999 })  // generates random order number
    const navigate = useNavigate()
    const handler = async (e) => {
        e.preventDefault()
        
        let loginArray = {
            orderNum: orderNumber,
            custName: userInput,
            // items: [{item: 0}]          // initialises order with user name
                
     }         
        // eslint-disable-next-line
        let response = await createPunk(loginArray)     
        
        navigate (`/Shop/`)  

    }

    return (
        <div className="log">
            <div className="login-container">
            <h1>
            DRINK MORE BEER TO CELEBRATE. REPEAT FOREVER.
            </h1>
            <h2>WELCOME TO PLANET BREWDOG</h2>
            
           <div className="input-btn">
            <form onSubmit={handler}>
                <input className="input-login"
                type="text"
                placeholder="Whats Your Name?"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <button className="btnLinks" type="submit">Login</button>
               
            </form>
            <h2>DEMO WEBSITE NO INFORMATION IS STORED</h2>
            </div>
            </div>
        </div>
    )
}

export default Login