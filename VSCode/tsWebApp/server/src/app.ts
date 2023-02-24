import express from "express"
import { Request, Response } from "express"
import HTTP from "./httpcodes"
import { Books, IBook } from "./books"

const app = express()				// obtient l'application ExpressJS
const books = new Books()			// instancie la ressource "collection de IBooks"
						            // qui empêche la création de doublons et
						            // simule en RAM la base de données.
books.add({					// Ajout de 2 éléments présents initialement
    "title": "Le Chardon et le Tartan",
    "author": "Diana GABALDON"
})
books.add({
    "title": "Germinal",
    "author": "Emile ZOLA"
})

app.get("/book", (req, resp) => {		// association d'une méthode (GET), d'une route (/book) et d'une lambda de traitement
    resp.type("json")				// quel champ d'entête cela crée-t-il ?
        const all = books.all()			// obtient les 2 IBooks
        resp.status(HTTP.OK)			// envoie le statut HTTP
        resp.send(all)				// envoie les 2 IBooks au format json
})

app.listen(8080, () => {			// lancement du serveur sur le port 8080
    console.log("listening on port 8080");
})