export const baseUrl = 'https://auth.nomoreparties.co';
class Api {
  constructor(config) {
    this._cardsUrl = config.cardsUrl;
    this._userInfoUrl = config.userInfoUrl;
    this._userAvatarUrl = config.userAvatarUrl;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(this._userInfoUrl, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Что-то не так с запросом информации о пользователе');
    });
  }

  editUserInfo(data) {
    return fetch(this._userInfoUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Не удалось изменить информацию о пользователе')
    });
  }

  editUserAvatar(newAvatarUrl) {
    return fetch(this._userAvatarUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newAvatarUrl)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Что-то не так с загрузкой нового аватара')
    });
  }

  getCards() {
    return fetch(this._cardsUrl, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Не удалось отобразить карточки');
    });
  }

  postCard(data) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Не удалось загрузить карточку')
    });
  }

  deleteCard(id) {
    return fetch(`${this._cardsUrl}${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Карточка удалилась криво')
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._cardsUrl}${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Не удалось поставить или удалить лайк')
    });
  }

  register({ password, email }) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Что-то пошло не так')
    })
  }

  login({ password, email }) {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Что-то пошло не так');
    })
  }

  getContent(token) {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Сначала авторизуйтесь');
    });
  }
}

const api = new Api({
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-43/cards/',
  userInfoUrl: 'https://mesto.nomoreparties.co/v1/cohort-43/users/me/',
  userAvatarUrl: 'https://mesto.nomoreparties.co/v1/cohort-43/users/me/avatar/',
  headers: {
    authorization: '0e5254a8-ef3a-48e3-8585-0243a3225307',
    'Content-Type': 'application/json',
  },
});


export default api;