import { View } from 'react-native'
import styled from 'styled-components/native'
import { memo, ReactNode, useContext } from 'react'
import React from 'react'
import { IdeaRdo } from '../model/types'
import { Avatar } from '@/shared/ui/avatar/avatar'
import { ThemeContext } from '@/shared/colors.styled'
import { formatDate } from '@/shared/lib/format-date'
import { Typography } from '@/shared/ui/typography/typography'
import { Chip } from '@/shared/ui/chip'
import { mappingUserStatus } from '@/entities/user/lib/map-user-status'
import { UserStatus } from '@/entities/user'

const Container = styled.View<{ background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
`
const Box = styled.View<{ border: string }>`
	border-radius: 10px;
	overflow: hidden;
	margin: 10px 0;
	border-width: 1px;
	border-color: ${({ border }) => border};
	padding: 20px 10px;
	gap: 10px;
`

const Card = styled.View<{ background: string; border: string }>`
	background-color: ${({ background }) => background};
	border-radius: 10px;
	border: 1px solid ${({ border }) => border};
	margin: 10px;
	padding: 10px 0;
	transition: 0.2s ease;
	box-shadow: 0 0 1px #6e6e6e;
	height: 100%;
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
	solutionSlot: ReactNode
}

function IdeaDetailsCardComponent({
	idea,
	likesDisLakesSlot,
	wishListSlot,
	commentsSlot,
	solutionSlot,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<Container background={theme.colors.background}>
			<Card background={theme.colors.backdrop} border={theme.colors.border}>
				<CardHeader border={theme.colors.border}>
					<FavoriteBox>{wishListSlot}</FavoriteBox>
					<Typography
						variant='span'
						soft
						text={`Идея от ${formatDate(idea.createdAt)}`}
					/>
					<Row style={{ marginVertical: 8 }}>
						<Chip
							title={`Cтатус: ${idea.status}`}
							size={'lg'}
							color={'success'}
						/>
					</Row>
				</CardHeader>

				<CardContent>
					<Row style={{ gap: 10, paddingVertical: 10 }}>
						<Avatar size='sm' name={idea.user.firstName} />
						<View>
							<Typography
								variant='span'
								soft
								text={mappingUserStatus[idea.user.status as UserStatus]}
							/>
							<Typography
								variant='span'
								soft
								text={`${idea.user.firstName} ${idea.user.lastName}`}
							/>
						</View>
					</Row>
					<Row>
						<Chip
							title={`Приоритет: ${idea.priority}`}
							size={'md'}
							color={'success'}
						/>
					</Row>
					<Row>
						<Chip
							title={`Подразделение: ${idea.department}`}
							size={'md'}
							color={'success'}
						/>
					</Row>
					<Row>
						<Chip
							title={`Категория: ${idea.subDepartment}`}
							size={'md'}
							color={'success'}
						/>
					</Row>
				</CardContent>

				<CardContent>
					<Typography variant='h1' text={idea.title} />
					<Typography variant='p' text={idea.description} />
					{idea.solution && (
						<Box theme={theme} border={theme.colors.border}>
							<Typography variant='h2' text='Реализация идеи: план действий' />
							<Typography variant='p' text={idea.solution} />
						</Box>
					)}

					{solutionSlot}
				</CardContent>
				<CardFooter>
					{commentsSlot}
					{likesDisLakesSlot}
				</CardFooter>
			</Card>
		</Container>
	)
}

export const IdeaDetailsCard = memo(IdeaDetailsCardComponent)
