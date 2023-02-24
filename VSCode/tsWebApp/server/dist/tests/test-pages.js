"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const supertest_1 = __importDefault(require("supertest"));
const httpcodes_1 = __importDefault(require("../src/httpcodes"));
const books_1 = require("../src/books");
describe("book RESTful API", function () {
    const URL = "http://localhost:8080";
    const contentType = "application/json; charset=utf-8";
    const books = new books_1.Books();
    books.add({
        "title": "Le Chardon et le Tartan",
        "author": "Diana GABALDON"
    });
    books.add({
        "title": "Germinal",
        "author": "Emile ZOLA"
    });
    const book0 = JSON.stringify(books.at(0));
    const allBooks = JSON.stringify(books.all());
    it("get all existing books", function (done) {
        (0, supertest_1.default)(URL)
            .get("/book")
            .set("Accept", "application/json")
            // .expect(resp => {				// intéressant pour tracer
            //     console.log(resp.status)			// le statut de la réponse
            //     console.log(resp.headers)			// ses champs d'entête
            //     console.log(resp.body)			// le corps de réponse
            // })
            .expect("Content-Type", contentType)
            .expect("Content-Length", `${allBooks.length}`)
            .expect(httpcodes_1.default.OK, allBooks, done); // done sur le dernier appel
    });
    it("head all existing books", function (done) {
        (0, supertest_1.default)(URL)
            .head("/book")
            .set("Accept", "application/json")
            .expect("Content-Type", contentType)
            .expect("Content-Length", `${allBooks.length}`)
            .expect(httpcodes_1.default.OK, done);
    });
});
//# sourceMappingURL=test-pages.js.map