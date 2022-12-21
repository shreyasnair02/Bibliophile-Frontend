import { IconAt, IconLock, IconSearch } from '@tabler/icons'
import './style.scss'

const IconProps = { size: 18, color: 'currentColor' }

const InputIcon = (type) => {
	switch (type) {
		case 'email':
			return <IconAt {...IconProps} />
		case 'password':
			return <IconLock {...IconProps} />
		case 'search':
			return <IconSearch {...IconProps} />
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
	minlength,
	className = '',
}) {
	return (
		<div className={`input ${className}`}>
			<div className="input__icon">{InputIcon(type)}</div>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				minLength={minlength}
				required
			/>
		</div>
	)
}
