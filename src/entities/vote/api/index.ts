import { baseApi } from '@/shared/api/base-api'
import { VoteDto, VoteRdo } from '../model/types'
import { IDEA_TAG, VOTE_TAG, WISHLIST_TAG } from '@/shared/api/tags'

export const voteApi = baseApi.injectEndpoints({
	endpoints: build => ({
		toggleLike: build.mutation<VoteRdo, VoteDto>({
			query: ({ ideaId }) => ({
				url: `/like/${ideaId}`,
				method: 'POST',
			}),
			invalidatesTags: [IDEA_TAG, VOTE_TAG, WISHLIST_TAG],
		}),
		toggleDislike: build.mutation<VoteRdo, VoteDto>({
			query: ({ ideaId }) => ({
				url: `/dislike/${ideaId}`,
				method: 'POST',
			}),
			invalidatesTags: [IDEA_TAG, VOTE_TAG, WISHLIST_TAG],
		}),
	}),
})

export const { useToggleDislikeMutation, useToggleLikeMutation } = voteApi
