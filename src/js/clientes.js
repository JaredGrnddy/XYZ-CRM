////////! VARIABLES GLOBALES ////////

const btnCreateCustomer = document.getElementById('btn-create-customer');
const formCustomer = document.getElementById('form-customer');
const closeFormButtonCustomer = document.getElementById('close-form-customer');
const imgCustomer = document.getElementById('imgCustomer');

////////! FUNCIÓN BOTON CREAR CONTACTO Y RESETEAR FORMULARIO ////////

function createContact() {
	if (formCustomer.classList.contains('hidden')) {
		formCustomer.classList.remove('hidden');
	}
}

function resetForm() {
	document.getElementById('nameCustomer').value = '';
	document.getElementById('surnameCustomer').value = '';
	document.getElementById('emailCustomer').value = '';
	document.getElementById('numberCustomer').value = '';
	document.getElementById('businessCustomer').value = '';
	document.getElementById('annotationCustomer').value = '';
}

btnCreateCustomer.addEventListener('click', function () {
	createContact();
	resetForm();
});

////////! FUNCIÓN BOTON CERRAR FORMULARIO ////////

function closeForm() {
	if (formCustomer.classList.contains('hidden')) {
		formCustomer.classList.remove('hidden');
	} else {
		formCustomer.classList.add('hidden');
	}
}

closeFormButtonCustomer.addEventListener('click', closeForm);

////////*

let totalCustomers = 0;
let customers = [];

////////! FUNCIÓN BOTON GUARDAR CONTACTO ////////

const saveButtonCustomer = document.getElementById('save-customer');
saveButtonCustomer.addEventListener('click', saveCustomer);

function saveCustomer(event) {
	event.preventDefault();

	const nameCustomer = document.getElementById('nameCustomer').value;
	const errorCreateCustomer = document.getElementById('errorNameCustomer');
	if (!nameCustomer) {
		errorCreateCustomer.innerText = 'Por favor ingrese el nombre de la empresa';
		errorCreateCustomer.style.display = 'block';
		return;
	} else {
		errorCreateCustomer.innerText = '';
		errorCreateCustomer.style.display = 'none';
	}

	const surnameCustomer = document.getElementById('surnameCustomer').value;
	const emailCustomer = document.getElementById('emailCustomer').value;
	const numberCustomer = document.getElementById('numberCustomer').value;
	const businessElementCustomer = document.getElementById('businessCustomer');
	const businessCustomer = businessElementCustomer.options[businessElementCustomer.selectedIndex].value;
	const annotationCustomer = document.getElementById('annotationCustomer').value;

	const customer = {
		nameCustomer: nameCustomer,
		surnameCustomer: surnameCustomer,
		emailCustomer: emailCustomer,
		numberCustomer: numberCustomer,
		businessCustomer: businessCustomer,
		annotationCustomer: annotationCustomer
	};

	customers.push(customer);
	localStorage.setItem('customers', JSON.stringify(customers));

	addRowToTableCustomer(customer);

	const formCustomer = document.getElementById('form-customer');
	formCustomer.classList.add('hidden');
	const containerCustomerTable = document.getElementById('containerCustomerTable');
	containerCustomerTable.classList.remove('hidden');

	totalCustomers++;
	localStorage.setItem('totalCustomers', totalCustomers);

	if (totalCustomers > 0) {
		imgCustomer.style.display = 'none';
		customerInfoTable.style.display = 'block';
		containerCustomerTable.style.display = 'block';
	}

	localStorage.setItem('totalCustomers', totalCustomers);
}

////////! FUNCIÓN GUARDAR CONTACTO EN LOCAL STORAGE ////////

if (localStorage.getItem('customers')) {
	customers = JSON.parse(localStorage.getItem('customers'));
	totalCustomers = customers.length;
	for (const customer of customers) {
		addRowToTableCustomer(customer);
	}
}

// Obtener la lista de empresas desde localStorage
let companies = JSON.parse(localStorage.getItem('companies')) || [];

// Obtener la referencia al elemento <select>
const selectElementCustomer = document.getElementById('businessCustomer');

