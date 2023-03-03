import { Book, IBookDocument } from "./bookschema"
import { connect, disconnect } from "./connectdb"

(async () => {
    connect()
    try {
        const flt = {title: "Germinal", author: "Emile ZOLA"}
        const deleted = await Book.findOneAndDelete(flt)
        console.log(`Deleted document: ${deleted}`)
    } catch(e) {
        console.error(`MongoError ${e.code}: ${e.message}`)
    } finally {
        disconnect()
    }
})();