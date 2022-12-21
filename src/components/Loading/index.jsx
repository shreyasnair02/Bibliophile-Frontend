import { AnimatePresence, motion } from 'framer-motion'
import './style.scss'

export default function Loading() {
	return (
		<AnimatePresence>
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
		</AnimatePresence>
	)
}
