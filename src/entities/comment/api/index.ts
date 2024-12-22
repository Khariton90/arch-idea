import { baseApi } from '@/shared/api/base-api'
import { CommentDto, CommentListRdo, CommentRdo } from '../model/types'
import { COMMENT_TAG } from '@/shared/api/tags'

export const commentApi = baseApi.injectEndpoints({
	endpoints: build => ({
		findComments: build.query<CommentListRdo, string>({
			query: ideId => ({
				url: `/comment/${ideId}`,
				method: 'GET',
				params: {},
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
	}),
})

export const { useCreateCommentMutation, useFindCommentsQuery } = commentApi
