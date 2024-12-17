import { baseApi } from '@/shared/api/base-api'
import { Idea, IdeaQuery, IdeaRdo } from '../model/types'

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
		findIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => ({
				url: '/idea',
				method: 'GET',
				params: { ...queryParams },
			}),
		}),
	}),
})

export const { useCreateIdeaMutation, useFindIdeasQuery } = ideaApi
