import { baseApi } from '@/shared/api/base-api'
import { Idea, IdeaQuery, IdeaRdo } from '../model/types'
import { IDEA_TAG, ONE_IDEA, VOTE_TAG, WISHLIST_TAG } from '@/shared/api/tags'
import { mapIdea } from '../lib/mapIdea'
import { createEntityAdapter } from '@reduxjs/toolkit'

const ideasAdapter = createEntityAdapter({
	selectId: (item: IdeaRdo) => item.id,
})

const ideasSelector = ideasAdapter.getSelectors()

export const ideaApi = baseApi.injectEndpoints({
	endpoints: build => ({
		findTotalCountIdeas: build.query<number, IdeaQuery>({
			query: queryParams => ({
				url: `/idea/totalCount`,
				method: 'GET',
				providesTags: [IDEA_TAG],
				params: { ...queryParams },
			}),
		}),
		findIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => {
				console.log(queryParams)
				return {
					url: '/idea',
					method: 'GET',
					params: { ...queryParams },
				}
			},
			providesTags: [IDEA_TAG, VOTE_TAG, ONE_IDEA],
			transformResponse: (response: IdeaRdo[]) => response.map(mapIdea),
		}),
		findMyIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => ({
				url: '/idea/my-ideas',
				method: 'GET',
				params: { ...queryParams },
			}),
			providesTags: [IDEA_TAG, WISHLIST_TAG],
			transformResponse: (response: IdeaRdo[]) => response.map(mapIdea),
		}),
		findFavoriteIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => ({
				url: '/idea/favorite-ideas',
				method: 'GET',
				params: { ...queryParams },
			}),
			providesTags: [IDEA_TAG, WISHLIST_TAG],
			transformResponse: (response: IdeaRdo[]) => response.map(mapIdea),
		}),
		findByIdeaId: build.query<IdeaRdo, string>({
			query: id => ({
				url: `/idea/${id}`,
				method: 'GET',
				providesTags: [IDEA_TAG, WISHLIST_TAG, VOTE_TAG, ONE_IDEA],
			}),
			transformResponse: (response: IdeaRdo) => mapIdea(response),
		}),
		createIdea: build.mutation<IdeaRdo, Idea>({
			query: dto => ({
				url: '/idea/create',
				method: 'POST',
				body: dto,
			}),
			invalidatesTags: [IDEA_TAG, WISHLIST_TAG],
			transformResponse: (response: IdeaRdo) => mapIdea(response),
		}),
	}),
})

export const {
	useCreateIdeaMutation,
	useFindIdeasQuery,
	useFindByIdeaIdQuery,
	useFindMyIdeasQuery,
	useFindFavoriteIdeasQuery,
	useFindTotalCountIdeasQuery,
} = ideaApi

export { ideasSelector, ideasAdapter }
