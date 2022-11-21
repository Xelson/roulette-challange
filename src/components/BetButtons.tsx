import {
	GameRules,
	isNumberRed,
	numbersInDOMSelectorReverse
} from "../rules/selectors";

import { forwardRef } from "react";
import { classNames } from "../utils/attributes";

interface BoardBetButtonWithSelectionProps extends React.HTMLProps<HTMLTableCellElement> {
	numbersSet?: number[],
	betMultiplier: number
}

export const BoardBetButtonWithSelection = forwardRef<HTMLTableCellElement, BoardBetButtonWithSelectionProps>((allProps, ref) => {
	const { numbersSet, ...props } = allProps;

	function onMouseEnter(event: React.MouseEvent<HTMLTableCellElement>) {
		props.onMouseEnter?.(event);
		
		if(numbersSet)
			numbersInDOMSelectorReverse(numbersSet).map(element => element.style.opacity = "0.2");
	}

	function onMouseLeave(event: React.MouseEvent<HTMLTableCellElement>) {
		props.onMouseLeave?.(event);

		if(numbersSet)
			numbersInDOMSelectorReverse(numbersSet).map(element => element.style.opacity = "1.0");
	}

	return (
		<td 
			{...props} 
			ref={ref} 
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave} 
			className={classNames('Button', props.className)}
		/>
	);
});

export const BoardBetButtons = {
	Number: ({number}: {number: number}) => (
		<BoardBetButtonWithSelection
			data-number={number}
			className={classNames('Ball', isNumberRed(number) && 'Ball--Red')}
			betMultiplier={35}
		/>
	),
	Red: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.RedNumbers} 
			betMultiplier={1}

			className="Button--BgRed" 
			colSpan={2}
		/>
	),
	Black: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.BlackNumbers} 
			betMultiplier={1}

			className="Button--BgBlack" 
			colSpan={2}
		/>
	),
	Even: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.EvenNumbers}
			betMultiplier={1}

			colSpan={2}
		>
			Even
		</BoardBetButtonWithSelection>
	),
	Odd: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.OddNumbers}
			betMultiplier={1}

			colSpan={2}
		>
			Odd
		</BoardBetButtonWithSelection>
	),
	Low: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.LowNumbers}
			betMultiplier={1}

			colSpan={2}
		>
			1 to 18
		</BoardBetButtonWithSelection>
	),
	High: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.HighNumbers}
			betMultiplier={1}

			colSpan={2}
		>
			19 to 36
		</BoardBetButtonWithSelection>
	),
	DozenFirst: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.DozenFirstNumbers}
			betMultiplier={2}

			colSpan={4}
		>
			1st 12
		</BoardBetButtonWithSelection>
	),
	DozenSecond: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.DozenSecondNumbers}
			betMultiplier={2}

			colSpan={4}
		>
			2nd 12
		</BoardBetButtonWithSelection>
	),
	DozenThird: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.DozenThirdNumbers}
			betMultiplier={2}

			colSpan={4}
		>
			3rd 12
		</BoardBetButtonWithSelection>
	),
	ColumnFirst: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.ColumnFirstNumbers}
			betMultiplier={2}
		>
			2:1
		</BoardBetButtonWithSelection>
	),
	ColumnSecond: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.ColumnSecondNumbers}
			betMultiplier={2}
		>
			2:1
		</BoardBetButtonWithSelection>
	),
	ColumnThird: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.ColumnThirdNumbers}
			betMultiplier={2}
		>
			2:1
		</BoardBetButtonWithSelection>
	)
}