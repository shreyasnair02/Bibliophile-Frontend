import { useState, useEffect } from 'react'
import PageWrapper from '../../utils/PageWrapper'
import Input from '../../components/Input'
import './style.scss'
import booksJson from '../../assets/books.json'
import uuid4 from 'uuid4'
import genres from './constants/genres.json'
export default function Bookshelf() {
	const [checkedState, setCheckedState] = useState(genres)
	const [books, setBooks] = useState(booksJson)
	let updatedBooks = [...booksJson]
	useEffect(() => {
		updatedBooks = books.filter((book) =>
			checkedState.some((eachGenre) => {
				return eachGenre.checked && book.genre.includes(eachGenre.genre)
			})
		)
		setBooks(updatedBooks)
	}, [checkedState])
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
				</div>
			</div>
			<div className="bookshelf__books">
				<form className="bookshelf__form">
					<Input
						type="search"
						className="bookshelf__search"
						placeholder="Search for books..."
					/>
					{/* <button className=''>Search</button> */}
				</form>
				<div className="bookshelf__books-section">
					{books.map((book) => (
						<div className="bookshelf__book" key={uuid4()}>
							<img src={book.url} alt={book.title} />
							<div className="bookshelf__book-info">
								<p style={{ textDecoration: 'line-through' }}>
									₹{book.price + Math.ceil(Math.random() * 1000)}
								</p>
								<h5>₹{book.price}</h5>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="bookshelf__recommendation">
				<h4>People also like</h4>
			</div>
		</PageWrapper>
	)
}
