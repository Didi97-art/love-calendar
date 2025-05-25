const events = []; // Массив для хранения событий

function displayCalendar() {
    const currentMonth = document.getElementById('currentMonth');
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    currentMonth.innerHTML = `${date.toLocaleString('ru-RU', { month: 'long' })} ${year}`;

    // Здесь можно добавить логику для отображения дней месяца
}

document.getElementById('addEventButton').addEventListener('click', function() {
    document.getElementById('eventForm').style.display = 'block'; // Показываем форму
});

document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    const eventName = event.target[0].value; // Получаем название события
    const eventDate = event.target[1].value; // Получаем дату события
    const eventTime = event.target[2].value; // Получаем время события

    // Сохраняем событие в массив
    events.push({ name: eventName, date: eventDate, time: eventTime });

    // Отправка данных в Telegram
    window.Telegram.WebApp.sendData(JSON.stringify({ name: eventName, date: eventDate, time: eventTime }));

    // Обновляем список событий
    updateEventsList();

    document.getElementById('eventForm').reset(); // Сбрасываем форму
    document.getElementById('eventForm').style.display = 'none'; // Скрываем форму
});

function updateEventsList() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = ''; // Очищаем список
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.textContent = `${event.name} - ${event.date} ${event.time}`;
        eventsList.appendChild(eventItem);
    });
}

// Инициализация
displayCalendar();
