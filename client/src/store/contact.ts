class Contact {
	id: string
	name: string
	email: string
	phone: string
	constructor(name: string, email: string, phone: string, id: string) {
		this.name = name
		this.email = email
		this.phone = phone
		this.id = id
	}
}

export default Contact
