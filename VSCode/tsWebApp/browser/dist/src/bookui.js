"use strict";
var Button = /** @class */ (function () {
    function Button(elt) {
        this.elt = elt;
        elt.addEventListener("click", this);
    }
    Button.prototype.handleEvent = function (evt) {
        var target = evt.target;
        console.log("".concat(evt.type, " sur ").concat(target.className));
        if (target.classList.contains("fa-plus")) {
            var td = target.parentElement;
            var tr_1 = td.parentElement;
            tr_1.insertAdjacentHTML("afterend", Book.tpl());
            var trNew = tr_1.nextElementSibling;
            new Book(trNew);
        }
    };
    Button.tpl = function (name) { return "<i class=\"fa fa-".concat(name, "\"></i>"); };
    return Button;
}());
var els = document.querySelectorAll(".fa");
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
els.forEach(function (el) {
    new Button(el);
});
var Book = /** @class */ (function () {
    function Book(tr) {
        this.tr = tr;
        var btnPlus = tr.querySelector(".fa-plus");
        new Button(btnPlus);
        var btnDel = tr.querySelector(".fa-times");
        new Button(btnDel);
    }
    Book.tpl = function () { return "<tr>\n\t<td>".concat(Button.tpl("plus"), "&nbsp;&nbsp;").concat(Button.tpl("times"), "</td>\n\t<td contenteditable=\"true\"></td>\n\t<td contenteditable=\"true\"></td>\n</tr>"); };
    return Book;
}());
var o = {
    "title": "Le chardon et le tartan",
    "author": "Diana GABALDON"
};
var tr = document.querySelector("tbody > tr");
tr.children[1].innerHTML = o.title;
tr.children[2].innerHTML = o.author;
new Book(tr);
function logEvent(e) {
    console.log(this, e.target, e.eventPhase);
}
var divCont = document.querySelector("#cont");
var btn = document.querySelector(".hello");
window.addEventListener("click", logEvent, true);
document.body.addEventListener("click", logEvent, true);
divCont.addEventListener("click", logEvent, true);
btn.addEventListener("click", logEvent);
//# sourceMappingURL=bookui.js.map