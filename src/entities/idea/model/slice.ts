import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Idea } from './types'

interface WishListMap {
	[key: number]: boolean
}

interface State {
	isLoading: boolean
	count: number
	ideaList: Idea[]
	wishList: WishListMap
}

const initialState: State = {
	isLoading: false,
	count: 0,
	ideaList: [],
	wishList: {},
}

export const ideaSlice = createSlice({
	name: 'idea',
	initialState,
	reducers: {
		setIdeaList: (state, action: PayloadAction<Idea[]>) => {
			state.ideaList = action.payload
		},
		addOneIdea: (state, action: PayloadAction<Idea>) => {
			state.ideaList.unshift(action.payload)
		},
		addLike: (state, action: PayloadAction<number>) => {
			const item = state.ideaList.findIndex(item => item.id === action.payload)

			if (item !== -1) {
				state.ideaList[item].likes++
			}
		},
		addDisLike: (state, action: PayloadAction<number>) => {
			const item = state.ideaList.findIndex(item => item.id === action.payload)

			if (item !== -1) {
				state.ideaList[item].disLakes++
			}
		},
		toggleWishList: (state, action: PayloadAction<number>) => {
			const item = state.wishList[action.payload]
			if (item) {
				delete state.wishList[action.payload]
			} else {
				state.wishList[action.payload] = true
			}
		},
	},
})

export const { setIdeaList, addOneIdea, addLike, addDisLike, toggleWishList } =
	ideaSlice.actions
