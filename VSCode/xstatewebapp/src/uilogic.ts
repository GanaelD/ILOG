import { createMachine, interpret } from "xstate"

// Web Component lifecycle events
type ConnectedEvent = { type: "COMP_CONNECTED" }
type AttributeChangedEvent = { type: "COMP_ATTRIBUTE_CHANGED", namAttr: string, valNew: string, valOld: string }
type DisconnectedEvent = { type: "COMP_DISCONNECTED" }
type AdoptedEvent = { type: "COMP_ADOPTED" }
type ComponentEvents = ConnectedEvent | AttributeChangedEvent | DisconnectedEvent | AdoptedEvent

// Click events on buttons
type ButtonAddEvent = { type: "BUTTON_ADD", cell?: ICell }
type ButtonDelEvent = { type: "BUTTON_DEL", cell: ICell }
type ButtonEvents = ButtonAddEvent | ButtonDelEvent

// Keydown events
type KeyEnterEvent = { type: "KEY_ENTER", cell: ICell }
type KeyEscEvent = { type: "KEY_ESCAPE", cell: ICell }
type KeyEvents = KeyEnterEvent | KeyEscEvent

// Focus events
type CellJoinEvent = { type: "CELL_JOINING", cell: ICell, cellLeaving: ICell }
type CellLeaveEvent = { type: "CELL_LEAVING", cell: ICell, cellJoining: ICell }
type CellEvents = CellJoinEvent | CellLeaveEvent

// service events
type SvcGetDataDone = { type: "done.invoke.getData", data: IRowDataMap }
type SvcGetDataError = { type: "error.platform.getData", data: any }
type SvcPutDataDone =  { type: "done.invoke.putData", data: LocationHeader }
type SvcPutDataError = { type: "error.platform.putData", data: any }
type ServiceEvents = SvcGetDataDone | SvcGetDataError | SvcPutDataDone | SvcPutDataError

// all events
type Events = ComponentEvents | ButtonEvents | KeyEvents | CellEvents

/**
 * State Machine context provided by Web Component
 */
export type Id = string
export type LocationHeader = string
export interface IContext {
	cancelling(cellCand: ICell, cellJoining: ICell): boolean
	validating(cellCand: ICell, cellJoining: ICell): boolean
	getData(): Promise<IRowDataMap>
	putData(cell: ICell): Promise<Id>
	addRow(cellRowBefore?: ICell)
	addRows(data: IRowDataMap)
	currentCell(cell: ICell)
	endEditing()
	makeTable()
	removeRow(cell: ICell)
	report(err: any)
	restoreRow()
	saveRow(cell: ICell)
	updateRowId(data: LocationHeader)
}

