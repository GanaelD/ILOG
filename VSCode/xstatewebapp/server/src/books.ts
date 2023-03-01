export interface IBook {
    "title": string
    "author": string
}

/**
 * Collection of IBook.
 */
export class Books {
    protected books: Array<IBook> = []
    protected cntBooks: number = 0
    /**
     * Wheher IBbooks denotes the same book
     * @param bkCand IBook candidate
     * @param book IBook compared to.
     * @return false if 1/2 books is/are undefined
     * or don't denote the same book
     */
    equals(bkCand: IBook, book: IBook): boolean {
        if (!bkCand || !book || typeof(bkCand)!="object"
            || typeof(book)!="object") return false
        return bkCand.title === book.title &&
            bkCand.author === book.author
    }
    /**
     * Find the key of a same book or -1
     * 
     * @param book to find.
     * @returns Key of a same book or -1
     */
    keyOf(book: IBook): number {
        if (!book || typeof(book) != "object") return -1
        return this.books.findIndex(bkCand =>
            this.equals(bkCand, book))
    }
    size(): number {
        return this.cntBooks
    }
    invalidKey(key: any): boolean {
        return key===null || isNaN(key) || key < 0
    }
    /**
     * Remove the book with specified key if any
     * @param key Key of the book to remove.
     * @return true if removed
     */
    remove(key: number): boolean {
        if (key === undefined || key===null || isNaN(key) || key < 0) return false
        if (this.books[key] == undefined)
            return false
        return this.books[key] = undefined!, this.cntBooks--, true
    }
    /**
     * Add a new book or put specified one.
     * 
     * @param book new book to add
     * @param key Optional key of book to replace.
     * @returns id >= 0 of added/replaced book or -id-1 < 0 of existing IBook
     */
    add(book: IBook, key?: number): number {
        if (!book || typeof(book) != "object") return -1
        const put: boolean = key !== undefined
        if (put && this.invalidKey(key)) return -1
        const iBook = this.keyOf(book)
        const exists = iBook > -1
        if (put) {
            const k = <number>key
            if (exists)
                return -1 - iBook
            if (this.books[k] === undefined)
                this.cntBooks++
            this.books[k] = book
            return k
        }
        if (exists)
            return -1 - iBook
        this.books.push(book)
        this.cntBooks++;
        return this.books.length - 1
    }
    /**
     * Get specified book
     * 
     * @param key key of the book to get.
     * @returns specified book or undefined.
     */
    at(key: number): IBook | undefined {
        return key === undefined || key===null || isNaN(key) || key < 0
            ? undefined
            : this.books[key]
    }
    /**
     * Get all books as an array of IBook.
     * 
     * @returns An array of IBooks.
     */
    all(): Array<IBook> {
        return this.books.filter(bk => bk != undefined)
    }
}
