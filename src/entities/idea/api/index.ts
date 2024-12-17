import { baseApi } from '@/shared/api/base-api'
import { Idea, IdeaRdo } from '../../model/types'

export const ideaApi = baseApi.injectEndpoints({
	endpoints: build => ({
		createIdea: build.mutation<IdeaRdo, Idea>({
			query: dto => ({
				url: '/idea/create',
				method: 'POST',
				body: dto,
				params: { delay: 2000 },
			}),
		}),
	}),
})

export const { useCreateIdeaMutation } = ideaApi
