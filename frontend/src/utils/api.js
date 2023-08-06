class Api {
  constructor(options) {
    this._options = options;
  }

  _checkPrommis(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then((res) => this._checkPrommis(res));
  }

  patchProfileInfo(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  patchAvatar(data) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  //-------------------------------------------------

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then((res) => this._checkPrommis(res));
  }

  postNewCard(data) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  patchEditAvatar(link) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  deleteCard(idCard) {
    return fetch(`${this._options.baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._options.headers,
    }).then((res) => this._checkPrommis(res));
  }

  putlikeCard(idCard) {
    return fetch(`${this._options.baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._options.headers,
    }).then((res) => this._checkPrommis(res));
  }

  deleteLikeCard(idCard) {
    return fetch(`${this._options.baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._options.headers,
    }).then((res) => this._checkPrommis(res));
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '74d0f924-7041-4c9b-b945-e0bc2747bd20',
    'Content-Type': 'application/json',
  },
});

export default api;
