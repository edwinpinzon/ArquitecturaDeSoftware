// document.addEventListener('DOMContentLoaded', () => {
//   const abogadosPorEspecialidad = {
//     Civil: [
//       { id: '1', nombre: 'Abogado 1 - Civil' },
//       { id: '2', nombre: 'Abogado 2 - Civil' }
//     ],
//     Penal: [
//       { id: '3', nombre: 'Abogado 1 - Penal' },
//       { id: '4', nombre: 'Abogado 2 - Penal' }
//     ],
//     Laboral: [
//       { id: '5', nombre: 'Abogado 1 - Laboral' },
//       { id: '6', nombre: 'Abogado 2 - Laboral' }
//     ]
//   };

//   const especialidadSelect = document.getElementById('especialidad');
//   const abogadoSelect = document.getElementById('abogado');
//   const citasTableBody = document.querySelector('#citasTable tbody');

//   especialidadSelect.addEventListener('change', function() {
//     const especialidadSeleccionada = especialidadSelect.value;

//     abogadoSelect.innerHTML = '<option value="">--Selecciona un abogado--</option>';
//     abogadoSelect.disabled = true;

//     if (especialidadSeleccionada && abogadosPorEspecialidad[especialidadSeleccionada]) {
//       abogadosPorEspecialidad[especialidadSeleccionada].forEach(abogado => {
//         const option = document.createElement('option');
//         option.value = abogado.nombre;
//         option.textContent = abogado.nombre;
//         abogadoSelect.appendChild(option);
//       });
//       abogadoSelect.disabled = false;
//     }
//   });

//   // Evento para cargar las citas cuando se seleccione un abogado
//   abogadoSelect.addEventListener('change', async function() {
//     const abogadoSeleccionado = abogadoSelect.value;

//     // Limpiar la tabla de citas
//     citasTableBody.innerHTML = '';

//     if (abogadoSeleccionado) {
//       try {
//         // Llamada al backend para obtener las citas del abogado seleccionado
//         const response = await fetch(`http://localhost:3000/citas?abogado=${abogadoSeleccionado}`);
//         const citas = await response.json();

//         // Llenar la tabla con las citas obtenidas
//         citas.forEach(cita => {
//           const row = document.createElement('tr');

//           const clienteCell = document.createElement('td');
//           clienteCell.textContent = cita.clienteNombre;

//           const abogadoCell = document.createElement('td');
//           abogadoCell.textContent = cita.abogado;

//           const fechaCell = document.createElement('td');
//           fechaCell.textContent = cita.fecha;

//           const horaCell = document.createElement('td');
//           horaCell.textContent = cita.hora;

//           row.appendChild(clienteCell);
//           row.appendChild(abogadoCell);
//           row.appendChild(fechaCell);
//           row.appendChild(horaCell);

//           citasTableBody.appendChild(row);
//         });

//       } catch (error) {
//         console.error('Error al obtener las citas:', error);
//       }
//     }
//   });
// });


document.addEventListener('DOMContentLoaded', async () => {
  const citasTableBody = document.querySelector('#citasTable tbody');

  // Función para llenar la tabla con citas
  async function cargarCitas() {
    try {
      const response = await fetch('http://localhost:3000/ver-reservas');
      const citas = await response.json();

      citas.forEach(cita => {
        const row = document.createElement('tr');

        const clienteCell = document.createElement('td');
        clienteCell.textContent = cita.clienteNombre;

        const abogadoCell = document.createElement('td');
        abogadoCell.textContent = cita.abogado;

        const fechaCell = document.createElement('td');
        fechaCell.textContent = cita.fecha;

        const horaCell = document.createElement('td');
        horaCell.textContent = cita.hora;

        row.appendChild(clienteCell);
        row.appendChild(abogadoCell);
        row.appendChild(fechaCell);
        row.appendChild(horaCell);

        citasTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error al cargar citas:', error);
    }
  }

  // Cargar las citas cuando se cargue la página
  cargarCitas();
});
