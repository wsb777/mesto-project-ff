const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
    headers: {
      authorization: '4305860c-01fd-4fb6-abcb-1140ebdec787',
      'Content-Type': 'application/json'
    }
  }
export const getUserData = (user) => {
return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
    })
    .then(res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    }).
    then(res => user = res);
    
}
export const getCards = (cards) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
        })
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        }).
        then(res => cards = res);
        
    }
    
export const editProfileData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
          })
        })
    }

export const addNewCardOnServer = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
            })
        })
    }

export const deleteCardOnServer = (id) => {
    return fetch(`${config.baseUrl}/cards/cardId/${id}`, {
        method: 'DELETE',
        headers: config.headers
        })
    }

    
