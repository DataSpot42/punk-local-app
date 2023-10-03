

export const createPunk = async (punk) => {
    
    /* console.log(punk.items[0]) */
    // pass paramter to function
    // create new object with 'text' key (depending on your Model)
    let obj = { orderNum: punk.orderNum,
        custName: punk.custName,
        // items: [{}]
        items: [{
            item: 0,    
            productID: 0,
            productName: "0",
            productImage: "0",
            quantity: 0,
            price: 0
    }]}
    console.log(obj)
    localStorage.setItem("punkSave", JSON.stringify(obj));
    let response = JSON.parse(localStorage.getItem('punkSave'));
    let data = await response
    console.log(data)
    return JSON
}
