

export const subQPunk = async (punk) => {
    let obj =
        [{
            item: punk.item,
            productID: punk.productID,
            productName: punk.productName,
            productImage: punk.productImage,
            quantity: punk.quantity - 1,
            price: punk.price

        }]   // subtracts 1 from qunatity of item

    let getData = JSON.parse(localStorage.getItem('punkSave'));  // get data from local storage
    
    for (let i = 0; i < getData.items.length; i++) {
        if (getData.items[i].productID === obj[0].productID) // find seleted item from storage
        {
            if (obj[0].quantity === 0) {                
                    getData.items.splice(i, 1)
                  //  // if quantity is now 0 then delete item.                 
            }
            else {
                getData.items[i] = obj[0]
            }  // else update quantity
        }
    }
    for (let j = 0; j < getData.items.length; j++) {
        getData.items[j].item = j  //updates item numbering (as number of items may have changed)
    }
    console.log(getData)

    localStorage.setItem("punkSave", JSON.stringify(getData));  // store in localstorage
    let response = JSON.parse(localStorage.getItem('punkSave'));

    return response

}