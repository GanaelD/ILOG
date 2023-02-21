"use strict";
var Tracker = /** @class */ (function () {
    function Tracker() {
    }
    Tracker.prototype.moving = function (character, locNew) {
        console.log("".concat(character.name, " moving from ").concat(character.location, " to ").concat(locNew));
    };
    return Tracker;
}());
var jean = new Character("Jean NEIGE", 1997);
var tracker = new Tracker();
jean.trackedBy(tracker);
jean.location = "Hiverchut";
jean.move(400, 300);
//# sourceMappingURL=index.js.map