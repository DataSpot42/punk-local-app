

export const deletePunk = async (punk) => {

    console.log(`delete punk`)
    console.log(punk)
    
    
    let getData = JSON.parse(localStorage.getItem('punkSave'));
    
    console.log(getData)
    for (let i = 0; i < getData.items.length; i++) {
        if (getData.items[i].productID === punk.productID) { console.log(`found the match`);getData.items.splice(i,1) }
    }

    console.log(getData)

    localStorage.setItem("punkSave", JSON.stringify(getData));

    let response = JSON.parse(localStorage.getItem('punkSave'));

    // const response = await fetch(`${API_URL}/punks/item/${id}`, {

    //     // method type?
    //     method: 'PATCH',
    //     // sending body, stringify data
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(getData)
    //     // content type?


    // })
    
    console.log(response)

    return response


}