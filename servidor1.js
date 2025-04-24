// El módulo http sirve para crear servidores web básicos con node.js
import http from 'http';
// El módulo fs (file system) permite leer y escribir archivos desde el sistema de archivos
import fs from 'fs';

function darBienvenida(req, res) {
  // Lee el archivo bienvenida.html y lo muestra como respuesta
  fs.readFile('bienvenida.html', 'utf8', (error, data) => {
    if (error) {
      // El codigo 500 indica error interno en el servidor
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error');
      return;
    }
    // El codigo 200 significa que la respuesta fue exitosa
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

function getEscuelas(req, res) {
  // Objeto JSON con varias escuelas
  const escuelas = [
    {
      "nombre": "Escuela Benito Juárez",
      "direccion": "Av. Cuauhtemoc, Morelia"
    },
    {
      "nombre": "Escuela Allende",
      "direccion": "Calle Cultura 456, Guadalajara"
    }
  ];

  // JSON.stringify convierte el objeto JS en una cadena JSON válida
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(escuelas));
}

function mostrarEscuelas(req, res) {
  fs.readFile('escuelas.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

function mostrarDonantes(req, res) {
  fs.readFile('donantes.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

function getDonantes(req, res) {
  const donantes = [
    {
      nombre: "Luisa Merlo",
      cantidad: "$10000"
    },
    {
      nombre: "Leonardo Guillen",
      cantidad: "$11500"
    }
  ];

  // Cambiamos text/plain por application/json para enviar JSON correctamente
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(donantes));
}

function mostrarEquipo(req, res) {
  fs.readFile('equipo.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

function mostrarOpinion(req, res) {
  fs.readFile('opinion.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Eroor');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

function manejarRuta404(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  // Mensaje más divertido
  res.end('Esta página no existe');
}

// Más sobre createServer: https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
const servidor = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    darBienvenida(req, res);
  } else if (url === '/api/escuelas') {
    getEscuelas(req, res);
  } else if (url === '/api/donantes') {
    getDonantes(req, res);
  } else if (url === '/escuelas') {
    mostrarEscuelas(req, res);
  } else if (url === '/donantes') {
    mostrarDonantes(req, res);
  } else if (url === '/equipo') {
    mostrarEquipo(req, res);
  } else if (url === '/opinion') {
    mostrarOpinion(req, res);
  } else {
    manejarRuta404(req, res);
  }
});

const puerto = 1984;
servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
