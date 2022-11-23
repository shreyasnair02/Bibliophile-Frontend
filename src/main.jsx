import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Bookshelf from './routes/Bookshelf'
import Error from './routes/Error'
import Home from './routes/Home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <Error />,
	},
  {
    path: 'bookshelf',
    element: <Bookshelf />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
