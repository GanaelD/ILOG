class TableList extends HTMLTableElement {

    public constructor() {
        super()
    }

    public connectedCallback() {

    }
    public attributeChangedCallback(namAttr: string, valNew, valOld) {

    }
    public disconnectedCallback() {

    }
    public adoptedCallback() {

    }
    get data() {
        return this.data
    }
    set data(newData) {
        this.data = newData
    }
    get buttonAdd() {
        return this.buttonAdd
    }
    set buttonAdd(newValue) {
        this.buttonAdd = newValue
    }
    tplButton = (cls: string) => `<i class="${cls}"></i>`;
    tplTable = (props: any) => `<table class="w3-table-all">
    <thead>
        <tr>
            <th><td>${this.tplButton(props.clsAdd)}</th>
            <th>Titre</th>
            <th>Auteur</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>`;
}

{ clsAdd : this.buttonAdd }

customElements.define("table-list", TableList, { "extends": "HTMLTableElement" });

/**
 * Component configuration.
 */
interface IConfig {
	/** button-add="fa fa-plus" */
	clsAdd: string,
	/** button-del="fa fa-times" */
	clsTimes: string,
	/** columns='{ "title" : "Titre", "author" : "Auteur"}' */
	keys: string[]     // [ "title", "author" ]
	headers: string[],  // [ "Titre", "Auteur" ]
}
let getProps = function getProps(): IConfig {
    /* [columns] */
    const jsoColumns = JSON.parse(this.columns)
    return {
        clsAdd: this.buttonAdd,  // [button-add]
        clsTimes: this.buttonDel, // [button-del]
        headers: Object.values(jsoColumns),
        keys: Object.keys(jsoColumns)
    }
}