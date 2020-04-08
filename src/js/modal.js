let modalAddButton = document.querySelector('.btn-save');
console.log(modalAddButton);
let modalInputName = document.querySelector('#basic-name');
console.log(modalInputName);
let modalInputDescr = document.querySelector('#basic-description');


function creatModal(arr) {
    modalAddButton.addEventListener('click', function () {
        let modalData = {};
        let name = modalInputName.value;
        let description = modalInputDescr.value;
        console.log(name, description);

        if (name && description) {
            modalData = {
                id: 100,
                name: name,
                description: description
            };

            modalInputName.value = '';
            modalInputDescr.value = '';
            arr.push(modalData);



            renderPage('subcategories');
            //modalData = {};
        }

        //console.log(tableView);
    });
}

creatModal(subCategoryData);
