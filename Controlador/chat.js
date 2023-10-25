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
    { patron: /pel[iíì]culas* de estre[nñ]o/i, accion: mostrarPeliculasEstreno },
    { patron: /sesi[oó]n en el programa socios/i, accion: ingresarSesionSocios },
    { patron: /promociones vigente[s]*/i, accion: mostrarPromociones },
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
    url: "/proyectos/chatbot/Controlador/chatbot.php",
    data: { text: respuesta },
    success: function (response) {
      console.log("Respuesta almacenada en la base de datos.");
    },
    error: function () {
      console.log("Error al almacenar la respuesta en la base de datos.");
    }
  });
}

function mostrarPeliculasEstreno() {
  agregarMensajeChatbot('Las películas de estreno esta semana son: película 1, película 2, película 3.');
}

function ingresarSesionSocios() {
  agregarMensajeChatbot('Por favor, ingrese los siguientes datos: DNI y contraseña.');
}

function mostrarPromociones() {
  agregarMensajeChatbot('Actualmente, tenemos una promoción de descuento del 20% en boletos para estudiantes.');
}

function hacerAlgoPorDefecto() {
  agregarMensajeChatbot('Lo siento, no puedo ayudarte con este inconveniente. Favor comunícate con el administrador en el siguiente enlace: <a href="https://www.configuroweb.com/contacto/">Contacto</a>');
}

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
}

const opciones = [
  { text: '¿Cuáles son las películas de estreno?' },
  { text: 'Ingresar sesión en el programa Socios' },
  { text: '¿Cuáles son las promociones vigentes?' },
];

agregarMensajeConBotones('Buenas tardes, le saluda el asistente virtual de Cineplanet, ¿en qué puedo ayudarle?', opciones);

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