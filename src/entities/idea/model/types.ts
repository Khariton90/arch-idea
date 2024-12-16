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
	userId: string
	department: string
}

export interface IdeaRdo extends Idea {
	id: string
}
