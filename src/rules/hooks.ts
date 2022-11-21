import { 
	useActiveBets, 
	useResetActiveBets,
	useCurrentBalanceWithBets,  
	useCurrentBalance,
	useResetCurrentBalance
} from "../state/input";

import { GameRules } from "./selectors";
import { useResetRouletteHistory, useRouletteHistory } from "../state/roulette";

export function useBetAction() {
	const resetActiveBets = useResetActiveBets();
	const balanceWithBets = useCurrentBalanceWithBets();
	const [activeBets, setActiveBets] = useActiveBets();
	const [history, setHistory] = useRouletteHistory();
	const [balance, setBalance] = useCurrentBalance();

	const isBetsClear = !activeBets.length;
	const isCanBet = balanceWithBets >= 0;

	return {
		isCanResetBets: !isBetsClear,
		isCanPerformAction: !isBetsClear && isCanBet,
		resetBets: resetActiveBets,
		performAction() {
			const droppedNumber = GameRules.RandomNumber();
			const winBets = activeBets.filter(bet => (
				(Array.isArray(bet.numbersSet) && bet.numbersSet.includes(droppedNumber)) 
				|| bet.numbersSet == droppedNumber
			));
			const loss = activeBets.reduce((sum, bet) => sum + bet.value, 0);
			const income = winBets.reduce((sum, bet) => sum + (bet.value * bet.multiplier), 0);
			const winning = income - loss;

			setBalance(balance => balance + winning);
			setHistory(history => [droppedNumber, ...history]);
			setActiveBets(winBets);
		}
	}
}

export function usePlayAgainAction() {
	const [balance] = useCurrentBalance();

	const resetActiveBets = useResetActiveBets();
	const resetRouletteHistory = useResetRouletteHistory();
	const resetCurrentBalance = useResetCurrentBalance();

	return {
		isShouldPerformAction: balance <= 0,
		performAction() {
			resetActiveBets();
			resetRouletteHistory();
			resetCurrentBalance();
		}
	}
}