// PHONE CHECKER
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'правильный номер';
        phoneResult.style.color = "green";
    } else {
        phoneResult.innerHTML = 'неправильный номер';
        phoneResult.style.color = "red";
    }
};

// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParents = document.querySelector('.tab_content_items');

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.style.display = 'none';
    });
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = 'block';
    tabs[id].classList.add('tab_content_item_active');
};

hideTabContent();
showTabContent();

tabsParents.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                hideTabContent();
                showTabContent(tabIndex);
            }
        });
    }
};

let counter = 0;

setInterval(() => {
    hideTabContent();
    counter = (counter + 1) % tabs.length;
    showTabContent(counter);
}, 3000);

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight) {
        openModal();
    }
});

// CONVERTER
const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector("#eur");

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/convertur.json');
            const data = await response.json();

            if (element.id === 'som') {
                targetElement1.value = (element.value / data.usd).toFixed(2);
                targetElement2.value = (element.value / data.eur).toFixed(2);
            } else if (element.id === 'usd') {
                targetElement1.value = (element.value * data.usd).toFixed(2);
                targetElement2.value = (element.value / data.eur * data.usd).toFixed(2);
            } else if (element.id === 'eur') {
                targetElement1.value = (element.value * data.eur).toFixed(2);
                targetElement2.value = (element.value / data.usd * data.eur).toFixed(2);
            }
        } catch (error) {
            console.error("Ошибка при конвертации валют:", error);
        }
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);

// TODO CARDS WITH FETCH
const nextButton = document.querySelector('#btn-next');
const prevButton = document.querySelector('#btn-prev');
const cardBlock = document.querySelector('.card');
let cardIndex = 1;

const funcForReq = async () => {
    try {
        const response = await fetch('http://jsonplaceholder.typicode.com/todos');
        const todos = await response.json();

        if (cardIndex > 0 && cardIndex <= todos.length) {
            const todoResponse = await fetch(`http://jsonplaceholder.typicode.com/todos/${cardIndex}`);
            const todo = await todoResponse.json();
            cardBlock.innerHTML = `
                <p>${todo.title}</p>
                <p>${todo.completed}</p>
                <span>${todo.id}</span>
            `;
        } else if (cardIndex <= 0) {
            cardIndex = todos.length;
            funcForReq();
        } else if (cardIndex > todos.length) {
            cardIndex = 1;
            funcForReq();
        }
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
};

funcForReq();

nextButton.onclick = () => {
    cardIndex++;
    funcForReq();
};
prevButton.onclick = () => {
    cardIndex--;
    funcForReq();
};

// WEATHER FETCH
const searchButton = document.querySelector('#search');
const searchInput = document.querySelector('.cityName');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

const APP_ID = 'e417df62e04d3b1b111abeab19cea714';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

searchButton.onclick = async () => {
    try {
        const response = await fetch(`${BASE_URL}?appid=${APP_ID}&q=${searchInput.value}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            city.innerHTML = data.name;
            temp.innerHTML = `${data.main.temp}°C`;
        } else {
            city.innerHTML = "Город не найден";
            temp.innerHTML = "";
        }
    } catch (error) {
        console.error("Ошибка при запросе погоды:", error);
    }
};