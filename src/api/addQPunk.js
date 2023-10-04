

export const addQPunk = async (punk, id) => {
    let obj =
        [{
            item: punk.item,
            productID: punk.productID,
            productName: punk.productName,
            productImage: punk.productImage,
            quantity: punk.quantity + 1,
            price: punk.price

        }]   // subtracts 1 from qunatity of item

    let getData = JSON.parse(localStorage.getItem('punkSave'));  // get data from local storage
    
    for (let i = 0; i < getData.items.length; i++) {
        if (getData.items[i].productID === obj[0].productID) // find seleted item from storage
        {getData.items[i] = obj[0]
              // update quanitiy
        }
    }
  
    
    

    localStorage.setItem("punkSave", JSON.stringify(getData));  // store in localstorage
    let response = JSON.parse(localStorage.getItem('punkSave'));

    return response
}
