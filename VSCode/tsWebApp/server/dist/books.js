"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
class Books {
    constructor() {
        this.books = [];
    }
    equals(book1, book2) {
        return book1 === book2;
    }
    add(book, key) {
        if (typeof key == "number") {
            this.books.splice(key, 0, book);
            return this.books.length;
        }
        else
            return this.books.push(book);
    }
    keyOf(book) {
        return this.books.indexOf(book);
    }
    remove(key) {
        const tempLength = this.books.length;
        if (key > -1 && key < this.books.length)
            this.books.splice(key, 1);
        return this.books.length == tempLength;
    }
    size() {
        return this.books.length;
    }
    at(key) {
        if (key > -1 && key < this.books.length)
            return this.books[key];
        return undefined;
    }
    all() {
        return this.books;
    }
}
exports.Books = Books;
//# sourceMappingURL=books.js.map