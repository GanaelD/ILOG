"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});
//Composite key: unique, prevents duplicates
BookSchema.index({ title: 1, author: 1 }, { unique: true });
exports.Book = (0, mongoose_1.model)("book", BookSchema);
//# sourceMappingURL=bookschema.js.map