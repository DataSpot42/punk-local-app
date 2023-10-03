const API_URL = `http://localhost:4000`

export const deletePunk = async (punk) => {
    console.log(punk)
    
    
    // add url which is for delete
    // add the _id for the ':id' param
    const response = await fetch(`${API_URL}/punk/item/${punk._id}`, {
        // method type?\
        method: 'DELETE',         
        
        headers: {
            
            'Content-Type' : 'application/json'
            
        }
    })
  ;
  const json = await response.json()
    return json
    
}