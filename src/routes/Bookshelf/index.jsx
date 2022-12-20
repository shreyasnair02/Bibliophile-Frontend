import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import uuid4 from 'uuid4'
import booksJson from '../../assets/books.json'
import Input from '../../components/Input'
import PageWrapper from '../../utils/PageWrapper'
import './style.scss'

function useDebounce(value, delay) {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(
		() => {
			// Update debounced value after delay
			const handler = setTimeout(() => {
				setDebouncedValue(value)
			}, delay)

			// Cancel the timeout if value changes (also on delay change or unmount)
			// This is how we prevent debounced value from updating if value is changed ...
			// .. within the delay period. Timeout gets cleared and restarted.
			return () => {
				clearTimeout(handler)
			}
		},
		[value, delay] // Only re-call effect if value or delay changes
	)

	return debouncedValue
}

export default function Bookshelf() {
	const [books, setBooks] = useState(booksJson)

	const debouncedChanges = useDebounce(books, 200)

	const handleChange = (e) => {
		const searchQuery = e.target.value || ''
		const filteredBooks = booksJson.filter((book) =>
			book.title.toLowerCase().includes(searchQuery)
		)
		setBooks(filteredBooks)
	}

	return (
		<PageWrapper className="bookshelf page">
			<div className="bookshelf__filter">
				<h4>Filter By</h4>
			</div>
			<div className="bookshelf__books">
				<Input
					type="search"
					className="bookshelf__search"
					placeholder="Search for books..."
					name="search"
					onChange={handleChange}
				/>
				<div className="bookshelf__books-section">
					<AnimatePresence>
						{debouncedChanges.map((book) => (
							<LayoutGroup key={uuid4()}>
								<motion.div
									layout
									transition={{ duration: 0.2 }}
									className="bookshelf__book"
								>
									<img src={book.url} alt={book.title} />
									<div className="bookshelf__book-info">
										<p style={{ textDecoration: 'line-through' }}>
											₹{book.price + 1000}
										</p>
										<h3>₹{book.price}</h3>
									</div>
								</motion.div>
							</LayoutGroup>
						))}
					</AnimatePresence>
				</div>
			</div>
			<div className="bookshelf__recommendation">
				<h4>People also like</h4>
			</div>
		</PageWrapper>
	)
}
