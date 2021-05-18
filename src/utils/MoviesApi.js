import optionsForApi from './constants';

function MoviesApi() {

//Загрузка фильмов с сервера
  return fetch(`${optionsForApi.serverWithMoviesApiUrl}${optionsForApi.moviesApi}`, {
    method: 'GET',
    headers: {
      // Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': "application/json",
    },
  })
  .then ((res) => {if (res.ok) {
    return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
    })
}

export default MoviesApi;