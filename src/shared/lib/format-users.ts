export function formatUsers(count: number) {
	let ending

	const lastTwoDigits = count % 100

	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		ending = 'участников'
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
				ending = 'участников'
		}
	}

	return `${count} ${ending}`
}
