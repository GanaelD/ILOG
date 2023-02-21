interface ITracker {
    moving(character: Character, locNew: string): void
}

class Component {
    protected x: number = 0;
    protected y: number = 0;
    move(x: number, y: number): void {
        this.x = x
        this.y = y
    }
}

class Character extends Component{
    private trackers: Array<ITracker> = []
    static characters: Array<Character> = []
    private _location: string = "unknown"
    constructor(private readonly _name: string, private yrBirth: number) {
        super()
        Character.characters.push(this)
    }
    getAge(yrNow: number): number { return yrNow - this.yrBirth }
    trackedBy(tracker: ITracker) {
        if (tracker)
            this.trackers.push(tracker)
    }
    get name(): string { return this._name }
    get location(): string { return this._location }
    set location(location: string) {
        this.trackers.forEach((t: ITracker) => {
            t.moving(this, location)
        })
        this._location = location
    }}
