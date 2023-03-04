////////! VARIABLES GLOBALES ////////

const btnCreateContact = document.getElementById('btn-create-contact');
const formContact = document.getElementById('form-contact');
const imgContacts = document.getElementById('imgContacts');
const closeFormButton = document.getElementById('close-form');

////////! FUNCIÓN BOTON CREAR CONTACTO Y RESETEAR FORMULARIO ////////

function createContact() {
	if (formContact.classList.contains('hidden')) {
		formContact.classList.remove('hidden');
	}
}

function resetForm() {
	document.getElementById('nameContact').value = '';
	document.getElementById('surnameContact').value = '';
	document.getElementById('emailContact').value = '';
	document.getElementById('phoneContact').value = '';
	document.getElementById('businessContact').value = '';
	document.getElementById('annotationContact').value = '';
}

btnCreateContact.addEventListener('click', function () {
	createContact();
	resetForm();
});

////////! FUNCIÓN BOTON CERRAR FORMULARIO ////////

function closeForm() {
	if (formContact.classList.contains('hidden')) {
		formContact.classList.remove('hidden');
	} else {
		formContact.classList.add('hidden');
	}
}

closeFormButton.addEventListener('click', closeForm);

////////*

let totalContacts = 0;
let contacts = [];

////////! FUNCIÓN BOTON GUARDAR CONTACTO ////////

const saveButton = document.getElementById('save-contact');
saveButton.addEventListener('click', saveContact);

function saveContact(event) {
	event.preventDefault();

	const name = document.getElementById('nameContact').value;
	const errorCreateContact = document.getElementById('errorNameContact');
	if (!name) {
		errorCreateContact.innerText = 'Por favor ingrese el nombre del contacto';
		errorCreateContact.style.display = 'block';
		return;
	} else {
		errorCreateContact.innerText = '';
		errorCreateContact.style.display = 'none';
	}

	const surname = document.getElementById('surnameContact').value;
	const email = document.getElementById('emailContact').value;
	const phone = document.getElementById('phoneContact').value;
	const businessElement = document.getElementById('businessContact');
	const business = businessElement.options[businessElement.selectedIndex].value; // recuperar el valor seleccionado
	const annotation = document.getElementById('annotationContact').value;

	const contact = {
		name: name,
		surname: surname,
		email: email,
		phone: phone,
		business: business,
		annotation: annotation
	};

	contacts.push(contact);
	localStorage.setItem('contacts', JSON.stringify(contacts));

	addRowToTable(contact);

	const formContact = document.getElementById('form-contact');
	formContact.classList.add('hidden');
	const containerContactsTable = document.getElementById('containerContactsTable');
	containerContactsTable.classList.remove('hidden');

	totalContacts++;
	localStorage.setItem('totalContacts', totalContacts);

	if (totalContacts > 0) {
		imgContacts.style.display = 'none';
		contactInfoTable.style.display = 'block';
		containerContactsTable.style.display = 'block';
	}

	localStorage.setItem('totalContacts', totalContacts);
}

////////! FUNCIÓN GUARDAR CONTACTO EN LOCAL STORAGE ////////

if (localStorage.getItem('contacts')) {
	contacts = JSON.parse(localStorage.getItem('contacts'));
	totalContacts = contacts.length;
	for (const contact of contacts) {
		addRowToTable(contact);
	}
}

// Obtener la lista de empresas desde localStorage
let companies = JSON.parse(localStorage.getItem('companies')) || [];

// Obtener la referencia al elemento <select>
const selectElement = document.getElementById('businessContact');

// Crear las opciones del <select> usando un bucle forEach
companies.forEach((company) => {
	const option = document.createElement('option');
	option.text = company.nameCompany;
	option.value = company.nameCompany;
	selectElement.add(option);
});

////////! FUNCIÓN AGREGAR FILA A TABLA ////////

function addRowToTable(contact) {
	const table = document.getElementById('contactsTable');
	const newRow = document.createElement('tr');
	newRow.classList.add('bg-white', 'border-b');

	const nameCell = document.createElement('td');
	nameCell.classList.add('px-6', 'py-4');
	nameCell.innerText = contact.name + ' ' + contact.surname;
	newRow.appendChild(nameCell);

	const businessCell = document.createElement('td');
	businessCell.classList.add('px-6', 'py-4');
	businessCell.innerText = contact.business;
	newRow.appendChild(businessCell);

	const emailCell = document.createElement('td');
	emailCell.classList.add('px-6', 'py-4');
	emailCell.innerText = contact.email;
	newRow.appendChild(emailCell);

	const phoneCell = document.createElement('td');
	phoneCell.classList.add('px-6', 'py-4');
	phoneCell.innerText = contact.phone;
	newRow.appendChild(phoneCell);

	const annotationCell = document.createElement('td');
	annotationCell.classList.add('px-6', 'py-4');
	annotationCell.innerText = contact.annotation;
	newRow.appendChild(annotationCell);

	const iconCell = document.createElement('td');
	iconCell.classList.add('px-6', 'py-4', 'text-end');

	const editIcon = document.createElement('box-icon');
	editIcon.setAttribute('type', 'edit');
	editIcon.setAttribute('name', 'edit');
	editIcon.classList.add('custom-icon');
	editIcon.setAttribute('id', 'btnEditContact');
	iconCell.appendChild(editIcon);

	const deleteIcon = document.createElement('box-icon');
	deleteIcon.setAttribute('type', 'solid');
	deleteIcon.setAttribute('name', 'trash-alt');
	deleteIcon.classList.add('custom-icon');
	deleteIcon.setAttribute('id', 'btnDeleteContact');
	iconCell.appendChild(deleteIcon);

	const contactInfoTable = document.getElementById('contactInfoTable');
	table.appendChild(newRow);
	contactInfoTable.appendChild(table);
	newRow.appendChild(iconCell);

	editIcon.addEventListener('click', (event) => {
		editContact(event);
	});

	deleteIcon.addEventListener('click', (event) => {
		deleteContact(event);
	});
}

