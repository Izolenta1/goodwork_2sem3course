В тестовой базе данных имеется 35 вакансий и 6 акканутов: 4 соискателя и 2 работодателя

Соискатели:
1. login: employee password: 1234567
2. login: employee2 password: 1234567
3. login: employee3 password: 1234567
4. login: employee4 password: 1234567

Работодатели:
1. login: employer password: 1234567
2. login: employer2 password: 1234567

Для запуска приложения необходимо:
1. Импортировать БД из goodwork_db.sql файла в MySQL
2. В папке /backend создать файл .env (названия нет, только .env) со следующим содержанием:
MYSQL_HOST=localhost
MYSQL_USER=(Пользователь) (default: root)
MYSQL_DATABASE=goodwork
MYSQL_PASSWORD=(Пароль от пользователя)
3. В главной папке, /frontend, /backend прописать команду "npm i"
4. В папке /frontend прописать команду "npm run build"
5. В главной папке прописать команду "npm run start"
6. Перейти по адресу "localhost:3000"