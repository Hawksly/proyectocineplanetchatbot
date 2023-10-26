const chatButton = document.getElementById('chat-button');
const chatbot = document.querySelector('.offcanvas');
const sendButton = document.querySelector('.btnsend');
const textarea = document.querySelector('input[type="text"]');
const chatbox = document.querySelector('.chatbox');
const pelis = [
  { text: "Five Nights at Freddy's" },
  { text: 'El Exorcista' },
  { text: 'SUSY UNA VEDETTE EN EL CONGRESO' },
  { text: '12 Horas para el fin del mundo' },
  { text: 'Vampiro al Rescate' },
];
const promos = [
  { text: "2x1 Entel" },
  { text: 'Promo Agora Pay' },
];
const opciones = [
  { text: '¿Cuáles son las películas de estreno?' },
  { text: '¿Cuál es el cineplanet más cercano?' },
  { text: '¿Cuáles son las promociones vigentes?' },
];

chatButton.addEventListener('click', () => {
    chatbot.classList.toggle('active');
});

function agregarMensajeChatbot(mensaje) {
    const chatbotResponseDiv = document.createElement('div');
    chatbotResponseDiv.classList.add('chat', 'bienvenida');
    chatbox.appendChild(chatbotResponseDiv);

    const icono = document.createElement('img');
    icono.src = '/res/images/cineicon.png';
    icono.alt = 'Logo';
    icono.classList.add('d-inline-block', 'align-text-top', 'icono');
    chatbotResponseDiv.appendChild(icono);

    const mensajeDiv = document.createElement('p');
    mensajeDiv.innerText = mensaje;
    chatbotResponseDiv.appendChild(mensajeDiv);
}

sendButton.addEventListener('click', () => {
    const userMessage = textarea.value;

    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('chat', 'salida');
    chatbox.appendChild(userMessageDiv);

    const mensajeDiv = document.createElement('p');
    mensajeDiv.innerText = userMessage;
    userMessageDiv.appendChild(mensajeDiv);

    verificarRespuesta(userMessage);
    almacenarRespuestaEnBaseDeDatos(userMessage);
    textarea.value = '';
});

function verificarRespuesta(userMessage) {
  const patronesYAcciones = [
    { patron: /pel[iíì]culas*/i && /cartelera/i, accion: mostrarPeliculasCartelera },
    { patron: /pel[iíì]culas*/i && /emisi[oòó]n/i, accion: mostrarPeliculasCartelera },
  { patron: /pel[iíì]culas*/i && /estre[nñ]o/i, accion: mostrarPeliculasEstreno },
  { patron: /hola/i, accion: saludo },
  { patron: /deseo/i && /entrada[s]/i, accion: iniciarCompra },
  { patron: /adi[oòó]s/i, accion: despedida },
  { patron: /c[oòó]mo/i && /llego/i, accion: obtenerUbicacionYCompararSucursales },
  { patron: /cineplanet/i && /cerca/i, accion: obtenerUbicacionYCompararSucursales },
  { patron: /cineplanet/i && /cercano/i, accion: obtenerUbicacionYCompararSucursales },
  { patron: /informaci[iìí][oòó]n/i && /sala[s]/i && /cine/i, accion: obtenerUbicacionYCompararSucursales },
  { patron: /promociones/i, accion: mostrarPromociones },
  { patron: /precios/i, accion: mostrarPreciosEntradas },
  { patron: /horario/i, accion: mostrarHorarioPelicula },
  { patron: /entel/i, accion: entel },
  { patron: /agora/i, accion: agora },
  { patron: /pel[iíì]culas*/i && /terror/i, accion: mostrarPeliculasTerror },
  { patron: /pel[iíì]culas*/i && /comedia/i, accion: mostrarPeliculasComediasyFamiliares },
  { patron: /pel[iíì]culas*/i && /familiar/i, accion: mostrarPeliculasComediasyFamiliares },
  { patron: /pel[iíì]culas*/i && /suspenso/i, accion: mostrarPeliculasSuspenso },
  ];

  let respuestaEncontrada = false;

  for (const item of patronesYAcciones) {
    if (item.patron.test(userMessage)) {
      item.accion();
      respuestaEncontrada = true;
      break;
    }
  }

  if (!respuestaEncontrada) {
    hacerAlgoPorDefecto();
  }
}

