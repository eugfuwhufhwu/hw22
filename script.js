// server.js

const express = require('express');
const path = require('path');
const fs = require('fs');

const names = ['Андрей', 'Артём', 'Алексей', 'Иван', 'Мария', 'Елена'];
const countries = ['Россия', 'США', 'Китай', 'Германия', 'Франция'];

const app = express();
const port = 3000;

const generateRandomData = () =>{
  return Array.from({ length: 10 }, () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const age = Math.floor(Math.random() * 85) + 1;
    const country = countries[Math.floor(Math.random() * countries.length)];
    return { name, age, country };
  });
}

const writeJsonFile = () =>{
  const users = generateRandomData();
  tryfs.writeFile('users.json', JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Данные успешно записаны в файл users.json');
    }
  });
}

writeJsonFile();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/users', (req, res) => {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка чтения файла');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.use((req, res) => {
  res.status(404).send("Извините, запрашиваемая страница не найдена");
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
