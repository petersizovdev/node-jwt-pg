FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /nodejwt

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Копируем скрипт для логирования
COPY log_ports.sh /log_ports.sh
RUN chmod +x /log_ports.sh

# Запускаем приложение и скрипт логирования
CMD ["sh", "-c", "/log_ports.sh && node app.js"]