export function getUILogic(context: IContext) {
	const machine = 
	/** @xstate-layout N4IgpgJg5mDOIC5QBcCGAjANmAtJglrMngPZT4DGAdBQE5irKQDEAwgPICyACgPocA5AQFFWAFWEARANoAGALqJQABxKx8yfCQB2SkAA9EANlkAmKkYCclgBw2jp00ZsBWACymANCACeiR0ZUbi6yoW5GbpbBsh4AvrHeaFi4BESk5NQUOtpgFEwQbFx8AIJiYgBKAJIAQgCqEvwAEsUCAOJScopIIKrqmjp6hggm5la29gGuHt5+CACMAOwuVJYhYS6mAMwxLkZG8YkY2HiExJhklDTZufmFPLzFkuzcEjIKer0aWrrdQ25zmyCziMCyMm02WzcCzcM0Qczm5nsewWC2sRnhIQWBxASWOqTOF0y1zyLA490klQAyoIROIOu9up9+j9QEM5pY5lRNgiQpsXNCIsFYfM5m4qEiQaYFjZZAtZHYbNjcSlTulLhBCFltDkSQUyXwaaJXp0PmovgNfnCOVyebI+QK3ELfHCjMtNntJZZZfD3W4lUcVWlzhkqOdUBrtFBmBAdGAqPhtAA3EgAazjMGQkkYqBNjLNzMGcMWliCNgWmzcm2hu0iXmdCFMskC-JC7Nc0tcrv9yROQcJoZI4YTUbAtFoJFoVGUmEYADMJwBbKgZrNoXMqfPfQsIaVizbWGyWPYuGxzVxzYWnqhrUKmeGu2RRFzdvGq4OXMMQFh1MrsAQPSQ3i6Dc+i3S15irMUjy2Ew3FlMsjEvUwoLWSIFjPdkIhfQMCRDT9v3qMQ-14SRhAAGXXHpNwtVk4SrBZxW5AFbDtBwXBcYUFila9QhiAF-grBxsN7XCP0HL89XIsjeAAKXYSoBAU1pKKZMDaJFVFS3LStqwiSw61mKtZAsJZQjsKsy3Y4T8TVahYAAV3QBcNE0SNo1jeMk1TONlHszNsxU6iWQMItNLcMsK0gmt9OFcIbCoW1FjvKFTH5P0EhxAMRNsqgHKclzh2YUdx0nac50XKc-NXHMGRA81grZYstMi3Ta2FFwvWvVLZFFfcbFMU9TGst9+0gL43IAaWEABNXhhAECRykC0CaJC4YzAsA8JicKYDOMf4qAG8EoR5MF0OGvsQzG1yo1YKTeDI4RigANSU5b6u3EZNvGBwdvcPaEA64zpWOsZ9IhTYLtE6hrsKu6yOkx6XreuZgKolaGuMDaxjsX7nH+zjyxM1tFntI9IYy5VsvfGGNRu5gptm4RqWKbhhHegtwK+nHtvx6Z60PEtZVbcLD2PLFKaymyaaoWG3Ph6S5IUt7avRj7wI8QEnGQsx+VcVL2oBLlwXdCET3cfl4gy7QSC-eBuip6XCVNDHtxwRD6xwZZrB933fdRKGcroBh8hd9X1PCcweq2WxwnLTY7AWYVuqCZDrABQX2wpw4eydkMtR1UO81djWE+vXY5hBc2URlGF60r+L3WRQbUrbbPMtzkaQw1WAC5uSAw85iOAbmfkqBBqs9jgmITAlnPX0usSh0jQe1LWp9DoRfcpTLRZ+dmRtlnY9ZMXQ3XA5l-CIFX1a2X3Et-hgu8pSlSxhX0hjp9kE9HxCOOL-7HlZyyAbo30xggDez9t7SnQtCAGJhATsgPOiGw98bDpXnjhHKcsoBgO3P8MUpgfZ8g6shRwSd6zomWBPdCYIXD7n2FbIAA */
	createMachine({
		id: "table-list-logic",
		context,
		initial: "created",
		states: {
			created: {
				on: {
					COMP_CONNECTED: {
						target: "loading",
						actions: "makeTable"
					}
				},
				
			},
			connected: {
				on: {
					COMP_ATTRIBUTE_CHANGED: {
						cond: "isData",
						target: "loading",
					},
					COMP_ADOPTED: {
					},
					COMP_DISCONNECTED: {
						target: "disconnected"
					}
				}
			},
			disconnected: {
				on: {
					COMP_CONNECTED: {
						target: "connected"
					}
				}
			},
			loading: {
				invoke: {
					id: "getData",
					src: "getData",
					onDone: {
						target: "loaded",
						actions: "addRows"
					},
					onError: {
						target: "connected",
						actions: "report"
					}
				}
			},
			loaded: {
				on: {
					BUTTON_ADD: {
						actions: "addRow"
					},
					BUTTON_DEL: {
						actions: "removeRow"
					},
					CELL_JOINING: {
						target: "editing",
						actions: "currentCell"
					}
				}
			},
			submitting: {
				invoke: {
					id: "putData",
					src: "putData",
					onDone: {
						target: "loaded",
						actions: ["updateRowId", "endEditing"]
					},
					onError: {
						target: "loaded",
						actions : ["report", "restoreRow", "endEditing"]
					}
				}
			},
			editing: {
				entry: "saveRow",
				on: {
					KEY_ENTER: {
						target: "submitting"
					},
					CELL_LEAVING: [{ cond: "validating", target: "submitting"},
					{ target: "loaded", cond: "cancelling", actions: ["restoreRow", "endEditing"]}],
					KEY_ESCAPE: {
						target: "loaded",
						actions: ["restoreRow", "endEditing"]
					},
					CELL_JOINING: {
						actions: "currentCell"
					}
				}
			},
		}
	},
	{
		services : {
			getData : (cx, event) => cx.getData(),
			putData : (cx, event) => cx.putData(event.cell)
		},
		guards: {
			cancelling : (cx, event) => cx.cancelling(event.cell, event.cellJoining),
			isData : (cx, event) => event.namAttr == "data",
			validating : (cx, event) => cx.validating(event.cell, event.cellJoining)
		},
		actions : {
			addRow : (cx, event) => cx.addRow(event.cell),
			addRows : (cx, event) => cx.addRows(event.data),
			currentCell : (cx, event) => cx.currentCell(event.cell),
			endEditing : (cx, event) => cx.endEditing(),
			makeTable : (cx, event) => cx.makeTable(),
			removeRow : (cx, event) => cx.removeRow(event.cell),
			report : (cx, event) => cx.report(event.data),
			restoreRow : (cx, event) => cx.restoreRow(),
			saveRow : (cx, event) => cx.saveRow(event.cell),
			updateRowId : (cx, event) => cx.updateRowId(event.data)
		}
	})
	const uiLogic = interpret(machine)
	uiLogic.onTransition(state => console.log(state.value, state.event, state.actions))
	uiLogic.start()
	return uiLogic
}


interface ICell {
}
export {ICell as IAbstractCell}
interface IRowDataMap {
}
export {IRowDataMap as IAbstractRowDataMap}