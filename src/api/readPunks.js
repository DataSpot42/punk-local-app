

export const readPunks = async () => {
    
     let response = JSON.parse(localStorage.getItem('punkSave'));
     // convert to json()
     let data = await response.json()
     // return the data collect from storage 
     return data
}