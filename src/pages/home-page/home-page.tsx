import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { IdeaCard } from '@/entities/idea'
import { IdeaStatus } from '@/entities/idea/model/types'
import { LikeDislikeButtons } from '@/features/vote/like-dislike-buttons/like-dislike-buttons'
import { AddToWishlist } from '@/features/wishlist/add-to-wishlist/add-to-wishlist'
import { useAppSelector } from '@/shared/hooks/hooks'
import { FavoriteIcon } from '@/shared/ui/favorite-icon'
import { IdeaIcon } from '@/shared/ui/idea-icon'
import { LampIcon } from '@/shared/ui/lamp-icon'
import { PetLogo } from '@/shared/ui/pet-logo'
import { ThumbUpIcon } from '@/shared/ui/thumb-up-icon'
import { EmptyIdeasList } from '@/widgets/empty-ideas-list/empty-ideas-list'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'

import {
	Dimensions,
	TouchableOpacityProps,
	ScrollView,
	SafeAreaView,
	TextProps,
} from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
`

const Header = styled.View`
	padding: 20px;
	background-color: ${Colors.lightGrey};
	border-bottom-left-radius: ${Root.radius20};
	border-bottom-right-radius: ${Root.radius20};
	position: fixed;
	top: 0;
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
	background-color: ${Colors.success};
	border-radius: ${Root.radius10};
	box-shadow: 0px 2px 6px ${Colors.lightGrey};
`

const AddIdeaButtonText = styled.Text`
	color: #fff;
	text-align: center;
	text-transform: uppercase;
`

const IdeasContainer = styled.View`
	flex: 1;
	gap: 20px;
	background: ${Colors.lightGrey};
	padding: 20px;
	border-radius: ${Root.radius20} ${Root.radius20} 0 0;
	margin-top: 20px;
`

const FilterList = styled.View`
	flex-direction: row;
	gap: 10px;
	justify-content: space-between;
	padding: 10px 0 20px;
`

const FilterItem = styled.TouchableOpacity<
	TouchableOpacityProps & {
		background?: string
		width: string
		border?: boolean
	}
>`
	background-color: ${({ background }) => background ?? Colors.lightGrey};
	padding: 6px;
	border-radius: ${Root.radius10};
	justify-content: center;
	align-items: center;
	width: ${({ width }) => width};
	box-shadow: ${({ border }) =>
		border ? `0px 2px 2px ${Colors.success};` : '0px 2px 2px transparent;'};
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

const NavList = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 10px;
	gap: 10px;
`

const NavLink = styled.TouchableOpacity<TouchableOpacityProps>`
	background-color: ${Colors.background};
	padding: 10px;
	border-radius: ${Root.radius10};
	flex: 1;
	justify-content: flex-end;
	box-shadow: 0 0 2px ${Colors.success};
`

const NavLinkText = styled.Text`
	color: ${Colors.white};
	font-weight: 600;
	font-size: 12px;
	margin-top: 6px;
`

const NavLinkSmallText = styled.Text<TextProps & { color?: string }>`
	color: ${({ color }) => color ?? Colors.white};
	font-size: 12px;
`

interface Props {
	navigation: NativeStackNavigationProp<any, any, any>
}

export function HomePage({ navigation }: Props): JSX.Element {
	const ideasList = useAppSelector(({ idea }) => idea.ideaList)
	const wishList = useAppSelector(({ idea }) => idea.wishList)
	const wishListLength = Object.keys(wishList).length

	const [queryFilter, setQueryFilter] = useState<IdeaStatus | string>('')

	const filteredIdeaList = ideasList.filter(item =>
		queryFilter ? item.status === queryFilter : item
	)

	const handlePress = (query: IdeaStatus) => {
		if (query === queryFilter) {
			setQueryFilter(state => '')
			return
		}

		setQueryFilter(state => query)
	}

	const width = Dimensions.get('window').width
	const smallBtnWidth = Math.ceil(width / 3 - 20)
	const widthValue = `${smallBtnWidth}px`
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Container>
					<Header>
						<NavList>
							<NavLink>
								<FavoriteIcon active={true} />
								<NavLinkText>Избранное</NavLinkText>
								<NavLinkSmallText color={Colors.btnGrey}>
									{wishListLength} идей
								</NavLinkSmallText>
							</NavLink>
							<NavLink>
								<IdeaIcon />
								<NavLinkText>Мои идеи</NavLinkText>
								<NavLinkSmallText color={Colors.btnGrey}>идеи</NavLinkSmallText>
							</NavLink>
							<NavLink>
								<ThumbUpIcon active={true} />
								<NavLinkText>С отзывами</NavLinkText>
								<NavLinkSmallText color={Colors.btnGrey}>идеи</NavLinkSmallText>
							</NavLink>
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
							<FilterList>
								<FilterItem
									background={Colors.success}
									width={widthValue}
									border={queryFilter === IdeaStatus.New}
									onPress={() => handlePress(IdeaStatus.New)}
								>
									<FilterItemText>Новые</FilterItemText>
								</FilterItem>

								<FilterItem
									background={Colors.primary}
									width={widthValue}
									border={queryFilter === IdeaStatus.Approved}
									onPress={() => handlePress(IdeaStatus.Approved)}
								>
									<FilterItemText>В работе</FilterItemText>
								</FilterItem>

								<FilterItem
									background={Colors.alert}
									width={widthValue}
									border={queryFilter === IdeaStatus.Rejected}
									onPress={() => handlePress(IdeaStatus.Rejected)}
								>
									<FilterItemText>Завершены</FilterItemText>
								</FilterItem>
							</FilterList>

							{filteredIdeaList.length ? (
								<>
									{filteredIdeaList.map(idea => (
										<IdeaCard
											navigation={navigation}
											key={idea.id}
											idea={idea}
											likeDislikeSlot={
												<LikeDislikeButtons
													id={idea.id}
													likes={idea.likes}
													disLakes={idea.disLakes}
												/>
											}
											wishlistSlot={<AddToWishlist id={idea.id} />}
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
