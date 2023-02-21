"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const books_1 = require("../src/books");
QUnit.module('TestBooks');
const bkOut = {
    title: "Le Chardon et le Tartan",
    author: "Diana GABALDON"
};
const bkGerm = {
    title: "Germinal",
    author: "Emile ZOLA"
};
QUnit.test("Books initially empty", assert => {
    const books = new books_1.Books();
    assert.equal(0, books.size());
});
QUnit.test("Equals same book", assert => {
    const book = {
        title: "Le Chardon et le Tartan",
        author: "Diana GABALDON"
    };
    const books = new books_1.Books();
    assert.equal(true, books.equals(bkOut, book));
});
QUnit.test("Non equals not same book", assert => {
    const books = new books_1.Books();
    assert.equal(false, books.equals(bkOut, bkGerm));
});
QUnit.test("Non equals one book undefined/null", assert => {
    const books = new books_1.Books();
    assert.equal(false, books.equals(undefined, bkGerm));
    assert.equal(false, books.equals(bkOut, undefined));
    assert.equal(false, books.equals(undefined, undefined));
    assert.equal(false, books.equals(null, bkGerm));
    assert.equal(false, books.equals(bkOut, null));
    assert.equal(false, books.equals(null, null));
    assert.equal(false, books.equals(1, bkGerm));
    assert.equal(false, books.equals(bkOut, 1));
    assert.equal(false, books.equals(1, 1));
});
QUnit.test("Remove when empty", assert => {
    const books = new books_1.Books();
    assert.equal(false, books.remove(0));
});
QUnit.test("Add undefined/null Book", assert => {
    const books = new books_1.Books();
    let k = books.add(undefined);
    assert.equal(-1, k);
    k = books.add(null);
    assert.equal(-1, k);
    k = books.add(1);
    assert.equal(-1, k);
    assert.equal(0, books.size());
});
QUnit.test("Get existing book at key", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    assert.equal(bkOut, books.at(k1));
    assert.equal(bkGerm, books.at(k2));
});
QUnit.test("Get non existing book)", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    assert.equal(undefined, books.at(NaN));
    assert.equal(undefined, books.at(undefined));
    assert.equal(undefined, books.at(null));
    assert.equal(undefined, books.at(2));
    for (let k = 0; k < 10; k++)
        assert.equal(undefined, books.at(-k - 1));
});
QUnit.test("Modify non existing book", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    assert.equal(-1, books.add(bkGerm, NaN));
    assert.equal(-1, books.add(bkGerm, null));
    for (let k = 0; k < 10; k++)
        assert.equal(-1, books.add(bkGerm, -k - 1));
    assert.equal(2, books.size());
});
QUnit.test("Modify undefined/null Book", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    let k = books.add(undefined, k1);
    assert.equal(-1, k);
    k = books.add(null, k1);
    assert.equal(-1, k);
    k = books.add(1, k1);
    assert.equal(-1, k);
    assert.equal(1, books.size());
});
QUnit.test("Get keyOf undefined/null", assert => {
    const books = new books_1.Books();
    assert.equal(-1, books.keyOf(undefined));
    assert.equal(-1, books.keyOf(null));
    assert.equal(-1, books.keyOf(1));
});
QUnit.test("Remove undefined/null", assert => {
    const books = new books_1.Books();
    assert.equal(false, books.remove(NaN));
    assert.equal(false, books.remove(undefined));
    assert.equal(false, books.remove(null));
});
QUnit.test("Add a Book", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    assert.equal(1, books.size());
    assert.equal(true, k1 >= 0);
});
QUnit.test("Add a Book with key ", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm, 10);
    assert.equal(2, books.size());
    assert.equal(true, k2 == 10);
});
QUnit.test("Add same Book", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    assert.equal(1, books.size());
    const k2 = books.add(bkOut);
    assert.equal(1, books.size());
    assert.equal(true, k2 < 0);
    assert.equal(-k1 - 1, k2);
});
QUnit.test("Add same Book same key", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    assert.equal(1, books.size());
    const k2 = books.add(bkOut, k1);
    assert.equal(1, books.size());
    assert.equal(true, k2 < 0);
    assert.equal(-k1 - 1, k2);
});
QUnit.test("Add same Book with other key", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    assert.equal(1, books.size());
    const k2 = books.add(bkOut, 10);
    assert.equal(1, books.size());
    assert.equal(true, k2 < 0);
    assert.equal(-k1 - 1, k2);
});
QUnit.test("Modify existing book", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    assert.equal(1, books.size());
    const k2 = books.add(bkGerm, k1);
    assert.equal(1, books.size());
    assert.equal(k1, k2);
});
QUnit.test("Add 2 different Books", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    assert.equal(1, books.size());
    assert.equal(true, k1 >= 0);
    const k2 = books.add(bkGerm);
    assert.equal(2, books.size());
    assert.equal(true, k2 >= 0);
    assert.equal(true, k1 != k2);
});
QUnit.test("Remove existing book", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    assert.equal(true, books.remove(k1));
    assert.equal(1, books.size());
});
QUnit.test("Get book at removed key", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    books.remove(k1);
    assert.equal(undefined, books.at(k1));
});
QUnit.test("Get existing book after removal", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    books.remove(k1);
    assert.equal(bkGerm, books.at(k2));
});
QUnit.test("size after removal", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    books.remove(k1);
    assert.equal(1, books.size());
});
QUnit.test("Remove non existing book", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    assert.equal(false, books.remove(NaN));
    assert.equal(false, books.remove(2));
    for (let k = 0; k < 10; k++)
        assert.equal(false, books.remove(-k - 1));
});
QUnit.test("Get keyOf existing book", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    assert.equal(k1, books.keyOf(bkOut));
});
QUnit.test("Get keyOf non existing book", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    books.remove(k1);
    assert.equal(-1, books.keyOf(bkOut));
});
QUnit.test("Get keyOf book after removal", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    books.remove(k1);
    assert.equal(k2, books.keyOf(bkGerm));
});
QUnit.test("Get all books", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    const list = books.all();
    assert.equal(2, list.length);
    assert.equal(true, list.indexOf(bkOut) != -1);
    assert.equal(true, list.indexOf(bkGerm) != -1);
});
QUnit.test("Get all books after removal", assert => {
    const books = new books_1.Books();
    const k1 = books.add(bkOut);
    const k2 = books.add(bkGerm);
    books.remove(k1);
    const bkOnly = books.all()[0];
    const bkRemaining = books.at(k2);
    assert.equal(true, books.equals(bkRemaining, bkOnly));
});
//# sourceMappingURL=testbooks.js.map