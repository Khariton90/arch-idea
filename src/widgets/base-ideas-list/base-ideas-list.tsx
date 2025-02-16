import { UserRole } from '@/entities/user'
import {
	useFindIdeasQuery,
	useFindTotalCountIdeasQuery,
	IdeaCard,
	IdeaStatus,
	setCurrentFilter,
} from '@/entities/idea'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { ThemeContext } from '@/shared/colors.styled'
import React, { memo, useContext, useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { EmptyIdeasList } from '../empty-ideas-list/empty-ideas-list'
import { Typography, UniversalButton } from '@/shared/ui'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import {
	FilterIdeaStatus,
	SortingButton,
	SortingModal,
	FilterModal,
} from '@/features/idea'
import { FilterIcon } from '@/shared/ui/icons/filter-icon'
import { FilterButton } from '@/entities/idea/ui/filter-button'
import { FlashList } from '@shopify/flash-list'

const PAGE_LIMIT_COUNT = 10

function BaseIdeasListComponent(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [modalList, setModalList] = useState([false, false])
	const query = useAppSelector(({ ideaSlice }) => ideaSlice.currentFilter)
	const isAdmin = useAppSelector(
		({ userSlice }) => userSlice.role !== UserRole.User
	)
	const dispatch = useAppDispatch()
	const { data: totalCount } = useFindTotalCountIdeasQuery(query)

	const toggleSortingModal = (index: number) => {
		const array = modalList.map((element, idx) =>
			idx === index ? (element = !element) : false
		)
		setModalList(() => [...array])
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

	const { priority, subDepartment } = query
	const department = isAdmin ? query.department : undefined
	const isActiveButton = !!department || !!priority || !!subDepartment

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
						<FilterButton
							style={{ flexDirection: 'row', gap: 6 }}
							active={isActiveButton}
							slotWithIcon={<FilterIcon active={isActiveButton} />}
							text='Фильтры'
							onPress={() => toggleSortingModal(1)}
						/>
					}
				/>

				{ideas && (
					<FlashList
						contentContainerStyle={{
							paddingVertical: 20,
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
						onEndReachedThreshold={0.7}
						estimatedItemSize={200}
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
