import { IconShoppingCart, IconShoppingCartPlus, IconStar } from '@tabler/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import uuid4 from 'uuid4'
import booksJson from '../../assets/books.json'
import Input from '../../components/Input'
import PageWrapper from '../../utils/PageWrapper'
import './style.scss'

export default function Bookshelf() {
	const [books, setBooks] = useState(booksJson)

	const handleChange = (e) => {
		const searchQuery = e.target.value.toLowerCase() || ''
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
						<Book book={book} key={uuid4()} />
					))}
				</div>
			</div>
			<div className="bookshelf__recommendation">
				<h4>People also like</h4>
			</div>
			<button className="bookshelf__cart">
				<IconShoppingCart size={26} color="currentColor" />
				<div className="bookshelf__no-of-books">3</div>
			</button>
		</PageWrapper>
	)
}

const Book = ({ book, key }) => {
	const [showInfo, setShowInfo] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		if (window.innerWidth < 600) {
			setIsMobile(true)
			setShowInfo(true)
		}

		window.addEventListener('resize', () => {
			if (window.innerWidth < 600) {
				setIsMobile(true)
				setShowInfo(true)
			} else {
				setIsMobile(false)
				setShowInfo(false)
			}
		})
	}, [])

	return (
		<motion.div
			key={key}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			className="bookshelf__book-container"
		>
			<div
				className="bookshelf__book"
				onMouseOver={() => !isMobile && setShowInfo(true)}
				onMouseLeave={() => !isMobile && setShowInfo(false)}
			>
				<img
					className="bookshelf__book-cover"
					src={book.url}
					alt={book.title}
				/>
				<div className="bookshelf__mini-info">
					<div className="bookshelf__price-container">
						<div className="bookshelf__original-price">
							₹{book.price + 1000}
						</div>
						<h3 className="bookshelf__reduced-price">₹{book.price}</h3>
					</div>
					<button className="bookshelf__addtocart">
						<IconShoppingCartPlus size={20} color="currentColor" />
					</button>
				</div>
			</div>
			<AnimatePresence initial={false}>
				{showInfo && (
					<motion.div
						initial={{ opacity: 0, y: '20px' }}
						animate={{ opacity: 1, y: '0px' }}
						exit={{ opacity: 0, y: '-20px' }}
						className="bookshelf__book-info"
					>
						<h3 className="bookshelf__book-title">{book.title}</h3>
						<h5 className="bookshelf__book-author">{book.author}</h5>
						<div className="bookshelf__book-rating">
							<p>Condition</p>
							<div className="rate">
								{[...Array(Math.floor(book.rating))].map((_, i) => (
									<IconStar key={i} size={18} fill="currentColor" />
								))}
							</div>
						</div>
						<div className="bookshelf__about-container">
							<h5>About the book</h5>
							<p>{book.summary}</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
