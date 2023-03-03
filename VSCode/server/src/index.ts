import express from "express"
import { Request, Response} from "express"
import HTTP from "./httpcodes"
import { IBook, books } from "./books"
import { Book, IBookDocument } from "./bookschema";

(async () => {
    try {
        await Book.db.collection("books").drop()
        const documents = await Book.insertMany(books)
    } catch (e) {
        console.error(e)
    }
})();

const app = express()
app.use(express.static('browser/dist'))
app.use(express.static('browser'))

import bodyParser from "body-parser"
const jsonParser = bodyParser.json()
app.use(jsonParser)

import cors from "cors"
app.use(cors({
    optionsSuccessStatus: HTTP.OK,
    methods : "DELETE,GET,HEAD,OPTIONS,POST,PUT"
}))

app.get("/book", async (req: Request, resp: Response) => {
    resp.type("json")
    try {
        const books = await Book.find()
        resp.status(HTTP.OK)
        resp.send(books)
    } catch (e) {
        console.error(`MongoError : ${e.message}`)
        resp.status(HTTP.INTERNAL_SERVER_ERROR)
        resp.send()
    }
})

const DUPLICATE_DOCUMENT = 11000

app.post("/book", async (req: Request, resp: Response) => {
    const book: IBook = req.body
    try {
        const doc = await Book.create(book)
        resp.setHeader("Location", `/book/${doc._id}`)
        resp.status(HTTP.CREATED)
        resp.send()
    } catch (e) {
        if (e.code == DUPLICATE_DOCUMENT) {
            try {
                const doc = await Book.findOne(book)
                resp.setHeader("Location", `/book/${doc!._id}`)
                resp.status(HTTP.SEE_OTHER)
                resp.send()
            } catch (err) {
                resp.status(HTTP.INTERNAL_SERVER_ERROR)
                resp.send()
            }
        } else {
            resp.status(HTTP.INTERNAL_SERVER_ERROR)
            resp.send()
        }
    }
})

app.put("/book/:id", async (req: Request, resp: Response) => {
    const book = req.body
    let status = HTTP.INTERNAL_SERVER_ERROR
    try {
        const res = await Book.findByIdAndUpdate(req.params.id, book)
	// res == null si id bien formée mais ne correspond à aucun document
	// sinon res == document avant modification
        resp.status(res == null || (res.title == book.title && res.author == book.author)
            ? HTTP.NOT_MODIFIED
            : HTTP.CREATED)
        resp.send()
    } catch (e) {
        if (e.code == DUPLICATE_DOCUMENT) {
            try {
                const doc = await Book.findOne(book)
                resp.status(HTTP.SEE_OTHER)
                resp.setHeader("Location", `/book/${doc!._id}`)
                resp.send()
            } catch (err) {
                console.error("inconsistent ", err)
                resp.status(HTTP.INTERNAL_SERVER_ERROR)
                resp.send()
            }
        } else {
            resp.status(HTTP.NOT_MODIFIED)
            resp.send()
        }
    }
})

app.delete("/book/:id", async (req: Request, resp: Response) => {
    const id: string = req.params.id
    try {
        const res = await Book.findByIdAndRemove(id)
        resp.status(HTTP.NO_CONTENT)
    } catch (error) {
        resp.status(HTTP.NOT_FOUND)
    } finally {
        resp.send()
    }
})

app.listen(8080, function () {
    console.log("listening on port 8080");
})