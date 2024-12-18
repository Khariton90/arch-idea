import { baseApi } from '@/shared/api/base-api'
import { Idea, IdeaQuery, IdeaRdo } from '../model/types'
import { IDEA_TAG } from '@/shared/api/tags'

export const ideaApi = baseApi.injectEndpoints({
	endpoints: build => ({
		findIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => ({
				url: '/idea',
				method: 'GET',
				params: { ...queryParams },
			}),
			providesTags: [IDEA_TAG],
		}),
		createIdea: build.mutation<IdeaRdo, Idea>({
			query: dto => ({
				url: '/idea/create',
				method: 'POST',
				body: dto,
			}),
			invalidatesTags: [IDEA_TAG],
		}),
	}),
})

export const { useCreateIdeaMutation, useFindIdeasQuery } = ideaApi
