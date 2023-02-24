import "mocha"
import request from "supertest"
import HTTP from "../src/httpcodes"
import { Books, IBook } from "../src/books"

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
})