function almacenarRespuestaEnBaseDeDatos(respuesta) {
  $.ajax({
    type: "POST",
    url: "/Controlador/chatbot.php",
    data: { text: respuesta },
    success: function (response) {
      console.log("Respuesta almacenada en la base de datos.");
    },
    error: function () {
      console.log("Error al almacenar la respuesta en la base de datos.");
    }
  });
}

function mostrarPeliculasComediasyFamiliares() {
  agregarMensajeChatbot('Las películas de comedia y familiares en cartelera son: SUSY UNA VEDETTE EN EL CONGRESO, Vampiro al Rescate y películas Disney D100 aniversario.');
}

function mostrarPeliculasTerror() {
  agregarMensajeChatbot('Las películas de terror en cartelera son: Los Asesinos de la Luna, La Naranja Mecánica, Saw X, Five Nights at Freddy y El Exorcista.');
}

function mostrarPeliculasSuspenso() {
  agregarMensajeChatbot('Las películas de suspenso en cartelera son: 12 Horas para el fin del mundo y La Memoria Infinita.');
}

function entel() {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.style.width = '18rem';

  const img = document.createElement('img');
  img.src = '/res/images/entel.jpg';
  img.classList.add('card-img-top','promo');
  img.alt = 'promo';
  cardDiv.appendChild(img);

  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.classList.add('card-body');
  cardDiv.appendChild(cardBodyDiv);

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.innerText = 'Promo Entel';
  cardBodyDiv.appendChild(cardTitle);

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.innerText = '2x1 si eres Entel en todo el año!';
  cardBodyDiv.appendChild(cardText);

  const linkA = document.createElement('a');
  linkA.href = 'https://cdn.cineplanet.com.pe/contentAsset/raw-data/a2a286b7-f59f-4819-946a-f3e845b75365/fileAsset?byInode=true';
  linkA.classList.add('btn', 'btn-primary');
  linkA.innerText = 'Más información';
  cardBodyDiv.appendChild(linkA);

  agregarMensajeConTarjeta(cardDiv);
}

function agora() {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.style.width = '18rem';

  const img = document.createElement('img');
  img.src = '/res/images/agora.jpg';
  img.classList.add('card-img-top','promo');
  img.alt = 'promo';
  cardDiv.appendChild(img);

  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.classList.add('card-body');
  cardDiv.appendChild(cardBodyDiv);

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.innerText = 'Promo Agora Pay';
  cardBodyDiv.appendChild(cardTitle);

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.innerText = 'Un descuento insuperable al comprar los martes en Cineplanet a solo 9 soles.';
  cardBodyDiv.appendChild(cardText);

  const linkA = document.createElement('a');
  linkA.href = 'https://cdn.cineplanet.com.pe/terminos-y-condiciones/Legales_AgoraPay_CP.pdf?language_id=1';
  linkA.classList.add('btn', 'btn-primary');
  linkA.innerText = 'Más información';
  cardBodyDiv.appendChild(linkA);

  agregarMensajeConTarjeta(cardDiv);
}

function agregarMensajeConTarjeta(tarjeta) {
  const chatbotResponseDiv = document.createElement('div');
  chatbotResponseDiv.classList.add('chat', 'bienvenida');
  chatbox.appendChild(chatbotResponseDiv);

  const icono = document.createElement('img');
  icono.src = '/res/images/cineicon.png';
  icono.alt = 'Logo';
  icono.classList.add('d-inline-block', 'align-text-top', 'icono');
  chatbotResponseDiv.appendChild(icono);

  chatbotResponseDiv.appendChild(tarjeta);
}



function mostrarPromociones() {
  agregarMensajeConBotones('Tenemos varias promociones disponibles. Puedo proporcionarte información detallada sobre cada una de ellas. ¿En qué promoción estás interesado?',promos);
}

function mostrarPreciosEntradas() {
  agregarMensajeChatbot('Los precios de las entradas varían según la película y la sucursal. ¿Para cuál película y sucursal te gustaría conocer los precios?');
}

function mostrarHorarioPelicula() {
  agregarMensajeChatbot('Por supuesto, puedo ayudarte con eso. Por favor, proporciona el nombre de la película y la sucursal para la que deseas conocer el horario.');
}


function compra() {
  agregarMensajeChatbot('Correcto, ¿para qué función desea las entradas?');
}

function mostrarPeliculasCartelera() {
  agregarMensajeChatbot('Las películas en cartelera son: Five Nights at Freddy, El Exorcista, SUSY UNA VEDETTE EN EL CONGRESO, 12 Horas para el fin del mundo, Vampiro al Rescate, películas Disney D100 aniversario y Saw X.');
}

