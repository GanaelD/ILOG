"use strict";
var Character = /** @class */ (function () {
    function Character(name, yrBirth) {
        this.name = name;
        this.yrBirth = yrBirth;
        this.trackers = [];
        this.location = "unknown";
        Character.characters.push(this);
    }
    Character.prototype.getName = function () { return this.name; };
    Character.prototype.getLocation = function () { return this.location; };
    Character.prototype.setLocation = function (location) {
        var _this = this;
        this.trackers.forEach(function (t) {
            t.moving(_this, location);
        });
        this.location = location;
    };
    Character.prototype.getAge = function (yrNow) { return yrNow - this.yrBirth; };
    Character.prototype.trackedBy = function (tracker) {
        if (tracker)
            this.trackers.push(tracker);
    };
    Character.characters = [];
    return Character;
}());
var Tracker = /** @class */ (function () {
    function Tracker() {
    }
    Tracker.prototype.moving = function (character, locNew) {
        console.log("".concat(character.getName(), " moving from ").concat(character.getLocation(), " to ").concat(locNew));
    };
    return Tracker;
}());
var jean = new Character("Jean NEIGE", 1997);
var tracker = new Tracker();
jean.trackedBy(tracker);
jean.setLocation("Hiverchut");
