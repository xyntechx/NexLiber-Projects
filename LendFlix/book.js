const books = []

class Library {
  constructor(title) {
    this.title = title;
    this.books = []
    this.rented = []
  }

  add(book = {}) {
    this.books.push(book);
  }

  rent(ISBN) {

  }
}

const library = new Library('Genesys Lib')
const libraryee = new Library('Genesys TTTT Lib')
const libraryew = new Library('Genesys JJJ  Lib')

class Book {
  static author;
  constructor(title) {
    this.title = title;
  }

  static showName() {
    console.log('hhhhh')
  }

  run () {

  }
}

const newBook = new Book('TFA')



library.add(newBook)
library.add(new Book('Mastery'))

console.log(library, '\n\n',libraryee, '\n\n', libraryew)

// console.log(thingsFallApart)