"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = HTTP;
//# sourceMappingURL=httpcodes.js.map