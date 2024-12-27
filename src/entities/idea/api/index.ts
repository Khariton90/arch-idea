import { baseApi } from '@/shared/api/base-api'
import { Idea, IdeaQuery, IdeaRdo } from '../model/types'
import { IDEA_TAG, WISHLIST_TAG } from '@/shared/api/tags'

export const ideaApi = baseApi.injectEndpoints({
	endpoints: build => ({
		findIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => ({
				url: '/idea',
				method: 'GET',
				params: { ...queryParams },
			}),
			providesTags: [IDEA_TAG, WISHLIST_TAG],
		}),
		findMyIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => ({
				url: '/idea/my-ideas',
				method: 'GET',
				params: { ...queryParams },
			}),
			providesTags: [IDEA_TAG, WISHLIST_TAG],
		}),
		findFavoriteIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => ({
				url: '/idea/favorite-ideas',
				method: 'GET',
				params: { ...queryParams },
			}),
			providesTags: [IDEA_TAG, WISHLIST_TAG],
		}),
		findByIdeaId: build.query<IdeaRdo, string>({
			query: id => ({
				url: `/idea/${id}`,
				method: 'GET',
				providesTags: [IDEA_TAG, WISHLIST_TAG],
			}),
		}),
		createIdea: build.mutation<IdeaRdo, Idea>({
			query: dto => ({
				url: '/idea/create',
				method: 'POST',
				body: dto,
			}),
			invalidatesTags: [IDEA_TAG, WISHLIST_TAG],
		}),
	}),
})

export const {
	useCreateIdeaMutation,
	useFindIdeasQuery,
	useFindByIdeaIdQuery,
	useFindMyIdeasQuery,
	useFindFavoriteIdeasQuery,
} = ideaApi
