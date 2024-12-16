export const delay = async (ms = 1000) =>
	await new Promise(resolve => setTimeout(resolve, ms))
