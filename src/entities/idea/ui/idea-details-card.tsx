import { View } from 'react-native'
import styled from 'styled-components/native'
import { ReactNode, useContext } from 'react'
import React from 'react'
import { IdeaRdo } from '../model/types'
import { Avatar } from '@/shared/ui/avatar/avatar'
import { ThemeContext } from '@/shared/colors.styled'
import { formatDate } from '@/shared/lib/format-date'
import { Typography } from '@/shared/ui/typography/typography'

const Container = styled.View<{ background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
`

const Card = styled.View<{ background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	border-radius: 20px;
	margin: 40px 0;
	overflow: hidden;
`

const CardHeader = styled.View`
	padding: 20px;
	border-bottom-color: #6e6e6e;
	border-bottom-width: 1px;
`

const CardContent = styled.View`
	padding: 20px;
	gap: 10px;
`

const AuthorBox = styled.View`
	flex-direction: row;
	gap: 6px;
	align-items: center;
	position: absolute;
	right: 10px;
	top: 20px;
`

const Row = styled.View`
	flex-direction: row;
	align-items: center;
`

const CardFooter = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	margin-top: auto;
`

const FavoriteBox = styled.View`
	position: absolute;
	z-index: 2;
	right: 16px;
	top: 16px;
`

interface Props {
	idea: IdeaRdo
	likesDisLakesSlot: ReactNode
	wishListSlot: ReactNode
	commentsSlot: ReactNode
}

export function IdeaDetailsCard({
	idea,
	likesDisLakesSlot,
	wishListSlot,
	commentsSlot,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<Container background={theme.colors.background}>
			<Card background={theme.colors.backdrop}>
				<CardHeader>
					<FavoriteBox>{wishListSlot}</FavoriteBox>
					<Typography variant='h2' soft text={formatDate(idea.createdAt)} />
					<Row>
						<Typography variant='span' soft text='Cтатус: ' />
						<Typography variant='span' text={idea.status} />
					</Row>
				</CardHeader>
				<CardContent>
					<AuthorBox>
						<Avatar size='md' name={idea.userId} />
						<View>
							<Typography variant='span' soft text='Автор' />
							<Typography variant='span' soft text={idea.userId.slice(0, 10)} />
						</View>
					</AuthorBox>
					<Row>
						<Typography variant='span' soft text='Категория: ' />
						<Typography variant='span' soft text={idea.subDepartment} />
					</Row>
					<Row>
						<Typography variant='span' soft text='Приоритет: ' />
						<Typography variant='span' soft text={idea.priority} />
					</Row>
					<Typography variant='h1' text={idea.title} />
					<Typography variant='p' text={idea.description} />
				</CardContent>
				<CardFooter>
					{commentsSlot}
					{likesDisLakesSlot}
				</CardFooter>
			</Card>
		</Container>
	)
}
