import { books } from "./books"
import { Book } from "./bookschema"
import { connect, disconnect } from "./connectdb"

(async () => {
    connect()
    try {
        const docs = await Book.insertMany(books)
        console.log(`Inserted books: ${docs}`)
    } catch(e) {
        console.error(`MongoError ${e.code}: ${e.message}`)
    } finally {
        disconnect()
    }
})();