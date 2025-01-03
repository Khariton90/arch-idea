import {
	useAddToWishlistMutation,
	useRemoveFromWishlistMutation,
} from '@/entities/wishlist/api'
import { FavoriteIcon } from '@/shared/ui/icons/favorite-icon'
import styled from 'styled-components/native'

const WishlistButton = styled.TouchableOpacity`
	padding: 6px;
`

interface WishListToggleProps {
	active: boolean
	ideaId: string
	refetch?: () => void
}

export function WishListToggle({
	active,
	ideaId,
	refetch,
}: WishListToggleProps) {
	const [addToWishlist] = useAddToWishlistMutation()
	const [removeFromWishlist] = useRemoveFromWishlistMutation()

	const toggleToWishlist = async () => {
		if (!active) {
			await addToWishlist({ id: ideaId })
		} else {
			await removeFromWishlist({ id: ideaId })
		}

		if (refetch) {
			refetch()
		}
	}

	return (
		<WishlistButton onPress={toggleToWishlist}>
			{<FavoriteIcon active={active} />}
		</WishlistButton>
	)
}
