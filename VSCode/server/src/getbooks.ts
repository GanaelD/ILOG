import { Book, IBookDocument } from "./bookschema"
import { connect, disconnect } from "./connectdb"
import { FilterQuery } from "mongoose";

(async () => {
    connect()
    try {
        const flt: FilterQuery<IBookDocument> = {
            title: { $regex: /^L/ }
        }
        const books = await Book.find(flt)
        console.log(`Books: ${books}`)
    } catch(e) {
        console.error(`MongoError ${e.code}: ${e.message}`)
    } finally {
        disconnect()
    }
})();