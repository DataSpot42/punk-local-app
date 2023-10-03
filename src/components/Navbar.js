import { Link } from 'react-router-dom'
import './shopcards.css'

import logo from '../images/logo.jpg';

const Navbar = () => {
    return (
        <div className='navBarContainer'> 
            <header>
                
                    
                   
                    <div className='logo'>
                <img src={logo} alt="Logo"></img>
                </div>
                
                <div className='navBar'>
                     <Link className='smbtnLinks'  to='/'>
                        Login
                  
                    </Link>
                    
        </div>
                   {/*  <Link className='navBarItems' to='/shop'>
                        Shop
                    </Link>
                    <Link className='navBarItems' to='/basket'>
                        Basket
                    </Link> */}
                    

            </header>
        </div>
    )
}

export default Navbar