const chatButton = document.getElementById('chat-button');
const chatbot = document.getElementById('chatbot');
chatButton.addEventListener('click', () => {
    chatbot.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
    const chatBody = document.querySelector(".offcanvas");
    const maximizeButton = document.getElementById("maximize-chat-button");
    let isMaximized = false;
    maximizeButton.addEventListener("click", function () {
      if (isMaximized) {
        chatBody.style.width = "500px";
        isMaximized = false;
      } else {
        chatBody.style.width = "1500px";
        isMaximized = true;
      }
    });
  });
  
