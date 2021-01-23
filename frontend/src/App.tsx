import React from 'react'
import './App.css'

import Calendar from './components/Calendar'

function App(): React.ReactElement  {
	return (
		<div className="App">
			<header className="App-header">
        
				<Calendar />
			</header>
		</div>
	)
}

export default App
