import {
	GameRules,
	isNumberRed,
	numbersInDOMSelectorReverse
} from "../rules/selectors";

import { forwardRef } from "react";
import { classNames } from "../utils/attributes";
import { BetRecord, useActiveBets, useCurrentBalanceWithBets, useCurrentBet } from "../state/input";
import { BetCoin } from "./Bet";

type BoardBetButtonWithSelectionProps = React.HTMLProps<HTMLTableCellElement> & Omit<BetRecord, 'value'>;

export const BoardBetButtonWithSelection = forwardRef<HTMLTableCellElement, BoardBetButtonWithSelectionProps>((allProps, ref) => {
	const { numbersSet, multiplier, children, ...props } = allProps;
	const isNumbersArray = Array.isArray(numbersSet);

	const balance = useCurrentBalanceWithBets();
	const [activeBets, setActiveBets] = useActiveBets();
	const [currentBet] = useCurrentBet();

	const isCanBet = balance - currentBet >= 0;

	function onMouseEnter(event: React.MouseEvent<HTMLTableCellElement>) {
		props.onMouseEnter?.(event);
		
		if(isNumbersArray)
			numbersInDOMSelectorReverse(numbersSet).map(element => element.style.opacity = "0.2");
	}

	function onMouseLeave(event: React.MouseEvent<HTMLTableCellElement>) {
		props.onMouseLeave?.(event);

		if(isNumbersArray)
			numbersInDOMSelectorReverse(numbersSet).map(element => element.style.opacity = "1.0");
	}

	function onButtonClick(event: React.MouseEvent<HTMLTableCellElement>) {
		props.onClick?.(event);

		if(!event.shiftKey) {
			if(isCanBet) {
				setActiveBets(bet => [...bet, {numbersSet, multiplier, value: currentBet}]);
			}
		}
		else {
			const lastButtonBet = activeBets.filter(b => b.numbersSet == numbersSet).pop();
			if(lastButtonBet) {
				setActiveBets(bet => bet.filter(b => b != lastButtonBet));
			}
		}
	}

	return (
		<td 
			{...props} 
			ref={ref} 
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave} 
			onClick={onButtonClick}
			className={classNames('Button', props.className)}
			data-number={!isNumbersArray ? numbersSet : undefined}
			data-disabled={!isCanBet ? true : undefined}
		>
			<div className="Button__Bets">
				{activeBets
					.filter(bet => bet.numbersSet == numbersSet)
					.map((bet, index) => {
						const pos = getCircleRelativePosition(15, index * 25);

						return (
							<BetCoin 
								key={index}
								style={{top: pos[1], left: pos[0]}}
							>
								{bet.value}
							</BetCoin>
						);
					})
				}
			</div>
			{children}
		</td>
	);
});

function getCircleRelativePosition(radius: number, degree: number) {
	const degrees_to_radians = (d: number) => d * (Math.PI / 180);

	return [
		radius * Math.cos(degrees_to_radians(degree)),
		radius * Math.sin(degrees_to_radians(degree))
	]
}

export const BoardBetButtons = {
	Zero: () => (
		<BoardBetButtonWithSelection
			numbersSet={0}
			multiplier={35}
			
			className="Button--Zero"
		>
			0
		</BoardBetButtonWithSelection>
	),
	Number: ({number}: {number: number}) => (
		<BoardBetButtonWithSelection
			numbersSet={number}
			multiplier={35}

			className={classNames('Ball', isNumberRed(number) && 'Ball--Red')}
		/>
	),
	Red: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.RedNumbers} 
			multiplier={1}

			className="Button--BgRed" 
			colSpan={2}
		/>
	),
	Black: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.BlackNumbers} 
			multiplier={1}

			className="Button--BgBlack" 
			colSpan={2}
		/>
	),
	Even: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.EvenNumbers}
			multiplier={1}

			colSpan={2}
		>
			Even
		</BoardBetButtonWithSelection>
	),
	Odd: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.OddNumbers}
			multiplier={1}

			colSpan={2}
		>
			Odd
		</BoardBetButtonWithSelection>
	),
	Low: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.LowNumbers}
			multiplier={1}

			colSpan={2}
		>
			1 to 18
		</BoardBetButtonWithSelection>
	),
	High: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.HighNumbers}
			multiplier={1}

			colSpan={2}
		>
			19 to 36
		</BoardBetButtonWithSelection>
	),
	DozenFirst: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.DozenFirstNumbers}
			multiplier={2}

			colSpan={4}
		>
			1st 12
		</BoardBetButtonWithSelection>
	),
	DozenSecond: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.DozenSecondNumbers}
			multiplier={2}

			colSpan={4}
		>
			2nd 12
		</BoardBetButtonWithSelection>
	),
	DozenThird: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.DozenThirdNumbers}
			multiplier={2}

			colSpan={4}
		>
			3rd 12
		</BoardBetButtonWithSelection>
	),
	ColumnFirst: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.ColumnFirstNumbers}
			multiplier={2}
		>
			2:1
		</BoardBetButtonWithSelection>
	),
	ColumnSecond: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.ColumnSecondNumbers}
			multiplier={2}
		>
			2:1
		</BoardBetButtonWithSelection>
	),
	ColumnThird: () => (
		<BoardBetButtonWithSelection 
			numbersSet={GameRules.ColumnThirdNumbers}
			multiplier={2}
		>
			2:1
		</BoardBetButtonWithSelection>
	)
}