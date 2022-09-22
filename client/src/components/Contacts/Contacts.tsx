import { FC } from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { deleteContact, IContacts } from '../../store/slices/contactSlice'

import styles from './Contacts.module.scss'

const Contacts: FC<{
	setCurrentId: (id: number) => void
	contacts: IContacts[]
	loading: boolean
	error: string | null
}> = ({ setCurrentId, contacts, loading, error }) => {
	const dispatch = useDispatch<AppDispatch>()

	return (
		<div className={styles.contacts}>
			{loading && <div className={styles.noData}>Загрузка...</div>}
			{error && <div className={styles.noData}>Ошибка</div>}
			{!contacts.length && (
				<div className={styles.noData}>Список контактов пуст</div>
			)}
			{!loading &&
				!error &&
				contacts.map((contact: IContacts) => (
					<div key={contact.id} className={styles.contact}>
						<div className={styles.contactBody}>
							<div className={styles.contactAvatar}>
								{contact.name[0].toUpperCase()}
							</div>
							<div className={styles.contactInfo}>
								<h3>{contact.name}</h3>
								<span>{contact.phone}</span>
							</div>
						</div>
						<div className={styles.contactActions}>
							<button
								onClick={() => {
									setCurrentId(contact.id)
								}}
							>
								<AiOutlineEdit fontSize={22} />
							</button>
							<button
								onClick={() =>
									dispatch(deleteContact(contact.id))
								}
							>
								<AiOutlineDelete fontSize={22} />
							</button>
						</div>
					</div>
				))}
		</div>
	)
}

export default Contacts
