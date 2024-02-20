function logOut(){
    if(confirm("Вы уверены что хотите выйти?"))
        window.location = "/test/login.html"
}

//создание ячеек новых персонажей
var cardCounter = 0;

function addCard() {
    cardCounter++;
    var card = document.createElement("div");
    card.className = "card";
    var cardContentWrapper = document.createElement("div")
    var cardHeader = document.createElement("div");
    cardHeader.textContent = "Новый персонаж " + cardCounter;
    cardHeader.className = "card-header";
    cardContentWrapper.appendChild(cardHeader);

    var cardContent = document.createElement('div');
    cardContent.textContent = "Раса, класс, уровень";
    cardContent.className = "card-content";
    cardContentWrapper.appendChild(cardContent);

    card.appendChild(cardContentWrapper);

    var deleteButton = document.createElement("p");
    deleteButton.innerHTML = "&#10006;";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function (event) {
        event.stopPropagation();
        card.parentNode.removeChild(card);
        updateCardNumbers();
    }
    card.appendChild(deleteButton);
    
    card.addEventListener("click", function() {
        var newPage = window.open("", "_blank"); // Открываем новое окно (плейсхолдер покачто)
        var cardHtml = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Карточка</title><link rel='stylesheet' href='style.css'></head><body><h1>" + cardHeader.textContent + "</h1><p>" + cardContent.textContent + "</p></body></html>";
        newPage.document.write(cardHtml); // Записываем HTML-код карточки в новое окно
        newPage.document.close(); // Закрываем запись
    });

    document.getElementById("cardContainer").appendChild(card);
    saveCardsToLocalStorage();
}
//обновлялка порядкового номера карточки
function updateCardNumbers() {
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        var deleteButton = cards[i].querySelector("p");
        cards[i].childNodes[0].childNodes[0].textContent = "Новый персонаж " + (i + 1);
        cards[i].appendChild(deleteButton);
    }
    cardCounter = cards.length;
  }

// Функция для сохранения карточек в localStorage?
function saveCardsToLocalStorage() {
    var cardsData = [];
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        var cardHeader = cards[i].childNodes[0].childNodes[0].textContent;
        var cardContent = cards[i].childNodes[0].childNodes[0].textContent;
        cardsData.push({header: cardHeader, content: cardContent}); 
    }
    localStorage.setItem("cards",JSON.stringify(cardsData));
}
// Функция для загрузки карточек из localStorage
