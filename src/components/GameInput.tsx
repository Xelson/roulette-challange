import { 
	useActiveBets, 
	useCurrentBet, 
	useResetActiveBets,
	useCurrentBalanceWithBets  
} from "../state/input";

import { BetCoin } from "./Bet";

export function GameInputRenderer() {
	const [currentBet, setCurrentBet] = useCurrentBet();
	const balanceWithBets = useCurrentBalanceWithBets();
	
	const [activeBets] = useActiveBets();
	const resetActiveBets = useResetActiveBets();

	const isBetsClear = !activeBets.length;
	const isCanBet = balanceWithBets >= 0;

	return (
		<div className="GameInput">
			<div className="GameInput__BalancePanel">
				<p>Balance: {balanceWithBets}</p>
			</div>
			<div className="GameInput__BetCoins">
				{[1, 2, 5, 25].map(bet => (		
					<BetCoin 
						key={bet} 
						onClick={() => setCurrentBet(bet)}
						data-active={bet == currentBet ? true : undefined}
					>
						{bet}
					</BetCoin>
				))}
			</div>
			<div className="GameInput__Actions">
				<button disabled={isBetsClear || !isCanBet}>Bet</button>
				<button 
					disabled={isBetsClear}
					onClick={resetActiveBets}
				>
					Clear Bets
				</button>
			</div>
		</div>
	);
}