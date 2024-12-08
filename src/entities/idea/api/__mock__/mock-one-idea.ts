import { Category, Idea, IdeaStatus } from '../../model/types'
import { faker } from '@faker-js/faker'

export const generateOneMockIdea = (): Idea => {
	const statusArray = Object.values(IdeaStatus)
	const status = statusArray[Math.floor(Math.random() * statusArray.length)]
	return {
		id: faker.number.int({ min: 100 }),
		title: faker.commerce.product.name,
		description: faker.commerce.productDescription(),
		category: Category.CommercialDepartment,
		priority: 'High',
		status: status,
		creationDate: new Date().toISOString(),
		likes: 0,
		disLakes: 0,
	}
}
