import express, { Request, Response } from "express"
import HTTP from "./httpcodes.js"
import { Books, IBook } from "./books.js"
import bodyParser from "body-parser"
import cors from "cors"

// obtient l'application ExpressJS
const app = express()
app.use(express.static("../dist"));

app.use(cors({
    optionsSuccessStatus: HTTP.OK,
    methods: "DELETE,GET,HEAD,OPTIONS,POST,PUT"
}))

// configure le parsing json du corps de request
const jsonParser = bodyParser.json()
app.use(jsonParser)


// instancie la ressource "collection de IBooks"
// qui empêche la création de doublons et
// simule en RAM la base de données.
const books = new Books()

// Ajout de 2 éléments présents initialement
books.add({
    "title": "Le Chardon et le Tartan",
    "author": "Diana GABALDON"
})
books.add({
    "title": "Germinal",
    "author": "Emile ZOLA"
})

interface IData {
    [key: string]: IBook
}

function array2map(books: IBook[]): IData {
    const res: IData = {}
    for (let key in books) {
        res[key] = books[key]
    }
    return res
}

console.log(array2map(books.all()))

// association d'une méthode (GET), d'une route (/book) et d'une lambda de traitement
app.get("/book", (req, resp) => {
    resp.type("json")				    // quel champ d'entête cela crée-t-il ?
    const all = books.all()		        // obtient les 2 IBooks
    const map = array2map(all)
    resp.status(HTTP.OK)		        // envoie le statut HTTP
    resp.send(map)				        // envoie les 2 IBooks au format json
})

app.get("/book/:id", (req, resp) => {
    resp.type("json")
    const id = req.params.id;
    const bk0 = books.at(parseInt(id))
    if (bk0 == undefined) {
        resp.status(HTTP.NOT_FOUND)
        resp.send()
    } else {
        resp.status(HTTP.OK)
        resp.send(bk0)
    }
})

app.post("/book/:id", (req, resp) => {
    resp.header("Allow", "DELETE,GET,HEAD,PUT")
    resp.status(HTTP.METHOD_NOT_ALLOWED)
    resp.send()
})

app.post("/book", (req, resp) => {
    const jsBook = req.body
    console.log(`json = ${jsBook}`)
    const id = books.add(jsBook)
    console.log(id)
    if (id >= 0) {
        console.log(`post /book : created book ${id}`);
        resp.header("location", `/book/${id}`)
        resp.status(HTTP.CREATED)
    } else {
        console.log(`post /book : existing book ${id}`);
        resp.header("location", `/book/${-id - 1}`)
        resp.status(HTTP.SEE_OTHER)
    }
    resp.send()
})
app.put("/book", (req, resp) => {
    resp.header("Allow", "GET, HEAD, POST")
    resp.status(HTTP.METHOD_NOT_ALLOWED)
    resp.send()
})
app.put("/book/:id", (req, resp) => {
    const idReq = parseInt(req.params.id)
    const jsBook = req.body
    console.log(`idReq = ${idReq} : ${jsBook}`)
    const id = books.add(jsBook, idReq)
    console.log(id)
    if (id >= 0) {
        if (id == idReq) {
            resp.header("location", `/book/${id}`)
            resp.status(HTTP.CREATED)
        } else {
            console.log(`not modified, id=${id}, idReq=${idReq}`);
            resp.status(HTTP.NOT_MODIFIED)
        }
    } else {
        const idEx = -id - 1
        if (idReq == idEx) {
            resp.status(HTTP.NOT_MODIFIED)
        } else {
            console.log(`see other, id=${id}, idReq=${idReq}`);
            console.log(`put existing /book/${idEx}`);
            resp.header("location", `/book/${idEx}`)
            resp.status(HTTP.SEE_OTHER)
        }
    }
    resp.send()
})
app.delete("/book", (req, resp) => {
    resp.header("Allow", "GET, HEAD, POST")
    resp.status(HTTP.METHOD_NOT_ALLOWED)
    resp.send()
})
app.delete("/book/:id", (req, resp) => {
    const idReq = parseInt(req.params.id)
    const bRemoved = books.remove(idReq)
    resp.status(bRemoved ? HTTP.NO_CONTENT : HTTP.NOT_FOUND)
    resp.send()
})
// app.options("/book", (req, resp) => {
//     resp.header("Allow", "DELETE,GET,HEAD,OPTIONS,POST,PUT")
//     resp.status(HTTP.OK)
//     resp.send()
// })

app.listen(8080, () => {			    // lancement du serveur sur le port 8080
    console.log("Listening on port 8080.");
})
