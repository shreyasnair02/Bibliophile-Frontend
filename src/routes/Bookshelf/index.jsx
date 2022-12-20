import PageWrapper from '../../utils/PageWrapper'
import Input from '../../components/Input'
import './style.scss'
import booksJson from '../../assets/books.json'
import uuid4 from 'uuid4'

export default function Bookshelf() {

	return (
		<PageWrapper className="bookshelf page">
			<div className="bookshelf__filter">
				<h4>Filter By</h4>
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
					{booksJson.map((book) => (
						<div className="bookshelf__book" key={uuid4()}>
							<img src={book.url} alt={book.title} />
							<div className="bookshelf__book-info">
								<p style={{ textDecoration: 'line-through'}}>₹{book.price + Math.ceil(Math.random() * 1000)}</p>
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