////////*

if (totalContacts > 0) {
	imgContacts.style.display = 'none';
	contactInfoTable.style.display = 'block';
	containerContactsTable.style.display = 'block';
}

////////! FUNCIÓN BOTÓN EDITAR CONTACTO ////////

function editContact(event) {
	window.scrollTo(0, 0);
	const row = event.target.parentElement.parentElement;

	const name = row.children[0].textContent.split(' ')[0];
	const surname = row.children[0].textContent.split(' ')[1];
	const business = row.children[1].textContent;
	const email = row.children[2].textContent;
	const phone = row.children[3].textContent;
	const annotation = row.children[4].textContent;

	const formContact = document.getElementById('form-contact');
	const table = document.getElementById('contactsTable');
	formContact.classList.remove('hidden');

	document.getElementById('nameContact').value = name;
	document.getElementById('surnameContact').value = surname;
	document.getElementById('emailContact').value = email;
	document.getElementById('phoneContact').value = phone;
	document.getElementById('businessContact').value = business;
	document.getElementById('annotationContact').value = annotation;

	const saveButton = document.getElementById('save-contact');
	saveButton.classList.add('hidden');

	const existingUpdateButton = document.getElementById('update-contact');
	if (existingUpdateButton) {
		existingUpdateButton.remove();
	}

	const updateButton = document.createElement('button');
	updateButton.innerText = 'Actualizar';
	updateButton.setAttribute('id', 'update-contact');
	updateButton.classList.add('custom-button');
	formContact.appendChild(updateButton);

	updateButton.addEventListener('click', updateContact);

	function updateContact(event) {
		event.preventDefault();

		const name = document.getElementById('nameContact').value;
		const surname = document.getElementById('surnameContact').value;
		const email = document.getElementById('emailContact').value;
		const phone = document.getElementById('phoneContact').value;
		const business = document.getElementById('businessContact').value;
		const annotation = document.getElementById('annotationContact').value;

		row.children[0].textContent = name + ' ' + surname;
		row.children[1].textContent = business;
		row.children[2].textContent = email;
		row.children[3].textContent = phone;
		row.children[4].textContent = annotation;

		const index = contacts.findIndex((contact) => contact.name + ' ' + contact.surname === row.children[0].textContent);
		contacts[index] = {
			name: name,
			surname: surname,
			email: email,
			phone: phone,
			business: business,
			annotation: annotation
		};

		localStorage.setItem('contacts', JSON.stringify(contacts));

		table.classList.remove('hidden');
		formContact.classList.add('hidden');

		updateButton.remove();

		saveButton.classList.remove('hidden');
	}
}

////////! FUNCIÓN BOTÓN ELIMINAR CONTACTO ////////

function deleteContact(event) {
	event.preventDefault();

	const parentRow = event.target.parentNode.parentNode;
	const name = parentRow.querySelector('td:first-child').textContent;

	parentRow.remove();

	const index = contacts.findIndex((contact) => contact.name + ' ' + contact.surname === name);
	contacts.splice(index, 1);

	localStorage.setItem('contacts', JSON.stringify(contacts));

	totalContacts--;
	localStorage.setItem('totalContacts', totalContacts);

	if (totalContacts === 0) {
		imgContacts.style.display = 'block';
		contactInfoTable.style.display = 'none';
		containerContactsTable.style.display = 'none';
	}
}

////////! FUNCIÓN BUSCADOR ////////

const searchInput = document.getElementById('searchContact');
searchInput.addEventListener('keyup', searchContacts);

function searchContacts() {
	const searchValue = searchInput.value.toLowerCase();
	const table = document.getElementById('contactsTable');
	const rows = table.getElementsByTagName('tr');

	for (let i = 0; i < rows.length; i++) {
		const name = rows[i].getElementsByTagName('td')[0];
		if (name) {
			const nameValue = name.textContent || name.innerText;
			if (nameValue.toLowerCase().indexOf(searchValue) > -1) {
				rows[i].style.display = '';
			} else {
				rows[i].style.display = 'none';
			}
		}
	}
}
