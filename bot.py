from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, ContextTypes, filters

BOT_TOKEN = '8074180837:AAFmccQgXhctIaGS0wz7rswBepqADYX74rM'  # ← замени на свой токен
WEB_APP_URL = 'https://love-calendar-553a.vercel.app/'  # ← мини-приложение

# Команда /start — показывает кнопку для открытия календаря
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("Открыть календарь", web_app=WebAppInfo(url=WEB_APP_URL))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Привет! Открой календарь:", reply_markup=reply_markup)

# Получение данных из мини-приложения (через Telegram WebApp)
async def handle_web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    data = update.message.web_app_data.data
    print("ПОЛУЧЕНО:", data)  # Отладка — посмотри в консоли
    await update.message.reply_text(f"Ты добавила событие: {data}")

# Запуск бота
if name == '__main__':
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_web_app_data))
    print("Бот запущен!")
    app.run_polling()