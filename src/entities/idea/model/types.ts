export enum IdeaStatus {
	New = 'new',
	InProgress = 'inProgress',
	Completed = 'completed',
	Canceled = 'canceled',
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

export enum Priority {
	Low = 'low',
	Medium = 'medium',
	High = 'high',
}

export interface Idea {
	id: number
	title: string
	description: string
	priority: Priority
	subDepartmentId: Category
	status: IdeaStatus
	author?: User
	likes: number
	disLakes: number
	createdAt: string
	updatedAt: string
}