function mostrarPeliculasEstreno() {
  agregarMensajeChatbot('Las películas de estreno son: Five Nights at Freddy, El Exorcista, SUSY UNA VEDETTE EN EL CONGRESO, 12 Horas para el fin del mundo y Vampiro al Rescate');
}

let waitingForDNI = false;
let waitingForPassword = false;
let contra;

function ingresarSesionSocios() {
  agregarMensajeChatbot('Por favor, ingrese su DNI: (Ejemplo: 12345678)');
  verificarRespuesta2(71092254);
  waitingForDNI = true;
}

function verificarRespuesta2(userMessage) {
  if (waitingForDNI) {
    if (userMessage==='71092254') {
      agregarMensajeChatbot('Ahora, por favor, ingrese su contraseña.');
      waitingForDNI = false;
      waitingForPassword = true;
      contra = userMessage;
    } else {
      agregarMensajeChatbot('El DNI ingresado no es válido. Por favor, ingrese un DNI válido.');
    }
  } else if (waitingForPassword) {
    if (esContrasenaValida(userMessage)) {
      agregarMensajeChatbot('¡Bienvenido! ¿En qué podemos ayudarte hoy?');
      waitingForPassword = false;
      isUserAuthenticated = true;
      autenticarUsuario(dniUsuario,contra);
    } else {
      agregarMensajeChatbot('La contraseña ingresada no es válida. Por favor, inténtalo de nuevo.');
      waitingForDNI = false;
      waitingForPassword = false;
    }
  } else {
    isUserAuthenticated = true;
    agregarMensajeChatbot('¿En qué otra cosa puedo ayudarte?');
    recibirMensajeUsuario("71092254","Cine123");
  }
}

function esContrasenaValida(contrasena) {
  return contrasena === 'Cine123';
}



let isUserAuthenticated = false;
let selectedMovie = null;
let numberOfTickets = 0;
let selectedCine = null;
let isPromotionApplied = false;

function autenticarUsuario(usuario, contrasena) {
  $.ajax({
    type: "POST",
    url: "/Controlador/authenticate.php",
    data: { usuario, contrasena },
    success: function (response) {
      if (response === "Autenticado") {
        isUserAuthenticated = true;
        agregarMensajeChatbot("¡Bienvenido! ¿En qué podemos ayudarte hoy?");
        seleccionarPelicula();
      } else {
        agregarMensajeChatbot("Lo siento, las credenciales son incorrectas. Por favor, inténtalo de nuevo.");
      }
    },
    error: function () {
      agregarMensajeChatbot("Error al autenticar. Por favor, inténtalo de nuevo más tarde.");
    }
  });
}

function ingresarUsuarioContrasena(usuario, contrasena) {
  autenticarUsuario(usuario, contrasena);
}

function iniciarCompra() {
  selectedMovie = null;
  numberOfTickets = 0;
  selectedCine = null;

  agregarMensajeChatbot('¡Genial! Comencemos con la compra de entradas.');
  agregarMensajeConBotones('Por favor, ingresa el nombre de la película:',pelis);
  
}

function seleccionarPelicula(pelicula) {
  selectedMovie = pelicula;
  agregarMensajeChatbot(`Has seleccionado la película: ${pelicula.text}.`);
  agregarMensajeChatbot('Por favor, ingresa el horario:');
  agregarHorariosDisponibles();
}

function agregarHorariosDisponibles() {
  const horarios = [
    '10:00 AM',
    '02:00 PM',
    '05:30 PM',
  ];

  const horariosMessage = 'Horarios disponibles:\n' + horarios.join(', ');

  agregarMensajeConBotones(horariosMessage,horarios);
}

function seleccionarHorario(horario) {
  selectedHorario = horario;
  agregarMensajeChatbot(`Has seleccionado el horario: ${horario}.`);
  agregarMensajeChatbot('Por favor, ingresa la cantidad de entradas que deseas:');
}

function seleccionarCantidadEntradas(cantidad) {
  numberOfTickets = cantidad;
  agregarMensajeChatbot(`Has seleccionado ${cantidad} entradas para la película: ${selectedMovie.text}.`);
  agregarMensajeChatbot('Ahora, por favor, ingresa el nombre de la sucursal o cine:');
}

