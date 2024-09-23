const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let reservas = [];

// Cargar reservas desde el archivo JSON
fs.readFile('reservas.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo reservas.json:', err);
  } else {
    try {
      reservas = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error al parsear JSON:', parseErr);
      reservas = [];
    }
  }
});

// Guardar reservas en el archivo JSON
function guardarReservas() {
  fs.writeFileSync('reservas.json', JSON.stringify(reservas, null, 2));
}

// Enviar notificación de reserva (simulada)
function notificarReserva(clienteNombre, clienteEmail, abogado, fecha, hora) {
  console.log(`Enviando notificación a ${clienteEmail}: Reserva confirmada con ${abogado} el ${fecha} a las ${hora}.`);
}

// Endpoint para hacer una reserva
app.post('/reservar', (req, res) => {
  const { clienteNombre, clienteEmail, abogado, fecha, hora } = req.body;

  const reservaExistente = reservas.find(r => r.fecha === fecha && r.hora === hora && r.abogado === abogado);
  if (reservaExistente) {
    return res.status(400).json({ message: 'El abogado ya tiene una reserva en ese horario.' });
  }

  const nuevaReserva = { clienteNombre, clienteEmail, abogado, fecha, hora };
  reservas.push(nuevaReserva);
  guardarReservas();

  notificarReserva(clienteNombre, clienteEmail, abogado, fecha, hora);

  res.json({ message: 'Reserva realizada con éxito y notificación enviada.' });
});

// Endpoint para obtener citas según fecha y abogado
app.get('/citas', (req, res) => {
  const { fecha, abogado } = req.query;
  const citasFiltradas = reservas.filter(r => r.fecha === fecha && r.abogado === abogado);
  res.json(citasFiltradas);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
