export const delay = async (ms = 2000) =>
	await new Promise(resolve => setTimeout(resolve, ms))
