

export const addPunk = async (punk) => {
    /* console.log(punk.items[0]) */
    // pass paramter to function
    // create new object with 'text' key (depending on your Model)
    let response = JSON.parse(localStorage.getItem('punkSave'));
     // convert to json()
     let data = await response.JSON()

    let obj = { orderNum: data.orderNum,
        custName: data.custName,
        
        /* items: [{
            item: punk.items[0].item,    
            productID: punk.items[0].productID,
            productName: punk.items[0].productName,
            productImage: punk.items[0].productImage,
            quantity: punk.items[0].quantity,
            price: punk.items[0].price
    }] */}
    obj.items.push(punk)
    console.log(obj)
    localStorage.setItem("punkSave", JSON.stringify(obj));
    return JSON
}
