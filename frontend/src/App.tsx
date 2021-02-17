import React from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
	ThemeProvider,
	createMuiTheme
} from '@material-ui/core'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#6A0572',
		},
		secondary: {
			main: '#06BCC1',
		},
	},
})

import configureStore from './store/store'

import Controller from './components/Controller'

const store = configureStore()

const queryClient = new QueryClient()

function App(): React.ReactElement  {

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<Controller />
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	)
}

export default App
