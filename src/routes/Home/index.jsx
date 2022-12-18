import PageWrapper from '../../utils/PageWrapper'
import { HomePage } from './Homepage/HomePage'
import './style.scss'
export default function Home() {
	return (
		<PageWrapper className="home page">
			<HomePage></HomePage>
		</PageWrapper>
	)
}
