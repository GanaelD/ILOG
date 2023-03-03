import mongoose from "mongoose"
import { connection } from "mongoose"

const url = "mongodb://127.0.0.1:27017/books"

export async function connect() {
    try {
        await mongoose.connect(url)
        console.log(`connected to ${connection.host}:${connection.port}/${connection.db.databaseName}`)
    } catch (e) {
        console.error(`Did not connect to server via ${url}. Error ${e.code} : ${e.message}`)
    }
}

export async function disconnect() {
    if (! connection) {
        return
    }
    try {
        await mongoose.disconnect()
        console.log("Successfully disconnected")
    } catch (e) {
        console.error(`. Error ${e.code} : ${e.message}`)
    }
}

connect();