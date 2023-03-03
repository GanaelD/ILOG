import "./connectdb"
import { IBook } from "./books"
import { Document, Model, Schema, model } from "mongoose"

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
export interface IBookModel extends Model<IBookDocument>{
    findSimple: (this: IBookModel, searched: string) => Promise<IBookDocument[]>
}

const NOT_FOUND = -1
BookSchema.statics.findSimple = async function(this: IBookModel, searched: string) {
    return await Book.find({
        $expr: {
            $ne: [
                NOT_FOUND,
                { $indexOfCP: [
                    { $concat: ["$author", " ", "$title"]},
                    searched
                ]}
            ]
        }
    })
}

export const Book = model<IBookDocument>("book", BookSchema)