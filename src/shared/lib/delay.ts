export const delay = async (ms = 600) =>
	await new Promise(resolve => setTimeout(resolve, ms))
