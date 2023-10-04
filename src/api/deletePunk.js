

export const deletePunk = async (punk) => {

    console.log(`delete punk`)
    console.log(punk)
    
    
    let getData = JSON.parse(localStorage.getItem('punkSave'));
    
    console.log(getData)
    for (let i = 0; i < getData.items.length; i++) {
        if (getData.items[i].productID === punk.productID) { console.log(`found the match`);getData.items.splice(i,1) }
    }

    
    for (let k = 0; k <getData.items.length; k++) {
        getData.items[k].item = k}
    
    console.log(getData)
    localStorage.setItem("punkSave", JSON.stringify(getData));

    let response = JSON.parse(localStorage.getItem('punkSave'));

   
    console.log(response)

    return response


}