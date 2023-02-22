class Button implements EventListenerObject {
    static tpl = (name: string): string => `<i class="fa fa-${name}"></i>`
    constructor(protected elt: Element) {
        elt.addEventListener("click", this)
    }
    handleEvent(evt: Event) {
        const target = <Element>evt.target
        console.log(`${evt.type} sur ${target.className}`)

        if (target.classList.contains("fa-plus")) {
            const td = target.parentElement!
            const tr = td.parentElement!
            tr.insertAdjacentHTML("afterend", Book.tpl())
            const trNew = tr.nextElementSibling!
            new Book(trNew)
        }
    }
}

const els = document.querySelectorAll(".fa")

/*el.forEach(element => {
    element.addEventListener("click", (evt: Event) => {
        console.log(`Hello from ${element.className}`)
        var target = evt.target as Element
        if (target.className.includes("fa fa-plus") || target.className.includes("fa fa-times")) {
            console.log(`Target is of type ${target.className}`)
            var asw = target.isSameNode(element) ? "" : "not"
            console.log(`The target is ${asw} the listener`)
        }
    })
}); */

els.forEach(el => {
    new Button(el)
})

class Book {
    static tpl = (): string => `<tr>
	<td>${Button.tpl("plus")}&nbsp;&nbsp;${Button.tpl("times")}</td>
	<td contenteditable="true"></td>
	<td contenteditable="true"></td>
</tr>`
    constructor(protected tr: Element) {
        const btnPlus = tr.querySelector(".fa-plus")!
        new Button(btnPlus)
        const btnDel = tr.querySelector(".fa-times")!
        new Button(btnDel)
    }
}

interface IBook {
    "title": string,
    "author": string
}
const o: IBook = {
    "title": "Le chardon et le tartan",
    "author": "Diana GABALDON"
}

const tr = document.querySelector("tbody > tr")!
tr.children[1].innerHTML = o.title
tr.children[2].innerHTML = o.author

new Book(tr)

function logEvent(this: any, e: any) {
    console.log(this, e.target, e.eventPhase)
}
const divCont = document.querySelector("#cont") !
const btn = document.querySelector(".hello") !
window.addEventListener("click", logEvent, true)
document.body.addEventListener("click", logEvent, true)
divCont.addEventListener("click", logEvent, true)
btn.addEventListener("click", logEvent)