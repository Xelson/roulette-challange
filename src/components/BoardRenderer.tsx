import { BoardBetButtons } from "./BetButtons";

export function Board({children}: React.PropsWithChildren) {
	return (
		<div className="Board">
			<table>
				<tbody>
					{children}
				</tbody>
			</table>
		</div>
	);
}

export function BoardRow({children}: React.PropsWithChildren) {
	return <tr>{children}</tr>
}

export function BoardNumbersRow({startNumber, children}: React.PropsWithChildren<{startNumber: number}>) {
	return (
		<BoardRow>
			{Array.from({length: 12}).map((_, index) => (
				<BoardBetButtons.Number key={index} number={startNumber + index * 3} />
			))}
			{children}
		</BoardRow>
	);
}

export function BoardFirstNumbersRow() {
	return (
		<BoardNumbersRow startNumber={3}>
			<BoardBetButtons.ColumnFirst />
		</BoardNumbersRow>
	);
}

export function BoardSecondNumbersRow() {
	return (
		<BoardNumbersRow startNumber={2}>
			<BoardBetButtons.ColumnSecond />
		</BoardNumbersRow>
	);
}

export function BoardThirdNumbersRow() {
	return (
		<BoardNumbersRow startNumber={1}>
			<BoardBetButtons.ColumnThird />
		</BoardNumbersRow>
	);
}

export function BoardRowEvenMoneyBets() {
	return (
		<BoardRow>
			<BoardBetButtons.Low />
			<BoardBetButtons.Even />
			<BoardBetButtons.Red />
			<BoardBetButtons.Black />
			<BoardBetButtons.Odd />
			<BoardBetButtons.High />
		</BoardRow>
	);
}

export function BoardRowDoubleMoneyBets() {
	return (
		<BoardRow>
			<BoardBetButtons.DozenFirst />
			<BoardBetButtons.DozenSecond />
			<BoardBetButtons.DozenThird />
		</BoardRow>
	);
}

export function BoardRenderer() {
	return (
		<Board>
			<BoardFirstNumbersRow />
			<BoardSecondNumbersRow />
			<BoardThirdNumbersRow />

			<BoardRowDoubleMoneyBets />
			<BoardRowEvenMoneyBets />
		</Board>
	);
}
