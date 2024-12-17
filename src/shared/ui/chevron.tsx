import Colors from '@/app/styles/Colors'
import * as React from 'react'
import Animated, {
	SharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

interface Props {
	progress: SharedValue<1 | 0>
}

export function Chevron({ progress }: Props) {
	const iconStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${progress.value * -180}deg` }],
	}))

	return (
		<Animated.View style={iconStyle}>
			<Svg viewBox='0 0 20 20' width={20} height={20} fill={Colors.white}>
				<Path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
			</Svg>
		</Animated.View>
	)
}
