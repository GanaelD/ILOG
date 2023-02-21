"use strict";
var assert = chai.assert, expect = chai.expect;
var should = chai.should();
describe("hello suite", function suiteHello() {
    it("should return hello", function () {
        assert.equal("Bonjour TypeScript !", hello("TypeScript"));
    });
    it("should return hello2", function () {
        expect(hello("TypeScript")).to.equal("Bonjour TypeScript !");
    });
    it("should return hello3", function () {
        hello("TypeScript").should.equal("Bonjour TypeScript !");
    });
});
//# sourceMappingURL=testhello.js.map