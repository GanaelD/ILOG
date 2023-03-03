import { IBook } from "./books"
import { Book, IBookDocument } from "./bookschema"
import { connect, disconnect } from "./connectdb"

const bkGerm: IBook = { title: "Germinal", author: "Emile ZOLA" };

(async () => {
    connect()
    try {
        // créer un document
        const book: IBookDocument = new Book(bkGerm)
        // le sauvegarder dans sa collection
        await book.save()
        console.log(`Added document :`, book)
    } catch (e) {
        console.log(`MongoError : ${e.message}`)
    } finally {
        disconnect()
    }
})();