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
const bookschema_1 = require("./bookschema");
const connectdb_1 = require("./connectdb");
(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, connectdb_1.connect)();
    try {
        const dropped = yield bookschema_1.Book.db.dropCollection("books");
        console.log("Dropped: ", dropped);
    }
    catch (e) {
        console.error(`MongoError: ${e.message}`);
    }
    finally {
        (0, connectdb_1.disconnect)();
    }
}))();
//# sourceMappingURL=dropbooks.js.map