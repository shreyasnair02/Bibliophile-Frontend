import {
	IconShoppingCart,
	IconShoppingCartPlus,
	IconStar,
	IconX,
} from '@tabler/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Rating } from 'react-simple-star-rating'
import uuid4 from 'uuid4'
import booksJson from '../../assets/books.json'
import Input from '../../components/Input'
import genres from '../../routes/Bookshelf/constants/genres.json'
import PageWrapper from '../../utils/PageWrapper'
import singleBook from '../Bookshelf/constants/singleBook.json'
import comments from '../../assets/comments.json'
import './style.scss'
import { AiOutlineStar } from 'react-icons/ai'

export default function Bookshelf() {
	const [checkedGenres, setcheckedGenres] = useState(genres)
	const [books, setBooks] = useState(booksJson)
	const [filteredBooks, setFilteredBooks] = useState(books)
	const [sorted, setSorted] = useState(0)
	const [cart, setCart] = useState([])
	const [showCart, setShowCart] = useState(false)
	const [showBook, setShowBook] = useState(false)
	const initialRender = useRef(1)
	const sortElementsRef = useRef([])
	const bookID = useRef(null)
	useEffect(() => {
		console.log('hleo')
		if (initialRender.current <= 2) {
			initialRender.current++
		} else {
			// console.log('hello')
			let SelectedGenres = []
			const updatedFilteredBooks = books.filter((book) => {
				SelectedGenres = checkedGenres
					.filter((genre) => genre.checked)
					.map((genre) => genre.genre)
				return book.genre.some((genre) => SelectedGenres.includes(genre))
			})
			// setFilteredBooks(updatedFilteredBooks)
			if (SelectedGenres.length == 0) {
				setFilteredBooks(books)
			} else {
				setFilteredBooks(updatedFilteredBooks)
			}
		}
	}, [checkedGenres])

	const handleChange = (e) => {
		setcheckedGenres(genres)
		const searchQuery = e.target.value.toLowerCase() || ''
		const updatedFilteredBooks = books.filter((book) =>
			book.title.toLowerCase().includes(searchQuery)
		)
		setFilteredBooks(updatedFilteredBooks)
	}

	const handleCheckstate = (position) => {
		const updatedcheckedGenres = checkedGenres.map(
			({ genre, checked }, index) => {
				if (index === position) {
					return { genre, checked: !checked }
				} else {
					return { genre, checked }
				}
			}
		)
		setcheckedGenres(updatedcheckedGenres)
	}
	const checkNone = () => {
		let flag = true
		checkedGenres.forEach((obj) => {
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
		setcheckedGenres(genres)
		setSorted(0)
		sortElementsRef.current.forEach((el) => (el.checked = false))
	}
	const handleSort = (val) => {
		setSorted(+val)
	}
	const sortedArray = [...filteredBooks].sort((a, b) => {
		if (sorted === 1) {
			return a.price - b.price
		} else if (sorted === 2) {
			return b.price - a.price
		}
		return 0
	})
	const flexStyle = {
		display: 'flex',
	}
	return (
		<PageWrapper className="bookshelf page">
			<div className="bookshelf__filter">
				<div style={{ display: 'flex' }}>
					<h4>Filter By</h4>
					<div className="bookshelf__filter-section-clear" style={styles.hide}>
						<button onClick={handleClear}>
							<IconX size={19} color="red" />
						</button>
					</div>
				</div>
				<div className="bookshelf__filter-section">
					{checkedGenres.map((eachGenre, index) => (
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
				</div>
				<h4>Sort By</h4>
				<div>
					{[
						{ label: 'Price(Low to High)', value: 1 },
						{ label: 'Price(High to Low)', value: 2 },
					].map((obj, i) => (
						<div key={obj.value}>
							<input
								type="radio"
								value={obj.value}
								id={'id' + obj.value}
								onChange={(e) => handleSort(e.target.value)}
								name="sort"
								ref={(el) => (sortElementsRef.current[i] = el)}
							/>
							<label htmlFor={'id' + obj.value}>{obj.label}</label>
						</div>
					))}
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
				<AnimatePresence>
					<motion.div className="bookshelf__books-section">
						{sortedArray.length ? (
							sortedArray.map((book) => (
								<Book
									book={book}
									key={uuid4()}
									cart={cart}
									setCart={setCart}
									showBook={showBook}
									setShowBook={setShowBook}
									bookID={bookID}
								/>
							))
						) : (
							<h2>No books found</h2>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
			<div className="bookshelf__recommendation">
				<h4>People also like</h4>
				<div className="bookshelf__recommendation-section">
					{/* {recbooks.map((boo) => (
						<div>
							<img
								src={boo.url}
								alt={boo.title}
								className="bookshelf__book-cover bookshelf__book-cover-small"
							/>
						</div>
					))} */}
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
			<AnimatePresence>
				{showBook && (
					<BookComponent
						cart={cart}
						setCart={setCart}
						showBook={showBook}
						setShowBook={setShowBook}
						bookID={bookID}
					/>
				)}
			</AnimatePresence>
		</PageWrapper>
	)
}

const Book = ({
	book,
	unikey,
	cart,
	setCart,
	showBook,
	setShowBook,
	bookID,
}) => {
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
			animate={{
				x: 0,
				y: 0,
				scale: 1,
				rotate: 0,
			}}
			onClick={() => {
				bookID.current = book.id
				console.log('hello')
				setShowBook(true)
			}}
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
						onClick={(e) => {
							e.stopPropagation()
							setCart([...cart, book])
						}}
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
							<Rating
								emptyStyle={{ display: 'flex' }}
								fillStyle={{ display: '-webkit-inline-box' }}
								readonly={true}
								initialValue={book.rating}
								allowFraction={true}
								size={25}
								SVGstrokeColor="#4d3505"
								emptyColor="#f2e7d9"
								SVGstorkeWidth={1}
								fillColor="#4d3619"
							/>

							<div className="rate"></div>
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
function BookComponent({ cart, setCart, book, showBook, setShowBook, bookID }) {
	const [item, setItem] = useState(() => {
		return booksJson.filter((item) => bookID.current === item.id)[0]
	})
	const [trnct, setTrnct] = useState(true)
	return (
		<motion.div
			initial={{ opacity: 0, y: '20px' }}
			animate={{ opacity: 1, y: '0' }}
			exit={{ opacity: 0, y: '-20px' }}
			className="bookshelf__book-page"
		>
			{item ? (
				<div className="bookshelf__book-page-container">
					<div className="bookshelf__book-page-bookDisplay">
						<div className="bookDisplay__image-container">
							<img src={item.url} alt="" />
						</div>
						<div>
							<button className="bookDisplay__CTA">
								<IconShoppingCartPlus
									size={24}
									stroke={2}
									color="currentColor"
								/>
								Add to cart
							</button>
						</div>
					</div>
					<div className="bookshelf__book-page-detailsDisplay">
						<h1 className="detailsDisplay-title">{item.title}</h1>
						<h4 className="detailsDisplay-authorName">{item.author}</h4>
						<div className="detailsDisplay-rating">
							<span className="stars">
								<Rating
									emptyStyle={{ display: 'flex' }}
									fillStyle={{ display: '-webkit-inline-box' }}
									readonly={true}
									initialValue={item.rating}
									allowFraction={true}
									size={35}
									SVGstrokeColor="#4d3505"
									emptyColor="#f2e7d9"
									SVGstorkeWidth={1}
									fillColor="#4d3619"
								/>
							</span>
							<span>{item.rating}</span>
						</div>
						<h4>₹{item.price}</h4>

						<p className={trnct ? 'truncate' : ''}>{item.summary}</p>
						{trnct ? (
							<span onClick={() => setTrnct((prev) => !prev)} key={item.id}>
								...
							</span>
						) : (
							''
						)}

						<div>
							<span>Genres:</span>
							{item.genre.map((genre) => (
								<span key={genre}>{genre}</span>
							))}
						</div>
						<div className="detailsDisplay-recommendSection">
							<h3>Readers would Recommend</h3>
							<div className="detailsDisplay-recommended-books">
								{item.related.map((b) => (
									<Book
										book={booksJson.find((book) => book.id === b)}
										key={b}
										cart={cart}
										setCart={setCart}
									/>
								))}
								{/* <Book
									book={book}
									unikey={uuid4()}
									cart={cart}
									setCart={setCart}
									showBook={showBook}
									setShowBook={setShowBook}
									bookID={bookID}
								></Book> */}
								<img src={item.imageURL} alt="" />
							</div>
						</div>
						<div className="detailsDisplay-reviewsSection">
							<h3>Ratings and Reviews</h3>
							<div className="detailsDisplay-reviews">
								{comments.map((review) => (
									<div className="review" key={review._id}>
										<div className="review-displaySection">
											<img src={review.avatar_link} alt="" />
											<h5>{review.name}</h5>
										</div>
										<div className="review-detailsSection">
											<div>
												<span>
													<Rating
														emptyStyle={{ display: 'flex' }}
														fillStyle={{ display: '-webkit-inline-box' }}
														readonly={true}
														initialValue={review.rating}
														allowFraction={true}
														size={22}
														SVGstrokeColor="#4d3505"
														emptyColor="#f2e7d9"
														SVGstorkeWidth={1}
														fillColor="#4d3619"
													/>
													{/* {review.rating} */}
												</span>
											</div>
											<div>
												<span className="truncate">{review.comment}</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			) : (
				''
			)}
		</motion.div>
	)
}

export { Cart, Book }
