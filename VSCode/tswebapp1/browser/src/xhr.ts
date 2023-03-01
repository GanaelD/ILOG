function getBooks(strUrl: string): string {
    const xhr = new XMLHttpRequest()
    try {
        xhr.open("get", strUrl, false)
        xhr.send()
        return xhr.responseText
    } catch (err) {
        return ""
    }
}
const json = getBooks("books.json")
console.log(json)
