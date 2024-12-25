import dayjs from 'dayjs'

const FORMAT_DATE = 'DD.MM.YYYY'

export function formatDate(dateISO: string) {
	return dayjs(dateISO).format(FORMAT_DATE)
}
