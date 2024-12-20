import { FavoriteIcon } from '@/shared/ui/favorite-icon'
import styled from 'styled-components/native'

const WishlistButton = styled.TouchableOpacity`
	padding: 6px;
`

interface WishListToggleProps {
	add: () => void
	remove: () => void
	active: boolean
}

export function WishListToggle({ add, remove, active }: WishListToggleProps) {
	return (
		<WishlistButton onPress={!active ? add : remove}>
			{<FavoriteIcon active={active} />}
		</WishlistButton>
	)
}
