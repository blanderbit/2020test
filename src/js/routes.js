//здесь происходит выбор страничек, которые будут загружены

const renderPage = function (page, id) {
    mainContent.innerHTML = '';

    let token = localStorage.getItem('token');
    if(!token){
        page = 'login';
    }
    switch (page) {
        case 'categories':
            title.innerHTML = 'Категории';
            fetchData('categories')
                .then(function (data) {
                    tableView.arr = data.map(function (category) {
                        let subActions = [];
                        let showSub = document.createElement('a');
                        showSub.innerHTML = 'подкатегории';
                        showSub.href = '#subcategories';
                        showSub.addEventListener('click', function () {
                            renderPage(this.hash.substr(1), category.id);
                        });
                        let addSub = document.createElement('a');
                        addSub.innerHTML = ' добавить';
                        addSub.href = '#add-subcategories';
                        addSub.addEventListener('click', function () {
                           alert('hkj')
                        });

                        if (category['subcategories'].length) {
                            subActions.push(showSub);
                        }
                        subActions.push(addSub);
                        category['subcategories'] = subActions;
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
        case 'login':
            title.innerHTML = 'Введите пароль';
            break;

        default:
            mainContent.innerHTML = 'Страница не найдена';
    }
};
