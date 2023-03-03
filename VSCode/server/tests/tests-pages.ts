import "mocha"
import request from "supertest"
import HTTP from "../src/httpcodes"
import { books, IBook } from "../src/books"
import { assert } from "console"
import { expect } from "chai"

describe("book RESTful API", function () {
    const URL = "http://localhost:8080"
    const contentType = "application/json; charset=utf-8"
    const strGerminal = JSON.stringify(books[0])
    const allBooks = JSON.stringify(books)
    let docs: any[] = []
    let urlMiserables = ""
    let urlGerminal = ""
    it("get all existing books", function (done) {
        request(URL)
            .get("/book")
            .set("Accept", "application/json")
            .expect(resp => {
                docs = resp.body
                urlGerminal = `/book/${docs[0]._id}`
                expect(parseInt(resp.headers["content-length"])).gt(0)
                expect(books.length).eq(docs.length)
            })
            .expect("Content-Type", contentType)
            .expect(HTTP.OK, done)
    })
    it("head all existing books", function (done) {
        request(URL)
            .head("/book")
            .set("Accept", "application/json")
            .expect("Content-Type", contentType)
            .expect(HTTP.OK, done)
    })
    it("get existing book", function (done) {
        request(URL)
            .get(urlGerminal)
            .set("Accept", "application/json")
            .expect("Content-Type", contentType)
            .expect(HTTP.OK, done)
    })
    it("head existing book", function (done) {
        request(URL)
            .head(urlGerminal)
            .set("Accept", "application/json")
            .expect("Content-Type", contentType)
            .expect(HTTP.OK, done)
    })
    it("get non existing book", function (done) {
        request(URL)
            .get("/book/1")
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
            .send(strGerminal)
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
            .expect(resp => {
                urlMiserables = resp.headers["location"]
            })
            .expect(HTTP.CREATED, done)
    })
    it("post existing book", function (done) {
        request(URL)
            .post("/book")
            .set("Accept", "application/json")
            .set("Content-Type", contentType)
            .send(strGerminal)
            .expect(HTTP.SEE_OTHER, done)
            .expect("location", urlGerminal)
    })
    it("put on collection", function (done) {
        request(URL)
            .put("/book")
            .set("Content-Type", contentType)
            .send(strGerminal)
            .expect("allow", "GET, HEAD, POST")
            .expect(HTTP.METHOD_NOT_ALLOWED, done)
    })
    it("modify non existing id", function (done) {
        request(URL)
            .put("/book/789456123456789456123456")
            .set("Accept", "application/json")
            .set("Content-Type", contentType)
            .send(`{
                "title": "la legende des siecles",
                "author": "Victor HUGO"
            }`)
            .expect(HTTP.NOT_MODIFIED, done)
    })
    it("modify existing book", function (done) {
        request(URL)
            .put(urlMiserables)
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
            .put(urlMiserables)
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
            .put(urlMiserables)
            .set("Accept", "application/json")
            .set("Content-Type", contentType)
            .send(strGerminal)
            // .expect("location", "/books/0")
            .expect(HTTP.SEE_OTHER, done)
    })
    it("delete existing book", function (done) {
        request(URL)
            .delete(urlMiserables)
            .expect(HTTP.NO_CONTENT, done)
    })
    it("delete non existing book", function (done) {
        request(URL)
            .delete("/book/123")
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