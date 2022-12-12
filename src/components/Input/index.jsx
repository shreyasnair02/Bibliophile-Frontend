import './style.scss'
import { IconAt, IconLock } from '@tabler/icons'

const IconProps = { size: 18, color: 'currentColor' }

const InputIcon = (type) => {
	switch (type) {
		case 'email':
			return <IconAt {...IconProps} />
		case 'password':
			return <IconLock {...IconProps} />
		default:
			return null
	}
}

export default function Input({
	required,
	type,
	name,
	placeholder,
	value,
	onChange,
}) {
	return (
		<div className="input">
			<div className="input__icon">{InputIcon(type)}</div>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required
			/>
		</div>
	)
}
