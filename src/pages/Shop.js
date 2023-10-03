import '../components/shopcards.css';

import React from 'react';

import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPunk } from "../api/getPunk"
import { editPunk } from "../api/editPunk"
import { useNavigate } from "react-router-dom"
/* import Popup from './popup'; */
import Popup from 'reactjs-popup';
import { motion } from "framer-motion";   // animation module
import ad from '../images/adbanner.jpg';

const Beer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  // eslint-disable-next-line
  let itemNum = 1

  console.log('Welcome to the Shop')
  const handlerNextPage = () => {
    setStart(start + 10)
    setEnd(end + 10)
    if (end >= 80) {
      setStart(0)
      setEnd(10)    // get next 10 products
    }
  }
  const handlerAddBasket = async (product) => {
    console.log(`Add Basket pressed`)
    let obj2 = await getPunk()  // get curent order 
    console.log(obj2)
    itemNum++
    let amount = 1

    let qtyFlag = 0
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
    console.log(obj)
    for (let k = 1; k < obj2.items.length; k++) {
      if (obj.items[0].productID === obj2.items[k].productID) { obj2.items[k].quantity++; qtyFlag++ }
    }
    console.log(qtyFlag)  //check if this item is already in the basket, if so add to quantity
    if (qtyFlag === 0) {
      console.log(`adding an item`)
      obj2.items.push(obj.items[0])
      console.log(obj2)
    } // if not add new item to current itams
    // eslint-disable-next-line
    let response = await editPunk(obj2, id)  // store updated basket in database    

  }
  const handlerGotoBasket = (e) => {

    navigate(`/Basket`)  //goto basket page
  }

  const getBeer = async () => {
    const response = await fetch("https://api.punkapi.com/v2/beers?page=2&per_page=80");
    const data = await response.json();
    const pricedData = data.map((price) => {  //get products from apo
      return {
        price: parseFloat(faker.commerce.price({ min: 10, max: 30, dec: 2 })),
        ...price      // makeup random prices
      }
    });
    setItem(pricedData)   // add prices to API product data
  }

  useEffect(() => {
    getBeer();
  }, []);


  return (
    <div>
      <img className='adbanner' src={ad} alt="Logo"></img>
      <div className='next-btn'>
        <button className='smbtnLinks' onClick={() => handlerNextPage()}> Next Page</button>
        <button className='smbtnLinks' onClick={(e) => handlerGotoBasket(e.target.value)}> Basket</button>
        <div></div>
      </div>
      <div className='contianer'>


        <div className="cards-grid-wrap">

          {
            item.slice(start, end).map((info, index) => {
              return (

                <div className="card_item" key={info.id}>
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
                  <div className='.bottom-btn'>
                    <button classNamee="smbtnLinks" onClick={() => handlerAddBasket(info)} className="smbtnLinks"> Add</button>



                    <Popup trigger={<button className='smbtnLinks'>More Info</button>} position="right center">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="popupclass" >{info.name} <br></br> <br></br> {info.description} </motion.div>
                    </Popup>   {/* Popup for more info */}
                  </div>




                </div>
              )
            })
          }




        </div>

      </div>
    </div>
  );
}

export default Beer
