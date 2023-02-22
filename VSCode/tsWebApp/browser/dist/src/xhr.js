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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HTTP;
(function (HTTP) {
    HTTP[HTTP["CONTINUE"] = 100] = "CONTINUE";
    HTTP[HTTP["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    HTTP[HTTP["PROCESSING"] = 102] = "PROCESSING";
    HTTP[HTTP["OK"] = 200] = "OK";
    HTTP[HTTP["CREATED"] = 201] = "CREATED";
    HTTP[HTTP["ACCEPTED"] = 202] = "ACCEPTED";
    HTTP[HTTP["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    HTTP[HTTP["NO_CONTENT"] = 204] = "NO_CONTENT";
    HTTP[HTTP["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    HTTP[HTTP["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    HTTP[HTTP["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    HTTP[HTTP["FOUND"] = 302] = "FOUND";
    HTTP[HTTP["SEE_OTHER"] = 303] = "SEE_OTHER";
    HTTP[HTTP["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HTTP[HTTP["USE_PROXY"] = 305] = "USE_PROXY";
    HTTP[HTTP["SWITCH_PROXY"] = 306] = "SWITCH_PROXY";
    HTTP[HTTP["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    HTTP[HTTP["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP[HTTP["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HTTP[HTTP["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTP[HTTP["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP[HTTP["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    HTTP[HTTP["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    HTTP[HTTP["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    HTTP[HTTP["CONFLICT"] = 409] = "CONFLICT";
    HTTP[HTTP["GONE"] = 410] = "GONE";
    HTTP[HTTP["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    HTTP[HTTP["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    HTTP[HTTP["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
    HTTP[HTTP["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
    HTTP[HTTP["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    HTTP[HTTP["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    HTTP[HTTP["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
    HTTP[HTTP["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HTTP[HTTP["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    HTTP[HTTP["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    HTTP[HTTP["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    HTTP[HTTP["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    HTTP[HTTP["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
})(HTTP || (HTTP = {}));
function requestStateHandler(evt) {
    if (this.readyState == 4) {
        switch (this.status) {
            case HTTP.OK:
                console.log(this.responseText);
                break;
            default:
                console.log(this.statusText); // pb réponse
        }
    }
}
function getBooks(strUrl, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (evt) {
        if (this.readyState == 4) {
            switch (this.status) {
                case HTTP.OK:
                    cb(this.responseText, 0);
                    break;
                default:
                    cb("", this.status);
            }
        }
    };
    try {
        xhr.open("get", strUrl, true);
        xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");
        xhr.send();
    }
    catch (err) {
        cb("", 1);
    }
}
getBooks("books.json", function (json, status) {
    console.log(status ? status : json);
});
function geturl(strUrl) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (evt) {
            if (this.readyState == 4) {
                switch (this.status) {
                    case HTTP.OK:
                        resolve(this.responseText);
                        break;
                    default:
                        reject(this.status);
                }
            }
        };
        try {
            xhr.open("get", strUrl, true);
            xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");
            xhr.send();
        }
        catch (err) {
            reject(err);
        }
    });
}
function booksNAuthors() {
    geturl("books.json")
        .then(function booksGot(json) {
        var books = JSON.parse(json); // Ouais ! 
        return geturl("authors.json"); // les auteurs maintenant..
    }).then(function authorsGot(json) {
        console.log(JSON.parse(json)); // I'm happy 
    }).catch(function logStatus(status) {
        console.log("error : " + status); // Ooops !
    });
}
booksNAuthors();
function booksOoops() {
    geturl("book.json") // hé hé hé (il manque un s)
        .catch(function logStatus(status) {
        console.log("error : " + status); // oups !
        return geturl("books.json"); // allez on retente le coup des bouquins
    }).then(function booksGot(jsonBooks) {
        var books = JSON.parse(jsonBooks); // ben voilà 
        return geturl("authors.json"); // les auteurs maintenant
    }).then(function authorsGot(jsonAuthors) {
        console.log(JSON.parse(jsonAuthors)); // I'm happy 
    });
}
booksOoops();
function chain() {
    return __awaiter(this, void 0, void 0, function () {
        var books, _a, _b, _c, _d, status_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 3, , 4]);
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, geturl("books.json")];
                case 1:
                    books = _b.apply(_a, [_e.sent()]);
                    console.log("This is the console.log() inside chain()");
                    _d = (_c = console).log;
                    return [4 /*yield*/, geturl("authors.json")];
                case 2:
                    _d.apply(_c, [_e.sent()]);
                    return [3 /*break*/, 4];
                case 3:
                    status_1 = _e.sent();
                    console.log("error : " + status_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
chain();
function chain1() {
    return __awaiter(this, void 0, void 0, function () {
        var books, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, geturl("books.json")];
                case 1:
                    books = _b.apply(_a, [_e.sent()]);
                    console.log("This is the console.log() inside chain1()");
                    _d = (_c = console).log;
                    return [4 /*yield*/, geturl("authors.json")];
                case 2:
                    _d.apply(_c, [_e.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function chain2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                chain1();
            }
            catch (status) {
                console.log("error: ".concat(status));
            }
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=xhr.js.map