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

	export const RandomNumber = () => Math.floor(Math.random() * 37.0)

	export const betShemas = {
		Straight: (number: number) => ({
			numbersSet: number,
			multiplier: 35
		}),
		Red: {
			numbersSet: RedNumbers,
			multiplier: 1
		},
		Black: {
			numbersSet: BlackNumbers,
			multiplier: 1
		},
		Even: {
			numbersSet: EvenNumbers,
			multiplier: 1
		},
		Odd: {
			numbersSet: OddNumbers,
			multiplier: 1
		},
		Low: {
			numbersSet: LowNumbers,
			multiplier: 1
		},
		High: {
			numbersSet: HighNumbers,
			multiplier: 1
		},
		DozenFirst: {
			numbersSet: DozenFirstNumbers,
			multiplier: 2
		},
		DozenSecond: {
			numbersSet: DozenSecondNumbers,
			multiplier: 2
		},
		DozenThird: {
			numbersSet: DozenThirdNumbers,
			multiplier: 2
		},
		ColumnFirst: {
			numbersSet: ColumnFirstNumbers,
			multiplier: 2
		},
		ColumnSecond: {
			numbersSet: ColumnSecondNumbers,
			multiplier: 2
		},
		ColumnThird: {
			numbersSet: ColumnThirdNumbers,
			multiplier: 2
		},
	}
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