function verificarCine(cine) {
  const sucursales = [
    { text: 'Mall del Sur' },
    { text: 'Villa María del Triunfo' },
    { text: 'Villa El Salvador' },
  ];

  const selectedCine = sucursales.find((sucursal) => cine.toLowerCase().includes(sucursal.text.toLowerCase()));

  if (selectedCine) {
    agregarMensajeChatbot(`Has seleccionado ${selectedCine.text} para ver la película: ${selectedMovie.text}.`);
    agregarMensajeChatbot('¡Compra realizada con éxito!');
    agregarMensajeChatbot(`Pelicula: ${selectedMovie.text}, Horario: ${selectedHorario}, Cantidad de entradas: ${numberOfTickets}, Sucursal: ${selectedCine.text}`);
  } else {
    agregarMensajeChatbot("No se ha reconocido la sucursal. Por favor, ingresa una sucursal válida.");
  }
}

function recibirMensajeUsuario(mensaje) {
  if (!selectedMovie) {
    const pelis = [
      { text: "Five Nights at Freddy's" },
      { text: 'El Exorcista' },
      { text: 'SUSY UNA VEDETTE EN EL CONGRESO' },
      { text: '12 Horas para el fin del mundo' },
      { text: 'Vampiro al Rescate' },
    ];
    const selected = pelis.find((pelicula) => mensaje.toLowerCase().includes(pelicula.text.toLowerCase()));
    if (selected) {
      seleccionarPelicula(selected);
    } else {
      agregarMensajeConBotones("Selecciona una película: ", pelis);
    }
  } else if (!numberOfTickets) {
    const cantidad = parseInt(mensaje);
    if (!isNaN(cantidad)) {
      seleccionarCantidadEntradas(cantidad);
    } else {
      agregarMensajeChatbot("Por favor, ingresa un número válido para la cantidad de entradas.");
    }
  } else {
    completarCompra();
  }
}

function completarCompra() {

  if (!selectedMovie || !numberOfTickets || !selectedCine) {
    agregarMensajeChatbot("Por favor, selecciona una película, la cantidad de entradas y la sucursal antes de continuar.");
    return;
  }

  const precioEntrada = 16;
  let precioTotal = precioEntrada * numberOfTickets;

  if (isPromotionApplied) {
    precioTotal *= 0.5;
  }

  const compra = {
    pelicula: selectedMovie.text,
    cantidadEntradas: numberOfTickets,
    cine: selectedCine.text,
    precioTotal: precioTotal,
  };

  $.ajax({
    type: "POST",
    url: "/Controlador/realizarCompra.php",
    data: compra,
    success: function (response) {
      agregarMensajeChatbot(`¡Compra realizada con éxito! Total a pagar: ${precioTotal} soles. Gracias por elegir Cineplanet.`);
    },
    error: function () {
      agregarMensajeChatbot("Error al procesar la compra. Por favor, inténtalo de nuevo más tarde.");
    }
  });
}

function mostrarPromociones() {
  agregarMensajeChatbot('Actualmente, contamos con las siguientes promociones: 2x1 en entradas al cine todo el año al tener un número de celular en Entel y Promo Agora Pay: Todos los martes podrás comprar entradas a 9 soles con hasta un 55% de descuento exclusivo pagando con Agora PAY. Para más información puedes ingresar al siguiente link: https://www.cineplanet.com.pe/promociones');
}

function saludo() {
  agregarMensajeConBotones('Buenas tardes, le saluda el asistente virtual de Cineplanet, ¿en qué puedo ayudarle?',opciones);
}

function despedida() {
  agregarMensajeChatbot('Gracias por utilizar el asistente virtual de Cineplanet, vuelva pronto.');
}

function hacerAlgoPorDefecto() {
  agregarMensajeConBotones('Que tenga un buen día, ¿puedo ayudarle en algo más?',opciones);
}

