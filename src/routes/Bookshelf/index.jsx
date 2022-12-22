import {
	IconShoppingCart,
	IconShoppingCartPlus,
	IconStar,
	IconX,
} from '@tabler/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import uuid4 from 'uuid4'
import booksJson from '../../assets/books.json'
import Input from '../../components/Input'
import genres from '../../routes/Bookshelf/constants/genres.json'
import PageWrapper from '../../utils/PageWrapper'
import './style.scss'

export default function Bookshelf() {
	const [checkedState, setCheckedState] = useState(genres)
	const [books, setBooks] = useState(booksJson)
	const [recbooks, setRecbooks] = useState(() => {
		const recBookz = books.filter((boo) => {
			if (books[0].related.includes(boo.id)) {
				return true
			}
		})
		return recBookz
	})

	const initialRender = useRef(0)
	const [cart, setCart] = useState([])
	const [showCart, setShowCart] = useState(true)
	const [recbooks, setRecbooks] = useState(() => {
		const recBookz = books.filter((boo) => {
			if (books[0].related.includes(boo.id)) {
				return true
			}
		})
		return recBookz
	})

	const initialRender = useRef(0)
	const [cart, setCart] = useState([])
	const [showCart, setShowCart] = useState(false)

	const handleChange = (e) => {
		const searchQuery = e.target.value.toLowerCase() || ''
		const filteredBooks = booksJson.filter((book) =>
			book.title.toLowerCase().includes(searchQuery)
		)
		setBooks(filteredBooks)
	}
	const handleCheckstate = (position) => {
		const updatedCheckedState = checkedState.map(
			({ genre, checked }, index) => {
				if (index === position) {
					return { genre, checked: !checked }
				} else {
					return { genre, checked }
				}
			}
		)
		setCheckedState(updatedCheckedState)
	}
	useEffect(() => {
		if (initialRender.current <= 1) {
			initialRender.current = initialRender.current + 1

			setBooks(booksJson)
		} else {
			const updatedBooks = booksJson.filter((book) =>
				checkedState.some((eachGenre) => {
					return eachGenre.checked && book.genre.includes(eachGenre.genre)
				})
			)
			setBooks(updatedBooks)
		}
		if (initialRender.current > 1 && checkNone()) {
			setBooks(booksJson)
		}
	}, [checkedState])
	useEffect(() => {
		setRecbooks(() => {
			const recBookss = books.filter((boo) => {
				if (books[0].related.includes(boo.id)) {
					return true
				}
			})
			return recBookss
		})
	}, [books])
	const checkNone = () => {
		let flag = true
		checkedState.forEach((obj) => {
			if (obj.checked) {
				flag = false
			}
		})
		return flag
	}
	const styles = {
		hide: {
			opacity: checkNone() ? '0' : '1',
			display: checkNone() ? 'none' : 'flex',
		},
	}
	const handleClear = () => {
		setCheckedState(genres)
	}

	return (
		<PageWrapper className="bookshelf page">
			<div className="bookshelf__filter">
				<h4>Filter By</h4>
				<div className="bookshelf__filter-section">
					{checkedState.map((eachGenre, index) => (
						<div key={uuid4()}>
							<label htmlFor={eachGenre.genre}>{eachGenre.genre}</label>
							<input
								type="checkbox"
								name="filter"
								id={eachGenre.genre}
								checked={eachGenre.checked}
								onChange={() => handleCheckstate(index)}
							/>
						</div>
					))}
					<div className="bookshelf__filter-section-clear" style={styles.hide}>
						<button onClick={handleClear}>
							<IconX size={19} color="red" />
							<span>Reset</span>
						</button>
					</div>
				</div>
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
					{books.length ? (
						books.map((book) => (
							<Book book={book} key={uuid4()} cart={cart} setCart={setCart} cart={cart} setCart={setCart} />
						))
					) : (
						<h2>No books found</h2>
					)}
				</div>
			</div>
			<div className="bookshelf__recommendation">
				<h4>People also like</h4>
				<div className="bookshelf__recommendation-section">
					{recbooks.map((boo) => (
						<div>
							<img
								src={boo.url}
								alt={boo.title}
								className="bookshelf__book-cover bookshelf__book-cover-small"
							/>
						</div>
					))}
				</div>
			</div>
			<button
				className="bookshelf__cart"
				onClick={() => setShowCart(!showCart)}
			>
				<IconShoppingCart size={26} color="currentColor" />
				<div className="bookshelf__no-of-books">{cart.length}</div>
			</button>
			<AnimatePresence>
				{showCart && <Cart cart={cart} setCart={setCart} />}
			</AnimatePresence>
		</PageWrapper>
	)
}

const Book = ({ book, unikey, cart, setCart }) => {
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
			key={unikey}
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
					<button
						className="bookshelf__addtocart"
						onClick={() => setCart([...cart, book])}
					>
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

const Cart = ({ cart }) => {
	const totalPrice = cart.reduce((acc, book) => acc + book.price, 0)
	return (
		<motion.div
			initial={{ opacity: 0, y: '20px' }}
			animate={{ opacity: 1, y: '0' }}
			exit={{ opacity: 0, y: '-20px' }}
			className="bookshelf__cart-page"
		>
			<h2>Your Cart</h2>
			<div className="bookshelf__cart-total">
				Total Price: <b>₹{totalPrice}</b>
			</div>
			<div className="bookshelf__cart-items">
				{cart.map((book) => (
					<div className="bookshelf__cart-item" key={uuid4()}>
						<img
							className="bookshelf__cart-item-cover"
							src={book.url}
							alt={book.title}
						/>
						<div className="bookshelf__cart-item-info">
							<h5 className="bookshelf__cart-item-title">{book.title}</h5>
							<h6 className="bookshelf__cart-item-author">{book.author}</h6>
						</div>
						<h4 className="bookshelf__cart-item-price">₹{book.price}</h4>
					</div>
				))}
			</div>
		</motion.div>
	)
}
