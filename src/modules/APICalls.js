const dataURL = 'https://christmasjournal-97fe7-default-rtdb.firebaseio.com'

export const getAll = () => {
    return fetch(`${dataURL}/christList.json`)
        .then(res => res.json())
}

export const addChristList = obj => {
    return fetch(`${dataURL}/christList.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(getAll)
}

export const updateChristList = obj => {
    const updateObj = {
        'title': obj.title
    }
    return fetch(`${dataURL}/christList/${obj.fbid}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateObj)
    })
        .then(getAll)
}