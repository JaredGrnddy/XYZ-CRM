////////! VARIABLES GLOBALES ////////

const btnCreateCompany = document.getElementById('btn-create-company');
const formCompany = document.getElementById('form-company');
const closeFormButtonCompany = document.getElementById('close-form-company');
const imgCompany = document.getElementById('imgCompany');

////////! FUNCIÓN BOTON CREAR CONTACTO Y RESETEAR FORMULARIO ////////

function createContact() {
    if (formCompany.classList.contains('hidden')) {
        formCompany.classList.remove('hidden');
    }
}

function resetForm() {
    document.getElementById('nameCompany').value = '';
    document.getElementById('cifCompany').value = '';
    document.getElementById('addressCompany').value = '';
    document.getElementById('phoneCompany').value = '';
    document.getElementById('categoryCompany').value = '';
    document.getElementById('annotationCompany').value = '';
}

btnCreateCompany.addEventListener('click', function() {
    createContact();
    resetForm();
});

////////! FUNCIÓN BOTON CERRAR FORMULARIO ////////

function closeForm() {
    if (formCompany.classList.contains('hidden')) {
        formCompany.classList.remove('hidden');
    } else {
        formCompany.classList.add('hidden');
    }
}

closeFormButtonCompany.addEventListener('click', closeForm);

////////*

let totalCompanies = 0;
let companies = [];

////////! FUNCIÓN BOTON GUARDAR CONTACTO ////////

const saveButtonCompany = document.getElementById('save-company');
saveButtonCompany.addEventListener('click', saveCompany);

function saveCompany(event) {
    event.preventDefault();

    const nameCompany = document.getElementById('nameCompany').value;
    const errorCreateCompany = document.getElementById('errorNameCompany');
    if (!nameCompany) {
        errorCreateCompany.innerText = 'Por favor ingrese el nombre de la empresa';
        errorCreateCompany.style.display = 'block';
        return;
    } else {
        errorCreateCompany.innerText = '';
        errorCreateCompany.style.display = 'none';
    }

    const cifCompany = document.getElementById('cifCompany').value;
    const addressCompany = document.getElementById('addressCompany').value;
    const phoneCompany = document.getElementById('phoneCompany').value;
    const categoryCompany = document.getElementById('categoryCompany').value;
    const annotationCompany = document.getElementById('annotationCompany').value;

    const company = {
        nameCompany: nameCompany,
        cifCompany: cifCompany,
        addressCompany: addressCompany,
        phoneCompany: phoneCompany,
        categoryCompany: categoryCompany,
        annotationCompany: annotationCompany
    };

    companies.push(company);
    localStorage.setItem('companies', JSON.stringify(companies));

    addRowToTableCompany(company);
    location.reload();

    const formCompany = document.getElementById('form-company');
    formCompany.classList.add('hidden');
    const containerCompanyTable = document.getElementById('containerCompanyTable');
    containerCompanyTable.classList.remove('hidden');

    totalCompanies++;
    localStorage.setItem("totalCompanies", totalCompanies);

    if (totalCompanies > 0) {
        imgCompany.style.display = 'none';
        companyTable.style.display = 'block';
        containerCompanyTable.style.display = 'block';
    }

    localStorage.setItem("totalCompanies", totalCompanies);
}

////////! FUNCIÓN GUARDAR CONTACTO EN LOCAL STORAGE ////////

if (localStorage.getItem("companies")) {
    companies = JSON.parse(localStorage.getItem("companies"));
    totalCompanies = companies.length;
    for (const company of companies) {
        addRowToTableCompany(company);
    }
}

////////! FUNCIÓN AGREGAR FILA A TABLA ////////

function addRowToTableCompany(company) {
    const tableCompany = document.getElementById('companyTable');
    const newRowCompany = document.createElement('tr');
    newRowCompany.classList.add('bg-white', 'border-b');

    const nameCompanyCell = document.createElement('td');
    nameCompanyCell.classList.add('px-6', 'py-4');
    nameCompanyCell.innerText = company.nameCompany;
    newRowCompany.appendChild(nameCompanyCell);

    const cifCompanyCell = document.createElement('td');
    cifCompanyCell.classList.add('px-6', 'py-4');
    cifCompanyCell.innerText = company.cifCompany;
    newRowCompany.appendChild(cifCompanyCell);

    const addressCompanyCell = document.createElement('td');
    addressCompanyCell.classList.add('px-6', 'py-4');
    addressCompanyCell.innerText = company.addressCompany
    newRowCompany.appendChild(addressCompanyCell);

    const phoneCompanyCell = document.createElement('td');
    phoneCompanyCell.classList.add('px-6', 'py-4');
    phoneCompanyCell.innerText = company.phoneCompany;
    newRowCompany.appendChild(phoneCompanyCell);

    const categoryCompanyCell = document.createElement('td');
    categoryCompanyCell.classList.add('px-6', 'py-4');
    categoryCompanyCell.innerText = company.categoryCompany;
    newRowCompany.appendChild(categoryCompanyCell);

    const annotationCompanyCell = document.createElement('td');
    annotationCompanyCell.classList.add('px-6', 'py-4');
    annotationCompanyCell.innerText = company.annotationCompany;
    newRowCompany.appendChild(annotationCompanyCell);

    const iconCompanyCell = document.createElement('td');
    iconCompanyCell.classList.add('px-6', 'py-4', 'text-end');

    const editCompanyIcon = document.createElement('box-icon');
    editCompanyIcon.setAttribute('type', 'edit');
    editCompanyIcon.setAttribute('name', 'edit');
    editCompanyIcon.classList.add('custom-icon');
    editCompanyIcon.setAttribute('id', 'btnEditContact');
    iconCompanyCell.appendChild(editCompanyIcon);

    const deleteCompanyIcon = document.createElement('box-icon');
    deleteCompanyIcon.setAttribute('type', 'solid');
    deleteCompanyIcon.setAttribute('name', 'trash-alt');
    deleteCompanyIcon.classList.add('custom-icon');
    deleteCompanyIcon.setAttribute('id', 'btnDeleteContact');
    iconCompanyCell.appendChild(deleteCompanyIcon);

    const companyInfoTable = document.getElementById('companyInfoTable');
    tableCompany.appendChild(newRowCompany);
    companyInfoTable.appendChild(tableCompany);
    newRowCompany.appendChild(iconCompanyCell);

    editCompanyIcon.addEventListener('click', (event) => {
    editCompany(event);
    });
    
    deleteCompanyIcon.addEventListener('click', (event) => {
    deleteCompany(event);
    });
    
}

