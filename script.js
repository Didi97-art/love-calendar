function sendEvent() {
  const eventText = document.getElementById("eventText").value;

  if (eventText.trim()) {
    // передаём данные обратно боту
    Telegram.WebApp.sendData(eventText);
    Telegram.WebApp.close();
  }
}

Telegram.WebApp.expand(); // Разворачивает на весь экран