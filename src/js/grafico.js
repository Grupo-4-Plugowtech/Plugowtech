 // Dados e configurações do gráfico de barras
 const barCtx = document.getElementById('barChart').getContext('2d');
 const barChart = new Chart(barCtx, {
   type: 'bar',
   data: {
     labels: ['Empresa 1', 'Empresa 2', 'Empresa 3', 'Empresa 4', 'Empresa 5', 'Empresa 6', 'Empresa 7'],
     datasets: [
       {
         label: 'Lançamentos realizados',
         data: [20, 30, 50, 40, 70, 60, 30],
         backgroundColor: 'rgba(255, 99, 132, 0.7)',
       },
       {
         label: 'Quantidade espera por Nº de colaboradores',
         data: [40, 50, 70, 60, 90, 80, 50],
         backgroundColor: 'rgba(54, 162, 235, 0.7)',
       },
     ],
   },
   options: {
     responsive: true,
     plugins: {
       legend: {
         display: true,
         position: 'top',
       },
     },
     scales: {
       y: {
         beginAtZero: true,
       },
     },
   },
 });

 // Dados e configurações do gráfico de linha
 const lineCtx = document.getElementById('lineChart').getContext('2d');
 const lineChart = new Chart(lineCtx, {
   type: 'line',
   data: {
     labels: ['Dia 1', 'Dia 5', 'Dia 10', 'Dia 15', 'Dia 20', 'Dia 25', 'Dia 30'],
     datasets: [
       {
         label: 'Projeção de adesão ao partnership para os próximos 30 dias',
         data: [10, 20, 40, 60, 80, 90, 100],
         borderColor: 'rgba(255, 99, 132, 1)',
         backgroundColor: 'rgba(255, 99, 132, 0.2)',
         borderWidth: 2,
         fill: true,
         pointRadius: 5,
         pointBackgroundColor: 'rgba(255, 99, 132, 1)',
       },
     ],
   },
   options: {
     responsive: true,
     plugins: {
       legend: {
         display: true,
         position: 'top',
       },
     },
     scales: {
       y: {
         beginAtZero: true,
       },
     },
   },
 });