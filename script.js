async function login() {
  const name = document.getElementById('patientName').value;
  const number = document.getElementById('patientNumber').value;

  if(name && number) {
    document.getElementById('loginPage').classList.add('hidden');
    setTimeout(() => {
      document.getElementById('dashboard').style.display = 'block';
      document.getElementById('welcome').innerText = `Welcome, ${name}`;
      addPatient(name, number);
      fetchData();
    }, 800);
  } else {
    alert("Please enter both name and number.");
  }
}

function addPatient(name, number) {
  const table = document.getElementById('patientTable');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${number}</td>
    <td>${new Date().toLocaleDateString()}</td>
    <td>Dr. Smith</td>
  `;
  table.appendChild(row);

  const total = document.getElementById('totalPatients');
  total.innerText = parseInt(total.innerText) + 1;
}

// Mock API call for UX demo
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    document.getElementById('upcomingAppointments').innerText = data.length;
    document.getElementById('doctorsAvailable').innerText = 12;

    data.slice(0,5).forEach(user => {
      const table = document.getElementById('patientTable');
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.id}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>Dr. Adams</td>
      `;
      table.appendChild(row);
    });
  } catch (error) {
    console.error("API fetch failed", error);
  }
}
