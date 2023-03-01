interface JsonReception {
    (json: string, status: number): void
}
function getURL(strUrl: string, cb: JsonReception): void {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(evt: Event): any {
        if (this.readyState == 4) {
            switch (this.status) {
            case 200:
                cb(this.responseText, 0)
                break;
            default:
                cb("", this.status)
            }
        }
    }
    try {
        xhr.open("get", strUrl, true)
        xhr.setRequestHeader("Accept", "application/json; charset=UTF-8")
        xhr.send()
    } catch (err) {
        cb("", 1)
    }  
}
