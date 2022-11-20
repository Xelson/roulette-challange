import { useState } from 'react'

export default function App() {
	const [count, setCount] = useState(0)
	
	return (
		<div className="App">
			<button onClick={() => setCount(c => c + 1)}>Counter: {count}</button>
 		</div>
	)
}
