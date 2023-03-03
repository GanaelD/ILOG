import { IBook } from "./books"
import { Document, model, Schema } from "mongoose"

const BookSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    }
})

//Composite key: unique, prevents duplicates
BookSchema.index({title: 1, author: 1}, {unique: true})

export interface IBookDocument extends IBook, Document {
}
export const Book = model<IBookDocument>("book", BookSchema)