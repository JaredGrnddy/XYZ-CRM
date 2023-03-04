// Obtener referencias a los elementos del HTML
const divTotalContacts = document.getElementById('totalContacts');
const divTotalCustomers = document.getElementById('totalCustomers');
const divTotalCompanies = document.getElementById('totalCompanies');
const canvas = document.getElementById('myChart');

// Obtener los datos
let totalContacts = 0;

if (localStorage.getItem('totalContacts')) {
    totalContacts = parseInt(localStorage.getItem('totalContacts'));
}

divTotalContacts.innerText = `Total de contactos: ${totalContacts}`;

let totalCustomers = 0;

if (localStorage.getItem('totalCustomers')) {
    totalCustomers = parseInt(localStorage.getItem('totalCustomers'));
}

divTotalCustomers.innerText = `Total de clientes: ${totalCustomers}`;

let totalCompanies = 0;

if (localStorage.getItem('totalCompanies')) {
    totalCompanies = parseInt(localStorage.getItem('totalCompanies'));
}

divTotalCompanies.innerText = `Total de empresas: ${totalCompanies}`;

// Crear el gráfico
const chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Total de contactos', 'Total de clientes', 'Total de empresas'],
      datasets: [{
        label: 'Cantidad',
        data: [totalContacts, totalCustomers, totalCompanies],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
        borderColor: ['#ff6384', '#36a2eb', '#ffce56'],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        position: 'left',
        labels: {
          fontColor: '#333',
          fontSize: 14
        }
      },
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      title: {
        display: true,
        text: 'Totales',
        fontSize: 16,
        fontColor: '#333'
      }
    }
  });
  
  // Actualiza la gráfica después de realizar cambios en la configuración
  chart.update();
  
  
  
  
