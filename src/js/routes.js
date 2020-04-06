//здесь происходит выбор страничек, которые будут загружены

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
                        subCategory.innerHTML = 'подкатегории';
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

        case '':
            title.innerHTML = 'Админ - панель';
            break;

        default:
            mainContent.innerHTML = 'Страница не найдена';
    }
};
