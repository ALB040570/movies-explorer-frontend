const filter =filterByKeyword(moviesFromServis,isRequest);
        setMoviesFromServis(filter);
        localStorage.setItem('movies', JSON.stringify(filter))