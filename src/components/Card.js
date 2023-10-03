

const Card = ({ punk, deleteHandler, subQPunkHandler, addQPunkHandler }) => {

    return (
        <div className='card_item'>
            <div className="card_inner">
                <img className='card_img' src={punk.productImage} alt="" />
            </div>
            <div className="detail-box">
            <div className="beerName">{punk.productName}</div>
            <div>£{punk.price}</div>
            <div>Quantity: {punk.quantity}</div>
            </div>
            
            <p className="buttonSpace">
                <button className="smbtnLinks" onClick={() => deleteHandler(punk)}>delete</button>
                <button className="smbtnLinks" onClick={() => addQPunkHandler(punk)}>Add</button>
                <button className="smbtnLinks" onClick={() => subQPunkHandler(punk)}>Subtract</button>
            </p>
        </div>

    )
}
export default Card