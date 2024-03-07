# Инструкция по установке

- Установите зависимости

```js
npm install
```

- Создайте тестовую базу данных PostgreSQL 

- В файле .env в корне проекта замените значения на свои

```js
DB_USER=имя_пользователя_PostgreSQL
DB_PASSWORD=пароль_PostgreSQL
DB_HOST=localhost(опционально)
DB_PORT=порт_PostgreSQL
DB_NAME=имя_бд_PostgreSQL
```

- Запустите проект командой

```js
node index.js
```

# API

```js
/api/all (Все данные из бд соединённые между собой)
```

```js
/api/cars/info (Получение информации о машинах и их владельцах)
/api/cars/all (Получение всех машин)
```

```js
/api/owner/all (Получение всех владельцев)
```

```js
/api/ownership/all (Получение таблицы связей машин и владельцев)
```
