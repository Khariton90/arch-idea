import { baseApi } from '@/shared/api/base-api'
import { WishlistDto } from '../model/types'
import { IDEA_TAG, ONE_IDEA, WISHLIST_TAG } from '@/shared/api/tags'

export const wishlistApi = baseApi.injectEndpoints({
	endpoints: build => ({
		addToWishlist: build.mutation<void, WishlistDto>({
			query: ({ id }) => ({
				url: `/favorite/${id}`,
				method: 'POST',
			}),
			invalidatesTags: [IDEA_TAG, WISHLIST_TAG, IDEA_TAG, ONE_IDEA],
		}),
		removeFromWishlist: build.mutation<void, WishlistDto>({
			query: ({ id }) => ({
				url: `/favorite/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [IDEA_TAG, WISHLIST_TAG, IDEA_TAG, ONE_IDEA],
		}),
	}),
})

export const { useAddToWishlistMutation, useRemoveFromWishlistMutation } =
	wishlistApi