// Crear las opciones del <select> usando un bucle forEach
companies.forEach((company) => {
	const option = document.createElement('option');
	option.text = company.nameCompany;
	option.value = company.nameCompany;
	selectElementCustomer.add(option);
});

////////! FUNCIÓN AGREGAR FILA A TABLA ////////

function addRowToTableCustomer(customer) {
	const tableCustomer = document.getElementById('customerTable');
	const newRowCustomer = document.createElement('tr');
	newRowCustomer.classList.add('bg-white', 'border-b');

	const nameCustomerCell = document.createElement('td');
	nameCustomerCell.classList.add('px-6', 'py-4');
	nameCustomerCell.innerText = customer.nameCustomer + ' ' + customer.surnameCustomer;
	newRowCustomer.appendChild(nameCustomerCell);

	const businessCustomerCell = document.createElement('td');
	businessCustomerCell.classList.add('px-6', 'py-4');
	businessCustomerCell.innerText = customer.businessCustomer;
	newRowCustomer.appendChild(businessCustomerCell);

	const emailCustomerCell = document.createElement('td');
	emailCustomerCell.classList.add('px-6', 'py-4');
	emailCustomerCell.innerText = customer.emailCustomer;
	newRowCustomer.appendChild(emailCustomerCell);

	const numberCustomerCell = document.createElement('td');
	numberCustomerCell.classList.add('px-6', 'py-4');
	numberCustomerCell.innerText = customer.numberCustomer;
	newRowCustomer.appendChild(numberCustomerCell);

	const annotationCustomerCell = document.createElement('td');
	annotationCustomerCell.classList.add('px-6', 'py-4');
	annotationCustomerCell.innerText = customer.annotationCustomer;
	newRowCustomer.appendChild(annotationCustomerCell);

	const iconCustomerCell = document.createElement('td');
	iconCustomerCell.classList.add('px-6', 'py-4', 'text-end');

	const editCustomerIcon = document.createElement('box-icon');
	editCustomerIcon.setAttribute('type', 'edit');
	editCustomerIcon.setAttribute('name', 'edit');
	editCustomerIcon.classList.add('custom-icon');
	editCustomerIcon.setAttribute('id', 'btnEditContact');
	iconCustomerCell.appendChild(editCustomerIcon);

	const deleteCustomerIcon = document.createElement('box-icon');
	deleteCustomerIcon.setAttribute('type', 'solid');
	deleteCustomerIcon.setAttribute('name', 'trash-alt');
	deleteCustomerIcon.classList.add('custom-icon');
	deleteCustomerIcon.setAttribute('id', 'btnDeleteContact');
	iconCustomerCell.appendChild(deleteCustomerIcon);

	const customerInfoTable = document.getElementById('customerInfoTable');
	tableCustomer.appendChild(newRowCustomer);
	customerInfoTable.appendChild(tableCustomer);
	newRowCustomer.appendChild(iconCustomerCell);

	editCustomerIcon.addEventListener('click', (event) => {
		editCustomer(event);
	});

	deleteCustomerIcon.addEventListener('click', (event) => {
		deleteCustomer(event);
	});
}

////////*

if (totalCustomers > 0) {
	imgCustomer.style.display = 'none';
	customerInfoTable.style.display = 'block';
	containerCustomerTable.style.display = 'block';
}

////////! FUNCIÓN BOTÓN EDITAR CONTACTO ////////

