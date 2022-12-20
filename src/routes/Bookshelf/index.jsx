import { MotionConfig } from 'framer-motion'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import uuid4 from 'uuid4'
import booksJson from '../../assets/books.json'
import Input from '../../components/Input'
import PageWrapper from '../../utils/PageWrapper'
import './style.scss'

export default function Bookshelf() {
	const [books, setBooks] = useState(booksJson)
	const [anim, setAnim] = useState(false)

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
					{books.map((book) => (
						<motion.div
							key={uuid4()}
							initial={{ opacity: 0, y: '40px' }}
							whileInView={{ opacity: 1, y: '0px' }}
							viewport={{ once: true }}
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
					))}
				</div>
			</div>
			<div className="bookshelf__recommendation">
				<h4>People also like</h4>
			</div>
		</PageWrapper>
	)
}

const Book = ({ book }) => {
	return (
		<div className="bookshelf__book-container">
			<div className="bookshelf__book">
				<img src={book.url} alt={book.title} />
			</div>
		</div>
	)
}
