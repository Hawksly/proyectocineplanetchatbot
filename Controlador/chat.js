const chatButton = document.getElementById('chat-button');
const chatbot = document.querySelector('.offcanvas');
const sendButton = document.querySelector('.btnsend');
const textarea = document.querySelector('input[type="text"]');
const chatbox = document.querySelector('.chatbox');
let waitingForDNI = false;
let waitingForPassword = false;

chatButton.addEventListener('click', () => {
    chatbot.classList.toggle('active');
});

function agregarMensajeChatbot(mensaje) {
    const chatbotResponseDiv = document.createElement('div');
    chatbotResponseDiv.classList.add('chat', 'bienvenida');
    chatbox.appendChild(chatbotResponseDiv);

    const icono = document.createElement('img');
    icono.src = '/res/images/Cineicon.png';
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
    textarea.value = '';
});

function verificarRespuesta(userMessage) {
  const patronesYAcciones = [
    { patron: /pel[iíì]culas*/i && /cartelera/i, accion: mostrarPeliculasCartelera },
    { patron: /pel[iíì]culas* de estre[nñ]o/i, accion: mostrarPeliculasEstreno },
    { patron: /sesi[oó]n en el programa socios/i, accion: ingresarSesionSocios },
    { patron: /promociones/i && /vigente[s]*/i, accion: mostrarPromociones },
    { patron: /hola/i, accion: saludo },
    { patron: /gracias/i, accion: despedida },
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
    almacenarRespuestaEnBaseDeDatos(userMessage);
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

function mostrarPeliculasCartelera() {
  agregarMensajeChatbot('Las películas en cartelera son: El Exorcista, 12 Horas para el find del mundo, El justiciero Capítulo Final, Sin Aire y Atentado en el Aire.');
}

function mostrarPeliculasEstreno() {
  agregarMensajeChatbot('Las películas de estreno son: Atentado en el Aire, Encerrados con el Demonio, La Naranja Mecánica, La Memoria Infinita y Los Asesinos de la Luna.');
}

function ingresarSesionSocios() {
  agregarMensajeChatbot('Por favor, ingrese los siguientes datos: DNI y contraseña.');
}

function mostrarPromociones() {
  agregarMensajeChatbot('Actualmente, contamos con las siguientes promociones: 2x1 en entraddas al cine todo el año al tener un número de celular en Entel y Promo Agora Pay: Todos los martes podrás comprar entradas a 9 soles con hasta un 55% de descuento exclusivo pagando con Agora PAY. Para más información puedes ingresar al siguiente link: https://www.cineplanet.com.pe/promociones');
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

const opciones = [
  { text: '¿Cuáles son las películas de estreno?' },
  { text: 'Ingresar sesión en el programa Socios' },
  { text: '¿Cuáles son las promociones vigentes?' },
];

function agregarMensajeConBotones(mensaje, opciones) {
  const chatbotResponseDiv = document.createElement('div');
  chatbotResponseDiv.classList.add('chat', 'bienvenida');
  chatbox.appendChild(chatbotResponseDiv);

  const icono = document.createElement('img');
  icono.src = '/res/images/Cineicon.png';
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