function obtenerUbicacionYCompararSucursales() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitudUsuario = position.coords.latitude;
      const longitudUsuario = position.coords.longitude;

      const sucursales = [
        { nombre: 'Mall del Sur', latitud: -12.154191436416149, longitud: -76.98214683828617 },
        { nombre: 'Guardia Civil', latitud: -12.110454048865634, longitud: -76.99070148392283 },
        { nombre: 'Caminos del Inca', latitud: -12.170231247863862, longitud: -76.99182340488724 },
        { nombre: 'Primavera', latitud: -12.10894573516884, longitud: -77.00262189053917 },
        { nombre: 'El Polo', latitud: -12.099484300184878, longitud: -76.97120811320565 },
        { nombre: 'San Borja', latitud: -12.087691318164158, longitud: -77.00542669467022 },
        { nombre: 'Alcázar', latitud: -12.107574532840065, longitud: -77.03712095342382 },
        { nombre: 'Salaverry', latitud: -12.087828448566842, longitud: -77.0531083223203 },
        { nombre: 'Risso', latitud: -12.083988762795716, longitud: -77.03473687182718 },
        { nombre: 'Brasil', latitud: -12.063418080190159, longitud: -77.04819991952755 },
        { nombre: 'Centro Cívico', latitud: -12.054640774945954, longitud:  -77.03655999249735 },
        { nombre: 'Centro', latitud: -12.048469060312161, longitud: -77.03347471055704 },
        { nombre: 'Villa María del Triunfo', latitud: -12.160197, longitud: -76.985545 },
        { nombre: 'Villa El Salvador', latitud: -12.20250868302138, longitud: -76.93252068458347 },
        { nombre: 'Lurín', latitud: -12.272868432658962, longitud: -76.87402258316011 },
        , 
      ];

      const sucursalCercana = encontrarSucursalCercana(latitudUsuario, longitudUsuario, sucursales);

      if (sucursalCercana) {
        agregarMensajeChatbot(`La sucursal más cercana es: ${sucursalCercana.nombre}`);
      } else {
        agregarMensajeChatbot('No se encontraron sucursales cercanas.');
      }
    });
  } else {
    agregarMensajeChatbot('Tu navegador no admite la geolocalización o los permisos no se han concedido.');
  }
}

function encontrarSucursalCercana(latUsuario, lonUsuario, sucursales) {
  let distanciaMinima = Number.MAX_VALUE;
  let sucursalCercana = null;
  
  sucursales.forEach(function (sucursal) {
    const latSucursal = parseFloat(sucursal.latitud);
    const lonSucursal = parseFloat(sucursal.longitud);
    
    const distancia = calcularDistancia(latUsuario, lonUsuario, latSucursal, lonSucursal);
    
    if (distancia < distanciaMinima) {
      distanciaMinima = distancia;
      sucursalCercana = sucursal;
    }
  });
  
  return sucursalCercana;
}

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const radioTierra = 6371; // Radio promedio de la Tierra en kilómetros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = radioTierra * c; // Distancia en kilómetros

  return distancia;
}

function agregarMensajeConBotones(mensaje, opciones) {
  const chatbotResponseDiv = document.createElement('div');
  chatbotResponseDiv.classList.add('chat', 'bienvenida');
  chatbox.appendChild(chatbotResponseDiv);

  const icono = document.createElement('img');
  icono.src = '/res/images/cineicon.png';
  icono.alt = 'Logo';
  icono.classList.add('d-inline-block', 'align-text-top', 'icono');
  chatbotResponseDiv.appendChild(icono);

  const mensajeDiv = document.createElement('p');
  mensajeDiv.innerText = mensaje;
  chatbotResponseDiv.appendChild(mensajeDiv);

  opciones.forEach((opcion) => {
    const opcionDiv = document.createElement('div');
    opcionDiv.classList.add('chat', 'bienvenida', 'with-buttons');
    chatbox.appendChild(opcionDiv);

    const boton = document.createElement('button');
    boton.innerText = opcion.text;
    boton.addEventListener('click', () => {
      agregarMensajeUsuario(opcion.text);
    });
    opcionDiv.appendChild(boton);
  });
  textarea.value = '';
}

function agregarMensajeUsuario(text) {
  const userMessage = text;

  const userMessageDiv = document.createElement('div');
  userMessageDiv.classList.add('chat', 'salida');
  chatbox.appendChild(userMessageDiv);

  const mensajeDiv = document.createElement('p');
  mensajeDiv.innerText = userMessage;
  userMessageDiv.appendChild(mensajeDiv);

  verificarRespuesta(userMessage);
  almacenarRespuestaEnBaseDeDatos(userMessage);
}

document.addEventListener("DOMContentLoaded", function () {
  const chatBody = document.querySelector(".offcanvas");
  const maximizeButton = document.getElementById("maximize-chat-button");
  const maximizeIcon = document.getElementById("maximize-icon");

  let isMaximized = false;

  maximizeButton.addEventListener("click", function () {
      if (isMaximized) {
          chatBody.style.width = "500px";
          maximizeIcon.src = "/res/images/maximizar.png";
          isMaximized = false;
      } else {
          chatBody.style.width = "90%";
          maximizeIcon.src = "/res/images/minimizar.png";
          isMaximized = true;
      }
  });
});