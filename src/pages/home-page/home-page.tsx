import { Colors, Root } from '@/app/styles/variables'
import { IdeaCard } from '@/entities/idea'
import { mockIdeas } from '@/entities/idea/api/__mock__/mock-idea-list'
import { LikeDislikeButtons } from '@/features/vote/like-dislike-buttons/like-dislike-buttons'
import { LampIcon } from '@/shared/ui/lamp-icon'
import { PetLogo } from '@/shared/ui/pet-logo'
import { EmptyIdeasList } from '@/widgets/empty-ideas-list/empty-ideas-list'
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack'

import {
	Dimensions,
	TouchableOpacityProps,
	ScrollView,
	View,
	SafeAreaView,
} from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	flex: 1;
	minheight: 100%;
	background-color: ${Colors.background};
`

const Header = styled.View`
	padding: 20px;
	background-color: #333;
	border-bottom-left-radius: ${Root.radius20};
	border-bottom-right-radius: ${Root.radius20};
	position: fixed;
	top: 0;
`

const NavList = styled.View`
	height: 80px;
	flex-direction: row;
	justify-content: space-between;
	padding: 10px;
	gap: 10px;
`

const NavLink = styled.TouchableOpacity<TouchableOpacityProps>`
	background-color: ${Colors.btnGrey};
	padding: 20px;
	border-radius: ${Root.radius10};
	flex: 1;
`

const Title = styled.Text`
	font-size: 32px;
	color: ${Colors.success};
	font-weight: 700;
	text-align: center;
	letter-spacing: -1.9px;
	text-transform: uppercase;
`
const Main = styled.View`
	gap: 20px;
	flex: 1;
`

const AddNewIdea = styled.View`
	flex-direction: row;
	padding: 0 20px;
`

const AddIdeaButton = styled.TouchableOpacity`
	flex: 1;
	color: #fff;
	padding: 20px;
	background-color: ${Colors.primary};
	border-radius: ${Root.radius10};
`

const AddIdeaButtonText = styled.Text`
	color: #fff;
	text-align: center;
`

const IdeasContainer = styled.View`
	flex: 1;
	gap: 20px;
	background: ${Colors.lightGrey};
	padding: 20px;
	border-radius: ${Root.radius20};
	margin: 20px;
`

const FilterList = styled.View`
	flex-direction: row;
	gap: 10px;
	justify-content: space-between;
`

interface FilterItemProps {
	background?: string
}

const FilterItem = styled.TouchableOpacity<
	TouchableOpacityProps & FilterItemProps
>`
	background-color: ${(props: FilterItemProps) =>
		props.background ? props.background : Colors.lightGrey};
	padding: 6px;
	border-radius: ${Root.radius10};
	justify-content: center;
	align-items: center;
	width: 100;
`

const FilterItemText = styled.Text`
	color: ${Colors.white};
	text-align: center;
	font-size: 10px;
`

const Logo = styled.View`
	flex-direction: row;
	align-items: flex-end;
	justify-content: center;
	margin: 30px 0 0;
`

interface Props {
	navigation: NativeStackNavigationProp<any, any, any>
}

export function HomePage({ navigation }: Props): JSX.Element {
	const width = Dimensions.get('window')
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Container>
					<Header>
						<NavList>
							<NavLink />
							<NavLink />
							<NavLink />
						</NavList>
					</Header>

					<Main>
						<Logo>
							<PetLogo />
							<LampIcon />
							<Title>Idea</Title>
						</Logo>

						<AddNewIdea>
							<AddIdeaButton onPress={() => navigation.navigate('New')}>
								<AddIdeaButtonText>Добавить новую идею</AddIdeaButtonText>
							</AddIdeaButton>
						</AddNewIdea>

						<IdeasContainer>
							{mockIdeas.length ? (
								<>
									<FilterList>
										<FilterItem background={Colors.success}>
											<FilterItemText>Новые</FilterItemText>
										</FilterItem>

										<FilterItem background={Colors.primary}>
											<FilterItemText>В работе</FilterItemText>
										</FilterItem>

										<FilterItem background={Colors.alert}>
											<FilterItemText>Завершены</FilterItemText>
										</FilterItem>
									</FilterList>

									{mockIdeas.map(idea => (
										<IdeaCard
											navigation={navigation}
											key={idea.id}
											idea={idea}
											likeDislikeSlot={<LikeDislikeButtons />}
										/>
									))}
								</>
							) : (
								<EmptyIdeasList />
							)}
						</IdeasContainer>
					</Main>
				</Container>
			</ScrollView>
		</SafeAreaView>
	)
}
