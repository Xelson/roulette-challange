import { useCurrentBet } from "../state/input";
import { classNames } from "../utils/attributes";

const betCoins: Array<[number, string]> = [
	[1, 'BetCoin--blue'],
	[2, 'BetCoin--yellow'],
	[5, 'BetCoin--red'],
	[25, 'BetCoin--green'],
];

export function GameInputRenderer() {
	const [currentBet, setCurrentBet] = useCurrentBet();

	return (
		<div className="GameInput">
			<div className="GameInput__BalancePanel">
				<p>Balance: {100}</p>
			</div>
			<div className="GameInput__BetCoins">
				{betCoins.map(bet => (		
					<div 
						key={bet[0]} 
						className={classNames('BetCoin', bet[1])}
						onClick={() => setCurrentBet(bet[0])}
						data-active={bet[0] == currentBet ? true : undefined}
					>
						{bet[0]}
					</div>
				))}
			</div>
			<div className="GameInput__Actions">
				<button>Bet</button>
				<button disabled>Clear Bets</button>
			</div>
		</div>
	);
}