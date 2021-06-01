// класс Api

class Api {
  constructor() {
    this._baseUrl  = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3000'}`;
    this._usersMe = '/users/me';
    this._movies = '/movies';
    this._likes = '/cards/likes';
    this._avatar = '/users/me/avatar';
    this._signIn = '/signin';
    this._signUp = '/signup';
  }
  //

  //Отправка на сервер данных регистрации пользователя
  register(name, email, password) {

    return fetch(this._baseUrl + this._signUp, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then(this._checkResponse)
  }

  //Отправка на сервер данных для авторизации
  authorize(email, password) {
    return fetch(this._baseUrl + this._signIn, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
  }

  //заполняет заголовок запроса
  setToken(token) {
    this._headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  // запрос для проверки валидности токена
  getContent(token) {
    return fetch(this._baseUrl + this._usersMe, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

    })
    .then(this._checkResponse)
  }
  //Загрузка информации о пользователе с сервера
  getUsersInfo() {
    return fetch(this._baseUrl+this._usersMe, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': "application/json",
      },

    })
    .then(this._checkResponse)
  }
  //Редактирование профиля
  patchUsersInfo(data) {
    return fetch(this._baseUrl+this._usersMe, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
    .then(this._checkResponse)
  }

  //Загрузка сохраненных фильмов
  getSavedMovies() {
    return fetch(this._baseUrl + this._movies, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': "application/json",
      },

    })
    .then(this._checkResponse)
  }

  //Добавление фильма
  postMovie(data) {
    return fetch(this._baseUrl + this._movies, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailer,
        thumbnail: data.thumbnail,
        movieId:data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    })
    .then(this._checkResponse)
  }

  //Удаление фильма
  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}${this._movies}/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': "application/json",
      },
    })
    .then(this._checkResponse)
  }

  _checkResponse(res) {
    return new Promise((resolve, reject) => {
      const func = res.ok ? resolve : reject;
      res.json().then(data => func({'statusCode': res.status, 'data': data}))
      })
  }

}
const api = new Api();


export default api;
