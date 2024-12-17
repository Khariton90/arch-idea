import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import styled from 'styled-components/native'
import { Chevron } from './chevron'
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	useDerivedValue,
	useAnimatedRef,
	runOnUI,
	measure,
	interpolate,
	Extrapolation,
} from 'react-native-reanimated'
import { TouchableOpacityProps } from 'react-native'
import { useState } from 'react'
import { Idea } from '@/entities/idea'

const Container = styled.View`
	border-radius: ${Root.radius10};
	border: 1px solid ${Colors.grey};
	width: 100%;
	overflow: hidden;
`

const Pressable = styled.Pressable`
	padding: 20px 10px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const TextTitle = styled.Text`
	color: ${Colors.white};
	font-size: 14px;
`

const Content = styled.TouchableOpacity<
	TouchableOpacityProps & { activeLink: boolean }
>`
	padding: 10px;
	background-color: ${({ activeLink }) =>
		activeLink ? Colors.success : Colors.background};
`

const TextContent = styled.Text`
	font-size: 14px;
	color: ${Colors.white};
`

interface Props {
	value: string
	content: string[]
	title: string
	onSelected: (key: keyof Idea, value: string) => void
}

export function Accordion({
	value,
	content,
	title,
	onSelected,
}: Props): JSX.Element {
	const [activeSelect, setActiveSelect] = useState('')

	const listRef = useAnimatedRef<Animated.View>()
	const heightValue = useSharedValue(0)
	const open = useSharedValue(false)
	const progress = useDerivedValue(() =>
		open.value ? withTiming(1) : withTiming(0)
	)
	const heightAnimationStyle = useAnimatedStyle(() => ({
		height: interpolate(
			progress.value,
			[0, 1],
			[0, heightValue.value],
			Extrapolation.CLAMP
		),
	}))

	const handleSelect = (value: string) => {
		onSelected(title as keyof Idea, value)
		setActiveSelect(prev => value)
	}

	return (
		<Container>
			<Pressable
				onPress={() => {
					if (heightValue.value === 0) {
						runOnUI(() => {
							'worklet'
							heightValue.value = measure(listRef)!.height
						})()
					}
					open.value = !open.value
				}}
			>
				<TextTitle>{value}</TextTitle>
				<Chevron progress={progress} />
			</Pressable>

			<Animated.View style={heightAnimationStyle}>
				<Animated.View
					ref={listRef}
					style={{
						width: '100%',
						position: 'absolute',
						top: 0,
					}}
				>
					{content.map(item => (
						<Content
							activeLink={activeSelect === item}
							key={item}
							onPress={() => handleSelect(item)}
						>
							<TextContent>{item}</TextContent>
						</Content>
					))}
				</Animated.View>
			</Animated.View>
		</Container>
	)
}
