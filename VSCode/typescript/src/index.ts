class Tracker implements ITracker {
    moving(character: Character, locNew: string) {
        console.log(`${character.name} moving from ${character.location} to ${locNew}`);
    }
}

let jean = new Character("Jean NEIGE", 1997)
let tracker = new Tracker()
jean.trackedBy(tracker)
jean.location = "Hiverchut"
jean.move(400, 300)