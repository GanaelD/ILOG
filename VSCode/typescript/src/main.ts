namespace manips {
function hello(compiler: string) {
    return `Hello from ${compiler}`
}
console.log(hello("Typescript"))

let age1: number | undefined
let name1: string | null = null

enum Color {
	White, Black, Brown, Red, Orange, Yellow, Green, Blue, Purple, Grey
}
let colBackground: Color = Color.Blue

enum PropKind {
	Read = 1,
	Write = 4,
	Indexed = "indexed",
}
let kind: PropKind = PropKind.Read

console.log(kind, PropKind[PropKind.Read]) // 1 Read
console.log(PropKind.Write, PropKind[PropKind.Write]) // 4 Write
console.log(PropKind.Indexed) // indexed

const KEY = "key"
type key_t = "key"
type click_t = "click"
type event_t = click_t | key_t
let e1: event_t = KEY

let jean = {
    name : "Jean NEIGE",
    age: 24,
    printName : function() {
        console.log("hello " + this.name)
        console.log(`Hello ${this.name}`)
    }
}
jean.printName()

let hello3 = (name: string) => console.log("hello " + name)
let square = (x: number) => x * x;
hello3(jean.name)

interface ICharacter {
    name: string
    age: number
}
interface Named {
    name: string
}
function hello4(named: Named) {
    console.log("hello " + named.name)
}
let jean3: ICharacter = { name: "Jean NEIGE", age: 24}
hello4(jean3) // pas d'erreur même si age n'hérite pas explicitement de Named
let o = { firstName : "Jean", age : 24 }
// hello4(o) // erreur: propriété name manquante

interface Named2 {
	name: string,
	hello: (named: Named2) => void
}

interface EventHandler {
    (e: event_t): void
}

function addEvtListener(e: event_t, f: EventHandler ) {
    console.log("handler added for ${e} event");
}

function anEventHandler(e: event_t): void {
    if (e == "click") {
        console.log("click handled")
    } else if (e == KEY) {
        console.log("key handled")
    } 
}

addEvtListener("click", anEventHandler);
addEvtListener(KEY, anEventHandler);

function notifyEvent(e: event_t, f: EventHandler): void {
    f(e)
}

interface WordIndex {
	[word: string]: Array<number> | number
}
let wordIndex: WordIndex = {
    "interface" : [28, 75, 152],
    "class" : [30, 102, 215],
    "length": 2
}

let str: keyof ICharacter = "name"
let jean4: ICharacter = { name : "Jean NEIGE", age: 24}		// syntaxe nom
let jean5: ICharacter = { 'name' : "Jean NEIGE", age: 24}	// syntaxe chaîne quotes
let jean6: ICharacter = { "name" : "Jean NEIGE", age: 24}	// syntaxe chaîne guillemets
let jean7: ICharacter = { [str] : "Jean NEIGE", age: 24}	// syntaxe index

interface Shape {
    h: number;
    w: number;
}

interface Shape {
    scale: number;
}

const rect: Shape = { h: 100, w: 100, scale: 1.1 }

interface ICharacter1 { fullName: string, age: number }
let o1 = { fullName: "Jean NEIGE", age: 24, mood: "happy" }
let { fullName, age } = o1 // <==> let fullName = o1.name; let age = o1.age
console.log(fullName, age)
function printAll({ fullName, age }: ICharacter1) {
    console.log(fullName, age)
}
printAll(o1)

let unTuple: [string, number, string] = ["Jean", 24, "happy"]
let tuple2: [string, number] = ["Ned", 55]
let [a, b] = unTuple;
function printTuple([fullName, age]: [string, number]) {
    console.log(fullName, age)
}
//printTuple(unTuple)
printTuple(tuple2)

let tab: Array<number> = [3, 5, 7, 9, 11]
let [c, d] = tab
let [e, f, ...g] = tab

function printArray1([e, f]: Array<number>) {
    console.log(e, f)
}
printArray1(tab)
function printArray2([e, f, ...g]: Array<number>) {
    console.log(e, f, g.length)
}
printArray2(tab)
}