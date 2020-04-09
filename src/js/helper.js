let TableView = function (arr, wrapper) {

    const obj = {};
    obj.arr = arr;
    obj.wrapper = wrapper;

    obj.table = function (arr) {
        let columns = this.getColumns(arr);
        let table = document.createElement('table');
        table.classList.add('table', 'table-bordered');
        let self = this;
        arr.forEach((item) => {
            self.createTr(item, columns, table);
        });

        this.createHr(columns, table);
        this.wrapper.append(table);
    };

    obj.createTr = function (item, columns, table) {
        let tr = document.createElement('tr');
        table.append(tr);
        let self = this;
        columns.forEach((key) => {
            if (item.hasOwnProperty(key)) {
                self.createTd(tr, item[key])
            } else {
                self.createTd(tr, '');
            }
        });
    };

    obj.createTd = function (tr, content) {
        let td = document.createElement('td');
        tr.append(td);


        if (Array.isArray(content)) {
            content.forEach((item) => {
                if (this.isElement(item)) {
                    td.append(item);
                }
            });
        } else {
            if (this.isElement(content)) {
                td.append(content);
            } else {
                td.innerHTML = content;
            }
        }

    };

    obj.createHr = function (columns, table) {
        let tr = document.createElement('tr');
        columns.forEach((item) => {
            let th = document.createElement('th');
            th.innerHTML = item;
            tr.append(th);
        });
        table.prepend(tr);
    };

    obj.render = function () {
        this.table(this.arr);
    };

    obj.getColumns = function (arr) {
        let columns = [];
        arr.forEach((item) => {
            if (typeof item === 'object') {
                for (let key in item) {
                    if (!columns.includes(key)) {
                        columns.push(key);
                    }
                }
            }
        });

        return columns;
    };

    //Returns true if it is a DOM element
    obj.isElement = function (o) {
        return (
            //проверка является ли объект DOM элементом
            typeof HTMLElement === "object" ? o instanceof HTMLElement :
                o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
    };

    return obj;
};


const fetchData = function (url) {
    if (!IS_API_WORKING) {
         if (url === 'categories') {
            return Promise.resolve(categoryData);
        }
        if (url.indexOf('subcategories') !== -1) {
            return Promise.resolve(subCategoryData);
        } else {
            mainContent.innerHTML = 'Страница не найдена';
        }

}
return fetch(API_URL + url)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        if (response.success) {
            return response.data;
        }

        return [];
    });
};
