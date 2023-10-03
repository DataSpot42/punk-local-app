

export const getPunk = async (id) => {
    console.log(id)
    let response = JSON.parse(localStorage.getItem('punkSave'));
    let data = await response
    console.log(data)
    return data
}

