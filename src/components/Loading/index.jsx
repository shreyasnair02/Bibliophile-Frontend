import './style.scss'
import { motion } from 'framer-motion'

export default function Loading() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 1 }}
			className="loading"
		>
			<div className="loading__ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</motion.div>
	)
}