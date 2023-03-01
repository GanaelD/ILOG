const { assert, expect, should } = chai

mocha.setup("bdd")

describe("hello suite", function suiteHello() {
    it("should return hello", function() {
        assert.equal("Bonjour TypeScript !", hello("TypeScript"))
    })
    it("should return hello2", function() {
        expect(hello("TypeScript")).to.equal("Bonjour TypeScript !")
    })
    it("should return hello3", function() {
        hello("TypeScript").should.equal("Bonjour TypeScript !")
    })
})

mocha.run()