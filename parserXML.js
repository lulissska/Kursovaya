// Функция для загрузки XML из файла
function loadXMLFile(file, callback) {
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        // For IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this);
        }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
}

// Функция для парсинга XML и создания HTML
function parseXML(xml) {
    var xmlDoc = xml.responseXML;

    // Получение данных из XML
    var moonTitle = xmlDoc.querySelector("moon-container-title").textContent;
    var moonText = xmlDoc.querySelector("moon").textContent;
    var buttonLink = xmlDoc.querySelector("link").getAttribute("href");
    var buttonText = xmlDoc.querySelector("link").textContent;

    // Поиск существующего элемента moon-container
    var existingContainer = document.querySelector(".moon-container");

    if (existingContainer) {
        // Создание HTML элементов
        var container = document.createElement("div");
        container.classList.add("moon-container");

        var title = document.createElement("h2");
        title.classList.add("moon-container-title");
        title.textContent = moonTitle;

        var text = document.createElement("p");
        text.classList.add("moon");
        text.textContent = moonText;

        var button = document.createElement("a");
        button.setAttribute("href", buttonLink);
        var buttonElement = document.createElement("button");
        buttonElement.textContent = buttonText;
        button.appendChild(buttonElement);

        // Добавление элементов в контейнер
        container.appendChild(title);
        container.appendChild(text);
        container.appendChild(button);

        // Добавление контейнера в существующий moon-container
        existingContainer.appendChild(container);

        console.log("Данные успешно добавлены в существующий .moon-container.");
    } else {
        console.error("Не удалось найти существующий .moon-container.");
    }
}

// Загрузка XML из файла и парсинг
loadXMLFile("data.xml", parseXML);
