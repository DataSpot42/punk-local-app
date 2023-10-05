

export const editPunk = async (punk) => {
    
    
    localStorage.setItem("punkSave", JSON.stringify(punk));
    
    return punk

}