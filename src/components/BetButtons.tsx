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
			{...GameRules.betShemas.Straight(0)}

			className="Button--Zero"
		>
			0
		</BoardBetButtonWithSelection>
	),
	Number: ({number}: {number: number}) => (
		<BoardBetButtonWithSelection
			{...GameRules.betShemas.Straight(number)}

			className={classNames('Ball', isNumberRed(number) && 'Ball--Red')}
		/>
	),
	Red: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.Red}

			className="Button--BgRed" 
			colSpan={2}
		/>
	),
	Black: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.Black}

			className="Button--BgBlack" 
			colSpan={2}
		/>
	),
	Even: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.Even}

			colSpan={2}
		>
			Even
		</BoardBetButtonWithSelection>
	),
	Odd: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.Odd}

			colSpan={2}
		>
			Odd
		</BoardBetButtonWithSelection>
	),
	Low: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.Low}

			colSpan={2}
		>
			1 to 18
		</BoardBetButtonWithSelection>
	),
	High: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.High}

			colSpan={2}
		>
			19 to 36
		</BoardBetButtonWithSelection>
	),
	DozenFirst: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.DozenFirst}

			colSpan={4}
		>
			1st 12
		</BoardBetButtonWithSelection>
	),
	DozenSecond: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.DozenSecond}

			colSpan={4}
		>
			2nd 12
		</BoardBetButtonWithSelection>
	),
	DozenThird: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.DozenThird}

			colSpan={4}
		>
			3rd 12
		</BoardBetButtonWithSelection>
	),
	ColumnFirst: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.ColumnFirst}
		>
			2:1
		</BoardBetButtonWithSelection>
	),
	ColumnSecond: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.ColumnSecond}
		>
			2:1
		</BoardBetButtonWithSelection>
	),
	ColumnThird: () => (
		<BoardBetButtonWithSelection 
			{...GameRules.betShemas.ColumnThird}
		>
			2:1
		</BoardBetButtonWithSelection>
	)
}