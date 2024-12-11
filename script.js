const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('results');

const apiKey = '95317a5023238d4093c5cd608da08216'
const urlBase = 'https://api.themoviedb.org/3/search/movie'
const urlImg = 'https://image.tmdb.org/t/p/w200'

searchButton.addEventListener('click', searchMovies);

function searchMovies() {
    resultContainer.innerHTML = 'Cargando...';
    const searchTerm = searchInput.value.trim(); // trim whitespace

    if (!searchTerm) {
        resultContainer.innerHTML = '<p>Ingresa tu búsqueda correcta</p>'
        return;
    }


    fetch(`${urlBase}?api_key=${apiKey}&query=${searchTerm}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results))
        .catch(error => {
            console.log('Error:', error);
            resultContainer.innerHTML = '<p>Ocurrió un error. Inténtalo nuevamente</p>'
        })
}

function displayMovies(movies) {
    resultContainer.innerHTML = '';

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p>No se encontraron resultados para tu búsqueda</p>'
        return
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        const title = document.createElement('h2')
        title.textContent = movie.title

        const releaseDate = document.createElement('p')
        const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString('en-US');
        releaseDate.textContent = `Fecha de lanzamiento: ${formattedReleaseDate}`;

        const overview = document.createElement('p')
        overview.textContent = movie.overview

        const posterPath = urlImg + movie.poster_path
        const poster = document.createElement('img')
        poster.src = posterPath

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        resultContainer.appendChild(movieDiv)
    })
}