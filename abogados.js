document.addEventListener('DOMContentLoaded', () => {
  const abogadosPorEspecialidad = {
    Civil: [
      { id: '1', nombre: 'Abogado 1 - Civil' },
      { id: '2', nombre: 'Abogado 2 - Civil' }
    ],
    Penal: [
      { id: '3', nombre: 'Abogado 1 - Penal' },
      { id: '4', nombre: 'Abogado 2 - Penal' }
    ],
    Laboral: [
      { id: '5', nombre: 'Abogado 1 - Laboral' },
      { id: '6', nombre: 'Abogado 2 - Laboral' }
    ]
  };

  const especialidadSelect = document.getElementById('especialidad');
  const abogadoSelect = document.getElementById('abogado');

  especialidadSelect.addEventListener('change', function() {
    const especialidadSeleccionada = especialidadSelect.value;

    abogadoSelect.innerHTML = '<option value="">--Selecciona un abogado--</option>';
    abogadoSelect.disabled = true;

    if (especialidadSeleccionada && abogadosPorEspecialidad[especialidadSeleccionada]) {
      abogadosPorEspecialidad[especialidadSeleccionada].forEach(abogado => {
        const option = document.createElement('option');
        option.value = abogado.nombre;
        option.textContent = abogado.nombre;
        abogadoSelect.appendChild(option);
      });
      abogadoSelect.disabled = false;
    }
  });
});
