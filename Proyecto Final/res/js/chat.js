const chatButton = document.getElementById('chat-button');
const chatbot = document.getElementById('chatbot');
chatButton.addEventListener('click', () => {
    chatbot.classList.toggle('active');
});
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
        chatBody.style.width = "1500px";
        maximizeIcon.src = "/res/images/minimizar.png";
        isMaximized = true;
      }
    });
  });
  
  
