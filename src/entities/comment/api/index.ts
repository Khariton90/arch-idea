import { baseApi } from '@/shared/api/base-api'
import { CommentDto, CommentListRdo, CommentRdo } from '../model/types'
import { COMMENT_TAG } from '@/shared/api/tags'
import { IdeaQuery } from '@/entities/idea'

export const commentApi = baseApi.injectEndpoints({
	endpoints: build => ({
		findComments: build.query<
			CommentListRdo,
			{ ideaId: string; query: IdeaQuery }
		>({
			query: ({ ideaId, query }) => ({
				url: `/comment/${ideaId}`,
				method: 'GET',
				params: { ...query },
			}),
			providesTags: [COMMENT_TAG],
		}),
		createComment: build.mutation<CommentRdo, CommentDto>({
			query: ({ ideaId, content }) => ({
				url: `/comment/${ideaId}`,
				method: 'POST',
				body: { content },
			}),
			invalidatesTags: [COMMENT_TAG],
		}),
		findCommentCount: build.query<number, { ideaId: string }>({
			query: ({ ideaId }) => ({
				url: `/comment/totalCount/${ideaId}`,
				method: 'GET',
			}),
		}),
	}),
})

export const {
	useCreateCommentMutation,
	useFindCommentsQuery,
	useFindCommentCountQuery,
} = commentApi
