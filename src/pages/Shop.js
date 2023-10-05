import '../components/shopcards.css';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { faker } from '@faker-js/faker';
import { useEffect, useState, useRef} from 'react';
import { getPunk } from "../api/getPunk"
import { editPunk } from "../api/editPunk"
import { useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup';
import { motion, AnimatePresence, useIsPresent } from "framer-motion";   // animation module
import ad from '../images/adbanner.jpg';

const Beer = () => {
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  const [basketNum, setBasketNum] = useState()
  const isPresent = useIsPresent
  const navigate = useNavigate()
  const [item, setItem] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [punks,setPunks] = useState();
  const duration = 300;
  const [prodQty,setProdQty] = useState(0);


  // eslint-disable-next-line
  let itemNum = 1

  
  const handlerNextPage = () => {
    setStart(start + 10)
    setEnd(end + 10)
    if (end >= 80) {
      setStart(0)
      setEnd(10)    // get next 10 products
    }
  }
  const handlerAddBasket = async (product) => {
    setInProp(true)
    let obj2 = await getPunk()  // get current order 
    
    itemNum++
    let amount = 1
    let qtyFlag = 0
    setTimeout(inPropFalse, 500);
    function inPropFalse() {setInProp(false)}
    
    let obj = {
      items: [{
        item: obj2.items.length,
        productID: product.id,
        productName: product.name,
        productImage: product.image_url,
        quantity: amount,
        price: product.price  //format product into Schema layout
      }]
      
    }
    
    for (let k = 1; k < obj2.items.length; k++) {
      if (obj.items[0].productID === obj2.items[k].productID) { obj2.items[k].quantity++; qtyFlag++ }
    }
     //check if this item is already in the basket, if so add to quantity
    if (qtyFlag === 0) {
      obj2.items.push(obj.items[0])
      
    } // if not add new item to current itams
    // eslint-disable-next-line
    let response = await editPunk(obj2)  // store updated basket in database    
    obj2 = await getPunk()
    setBasketNum(obj2.items.length-1)
    let obj3=item
    for (let k=0; k<obj2.items.length; k++) {
      for (let j=0; j<obj3.length; j++)
      if (obj2.items[k].productID===obj3[j].id) {
        obj3[j].quantity=obj2.items[k].quantity
      } 
    }
    console.log(obj3)
    setItem(obj3)   // add prices to API product data
    
  }
  const handlerGotoBasket = (e) => {

    navigate(`/Basket`)  //goto basket page
  }

  const getBeer = async () => {
    console.log('hello again')
    const response = await fetch("https://api.punkapi.com/v2/beers?page=2&per_page=80");
    const data = await response.json();
    const userData = await getPunk()
    setPunks(userData)
    console.log(userData)
    const pricedData = data.map((price) => {  //get products from apo
      return {
        price: parseFloat(faker.commerce.price({ min: 10, max: 30, dec: 2 })),
        ...price      // makeup random prices
      }
    });
    
    for (let k=0; k<userData.items.length; k++) {
      for (let j=0; j<pricedData.length; j++)
      if (userData.items[k].productID===pricedData[j].id) {
        pricedData[j].quantity=userData.items[k].quantity
      } 
    }
    console.log(pricedData)
    setItem(pricedData)   // add prices to API product data
  }

  useEffect(() => {
    getBeer();
    
  }, []);
  
  
  return (
    <div>
      <img className='adbanner' src={ad} alt="Logo"></img>
      <div className='next-btn'>
        {punks ? <h2>Welcome {punks.custName}     </h2> :<></> }
        <button className='smbtnLinks' onClick={() => handlerNextPage()}> Next Page</button>
        
        <button className='smbtnLinks' onClick={(e) => handlerGotoBasket(e.target.value)}>  
        Basket 
           
           
             
      </button>
      <div className="basket">
        <CSSTransition nodeRef={nodeRef} classNames="basketNum" in={inProp} timeout={300}>
      <div ref={nodeRef}>{basketNum}</div>
      </CSSTransition></div>
      
        
      </div>
      <div className='contianer'>


        <div className="cards-grid-wrap">

          {
            item.slice(start, end).map((info, index) => {
              
              return (
                
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.15, duration:0.2}}  className="card_item" key={info.id}>
                  <div className="card_inner">
                    <img className='card_img' src={info.image_url} alt="" />
                  </div>


                  <div className='txtcard'>


                    <div className="gitDetail textcard avb">avb - {info.abv}%</div>
                    <div className="gitDetail textcard vol">{info.volume.value} liters</div>
                  </div>
                  <div className="detail-box">
                    <div className="beerName">{info.name}</div>
                    <div className="gitDetail"> {info.ingredients.malt[0].name}</div>
                    <div className="gitDetail">£{info.price}</div>
                  </div>
                  <div className='bottom-btn'>
                    <button onClick={() => handlerAddBasket(info)} className="smbtnLinks"> Add    {info.quantity}</button>


                    
                    <Popup trigger={<button className='smbtnLinks'>More Info</button>} position="bottom">
                    
                    <AnimatePresence>
                      <motion.div layout
                                        variants={{
                                            hidden: (i) => ({
                                                scale: 0,
                                                y:-100,
                                                x: -1000
                                            }),
                                            visable: (i) => ({
                                                scale: 1,
                                                x: 0,
                                                y: 0,
                                                transition: {
                                                    delay: 0.025,
                                                },
                                            }),
                                            removed: {
                                                scale: 0
                                            },
                                        }}

                                        initial="hidden"
                                        animate="visable"
                                        exit="removed"                                        
                                        style={{
                                            position: isPresent ? 'hidden' : 'visable '
                                        }}                    
                      className="popupclass" >{info.name} <br></br> <br></br> {info.description} </motion.div>
                     </AnimatePresence> 
                    </Popup>
                    
                    
                       {/* Popup for more info */}
                  </div>




                </motion.div>
              )
            })
          }




        </div>

      </div>
    </div>
  );
}

export default Beer
