import { ActivityIndicator, View } from 'react-native'
import styled from 'styled-components/native'
import React, { ReactNode, useContext, useMemo, useState } from 'react'
import { Accordion, UniversalButton, Typography, InputField } from '@/shared/ui'
import { darkTheme, ThemeContext } from '@/shared/colors.styled'
import useCustomNavigation from '@/shared/hooks/use-custom-navigation'
import { AppRoutes } from '@/shared/model'
import { ImageUploadIcon } from '@/shared/ui/icons/image-upload-icon'
import { MainBottomSheet } from '../bottom-sheet/main-bottom-sheet'
import { CameraIcon } from '@/shared/ui/icons/camera-icon'
import { useAppSelector } from '@/shared/hooks'

import {
	Idea,
	useCreateIdeaMutation,
	mappingDepartment,
	mappingPriority,
	mappingSubDepartment,
} from '@/entities/idea'
import { UserRole } from '@/entities/user'

const Container = styled.View<{ background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	align-items: center;
	justify-content: center;
	padding: 20px;
`

const Form = styled.View`
	gap: 10px;
	width: 100%;
	flex: 1;
	justify-content: center;
`

const Row = styled.View`
	flex-direction: row;
	justify-content: space-evenly;
`

const ModalButton = styled.TouchableOpacity`
	padding: 10px 20px;
	width: 100px;
	align-items: center;
	border-radius: 10px;
	border: 1px solid ${darkTheme.colors.border};
`

const accordion = [
	{
		id: 1,
		title: 'department',
		value: 'Подразделение',
		content: Object.entries(mappingDepartment),
	},
	{
		id: 2,
		title: 'subDepartment',
		value: 'Отдел',
		content: Object.entries(mappingSubDepartment),
	},
	{
		id: 3,
		title: 'priority',
		value: 'Приоритет',
		content: Object.entries(mappingPriority),
	},
]

const initialFormValues: Idea = {
	title: '',
	description: '',
	department: '',
	subDepartment: '',
	priority: '',
}

interface Props {
	slotWithLogo: ReactNode
}

export function NewIdeaForm({ slotWithLogo }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const role = useAppSelector(({ userSlice }) => userSlice.role)
	const department = useAppSelector(({ userSlice }) => userSlice.department)
	const [form, setForm] = useState<Idea>({
		...initialFormValues,
		department: department ?? '',
	})
	const [isActiveForm, setIsActiveForm] = useState(false)
	const navigation = useCustomNavigation()
	const [createIdea, { data, isLoading, isError }] = useCreateIdeaMutation()

	const handleChange = (key: keyof Idea, value: string) => {
		setForm(prevForm => ({ ...prevForm, [key]: value }))
	}

	const onSelected = (key: keyof Idea, value: string) => {
		setForm(prevForm => ({ ...prevForm, [key]: value }))
	}

	const disabled = useMemo(
		() => Object.values(form).some(item => item === ''),
		[form]
	)

	const handleSubmit = async () => {
		setIsActiveForm(() => false)
		createIdea({ ...form }).then(async data => {
			if (!data.error) {
				setIsActiveForm(() => true)
				setForm(prev => ({ ...initialFormValues }))
				navigation.navigate(AppRoutes.HomePage)
			}
		})
	}

	const accordionList = role !== UserRole.User ? accordion : accordion.slice(1)

	return (
		<Container background={theme.colors.backdrop}>
			{isLoading && (
				<ActivityIndicator size={'large'} color={theme.colors.primary} />
			)}
			<Form>
				{slotWithLogo}

				<View>
					<InputField
						textKey={'title'}
						value={form.title || ''}
						onChangeText={handleChange}
						placeholder={'Заголовок...'}
					/>
				</View>
				<View>
					<InputField
						textKey={'description'}
						value={form.description || ''}
						onChangeText={handleChange}
						placeholder='Описание...'
						multiline
					/>
				</View>
				{accordionList.map(item => (
					<Accordion
						title={item.title}
						onSelected={onSelected}
						key={item.id}
						value={item.value}
						content={item.content}
						isActiveForm={isActiveForm}
					/>
				))}
				<UniversalButton
					disabled={disabled}
					title='Создать'
					onPress={handleSubmit}
				/>
				{isActiveForm && (
					<Typography
						soft
						align='center'
						variant='span'
						text={'Идея успешно создана'}
					/>
				)}

				{!isActiveForm && isError && (
					<Typography
						soft
						align='center'
						variant='span'
						text={'Ошибка сервера попробуйте позже...'}
					/>
				)}
			</Form>
		</Container>
	)
}

type ModalProps = {
	isOpen: boolean
	uploadImage: (mode: any) => void
	uploadImageFromGallery: (mode: string) => void
}

export function ModalUploadImage({
	isOpen,
	uploadImage,
	uploadImageFromGallery,
}: ModalProps): JSX.Element {
	return (
		<MainBottomSheet isOpen={isOpen}>
			<Row>
				<ModalButton onPress={() => uploadImage('')}>
					<CameraIcon />
					<Typography soft variant='span' text={'Камера'} />
				</ModalButton>
				<ModalButton onPress={() => uploadImageFromGallery('gallery')}>
					<ImageUploadIcon />
					<Typography soft variant='p' text={'Галерея'} />
				</ModalButton>
			</Row>
		</MainBottomSheet>
	)
}
