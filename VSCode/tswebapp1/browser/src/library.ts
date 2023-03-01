// 5.3 post request
// fetch based
async function postPOST() {
    try {
        const respPOST = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                title: "foo",
                body: "bar",
                userId: 1,
            }),
            headers: {
                "Accept": "application/json; charset=UTF-8",
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        if (respPOST.status == HTTP.CREATED || respPOST.status == HTTP.SEE_OTHER) {
            const location = respPOST.headers.get("location")
            console.log(location)
        } else
            throw respPOST.status
    } catch (err) {
        alert(err)
    }
}
postPOST()
