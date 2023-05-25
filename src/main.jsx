import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Bookshelf from './routes/Bookshelf'
import Error from './routes/Error'
import Home from './routes/Home'
import Login from './routes/Login'
import Root from './routes/Root'
import Sellbook from './routes/Sellbook'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'bookshelf',
				element: <Bookshelf />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'sellbook',
				element: <Sellbook />,
			},
			{
				// path: '/bookshelf/:id',
				// element: <Book />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
