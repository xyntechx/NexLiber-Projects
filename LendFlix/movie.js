/**
 * Simple Movie renting API(An App, a simple one) that lets people rent movies from a movie store. 
 * 
 */

class Movie {
  constructor(title) {
    this.title = title
  }
}

class User {
  constructor() {
    this.name = this.random()
  }

  random() {
      const charSet =
        'ABCDEFGHIJ012KLSTYLERSINMNOPQRSTUVWXYZ345abcdefghijklmnopq6789rstuvwxyz';
      let randomString = '';
      for (let count = 0; count < 10; count += 1) {
        const randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
kP      }
      return randomString;
  }
}

const randomUser = new User();

console.log('\nRandom user has been generated with username as: ', randomUser.name)

class MovieStore {
  #movies;
  #rented;
  constructor(title) {
    this.title = title;
    this.#movies = [] // list of movies in our store
    this.#rented = {
      [randomUser.name]: [] // we only have one user with random generate username as name
    }
  }

  addMovie({ title, totalNumber = 1 }) {
    const _title = title.trim()
    const movie = new Movie(_title)

    const _movie = {
      movie,
      totalNumber // to hold the total number of available movies
    }

    // we did not consider when the movie already exists

    this.#movies.push(_movie);
  }

  getMovies() {
    return this.#movies
  }

  getMovieByTitle(title) {
    const movie = this.#movies.find(_movie => _movie.movie.title.toLowerCase() === title.toLowerCase().trim())

    return movie
  }

  rent(title) {
    const movie = this.getMovieByTitle(title)
    if (!movie || !movie.totalNumber) {
      return 'Movie not found or not available'
    }

    movie.totalNumber = movie.totalNumber - 1

    this.#rented[randomUser.name].push(movie.movie.title.toLowerCase())

    const { totalNumber, ..._movie } = movie
    return _movie
  }

  returnMovie(title) { 
    const movie = this.getMovieByTitle(title)
    if (!movie || !movie.totalNumber) {
      return 'Movie not found or not available'
    }

    // this holds all the movies rented by our random user
    const userMovies = this.#rented[randomUser.name]
    // remove the movie with the provided title from the list of the users movies
    this.#rented[randomUser.name] = userMovies.filter((_movie) => _movie !== movie.movie.title.toLowerCase())

    this.#movies.map((_movie) => {
      if (_movie.movie.title === title) {
        _movie.totalNumber = _movie.totalNumber + 1 // increment tot number of available movies
        return _movie
      }
    })

    return this.getMovies()
   }

   getRentedMovies () {
    return this.#rented
   }
}

console.log('**************Making a new movie store******************')
const movieStore = new MovieStore('New Store in town')
console.log('Successfully made a new movie store', movieStore)

console.log('***********Adding new movies to the store*************\n')
movieStore.addMovie({ title: 'Black Adam', totalNumber: 12 })
movieStore.addMovie({ title: 'Wakanda Forever', totalNumber: 5 })
console.log('Show available movies\n')
console.log(movieStore.getMovies())

console.log('\n***********Renting movies from the store*************\n')
const rented1 = movieStore.rent('Black Adam')
console.log('Successfully rented', rented1)

const rented2 = movieStore.rent('Wakanda Forever')
console.log('Successfully rented', rented2)

console.log('\nGetting all movies')
console.log(movieStore.getMovies())

console.log('Show  rented movies\n')
console.log(movieStore.getRentedMovies(), '\n')

console.log('******returning movies*********')
movieStore.returnMovie('Black Adam')

console.log('Getting all movies')
console.log(movieStore.getMovies())