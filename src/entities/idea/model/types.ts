export type Priority = 'High' | 'Medium' | 'Low'

export enum IdeaStatus {
	New = 'New',
	UnderReview = 'UnderReview',
	Approved = 'Approved',
	Rejected = 'Rejected',
}

export interface User {
	id: number
	username: string
	role: Role
}

export type Role = 'Admin' | 'User' | 'Anonymous'

export enum Category {
	TradingHall = 'TradingHall',
	CommercialDepartment = 'CommercialDepartment',
	Warehouse = 'Warehouse',
}

export interface Idea {
	id: number
	title: string
	description: string
	category: Category
	priority: Priority
	status: IdeaStatus
	creationDate: Date
	author?: User
}
