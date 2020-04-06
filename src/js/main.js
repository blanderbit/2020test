// main.js это основная логика админки

const mainContent = document.querySelector('#main-content');
const title = document.querySelector('#title');

document.querySelectorAll('#main-nav a').forEach(function (element) {
    // по клику на элементы меню будет меняться страничка
    element.addEventListener('click', function (e) {
        document.querySelectorAll('#main-nav a').forEach(function (el) {
            el.classList.remove('active');
        });
        element.classList.add('active');
        renderPage(this.hash.substr(1), element);
    });
});

const tableView = new TableView([], mainContent);
renderPage(window.location.hash.substr(1));


