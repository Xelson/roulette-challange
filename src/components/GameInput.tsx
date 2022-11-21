import { 
	useBetAction, 
	usePlayAgainAction 
} from "../rules/hooks";

import { 
	useCurrentBet, 
	useCurrentBalanceWithBets  
} from "../state/input";

import { BetCoin } from "./Bet";

export function GameInputRenderer() {
	const {
		isCanResetBets, 
		isCanPerformAction: isCanBet,
		resetBets,
		performAction: performBet
	} = useBetAction();

	const {
		isShouldPerformAction: isShouldPlayAgain,
		performAction: performPlayAgain
	} = usePlayAgainAction();

	const [currentBet, setCurrentBet] = useCurrentBet();
	const balanceWithBets = useCurrentBalanceWithBets();

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
				{isShouldPlayAgain ? (
					<button className="Button--PlayAgain" onClick={performPlayAgain}>
						Play again!
					</button>
				) : (
					<>
						<button disabled={!isCanBet} onClick={performBet}>
							Bet
						</button>
						<button disabled={!isCanResetBets} onClick={resetBets}>
							Clear Bets
						</button>
					</>
				)}
			</div>
		</div>
	);
}