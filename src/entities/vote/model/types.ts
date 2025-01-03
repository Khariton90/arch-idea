import { ReactionType } from '@/entities/idea'

export type VoteDto = {
	ideaId: string
}

export type VoteRdo = {
	ideaId: string
	userId: string
	reactionType: ReactionType
}
