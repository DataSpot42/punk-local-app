import { useEffect, useState, React } from "react";
import { getPunk } from "../api/getPunk"
import Card from '../components/Card'
import { deletePunk } from "../api/deletePunk";
import { addQPunk } from "../api/addQPunk";
import { subQPunk } from "../api/subQPunk";
import '../components/shopcards.css'
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence, useIsPresent } from "framer-motion";   // animation module


const Basket = () => {
    const isPresent = useIsPresent
    console.log(`Welcome to the Basket`)
    const [punks, setPunks] = useState()


    const navigate = useNavigate()
    const handlerBackToShop = () => {
        navigate(`/Shop/`)   //navigate back to shop with current basket id
    }

    const deleteHandler = async (punk) => {
        // eslint-disable-next-line
        let deleted = await deletePunk(punk)
        let updatedPunks = await getPunk()
        console.log(updatedPunks)
        setPunks(updatedPunks.items)

    };

    const addQPunkHandler = async (punk) => {
        // eslint-disable-next-line
        let added = await addQPunk(punk)    // add one to quanlity
        let updatedPunks = await getPunk()
        updatedPunks = await getPunk()
        setPunks(updatedPunks.items)
    };

    const subQPunkHandler = async (punk) => {
        // eslint-disable-next-line
        let subbed = await subQPunk(punk)    // sub one from quantity
        let updatedPunks = await getPunk()
        updatedPunks = await getPunk()
        setPunks(updatedPunks.items)

    };

    useEffect(() => {
        const fetchPunks = async () => {
            let data = await getPunk()   //get items from storage
            setPunks(data.items)


        }
        fetchPunks()
    }, [])
    
    let total = 0
    if (!punks) return <h1>loading...</h1>
    for (let k = 0; k < punks.length; k++) {
        total = total + (punks[k].price * punks[k].quantity)  // works out price

    }
    return (
        <div>
            <button className="smbtnLinks" onClick={() => handlerBackToShop()}>Back to Shop</button>
            <div className="contianer">
                <div className="cards-grid-wrap">
                    <><AnimatePresence>
                        {
                            punks ?
                                punks.slice(1).map((punk, i) => (
                                    <motion.div
                                        layout
                                        variants={{
                                            hidden: (i) => ({
                                                scale: 0,
                                                x: -50 * i,
                                            }),
                                            visable: (i) => ({
                                                scale: 1,
                                                x: 0,
                                                transition: {
                                                    delay: i * 0.025,
                                                },
                                            }),
                                            removed: {
                                                scale: 0
                                            },

                                        }}

                                        initial="hidden"
                                        animate="visable"
                                        exit="removed"
                                        custom={i}
                                        style={{
                                            position: isPresent ? 'static' : 'abosolute '
                                        }}
                                        key={punk.productID}>
                                        {console.log(punk.item, i)}
                                        <Card key={punk.productID} deleteHandler={deleteHandler} addQPunkHandler={addQPunkHandler} subQPunkHandler={subQPunkHandler} punk={punk} />
                                    </motion.div>))
                                : <p>loading...</p>   //displays basket items  
                        }
                    </AnimatePresence>
                    </>

                </div>

            </div>
            <motion.h1> Total £{total}</motion.h1>
        </div>
    );
}
export default Basket

