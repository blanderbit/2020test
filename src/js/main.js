const mainContent = document.querySelector('#main-content');
const title = document.querySelector('#title');

document.querySelectorAll('#main-nav a').forEach(function (element) {
    element.addEventListener('click', function (e) {
        console.log(element);
        renderPage(this.hash.substr(1), element);
    });
});

const tableView = new TableView([], mainContent);

const renderPage = function (page, id) {
    mainContent.innerHTML = '';
    switch (page) {
        case 'categories':
            title.innerHTML = 'Категории';
            fetchData('categories')
                .then(function (data) {
                    tableView.arr = data.map(function (category) {
                        console.log(category);
                        let subCategory = document.createElement('a');
                        subCategory.innerHTML = 'add';
                        subCategory.href = '#subcategories';
                        subCategory.addEventListener('click', function () {
                            renderPage(this.hash.substr(1), category.id);
                        });
                        if (category['subcategories'].length) {
                            category['subcategories'] = subCategory;
                        }

                        return category;
                    });
                    tableView.render();
                });

            break;
        case 'subcategories':
            title.innerHTML = 'Подкатегории';
            fetchData('subcategories/category/' + id)
                .then(function (data) {
                    //перебор по элементам и запись нового значения
                    tableView.arr = data.map(function (category) {
                        delete category['category'];
                        return category;
                    });
                    tableView.render();
                });
            break;
        case 'posts':
            title.innerHTML = 'Посты';
            fetchData('posts')
                .then(function (data) {
                    tableView.arr = data.data;
                    tableView.render();
                });
            break;

        default:
            mainContent.innerHTML = 'Страница не найдена';
    }
};
