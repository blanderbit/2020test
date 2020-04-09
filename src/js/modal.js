let modal = document.querySelector('#modal');


class CategoryEditForm {

    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    template = `
            <div>
                <div class="modal-body">
    
                    <label for="basic-editName">Edit name</label>
                    <div class="input-group mb-3">
    
                        <input type="text" class="form-control" id="basic-name" aria-describedby="basic-addon3">
                    </div>
                    
    
                    <label for="basic-editDescription">Edit description</label>
                    <div class="input-group mb-3">
    
                        <input type="text" class="form-control" id="basic-description" aria-describedby="basic-addon3">
                    </div>
                    
                   <select id ="select-category" class="browser-default custom-select">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                
              </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="save-category" class="btn-update btn btn-success">Save</button>
                </div>
            </div>`;

    createElementFromHTML(htmlString) {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    }

    getForm(arr) {
        let randomId =  Math.floor(Math.random() * 1000);
        const form = this.createElementFromHTML(this.template);
        const selectCategory = form.querySelector('#select-category');
        const saveButton = form.querySelector('#save-category');
        const nameInput = form.querySelector('#basic-name');
        const descriptionInput = form.querySelector('#basic-description');

        if (typeof this.name !== 'undefined') {
            nameInput.value = this.name;
        }

        if (typeof this.description !== 'undefined') {
            descriptionInput.value = this.description;
        }

        if (typeof this.id === 'undefined') {
            // добавление нового элемента
            saveButton.addEventListener('click', function () {
                let modalData = {};
                let name = nameInput.value;
                let description = descriptionInput.value;

                if (name && description) {
                    modalData = {
                        id: Math.floor(Math.random() * 1000),
                        name: name,
                        description: description
                    };
                    nameInput.value = '';
                    descriptionInput.value = '';
                    arr.push(modalData);

                    renderPage('subcategories');
                    $('#modal').modal('hide');
                }
            });
        } else {
            //редактирование
            let self = this;
            saveButton.addEventListener('click', function () {
                let modalData = {};
                let name = nameInput.value;
                let description = descriptionInput.value;
                if (name && description) {
                    nameInput.value = '';
                    descriptionInput.value = '';
                    arr.map(function (element) {
                        if (element.id === self.id) {
                            element.name = name;
                            element.description = description;
                        }
                        return element;
                    });

                    renderPage('subcategories');
                    $('#modal').modal('hide');
                }
            });
        }


        return form;
    }
}

function createModal(form) {
    let modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = '';
    modalContent.append(form.getForm(subCategoryData))
}

createModal(new CategoryEditForm());
