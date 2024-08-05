# NodeJWT Project

## Architecture: "MVC" (Model-View-Controller)

- **Models**:

  - `models/User.js`

- **Views**:

  - `public/index.html`
  - `public/login.html`
  - `public/register.html`
  - `public/profile.html`

- **Controllers**:

  - `controllers/authController.js`
  - `controllers/userController.js`

- **Routes**:

  - `routes/authRoutes.js`
  - `routes/userRoutes.js`

- **Middleware**:

  - `middleware/authMiddleware.js`

- **Database**:

  - `db/db.js`

- **Main application file**:

  - `app.js`

- **Environment variables**:
  - `.env`

```
📦 nodejwt/
│
├── 📄 app.js
│
├── 📁 public/
│   ├── 📄 index.html
│   ├── 📄 login.html
│   ├── 📄 register.html
│   └── 📄 profile.html
│
├── 📁 db/
│   └── 📄 db.js
│
├── 📁 models/
│   └── 📄 User.js
│
├── 📁 controllers/
│   ├── 📄 authController.js
│   └── 📄 userController.js
│
├── 📁 routes/
│   ├── 📄 authRoutes.js
│   └── 📄 userRoutes.js
│
├── 📁 middleware/
│   └── 📄 authMiddleware.js
│
└── 📄 .env
```

## File Descriptions

- **app.js**: Главный файл приложения, который инициализирует сервер и подключает все необходимые модули.
- **public/**: Директория для статических файлов, таких как HTML-страницы.
  - **index.html**: Главная страница.
  - **login.html**: Страница входа.
  - **register.html**: Страница регистрации.
  - **profile.html**: Страница профиля пользователя.
- **db/**: Директория для файлов, связанных с базой данных.
  - **db.js**: Файл для настройки и подключения к базе данных Postgres.
- **models/**: Директория для моделей данных.
  - **User.js**: Модель пользователя.
- **controllers/**: Директория для контроллеров.
  - **authController.js**: Контроллер для аутентификации.
  - **userController.js**: Контроллер для управления пользователями.
- **routes/**: Директория для маршрутов.
  - **authRoutes.js**: Маршруты для аутентификации.
  - **userRoutes.js**: Маршруты для управления пользователями.
- **middleware/**: Директория для middleware.
  - **authMiddleware.js**: Middleware для аутентификации с использованием JWT.
- **.env**: Файл для хранения переменных окружения, таких как строка подключения к базе данных и секретный ключ JWT.

## JWT Auth

```
      ┌── Access token (short-term)
JWT ──┤
      ├── Refresh token (long-term)
      │
      └── Session (user time-out)


```
