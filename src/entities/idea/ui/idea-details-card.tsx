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

const Card = styled.View<{ background: string; border: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	border-radius: 10px;
	border: 1px solid ${({ border }) => border};
	margin: 40px 10px;
	overflow: hidden;
	padding: 10px 0;
`

const CardHeader = styled.View<{ border: string }>`
	padding: 20px;
	border-bottom-color: ${({ border }) => border};
	border-bottom-width: 1px;
`

const CardContent = styled.View`
	padding: 20px 20px 0 20px;
	gap: 6px;
`

const AuthorBox = styled.View`
	flex-direction: row;
	gap: 6px;
	align-items: center;
	position: absolute;
	right: 10px;
	top: 20px;
	padding: 0 10px;
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

const MAX_USERNAME_LENGTH = 10

export function IdeaDetailsCard({
	idea,
	likesDisLakesSlot,
	wishListSlot,
	commentsSlot,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	const firstName =
		idea.user.firstName.length >= MAX_USERNAME_LENGTH
			? idea.user.firstName.slice(0, MAX_USERNAME_LENGTH)
			: idea.user.firstName

	return (
		<Container background={theme.colors.background}>
			<Card background={theme.colors.backdrop} border={theme.colors.border}>
				<CardHeader border={theme.colors.border}>
					<FavoriteBox>{wishListSlot}</FavoriteBox>
					<Typography variant='h2' soft text={formatDate(idea.createdAt)} />
					<Row style={{ marginVertical: 10 }}>
						<Typography variant='p' soft text='Cтатус: ' />
						<Typography variant='p' text={idea.status} />
					</Row>
				</CardHeader>

				<CardContent>
					<AuthorBox>
						<Avatar size='sm' name={idea.user.firstName} />
						<View>
							<Typography variant='span' soft text='Автор' />
							<Typography variant='span' soft text={firstName} />
						</View>
					</AuthorBox>
					<Row>
						<Typography variant='span' soft text='Подразделение: ' />
						<Typography variant='span' text={idea.department} />
					</Row>

					<Row>
						<Typography variant='span' soft text='Категория: ' />
						<Typography variant='span' text={idea.subDepartment} />
					</Row>
					<Row>
						<Typography variant='span' soft text='Приоритет: ' />
						<Typography variant='span' text={idea.priority} />
					</Row>
				</CardContent>

				<CardContent>
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
