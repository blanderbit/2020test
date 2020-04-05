// main.js это основная логика админки
// по клику

const mainContent = document.querySelector('#main-content');
const title = document.querySelector('#title');

document.querySelectorAll('#main-nav a').forEach(function (element) {
    element.addEventListener('click', function (e) {
        console.log(element);
        renderPage(this.hash.substr(1), element);
    });
});

const tableView = new TableView([], mainContent);


