import HTTP from "./httpcodes.js"
import { getUILogic, IAbstractCell, IAbstractRowDataMap, IContext } from "./uilogic.js";


// templating functions


export class TableList extends HTMLElement implements IContext {
	protected cellEdited: ICell
	protected cellsSaved: IRowData
	protected uiLogic

	constructor() {
		super()
		this.uiLogic = getUILogic(this)
	}
	cancelling(cellCand: IAbstractCell, cellJoining: IAbstractCell): boolean {
		throw new Error("Method not implemented.");
	}
	validating(cellCand: IAbstractCell, cellJoining: IAbstractCell): boolean {
		throw new Error("Method not implemented.");
	}
	getData(): Promise<IAbstractRowDataMap> {
		throw new Error("Method not implemented.");
	}
	putData(cell: IAbstractCell): Promise<string> {
		throw new Error("Method not implemented.");
	}
	addRow(cellRowBefore?: IAbstractCell | undefined) {
		throw new Error("Method not implemented.");
	}
	addRows(data: IAbstractRowDataMap) {
		throw new Error("Method not implemented.");
	}
	currentCell(cell: IAbstractCell) {
		throw new Error("Method not implemented.");
	}
	endEditing() {
		throw new Error("Method not implemented.");
	}
	makeTable() {
		throw new Error("Method not implemented.");
	}
	removeRow(cell: IAbstractCell) {
		throw new Error("Method not implemented.");
	}
	report(err: any) {
		throw new Error("Method not implemented.");
	}
	restoreRow() {
		throw new Error("Method not implemented.");
	}
	saveRow(cell: IAbstractCell) {
		throw new Error("Method not implemented.");
	}
	updateRowId(data: string) {
		throw new Error("Method not implemented.");
	}
}

interface ICell extends IAbstractCell {
	row: HTMLTableRowElement | null,
	col: HTMLTableCellElement | null
}
const CELL_NONE: ICell = { row: null, col: null }

interface IColDataMap {
	[key: string]: string
}
// jeu de données
interface IRowDataMap extends IAbstractRowDataMap {
	[key: string]: IColDataMap
}
interface IRowData {
	id?: string,
	columns: IColDataMap
}