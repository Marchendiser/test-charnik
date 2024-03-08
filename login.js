document.getElementById("main-form").addEventListener("submit", checkForm);

function checkForm(event) {
    event.preventDefault();
    var el = document.getElementById("main-form");

    var login = el.login.value;
    var pass = el.pass.value;

    var fail = "";

    if(login == "" || pass == "")
        fail = "Укажите Логин и Пароль";
    else if(login.length <= 1 || login.length > 50)
        fail = "Введите корректное имя";
    else if(login != "admin" || pass != "admin")
        fail = "Неверный Логин или Пароль"

    if(fail != "") {
        document.getElementById('error').innerHTML = fail;

    } else {
        alert("Все данные корректно заполнены")
        window.location = "main.html";
    }
}