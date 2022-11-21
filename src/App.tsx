import { BoardRenderer } from './components/GameBoard'
import { GameInputRenderer } from './components/GameInput'
import { GameStatsRenderer } from './components/GameStats'

export default function App() {
	return (
		<div className="App">
			<div className="GameField">
				<BoardRenderer />
				<GameInputRenderer />
				<GameStatsRenderer />
			</div>
 		</div>
	)
}
