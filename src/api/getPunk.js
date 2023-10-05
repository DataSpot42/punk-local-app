

export const getPunk = async (id) => {
    
    let response = JSON.parse(localStorage.getItem('punkSave'));
    let data = await response
    
    return data
}

