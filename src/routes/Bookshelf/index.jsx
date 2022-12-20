import PageWrapper from '../../utils/PageWrapper'
import Input from '../../components/Input'
import './style.scss'
import booksJson from '../../assets/books.json'
import uuid4 from 'uuid4'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutGroup } from 'framer-motion'

export default function Bookshelf() {
	const [books, setBooks] = useState(booksJson)

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
					<AnimatePresence mode="popLayout">
						{books.map((book) => (
							<LayoutGroup key={uuid4()}>
								<motion.div
									layout
									transition={{ duration: 0.3 }}
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
