import "mocha"
import request from "supertest"
import HTTP from "../src/httpcodes"
import { Books, IBook } from "../src/books.js"

describe("book RESTful API", function () {
    const URL = "http://localhost:8080"
    const contentType = "application/json; charset=utf-8"

    const books = new Books()
    books.add({
        "title": "Le Chardon et le Tartan",
        "author": "Diana GABALDON"
    })
    books.add({
        "title": "Germinal",
        "author": "Emile ZOLA"
    })
    const book0 = JSON.stringify(books.at(0))
    const allBooks = JSON.stringify(books.all())

    it("get all existing books", function (done) {
        request(URL)
            .get("/book")
            .set("Accept", "application/json")
            // .expect(resp => {				// intéressant pour tracer
            //     console.log(resp.status)			// le statut de la réponse
            //     console.log(resp.headers)			// ses champs d'entête
            //     console.log(resp.body)			// le corps de réponse
            // })
            .expect("Content-Type", contentType)
            .expect("Content-Length", `${allBooks.length}`)
            .expect(HTTP.OK, allBooks, done)			// done sur le dernier appel
    })
    it("head all existing books", function (done) {
        request(URL)
            .head("/book")
            .set("Accept", "application/json")
            .expect("Content-Type", contentType)
            .expect("Content-Length", `${allBooks.length}`)
            .expect(HTTP.OK, done)
    })

    it("get existing book", function (done) {
        request(URL)
            .get("/book/0")
            .set("Accept", "application/json")
            .expect("Content-Type", contentType)
            .expect("Content-Length", `${book0.length}`)
            .expect(HTTP.OK, book0, done)
    })
    it("head existing book", function (done) {
        request(URL)
            .head("/book/0")
            .set("Accept", "application/json")
            .expect("Content-Type", contentType)
            .expect("Content-Length", `${book0.length}`)
            .expect(HTTP.OK, done)
    })
    it("get non existing book", function (done) {
        request(URL)
            .get("/book/2")
            .set("Accept", "application/json")
            .expect(HTTP.NOT_FOUND, done)
    })
    it("head non existing book", function (done) {
        request(URL)
            .head("/book/2")
            .set("Accept", "application/json")
            .expect(HTTP.NOT_FOUND, done)
    })
    it("post with id", function (done) {
        request(URL)
            .post("/book/1")
            .set("Content-Type", contentType)
            .send(book0)
            .expect("Allow", "DELETE,GET,HEAD,PUT")
            .expect(HTTP.METHOD_NOT_ALLOWED, done)
    })
    it("post non existing book", function (done) {
        request(URL)
            .post("/book")
            .set("Content-Type", contentType)
            .send(`{
                "title": "Les Misérables",
                "author": "Victor HUGO"
            }`)
            .expect("location", "/book/2")
            .expect(HTTP.CREATED, done)
    })
    it("post existing book", function (done) {
        request(URL)
            .post("/book")
            .set("Accept", "application/json")
            .set("Content-Type", contentType)
            .send(book0)
            .expect(HTTP.SEE_OTHER)
            .expect("location", "/book/0", done)
    })
    it("put on collection", function (done) {
        request(URL)
            .put("/book")
            .set("Content-Type", contentType)
            .send(book0)
            .expect("allow", "GET, HEAD, POST")
            .expect(HTTP.METHOD_NOT_ALLOWED, done)
    })
    it("put non existing book", function (done) {
        request(URL)
            .put("/book/3")
            .set("Accept", "application/json")
            .set("Content-Type", contentType)
            .send(`{
                "title": "la legende des siecles",
                "author": "Victor HUGO"
            }`)
            .expect(HTTP.CREATED, done)
    })
    it("modify existing book", function (done) {
        request(URL)
            .put("/book/3")
            .set("Accept", "application/json")
            .set("Content-Type", contentType)
            .send(`{
                "title": "La légende des siècles",
                "author": "Victor HUGO"
            }`)
            .expect(HTTP.CREATED, done)
    })
    it(`"modify" existing book with same content`, function (done) {
        request(URL)
            .put("/book/3")
            .set("Accept", "application/json")
            .set("Content-Type", contentType)
            .send(`{
                "title": "La légende des siècles",
                "author": "Victor HUGO"
            }`)
            .expect(HTTP.NOT_MODIFIED, done)
    })
    it("modify existing book with book existing on other id", function (done) {
        request(URL)
            .put("/book/2")
            .set("Accept", "application/json")
            .set("Content-Type", contentType)
            .send(book0)
            .expect("location", "/book/0")
            .expect(HTTP.SEE_OTHER, done)
    })
    it("delete existing book", function (done) {
        request(URL)
            .delete("/book/0")
            .expect(HTTP.NO_CONTENT, done)
    })
    it("delete non existing book", function (done) {
        request(URL)
            .delete("/book/0")
            .expect(HTTP.NOT_FOUND, done)
    })
    it("options /book", function (done) {
        request(URL)
            .options("/book")
            .set("Accept", "application/json")
            .expect("Access-Control-Allow-Methods", "DELETE,GET,HEAD,OPTIONS,POST,PUT")
            .expect("Content-Length", "0")
            .expect(HTTP.OK, done)
    })
})

