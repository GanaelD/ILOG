namespace library {
    interface IBook {
        "title": string
        "author": string
    }
    interface IAuthor {
        "name": string
        "born": string
    }
    interface ILibrary {
        books: IBook[] | null,
        authors: IAuthor[] | null
    }
    const getLibrary = (lib: ILibrary, logLib: () => void, logHttp: (status: number) => void) => {
        lib.books = lib.authors = null
        const got = (json: string, status: number, prop: keyof ILibrary) => {
            if (status == 0) {
                lib[prop] = JSON.parse(json)[prop]
                if (lib.books != null && lib.authors != null)
                    logLib()
            } else
                logHttp(status)
        }
        const gotBooks: JsonReception = (json, status) => got(json, status, "books")
        const gotAuthors: JsonReception = (json, status) => got(json, status, "authors")
        geturl("books.json")
        geturl("authors.json")
    }
    const logHttp = (status: number) => console.log(status)
    function useMyLibrary() {
        const mylib: ILibrary = { books: null, authors: null }
        getLibrary(mylib, () => { console.log(mylib) }, logHttp)
    }
    useMyLibrary()

    async function postPOST() {
        try {
            const respPOST = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify({
                    title: "foo",
                    body: "bar",
                    userId: 1,
                }),
                headers: {
                    "Accept": "application/json; charset=UTF-8",
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            if (respPOST.status == HTTP.CREATED || respPOST.status == HTTP.SEE_OTHER) {
                const location = respPOST.headers.get("location")
                console.log(location)
            } else
                throw respPOST.status
        } catch (err) {
            alert(err)
        }
    }
    postPOST()
}