////////*

if (totalCompanies > 0) {
    imgCompany.style.display = 'none';
    companyInfoTable.style.display = 'block';
    containerCompanyTable.style.display = 'block';
}

////////! FUNCIÓN BOTÓN EDITAR CONTACTO ////////

function editCompany(event) {
    window.scrollTo(0, 0);
    const rowCompany = event.target.parentElement.parentElement;

    const nameCompany = rowCompany.children[0].textContent.split(' ')[0];
    const cifCompany = rowCompany.children[0].textContent.split(' ')[1];
    const addressCompany = rowCompany.children[1].textContent;
    const phoneCompany = rowCompany.children[2].textContent;
    const categoryCompany = rowCompany.children[3].textContent;
    const annotationCompany = rowCompany.children[4].textContent;

    const formCompany = document.getElementById('form-company');
    const tableCompany = document.getElementById('companyTable');
    formCompany.classList.remove('hidden');

    document.getElementById('nameCompany').value = nameCompany;
    document.getElementById('cifCompany').value = cifCompany;
    document.getElementById('addressCompany').value = addressCompany;
    document.getElementById('phoneCompany').value = phoneCompany;
    document.getElementById('categoryCompany').value = categoryCompany;
    document.getElementById('annotationCompany').value = annotationCompany;

    const saveButtonCompany = document.getElementById('save-company');
    saveButtonCompany.classList.add('hidden');

    const existingUpdateButtonCompany = document.getElementById('update-company');
    if (existingUpdateButtonCompany) {
        existingUpdateButtonCompany.remove();
    }

    const updateButtonCompany = document.createElement('button');
    updateButtonCompany.innerText = 'Actualizar';
    updateButtonCompany.setAttribute('id', 'update-company');
    updateButtonCompany.classList.add('custom-button');
    formCompany.appendChild(updateButtonCompany);

    updateButtonCompany.addEventListener('click', updateCompany);

    function updateCompany(event) {
        event.preventDefault();
    
        const nameCompany = document.getElementById('nameCompany').value;
        const cifCompany = document.getElementById('cifCompany').value;
        const addressCompany = document.getElementById('addressCompany').value;
        const phoneCompany = document.getElementById('phoneCompany').value;
        const categoryCompany = document.getElementById('categoryCompany').value;
        const annotationCompany = document.getElementById('annotationCompany').value;
    
        rowCompany.children[0].textContent = nameCompany;
        rowCompany.children[1].textContent = cifCompany;
        rowCompany.children[2].textContent = addressCompany;
        rowCompany.children[3].textContent = phoneCompany;
        rowCompany.children[4].textContent = categoryCompany;
        rowCompany.children[5].textContent = annotationCompany;
    
        const index = companies.findIndex(company => company.nameCompany === rowCompany.children[0].textContent);
        companies[index] = {
            nameCompany: nameCompany,
            cifCompany: cifCompany,
            addressCompany: addressCompany,
            phoneCompany: phoneCompany,
            categoryCompany: categoryCompany,
            annotationCompany: annotationCompany
        };
    
        localStorage.setItem("companies", JSON.stringify(companies));
    
        tableCompany.classList.remove('hidden');
        formCompany.classList.add('hidden');
    
        updateButtonCompany.remove();
    
        saveButtonCompany.classList.remove('hidden');
    }
    
}

////////! FUNCIÓN BOTÓN ELIMINAR CONTACTO ////////

function deleteCompany(event) {
    event.preventDefault();

    const parentRow = event.target.parentNode.parentNode;
    const nameCompany = parentRow.querySelector("td:first-child").textContent;

    parentRow.remove();

    const index = companies.findIndex(company => company.nameCompany === nameCompany);
    companies.splice(index, 1);


    localStorage.setItem('companies', JSON.stringify(companies));

    totalCompanies--;
    localStorage.setItem("totalCompanies", totalCompanies);

    if (totalCompanies === 0) {
        imgCompany.style.display = 'block';
        companyInfoTable.style.display = 'none';
        containerCompanyTable.style.display = 'none';
    }
}

////////! FUNCIÓN BUSCADOR ////////

const searchInputCompany = document.getElementById('searchCompany');
searchInputCompany.addEventListener('keyup', searchCompany);

function searchCompany() {
    const searchValueCompany = searchInputCompany.value.toLowerCase();
    const tableCompany = document.getElementById('companyTable');
    const rowsCompany = tableCompany.getElementsByTagName('tr');

    for (let i = 0; i < rowsCompany.length; i++) {
        const nameCompany = rowsCompany[i].getElementsByTagName('td')[0];
        if (nameCompany) {
            const nameCompanyValue = nameCompany.textContent || nameCompany.innerText;
            if (nameCompanyValue.toLowerCase().indexOf(searchValueCompany) > -1) {
                rowsCompany[i].style.display = '';
            } else {
                rowsCompany[i].style.display = 'none';
            }
        }
    }
}