// Проверка Email на правильность
document.getElementById('submit').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message');
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (gmailPattern.test(email)) {
        message.textContent = "правильный Gmail!";
        message.style.color = "green";
    } else {
        message.textContent = "неправильный Gmail, проверьте ввод.";
        message.style.color = "red";
    }
});

// Движение блока по кругу
function moveBlockInCircle(block, container, positionX = 0, positionY = 0, direction = 'right') {
    const maxRight = container.offsetWidth - block.offsetWidth;
    const maxBottom = container.offsetHeight - block.offsetHeight;

    if (direction === 'right') {
        if (positionX < maxRight) {
            positionX += 5;
        } else {
            direction = 'down';
        }
    } else if (direction === 'down') {
        if (positionY < maxBottom) {
            positionY += 5;
        } else {
            direction = 'left';
        }
    } else if (direction === 'left') {
        if (positionX > 0) {
            positionX -= 5;
        } else {
            direction = 'up';
        }
    } else if (direction === 'up') {
        if (positionY > 0) {
            positionY -= 5;
        } else {
            direction = 'right';
        }
    }

    block.style.left = `${positionX}px`;
    block.style.top = `${positionY}px`;

    setTimeout(() => moveBlockInCircle(block, container, positionX, positionY, direction), 20);
}

document.addEventListener('DOMContentLoaded', () => {
    const smallBlock = document.getElementById('smallBlock');
    const container = document.getElementById('container');
    moveBlockInCircle(smallBlock, container);
});

// Таймер
const secondsBlock = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

let seconds = 0;
let interval = null;

startBtn.onclick = () => {
    if (!interval) {
        interval = setInterval(() => {
            seconds++;
            secondsBlock.innerHTML = seconds;
        }, 1000);
    }
};

stopBtn.onclick = () => {
    clearInterval(interval);
};

resetBtn.onclick = () => {
    seconds = 0;
    secondsBlock.innerHTML = seconds;
    clearInterval(interval);
    interval = null;
};

// Генерация карточек с использованием fetch
const charactersList = document.querySelector('.characters-list');

const generateCharactersCards = async () => {
    try {
        const response = await fetch('../data/character.json');
        if (!response.ok) throw new Error('Ошибка при загрузке данных персонажей');

        const data = await response.json();
        data.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');

            characterCard.innerHTML = `
                <img style="height: 300px" src="${character.photo}" alt="">
                <h2>${character.name}</h2>
                <h3>age: ${character.age}</h3>
            `;

            charactersList.append(characterCard);
        });
    } catch (error) {
        console.error('Ошибка при запросе персонажей:', error);
    }
};

generateCharactersCards();

// Отправка данных с использованием fetch
const sendData = async (data) => {
    try {
        const response = await fetch('../data/character.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Ошибка при отправке данных');

        const responseData = await response.json();
        console.log('Ответ от сервера:', responseData);
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
    }
};

// Пример вызова функции sendData
sendData({
    name: 'New Character',
    age: 25,
    photo: 'https://example.com/photo.jpg'
});