import { BoardRenderer } from './components/BoardRenderer'
import { GameInputRenderer } from './components/GameInput'

export default function App() {
	return (
		<div className="App">
			<BoardRenderer />
			<GameInputRenderer />
 		</div>
	)
}
