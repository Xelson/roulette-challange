export namespace GameRules {
	export const AllNumbers = 
		Array.from({length: 36}).map((_, i) => i + 1)

	export const RedNumbers = 
		[1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]

	export const BlackNumbers = 
		AllNumbers.filter(n => !RedNumbers.includes(n))

	export const EvenNumbers = 
		AllNumbers.filter(n => n % 2 == 0)

	export const OddNumbers = 
		AllNumbers.filter(n => (n % 2) != 0)

	export const LowNumbers = 
		AllNumbers.slice(0, 18)

	export const HighNumbers = 
		AllNumbers.slice(18, 36)

	export const DozenFirstNumbers = 
		AllNumbers.slice(0, 12)

	export const DozenSecondNumbers = 
		AllNumbers.slice(12, 24)

	export const DozenThirdNumbers = 
		AllNumbers.slice(24, 36)

	export const ColumnFirstNumbers = 
		AllNumbers.filter(n => n % 3 == 0)

	export const ColumnSecondNumbers = 
		AllNumbers.filter(n => (n + 1) % 3 == 0)

	export const ColumnThirdNumbers = 
		AllNumbers.filter(n => (n + 2) % 3 == 0)
}

export function isNumberRed(number: number) {
	return GameRules.RedNumbers.includes(number);
}

function numbersInDOM() {
	const boardInDOM = document.querySelector('.GameBoard');
	return boardInDOM ? Array.from(boardInDOM.querySelectorAll<HTMLElement>('[data-number]')) : [];
}

export function numbersInDOMSelector(numbersToSelect: number[]) {
	return numbersInDOM().filter(element => numbersToSelect.includes(Number(element.getAttribute('data-number'))));
}

export function numbersInDOMSelectorReverse(numbersToExclude: number[]) {
	return numbersInDOM().filter(element => !numbersToExclude.includes(Number(element.getAttribute('data-number'))));
}