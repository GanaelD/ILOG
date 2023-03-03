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
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const url = "mongodb://127.0.0.1:27017/books";
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(url);
            console.log(`connected to ${mongoose_2.connection.host}:${mongoose_2.connection.port}/${mongoose_2.connection.db.databaseName}`);
        }
        catch (e) {
            console.error(`Did not connect to server via ${url}. Error ${e.code} : ${e.message}`);
        }
    });
}
exports.connect = connect;
function disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_2.connection) {
            return;
        }
        try {
            yield mongoose_1.default.disconnect();
            console.log("Successfully disconnected");
        }
        catch (e) {
            console.error(`. Error ${e.code} : ${e.message}`);
        }
    });
}
exports.disconnect = disconnect;
connect();
//# sourceMappingURL=connectdb.js.map