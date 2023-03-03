import { Book } from "./bookschema"
import { connect, disconnect } from "./connectdb"

(async () => {
    connect()
    try {
        const dropped = await Book.db.dropCollection("books")
        console.log("Dropped: ", dropped)
    } catch(e) {
        console.error(`MongoError: ${e.message}`)
    } finally {
        disconnect()
    }
})();