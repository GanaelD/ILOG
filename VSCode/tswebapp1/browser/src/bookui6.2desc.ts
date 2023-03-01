// manip 6.2 capture (phase descendante)
function logEvent(this: any, e: any) {
    console.log(this, e.target, e.eventPhase)
}
const divCont = document.querySelector("#cont") !
const btn = document.querySelector(".hello") !
window.addEventListener("click", logEvent, true)
document.body.addEventListener("click", logEvent, true)
divCont.addEventListener("click", logEvent, true)
btn.addEventListener("click", logEvent)