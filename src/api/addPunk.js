

export const addPunk = async (punk) => {
    
    let response = JSON.parse(localStorage.getItem('punkSave'));
     // start a new local storage variable in json format
     let data = await response.JSON() 

    let obj = { orderNum: data.orderNum,
        custName: data.custName,      
        }
    obj.items.push(punk)
    
    localStorage.setItem("punkSave", JSON.stringify(obj));
    return JSON
}
