"use strict";
var manips;
(function (manips) {
    var _a;
    function hello(compiler) {
        return "Hello from ".concat(compiler);
    }
    console.log(hello("Typescript"));
    var age1;
    var name1 = null;
    var Color;
    (function (Color) {
        Color[Color["White"] = 0] = "White";
        Color[Color["Black"] = 1] = "Black";
        Color[Color["Brown"] = 2] = "Brown";
        Color[Color["Red"] = 3] = "Red";
        Color[Color["Orange"] = 4] = "Orange";
        Color[Color["Yellow"] = 5] = "Yellow";
        Color[Color["Green"] = 6] = "Green";
        Color[Color["Blue"] = 7] = "Blue";
        Color[Color["Purple"] = 8] = "Purple";
        Color[Color["Grey"] = 9] = "Grey";
    })(Color || (Color = {}));
    var colBackground = Color.Blue;
    var PropKind;
    (function (PropKind) {
        PropKind[PropKind["Read"] = 1] = "Read";
        PropKind[PropKind["Write"] = 4] = "Write";
        PropKind["Indexed"] = "indexed";
    })(PropKind || (PropKind = {}));
    var kind = PropKind.Read;
    console.log(kind, PropKind[PropKind.Read]); // 1 Read
    console.log(PropKind.Write, PropKind[PropKind.Write]); // 4 Write
    console.log(PropKind.Indexed); // indexed
    var KEY = "key";
    var e1 = KEY;
    var jean = {
        name: "Jean NEIGE",
        age: 24,
        printName: function () {
            console.log("hello " + this.name);
            console.log("Hello ".concat(this.name));
        }
    };
    jean.printName();
    var hello3 = function (name) { return console.log("hello " + name); };
    var square = function (x) { return x * x; };
    hello3(jean.name);
    function hello4(named) {
        console.log("hello " + named.name);
    }
    var jean3 = { name: "Jean NEIGE", age: 24 };
    hello4(jean3); // pas d'erreur même si age n'hérite pas explicitement de Named
    var o = { firstName: "Jean", age: 24 };
    function addEvtListener(e, f) {
        console.log("handler added for ${e} event");
    }
    function anEventHandler(e) {
        if (e == "click") {
            console.log("click handled");
        }
        else if (e == KEY) {
            console.log("key handled");
        }
    }
    addEvtListener("click", anEventHandler);
    addEvtListener(KEY, anEventHandler);
    function notifyEvent(e, f) {
        f(e);
    }
    var wordIndex = {
        "interface": [28, 75, 152],
        "class": [30, 102, 215],
        "length": 2
    };
    var str = "name";
    var jean4 = { name: "Jean NEIGE", age: 24 }; // syntaxe nom
    var jean5 = { 'name': "Jean NEIGE", age: 24 }; // syntaxe chaîne quotes
    var jean6 = { "name": "Jean NEIGE", age: 24 }; // syntaxe chaîne guillemets
    var jean7 = (_a = {}, _a[str] = "Jean NEIGE", _a.age = 24, _a); // syntaxe index
    var rect = { h: 100, w: 100, scale: 1.1 };
    var o1 = { fullName: "Jean NEIGE", age: 24, mood: "happy" };
    var fullName = o1.fullName, age = o1.age; // <==> let fullName = o1.name; let age = o1.age
    console.log(fullName, age);
    function printAll(_a) {
        var fullName = _a.fullName, age = _a.age;
        console.log(fullName, age);
    }
    printAll(o1);
    var unTuple = ["Jean", 24, "happy"];
    var tuple2 = ["Ned", 55];
    var a = unTuple[0], b = unTuple[1];
    function printTuple(_a) {
        var fullName = _a[0], age = _a[1];
        console.log(fullName, age);
    }
    //printTuple(unTuple)
    printTuple(tuple2);
    var tab = [3, 5, 7, 9, 11];
    var c = tab[0], d = tab[1];
    var e = tab[0], f = tab[1], g = tab.slice(2);
    function printArray1(_a) {
        var e = _a[0], f = _a[1];
        console.log(e, f);
    }
    printArray1(tab);
    function printArray2(_a) {
        var e = _a[0], f = _a[1], g = _a.slice(2);
        console.log(e, f, g.length);
    }
    printArray2(tab);
})(manips || (manips = {}));
