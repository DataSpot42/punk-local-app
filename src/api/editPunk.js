

export const editPunk = async (punk) => {
    console.log(punk)
    
    localStorage.setItem("punkSave", JSON.stringify(punk));
    
    return punk

}