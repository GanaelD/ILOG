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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
require("./connectdb");
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
const NOT_FOUND = -1;
BookSchema.statics.findSimple = function (searched) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.Book.find({
            $expr: {
                $ne: [
                    NOT_FOUND,
                    { $indexOfCP: [
                            { $concat: ["$author", " ", "$title"] },
                            searched
                        ] }
                ]
            }
        });
    });
};
exports.Book = (0, mongoose_1.model)("book", BookSchema);
//# sourceMappingURL=bookschema.js.map