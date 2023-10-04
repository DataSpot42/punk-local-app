

export const createPunk = async (punk) => {
   
    let obj = { orderNum: punk.orderNum,
        custName: punk.custName,
        
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
