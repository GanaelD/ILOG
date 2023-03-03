"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const httpcodes_1 = __importDefault(require("./httpcodes"));
const books_1 = require("./books");
const bookschema_1 = require("./bookschema");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookschema_1.Book.db.collection("books").drop();
        const documents = yield bookschema_1.Book.insertMany(books_1.books);
    }
    catch (e) {
        console.error(e);
    }
}))();
const app = (0, express_1.default)();
app.use(express_1.default.static('browser/dist'));
app.use(express_1.default.static('browser'));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonParser = body_parser_1.default.json();
app.use(jsonParser);
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)({
    optionsSuccessStatus: httpcodes_1.default.OK,
    methods: "DELETE,GET,HEAD,OPTIONS,POST,PUT"
}));
app.get("/book", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    resp.type("json");
    try {
        const books = yield bookschema_1.Book.find();
        resp.status(httpcodes_1.default.OK);
        resp.send(books);
    }
    catch (e) {
        console.error(`MongoError : ${e.message}`);
        resp.status(httpcodes_1.default.INTERNAL_SERVER_ERROR);
        resp.send();
    }
}));
const DUPLICATE_DOCUMENT = 11000;
app.post("/book", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    try {
        const doc = yield bookschema_1.Book.create(book);
        resp.setHeader("Location", `/book/${doc._id}`);
        resp.status(httpcodes_1.default.CREATED);
        resp.send();
    }
    catch (e) {
        if (e.code == DUPLICATE_DOCUMENT) {
            try {
                const doc = yield bookschema_1.Book.findOne(book);
                resp.setHeader("Location", `/book/${doc._id}`);
                resp.status(httpcodes_1.default.SEE_OTHER);
                resp.send();
            }
            catch (err) {
                resp.status(httpcodes_1.default.INTERNAL_SERVER_ERROR);
                resp.send();
            }
        }
        else {
            resp.status(httpcodes_1.default.INTERNAL_SERVER_ERROR);
            resp.send();
        }
    }
}));
app.put("/book/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    let status = httpcodes_1.default.INTERNAL_SERVER_ERROR;
    try {
        const res = yield bookschema_1.Book.findByIdAndUpdate(req.params.id, book);
        // res == null si id bien formée mais ne correspond à aucun document
        // sinon res == document avant modification
        resp.status(res == null || (res.title == book.title && res.author == book.author)
            ? httpcodes_1.default.NOT_MODIFIED
            : httpcodes_1.default.CREATED);
        resp.send();
    }
    catch (e) {
        if (e.code == DUPLICATE_DOCUMENT) {
            try {
                const doc = yield bookschema_1.Book.findOne(book);
                resp.status(httpcodes_1.default.SEE_OTHER);
                resp.setHeader("Location", `/book/${doc._id}`);
                resp.send();
            }
            catch (err) {
                console.error("inconsistent ", err);
                resp.status(httpcodes_1.default.INTERNAL_SERVER_ERROR);
                resp.send();
            }
        }
        else {
            resp.status(httpcodes_1.default.NOT_MODIFIED);
            resp.send();
        }
    }
}));
app.delete("/book/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const res = yield bookschema_1.Book.findByIdAndRemove(id);
        resp.status(httpcodes_1.default.NO_CONTENT);
    }
    catch (error) {
        resp.status(httpcodes_1.default.NOT_FOUND);
    }
    finally {
        resp.send();
    }
}));
app.listen(8080, function () {
    console.log("listening on port 8080");
});
//# sourceMappingURL=index.js.map