import { IBook } from "./books"
import { Book, IBookDocument } from "./bookschema"
import { connect, disconnect } from "./connectdb"

(async () => {
    connect()
    try {
        const books: IBookDocument[] = await Book.find()
        console.log("Books: ", books)
    } catch(e) {
        console.error(`MongoError: ${e.message}`)
    } finally {
        disconnect()
    }
})();