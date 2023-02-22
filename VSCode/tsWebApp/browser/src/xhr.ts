interface RequestStateHandler {
    (this: XMLHttpRequest, ev: Event): any
}

enum HTTP {
    CONTINUE = 100, SWITCHING_PROTOCOLS = 101, PROCESSING = 102, OK = 200, CREATED = 201, ACCEPTED = 202, NON_AUTHORITATIVE_INFORMATION = 203, NO_CONTENT = 204, RESET_CONTENT = 205, MULTIPLE_CHOICES = 300, MOVED_PERMANENTLY = 301, FOUND = 302, SEE_OTHER = 303, NOT_MODIFIED = 304, USE_PROXY = 305, SWITCH_PROXY = 306,
    TEMPORARY_REDIRECT = 307,
    BAD_REQUEST = 400, PAYMENT_REQUIRED = 402, FORBIDDEN = 403, NOT_FOUND = 404, METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406, REQUEST_TIMEOUT = 408, CONFLICT = 409, GONE = 410, LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412, PAYLOAD_TOO_LARGE = 413, URI_TOO_LONG = 414, UNSUPPORTED_MEDIA_TYPE = 415,
    EXPECTATION_FAILED = 417,
    UPGRADE_REQUIRED = 426,
    INTERNAL_SERVER_ERROR = 500, NOT_IMPLEMENTED = 501, BAD_GATEWAY = 502, SERVICE_UNAVAILABLE = 503, GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505
}

function requestStateHandler(this: XMLHttpRequest, evt: Event): any {
    if (this.readyState == 4) {
        switch (this.status) {
            case HTTP.OK:
                console.log(this.responseText)
                break;
            default:
                console.log(this.statusText); // pb réponse
        }
    }
}

interface JsonReception {
    (json: string, status: number): void
}

function getBooks(strUrl: string, cb: JsonReception): void {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function (evt: Event): any {
        if (this.readyState == 4) {
            switch (this.status) {
                case HTTP.OK:
                    cb(this.responseText, 0)
                    break;
                default:
                    cb("", this.status)
            }
        }
    }
    try {
        xhr.open("get", strUrl, true)
        xhr.setRequestHeader("Accept", "application/json; charset=UTF-8")
        xhr.send()
    } catch (err) {
        cb("", 1)
    }
}

getBooks("books.json", (json: string, status: number) => {
    console.log(status ? status : json)
})

function geturl(strUrl: string): Promise<string> {
    return new Promise(function (
        resolve: (value: string) => any
        ,
        reject: (reason?: any) => any
    ) {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function(evt: Event): any {
            if (this.readyState == 4) {
                switch (this.status) {
                case HTTP.OK:
                    resolve(this.responseText)
                    break;
                default:
                    reject(this.status)
                }
            }
        }
        try {
            xhr.open("get", strUrl, true)
            xhr.setRequestHeader("Accept", "application/json; charset=UTF-8")
            xhr.send()
        } catch (err) {
            reject(err)
        }
    })
}

function booksNAuthors() {
    geturl("books.json")
        .then(function booksGot(json: string): Promise<string> {
            const books: IBook[] = JSON.parse(json) // Ouais ! 
            return geturl("authors.json") // les auteurs maintenant..
        }).then(function authorsGot(json: string) {
            console.log(JSON.parse(json)) // I'm happy 
        }).catch(function logStatus(status: number) {
            console.log("error : " + status) // Ooops !
        })
}
booksNAuthors()

function booksOoops() {
    geturl("books.json") // hé hé hé (il manque un s)
        .catch(function logStatus(status: number): Promise<string> {
            console.log("error : " + status) // oups !
            return geturl("books.json") // allez on retente le coup des bouquins
        }).then(function booksGot(jsonBooks: string): Promise<string> {
            const books: IBook[] = JSON.parse(jsonBooks) // ben voilà 
            return geturl("authors.json") // les auteurs maintenant
        }).then(function authorsGot(jsonAuthors: string) {
            console.log(JSON.parse(jsonAuthors)) // I'm happy 
        })
}
booksOoops()