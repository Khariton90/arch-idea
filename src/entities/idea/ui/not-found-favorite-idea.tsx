import { Typography } from '@/shared/ui/typography/typography'
import { useEffect, useRef } from 'react'
import { Animated, Image } from 'react-native'

export function NotFoundFavoriteIdea(): JSX.Element {
	const fadeAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}).start()
	})

	return (
		<Animated.View
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				opacity: fadeAnim,
			}}
		>
			<Image source={require('../../../../assets/images/not-found-200.webp')} />
			<Typography variant='h1' text='Вы ничего не добавили' />
			<Typography variant='h1' text='в избранное' />
			<Typography variant='p' soft text='Сохраняйте понравившиеся идеи,' />
			<Typography variant='p' soft text='к которым планируете вернуться' />
		</Animated.View>
	)
}
