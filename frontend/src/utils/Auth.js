/*Запросы к серверу для авторизации:
-register - принимает почту и пароль, отправляет запрос регистрации на /signup

-функция login - принимает почту и пароль, отправляет запрос авторизации на /signin . 
  В ответ сервер вернет jwt, который нужно сохранить в localStorage

-функция checkToken - принимает jwt, отправляет запрос на /users/me и возвращает данные пользователя
*/
//export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.bedrein.nomoreparties.co';

// ф-ция проверки результата
function checkPrommis(res) {
  if (res.ok) {
    return res.json();
  }
  // eslint-disable-next-line no-template-curly-in-string
  return Promise.reject('Ошибка: ${res.status}');
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkPrommis(res))
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkPrommis(res))
};

export const checkToken = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
method: 'GET',
headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${token}`
	
}
}).then((res) => checkPrommis(res))
}
