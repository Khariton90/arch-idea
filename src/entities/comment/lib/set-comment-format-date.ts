import dayjs from 'dayjs'

export function setCommentFormatDate(value: Date) {
	return dayjs(value).format('DD.MM.YYYY HH:mm')
}
