# Конструктор брифа 

Микросервис для быстрого создания одностраничного брифа стартапами и предпринимателями для АО «Технопарк Санкт-Петербурга».

---

## Содержание
- [Цель проекта](#-цель-проекта)
- [Стек технологий](#-стек-технологий)
- [Структура проекта](#-структура-проекта)
- [Локальный запуск](#-локальный-запуск)
- [Сборка и деплой](#-сборка-и-деплой)
- [Пользовательские сценарии](#-пользовательские-сценарии)

---

## Цель проекта
Создание веб-микросервиса для автоматизации первичной диагностики и сбора заявок от стартапов. Сервис позволяет пользователю заполнить форму (8-10 полей) и получить готовый структурированный *one-pager* с возможностью выгрузки в PDF и сохранения по уникальной публичной ссылке.

---

## Стек технологий
- **Фронтенд:** React, HTML5, CSS3, JavaScript
- **Бэкенд:** Python, FastAPI
- **База данных:** SQLite / PostgreSQL 
- **Макет и прототипирование:** Figma

---

## Структура проекта
├── backend/          # Серверная часть (API, работа с БД)
└── frontend/         # Клиентская часть (React-приложение)

---

## Локальный запуск

### 1. Запуск бэкенда
Перейдите в директорию `backend`, установите зависимости и запустите сервер:
``bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Сервер будет доступен по адресу: http://127.0.0.1:8000

2. Запуск фронтенда
Перейдите в директорию frontend, установите пакеты и запустите среду разработки:

Bash
cd frontend
npm install
npm run dev


Приложение откроется в браузере по адресу: http://localhost:5173/

##  Тестовые данные (10 примеров заполненных брифов)

Для демонстрации корректной работы интерфейса, валидации полей и интеграции с порталом spbtech.ru были подготовлены 10 демонстрационных бриф-паспортов стартап-проектов.

Вы можете проверить их отображение по прямым ссылкам на демо-стенде:

1. 📄 [Бриф-паспорт #1 (ЛогВизор)](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app/api/briefs/cf54418b)
2. 📄 [Бриф-паспорт #2](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app/api/briefs/cf91f0f2)
3. 📄 [Бриф-паспорт #3](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app/api/briefs/6e05d6ca)
4. 📄 [Бриф-паспорт #4](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app/api/briefs/238768d5)
5. 📄 [Бриф-паспорт #5](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app/api/briefs/6e366b53)
6. 📄 [Бриф-паспорт #6](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app/api/briefs/4e003e2f)
7. 📄 [Бриф-паспорт #7](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app/api/briefs/25d2a8f0)
8. 📄 [Бриф-паспорт #8](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app/api/briefs/93884465)
9. 📄 [Бриф-паспорт #9](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app/api/briefs/74140b69)
10. 📄 [Бриф-паспорт #10](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app/api/briefs/388fe22a)

## [Запустить демо-версию в браузере](https://brief-udsd-lrqj00169-iwiwiwiwiiis-projects.vercel.app)

## [Ссылка на  макет Figma](https://www.figma.com/design/J2BvLsQmIFVggIx4QpgpYD/Untitled?node-id=0-1&p=f&t=ng9Bb7sOFg0ESOaa-0)

Серверная часть: запускается на удаленном сервере через Process Manager 
Разработано в рамках производственной практики. Исполнитель: Крашенинникова Л.Д.