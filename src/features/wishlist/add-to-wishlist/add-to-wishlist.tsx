import { FavoriteIcon } from '@/shared/ui/favorite-icon'
import { useState } from 'react'
import styled from 'styled-components/native'

const WishlistButton = styled.TouchableOpacity`
	padding: 6px;
`

export function AddToWishlist(): JSX.Element {
	const [active, setActive] = useState(false)

	return (
		<WishlistButton onPress={() => setActive(state => !state)}>
			<FavoriteIcon active={active} />
		</WishlistButton>
	)
}
