import { toggleWishList } from '@/entities/idea/model/slice'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { FavoriteIcon } from '@/shared/ui/favorite-icon'
import { useState } from 'react'
import styled from 'styled-components/native'

const WishlistButton = styled.TouchableOpacity`
	padding: 6px;
`

interface Props {
	id: number
}

export function AddToWishlist({ id }: Props): JSX.Element {
	const [active, setActive] = useState(false)
	const dispatch = useAppDispatch()

	const handlePress = () => {
		setActive(state => !state)
		dispatch(toggleWishList(id))
	}

	return (
		<WishlistButton onPress={handlePress}>
			<FavoriteIcon active={active} />
		</WishlistButton>
	)
}
