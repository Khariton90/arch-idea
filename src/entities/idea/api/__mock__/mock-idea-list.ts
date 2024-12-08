import { Category, Idea, IdeaStatus } from '../../model/types'
import { faker } from '@faker-js/faker'

export const generateMockIdeaList = (): Idea[] => {
	const list: Idea[] = []
	const statusArray = Object.values(IdeaStatus)

	for (let i = 0; i <= 50; i++) {
		const status = statusArray[Math.floor(Math.random() * statusArray.length)]
		const item: Idea = {
			id: i,
			title: faker.commerce.product.name,
			description: faker.commerce.productDescription(),
			category: Category.CommercialDepartment,
			priority: 'High',
			status: status,
			creationDate: faker.date.anytime.toString(),
			likes: 0,
			disLakes: 0,
		}

		list.push(item)
	}

	return []
}

export const mockIdeas = generateMockIdeaList()
