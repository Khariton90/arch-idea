export function formatIdea(count: number) {
	let result

	if (count % 10 === 1 && count % 100 !== 11) {
		result = `${count} идея`
	} else if (
		count % 10 >= 2 &&
		count % 10 <= 4 &&
		!(count % 100 >= 12 && count % 100 <= 14)
	) {
		result = `${count} идеи`
	} else {
		result = `${count} идей`
	}

	return result
}
