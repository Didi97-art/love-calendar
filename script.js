<script>
const events = []; // Массив для хранения событий

function displayCalendar() {
    const currentMonth = document.getElementById('currentMonth');
    const calendarDays = document.getElementById('calendarDays'); // блок для дней
    calendarDays.innerHTML = ''; // очищаем календарь перед перерисовкой

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    currentMonth.innerHTML = date.toLocaleString('ru-RU', { month: 'long' }) + ' ' + year;

    // Добавляем пустые ячейки перед первым днем месяца
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        const emptyCell = document.createElement('div');
        emptyCell.textContent = '';
        calendarDays.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDate; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;

        const selectedDate = new Date(year, month, day);
        const today = new Date();

        if (
            selectedDate.getFullYear() === today.getFullYear() &&
            selectedDate.getMonth() === today.getMonth() &&
            selectedDate.getDate() === today.getDate()
        ) {
            dayElement.classList.add('today');
        }

        // Обработчик клика по дню (здесь можно потом добавить модальное окно)
        dayElement.onclick = () => {
            document.getElementById('eventDate').value = selectedDate.toISOString().split('T')[0];
            document.getElementById('eventForm').style.display = 'block';
        };

        calendarDays.appendChild(dayElement);
    }
}

document.getElementById('addEventButton').addEventListener('click', function () {
    document.getElementById('eventForm').style.display = 'block';
});

document.getElementById('eventForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const eventName = event.target[0].value;
    const eventDate = event.target[1].value;
    const eventTime = event.target[2].value;

    events.push({ name: eventName, date: eventDate, time: eventTime });

    window.Telegram.WebApp.sendData(JSON.stringify({ name: eventName, date: eventDate, time: eventTime }));

    updateEventsList();
    event.target.reset();
    document.getElementById('eventForm').style.display = 'none';
});

function updateEventsList() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.textContent = ${event.name} - ${event.date} ${event.time};
        eventsList.appendChild(eventItem);
    });
}

// Запускаем отрисовку
displayCalendar();
</script>