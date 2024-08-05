#!/bin/bash

# Получаем IP-адрес контейнера
CONTAINER_IP=$(hostname -i)

# Выводим информацию о хосте и портах
echo -e "\033[32m============================================\033[0m"
echo -e "\033[32mApp container running on $CONTAINER_IP:3000\033[0m"
echo -e "\033[32mDB container running on: $CONTAINER_IP:5432\033[0m"
echo -e "\033[32m============================================\033[0m"

# Запускаем основное приложение
exec "$@"
