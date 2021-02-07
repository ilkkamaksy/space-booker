import React from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

import configureStore from './store/store'

import Controller from './components/Controller'

const store = configureStore()

const queryClient = new QueryClient()

function App(): React.ReactElement  {

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
			
				<Controller />
			
			</QueryClientProvider>
		</Provider>
	)
}

export default App
