import { IdeaCard, IdeaStatus, setCurrentFilter } from '@/entities/idea'
import {
	useFindIdeasQuery,
	useFindTotalCountIdeasQuery,
} from '@/entities/idea/api'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { ThemeContext } from '@/shared/colors.styled'
import React, { memo, ReactNode, useContext, useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { FlatList } from 'react-native'
import { EmptyIdeasList } from '../empty-ideas-list/empty-ideas-list'
import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks'
import { FilterIdeaStatus } from '@/features/idea/filter/filter-status'
import { SortingButton } from '@/features/idea/sorting/sorting-button'
import { SortingModal } from '@/features/idea/sorting/sorting-modal'
import { FilterModal } from '@/features/idea/filter/filter-modal'
import { FilterIcon } from '@/shared/ui/icons/filter-icon'
import { UserRole } from '@/entities/user'
import { FilterButton } from '@/entities/idea/ui/filter-button'

const PAGE_LIMIT_COUNT = 10

interface Props {
	filterSlot: ReactNode
}

function BaseIdeasListComponent(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [modalList, setModalList] = useState([false, false])
	const query = useAppSelector(({ ideaSlice }) => ideaSlice.currentFilter)
	const role = useAppSelector(({ userSlice }) => userSlice.role)
	const dispatch = useAppDispatch()
	const { data: totalCount } = useFindTotalCountIdeasQuery(query)

	const toggleSortingModal = (index: number) => {
		const array = modalList.map((element, idx) =>
			idx === index ? (element = !element) : false
		)
		setModalList(prev => [...array])
	}

	const onChangeFilterStatus = (status?: IdeaStatus) => {
		dispatch(setCurrentFilter({ ...query, status }))
	}

	const {
		data: ideas,
		isLoading,
		isFetching,
		isError,
		refetch,
	} = useFindIdeasQuery(query)

	const loadMore = () => {
		if (totalCount && query.limit < totalCount && !isFetching) {
			dispatch(
				setCurrentFilter({
					...query,
					limit: query.limit + PAGE_LIMIT_COUNT,
				})
			)
		}
	}

	if (isError) {
		return (
			<View>
				<Typography variant='h2' align='center' text={'Произошла ошибка'} />
				<UniversalButton onPress={refetch} title='Попробовать снова' />
			</View>
		)
	}

	return (
		<>
			<View style={{ flex: 1 }}>
				<FilterIdeaStatus
					onChangeFilterStatus={onChangeFilterStatus}
					sortingSlot={
						<SortingButton toggleSortingModal={toggleSortingModal} index={0} />
					}
					slotWithAllFilter={
						role !== UserRole.User && (
							<FilterButton
								style={{ flexDirection: 'row', gap: 6 }}
								active={Boolean(query.department)}
								slotWithIcon={<FilterIcon active={Boolean(query.department)} />}
								text='Фильтры'
								onPress={() => toggleSortingModal(1)}
							/>
						)
					}
				/>

				{ideas && (
					<FlatList
						style={{
							flex: 1,
							paddingHorizontal: 10,
							backgroundColor: theme.colors.background,
						}}
						ListEmptyComponent={<EmptyIdeasList />}
						refreshControl={
							<RefreshControl
								tintColor={theme.colors.primary}
								refreshing={isLoading}
								onRefresh={refetch}
							/>
						}
						refreshing={isLoading}
						data={ideas}
						renderItem={({ item }) => (
							<IdeaCard
								key={item.id}
								idea={item}
								likeDislikeSlot={
									<LikeDislikeButtons
										id={item.id}
										likes={item.likesCount}
										disLikes={item.dislikesCount}
										reactionType={item.reactionType}
									/>
								}
								wishlistSlot={
									<WishListToggle ideaId={item.id} active={item.isFavorite} />
								}
							/>
						)}
						onEndReached={loadMore}
						onEndReachedThreshold={0.5}
						ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
						contentContainerStyle={{
							paddingVertical: 20,
						}}
					/>
				)}
			</View>

			<SortingModal
				isOpen={modalList[0]}
				toggleSortingModal={toggleSortingModal}
				index={0}
			/>
			<FilterModal
				isOpen={modalList[1]}
				toggleSortingModal={toggleSortingModal}
				index={1}
			/>
		</>
	)
}

export const BaseIdeasList = memo(BaseIdeasListComponent)
