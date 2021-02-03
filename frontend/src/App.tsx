import React from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

import configureStore from './store/store'

import Wrapper from './components/Wrapper'

const store = configureStore()

const queryClient = new QueryClient()

function App(): React.ReactElement  {

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
			
				<Wrapper />
			
			</QueryClientProvider>
		</Provider>
	)
}

export default App