function editCustomer(event) {
	window.scrollTo(0, 0);
	const rowCustomer = event.target.parentElement.parentElement;

	const nameCustomer = rowCustomer.children[0].textContent.split(' ')[0];
	const surnameCustomer = rowCustomer.children[0].textContent.split(' ')[1];
	const emailCustomer = rowCustomer.children[1].textContent;
	const numberCustomer = rowCustomer.children[2].textContent;
	const businessCustomer = rowCustomer.children[3].textContent;
	const annotationCustomer = rowCustomer.children[4].textContent;

	const formCustomer = document.getElementById('form-customer');
	const tableCustomer = document.getElementById('customerTable');
	formCustomer.classList.remove('hidden');

	document.getElementById('nameCustomer').value = nameCustomer;
	document.getElementById('surnameCustomer').value = surnameCustomer;
	document.getElementById('emailCustomer').value = emailCustomer;
	document.getElementById('numberCustomer').value = numberCustomer;
	document.getElementById('businessCustomer').value = businessCustomer;
	document.getElementById('annotationCustomer').value = annotationCustomer;

	const saveButtonCustomer = document.getElementById('save-customer');
	saveButtonCustomer.classList.add('hidden');

	const existingUpdateButtonCustomer = document.getElementById('update-customer');
	if (existingUpdateButtonCustomer) {
		existingUpdateButtonCustomer.remove();
	}

	const updateButtonCustomer = document.createElement('button');
	updateButtonCustomer.innerText = 'Actualizar';
	updateButtonCustomer.setAttribute('id', 'update-customer');
	updateButtonCustomer.classList.add('custom-button');
	formCustomer.appendChild(updateButtonCustomer);

	updateButtonCustomer.addEventListener('click', updateCustomer);

	function updateCustomer(event) {
		event.preventDefault();

		const nameCustomer = document.getElementById('nameCustomer').value;
		const surnameCustomer = document.getElementById('surnameCustomer').value;
		const emailCustomer = document.getElementById('emailCustomer').value;
		const numberCustomer = document.getElementById('numberCustomer').value;
		const businessCustomer = document.getElementById('businessCustomer').value;
		const annotationCustomer = document.getElementById('annotationCustomer').value;

		rowCustomer.children[0].textContent = nameCustomer + ' ' + surnameCustomer;
		rowCustomer.children[1].textContent = emailCustomer;
		rowCustomer.children[2].textContent = numberCustomer;
		rowCustomer.children[3].textContent = businessCustomer;
		rowCustomer.children[4].textContent = annotationCustomer;

		const index = customers.findIndex((customer) => customer.nameCustomer + ' ' + customer.surnameCustomer === rowCustomer.children[0].textContent);
		customers[index] = {
			nameCustomer: nameCustomer,
			surnameCustomer: surnameCustomer,
			emailCustomer: emailCustomer,
			numberCustomer: numberCustomer,
			businessCustomer: businessCustomer,
			annotationCustomer: annotationCustomer
		};

		localStorage.setItem('customers', JSON.stringify(customers));

		tableCustomer.classList.remove('hidden');
		formCustomer.classList.add('hidden');

		updateButtonCustomer.remove();

		saveButtonCustomer.classList.remove('hidden');
	}
}

////////! FUNCIÓN BOTÓN ELIMINAR CONTACTO ////////

function deleteCustomer(event) {
	event.preventDefault();

	const parentRow = event.target.parentNode.parentNode;
	const nameCustomer = parentRow.querySelector('td:first-child').textContent;

	parentRow.remove();

	const index = customers.findIndex((customer) => customer.nameCustomer + ' ' + customer.surnameCustomer === nameCustomer);
	customers.splice(index, 1);

	localStorage.setItem('customers', JSON.stringify(customers));

	totalCustomers--;
	localStorage.setItem('totalCustomers', totalCustomers);

	if (totalCustomers === 0) {
		imgCustomer.style.display = 'block';
		customerInfoTable.style.display = 'none';
		containerCustomerTable.style.display = 'none';
	}
}

////////! FUNCIÓN BUSCADOR ////////

const searchInputCustomer = document.getElementById('searchCustomer');
searchInputCustomer.addEventListener('keyup', searchCustomer);

function searchCustomer() {
	const searchValueCustomer = searchInputCustomer.value.toLowerCase();
	const tableCustomer = document.getElementById('customerTable');
	const rowsCustomer = tableCustomer.getElementsByTagName('tr');

	for (let i = 0; i < rowsCustomer.length; i++) {
		const nameCustomer = rowsCustomer[i].getElementsByTagName('td')[0];
		if (nameCustomer) {
			const nameCustomerValue = nameCustomer.textContent || nameCustomer.innerText;
			if (nameCustomerValue.toLowerCase().indexOf(searchValueCustomer) > -1) {
				rowsCustomer[i].style.display = '';
			} else {
				rowsCustomer[i].style.display = 'none';
			}
		}
	}
}
