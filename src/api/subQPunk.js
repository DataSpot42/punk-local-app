const API_URL = `http://localhost:4000`

export const subQPunk = async (punk, id) => {
    console.log(punk)
    let obj = { /* orderNum: punk.orderNum,
        custName: punk.custName, */
        items: [{
            item: punk.item,
            productID: punk.productID,
            productName: punk.productName,
            productImage: punk.productImage,
            quantity: punk.quantity - 1,
            price: punk.price,
            _id:punk._id
        }]
    }
    let getRespose = await fetch(`${API_URL}/punks/item/${id}`)
    let getData = await getRespose.json()
    console.log(getData)
    for (let i = 0; i < getData.items.length; i++) {
        if (getData.items[i]._id === punk._id) { getData.items[i] = obj.items[0] }
    }
    console.log(getData)
    const response = await fetch(`${API_URL}/punks/item/${id}`, {

        // method type?
        method: 'PATCH',
        // sending body, stringify data
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getData)
        // content type?


    })
    const json = await response.json()
    console.log(json)
    return json

}