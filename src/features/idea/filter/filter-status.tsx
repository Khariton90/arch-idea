import { IdeaStatus } from '@/entities/idea'
import { mappingStatus } from '@/entities/idea/lib/mapIdea'
import { FilterButton } from '@/entities/idea/ui/filter-button'
import { ThemeContext } from '@/shared/colors.styled'
import { memo, ReactNode, useContext, useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	height: 60px;
	justify-content: center;
	padding: 0 0 20px 0;
	width: 100%;
`

interface Props {
	sortingSlot?: ReactNode
	slotWithAllFilter?: ReactNode
	onChangeFilterStatus: (status: IdeaStatus | undefined) => void
}

function FilterComponent({
	sortingSlot,
	slotWithAllFilter,
	onChangeFilterStatus,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	const [activeItem, setActiveItem] = useState<IdeaStatus | undefined>(
		undefined
	)

	const width = Dimensions.get('screen').width

	const handlePress = (item: IdeaStatus) => {
		if (activeItem === item) {
			setActiveItem(prev => undefined)
			onChangeFilterStatus(undefined)
			return
		}
		setActiveItem(prev => item)
		onChangeFilterStatus(item)
	}

	return (
		<Container>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{sortingSlot}
				{slotWithAllFilter}
				{Object.entries(mappingStatus).map(([key, value]) => (
					<FilterButton
						style={{ width: width / 3 }}
						key={key}
						text={value}
						onPress={() => handlePress(key as IdeaStatus)}
						active={activeItem === key}
					/>
				))}
			</ScrollView>
		</Container>
	)
}

export const FilterIdeaStatus = memo(FilterComponent)
