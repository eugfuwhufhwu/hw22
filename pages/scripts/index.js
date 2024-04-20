fetch('/users')
      .then(response => response.json())
      .then(data => {
        const usersList = document.getElementById('usersList');
        data.forEach(user => {
          const li = document.createElement('li');
          li.textContent = `Имя: ${user.name}, Возраст: ${user.age}, Страна: ${user.country}`;
          usersList.appendChild(li);
        });
      })
      .catch(error => console.error('Ошибка:', error));