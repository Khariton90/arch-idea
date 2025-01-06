export enum AppRoutes {
	LoginPage = 'LoginPage',
	HomePage = 'HomePage',
	IdeaDetailsPage = 'IdeaDetailsPage',
	NewIdeaPage = 'NewIdeaPage',
	ProfilePage = 'ProfilePage',
	CommentsPage = 'CommentsPage',
	ProfileIdeasPage = 'ProfileIdeasPage',
	DashboardPage = 'DashboardPage',
}

export type RootStackParamList = {
	[AppRoutes.LoginPage]: {}
	[AppRoutes.HomePage]: {}
	[AppRoutes.IdeaDetailsPage]: {
		id: string
		likes: number
		disLikes: number
		isFavorite: boolean
		title: string
	}
	[AppRoutes.NewIdeaPage]: {}
	[AppRoutes.ProfilePage]: {}
	[AppRoutes.CommentsPage]: {
		id: string
	}
	[AppRoutes.ProfileIdeasPage]: {
		title: string
		page: 'Favorite' | 'MyIdeas'
	}
	[AppRoutes.DashboardPage]: { title: string }
}
