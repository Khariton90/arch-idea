export function formatUsers(count: number) {
	let ending
	const lastTwoDigits = count % 100
	const defaultTitle = 'участников'

	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		ending = defaultTitle
	} else {
		switch (count % 10) {
			case 1:
				ending = 'участник'
				break
			case 2:
			case 3:
			case 4:
				ending = 'участника'
				break
			default:
				ending = count >= 1000 ? `${defaultTitle.slice(0, 2)}.` : defaultTitle
		}
	}

	return `${count} ${ending}`
}
