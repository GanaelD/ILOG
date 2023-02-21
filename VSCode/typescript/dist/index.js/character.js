"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Component = /** @class */ (function () {
    function Component() {
        this.x = 0;
        this.y = 0;
    }
    Component.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Component;
}());
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(_name, yrBirth) {
        var _this = _super.call(this) || this;
        _this._name = _name;
        _this.yrBirth = yrBirth;
        _this.trackers = [];
        _this._location = "unknown";
        Character.characters.push(_this);
        return _this;
    }
    Character.prototype.getAge = function (yrNow) { return yrNow - this.yrBirth; };
    Character.prototype.trackedBy = function (tracker) {
        if (tracker)
            this.trackers.push(tracker);
    };
    Object.defineProperty(Character.prototype, "name", {
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "location", {
        get: function () { return this._location; },
        set: function (location) {
            var _this = this;
            this.trackers.forEach(function (t) {
                t.moving(_this, location);
            });
            this._location = location;
        },
        enumerable: false,
        configurable: true
    });
    Character.characters = [];
    return Character;
}(Component));
//# sourceMappingURL=character.js.map