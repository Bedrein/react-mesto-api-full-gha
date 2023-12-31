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
		headers: {
								"Content-Type": "application/json",
								authorization: `Bearer ${localStorage.getItem("token")}`,
		},
    }).then((res) => this._checkPrommis(res));
  }

  patchProfileInfo(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("token")}`,
},
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  patchAvatar(data) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("token")}`,
},
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  //-------------------------------------------------

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("token")}`,
},
    }).then((res) => this._checkPrommis(res));
  }
	

  postNewCard(data) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("token")}`,
},
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  patchEditAvatar(link) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("token")}`,
},
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkPrommis(res));
  }

  deleteCard(idCard) {
    return fetch(`${this._options.baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("token")}`,
},
    }).then((res) => this._checkPrommis(res));
  }

	changeLike(idCard, isLiked) {
		if (!isLiked) {
			return fetch(`${this._options.baseUrl}/cards/${idCard}/likes`, {
				method: 'DELETE',
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("token")}`,
},
			}).then((res) => this._checkPrommis(res));
				}
					else {
						return fetch(`${this._options.baseUrl}/cards/${idCard}/likes`, {
							method: 'PUT',
							headers: {
								"Content-Type": "application/json",
								authorization: `Bearer ${localStorage.getItem("token")}`,
		},
						}).then((res) => this._checkPrommis(res));
					}
		}
}

const api = new Api({
  baseUrl: 'https://api.bedrein.nomoreparties.co',
  //baseUrl: 'http://localhost:3001',

});

export default api;