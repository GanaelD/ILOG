namespace fetch {
    const getInit: RequestInit = {
        headers: { "Accept": "application/json; charset=UTF-8" },
        method: "get"
    }

    async function fetchBooks() {
        try {
            let req: Request;
            const respBooks: Response = await fetch("books.json", getInit)
            if (respBooks.status != 200)
                throw respBooks.status
            const { books }: { books: IBook[] } = await respBooks.json()
            console.log(books)
        }
        catch (err) {
            console.log("error : " + err)
        }
    }

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

    const getLib = async (lib: ILibrary, logLib: () => void, logHttp: (status: number) => void) => {
        const json = async (resp: Response) => {
            if (resp.status != 200)
                throw resp.status
            return resp.json()
        }
        try {
            const [{ books }, { authors }] = await Promise.all([
                fetch("books.json", getInit).then<{ books: IBook[] }>(json),
                fetch("authors.json", getInit).then<{ authors: IAuthor[] }>(json)
            ])
            lib.books = books
            lib.authors = authors
            logLib()
        } catch (status: any) {
            logHttp(status)
        }
    }
    const logHttp = (status: number) => console.log(status)
    function useMyLibrary() {
        const mylib: ILibrary = { books: null, authors: null }
        getLib(mylib, () => { console.log(mylib) }, logHttp)
    }
    useMyLibrary()
}