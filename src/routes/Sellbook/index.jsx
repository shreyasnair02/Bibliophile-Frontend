import Loading from '../../components/Loading'
import PageWrapper from '../../utils/PageWrapper'
import { IconPhoto, IconRotate } from '@tabler/icons'
import './style.scss'
import { useState } from 'react'
import books from '../../assets/books.json'
import { useRef } from 'react'
export default function Sellbook() {
	const [image, setImage] = useState('')
	let flag = useRef(false)

	const styles = {
		hide: {
			display: flag.current ? 'flex' : 'none',
			opacity: flag.current ? 'flex' : '0',
		},
		defhide: {
			display: flag.current ? 'none' : 'flex',
			opacity: flag.current ? 'none' : '1',
		},
	}
	const handleImgUpload = () => {
		flag.current = true
		setImage('../../../src/assets/images/a-clash-of-kings.jpg')
	}
	return (
		<PageWrapper>
			<div className="upload__container">
				<div className="upload__title">
					<h1>Upload your book</h1>
				</div>
				<div className="upload__form-container">
					<form action="" className="upload__form">
						<div className="upload__form-img-container">
							<label htmlFor="imgUp">
								<img src={image} />
								<IconPhoto size={250} strokeWidth={0.4} />
								<h4>Drag and Drop Image</h4>
								<input
									type="file"
									name=""
									id="imgUp"
									style={{ display: 'none' }}
									onMouseDown={() => handleImgUpload()}
								/>
							</label>
						</div>
						<div className="upload__form-textinputs">
							<input type="text" placeholder="Enter Title" />
							<input type="text" placeholder="Enter Author Name" />
							<textarea placeholder="Enter Description"></textarea>
						</div>
						<div className="upload__buttons">
							<button type="reset">
								<IconRotate size={15}></IconRotate> Reset
							</button>
							<button
								type="submit"
								onClick={(e) => {
									e.preventDefault()
								}}
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</PageWrapper>
	)
}
