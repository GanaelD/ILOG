interface IBook {
    title: string | undefined
    author: string | undefined
}

class Books implements IBook {
    
    title: string | undefined
    author: string | undefined
    private books: Array<IBook> = []

    public equals(book1: IBook, book2: IBook) : boolean {
        return book1 === book2
    }

    public add(book: IBook, key?: number ): number{
        if (typeof key == "number") {
            this.books.splice(key, 0, book)
            return this.books.length
        }
        else
            return this.books.push(book)
    }

    public keyOf(book: IBook): number {
        return this.books.indexOf(book)
    }

    public remove(key: number): boolean{
        const tempLength = this.books.length
        if (key > -1 && key < this.books.length)
            this.books.splice(key, 1)
        return this.books.length == tempLength
    }

    public size(): number{
        return this.books.length
    }

    public at(key: number): IBook | undefined {
        if (key > -1 && key < this.books.length)
            return this.books[key]
        return undefined
    }

    public all(): Array<IBook> {
        return this.books
    }
}