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
	title: string
	description: string
	department: string
	subDepartment: string
	priority: string
}

export interface IdeaRdo extends Idea {
	id: string
	userId: string
	status: string
	createdAt: string
	updatedAt: string
}

export interface IdeaQuery {
	page: number
	limit: number
	sortDirection: 'asc' | 'desc'
}
