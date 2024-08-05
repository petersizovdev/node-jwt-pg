#!/bin/bash

# Логирование информации с цветовым выделением
echo -e "\033[32m============================================\033[0m"
echo -e "\033[32mApp is running on http://localhost:${PORT}\033[0m"
echo -e "\033[32mDatabase is running on postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}\033[0m"
echo -e "\033[32m============================================\033[0m"
