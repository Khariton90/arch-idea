import dayjs from 'dayjs'
import { Category, Idea, IdeaStatus, Priority } from '../../model/types'
import { faker } from '@faker-js/faker'

export const generateMockIdeaList = (): Idea[] => {
	const list: Idea[] = []
	const statusArray = Object.values(IdeaStatus)

	for (let i = 0; i <= 100; i++) {
		const status = statusArray[Math.floor(Math.random() * statusArray.length)]
		const item: Idea = {
			id: i,
			title: faker.commerce.product.name,
			description: faker.commerce.productDescription(),
			subDepartmentId: Category.CommercialDepartment,
			priority: Priority.Low,
			status: status,
			likes: 0,
			disLakes: 0,
			createdAt: dayjs().toISOString(),
			updatedAt: dayjs().toISOString(),
		}

		list.push(item)
	}

	return list
}

export const mockIdeas = generateMockIdeaList()
