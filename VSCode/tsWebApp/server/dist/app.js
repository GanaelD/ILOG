"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const httpcodes_1 = __importDefault(require("./httpcodes"));
const books_1 = require("./books");
const app = (0, express_1.default)(); // obtient l'application ExpressJS
const books = new books_1.Books(); // instancie la ressource "collection de IBooks"
// qui empêche la création de doublons et
// simule en RAM la base de données.
books.add({
    "title": "Le Chardon et le Tartan",
    "author": "Diana GABALDON"
});
books.add({
    "title": "Germinal",
    "author": "Emile ZOLA"
});
app.get("/book", (req, resp) => {
    resp.type("json"); // quel champ d'entête cela crée-t-il ?
    const all = books.all(); // obtient les 2 IBooks
    resp.status(httpcodes_1.default.OK); // envoie le statut HTTP
    resp.send(all); // envoie les 2 IBooks au format json
});
app.listen(8080, () => {
    console.log("listening on port 8080");
});
//# sourceMappingURL=app.js.map