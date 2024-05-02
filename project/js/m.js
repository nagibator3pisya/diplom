// это косаемо спрятать кнопки и тд
// Устанавливаем обработчики через JavaScript, а не через атрибуты HTML
document.getElementById('addCategoryBtn').addEventListener('click', addCategoryField);

function addCategoryField() {
    document.querySelector('.btn-light-tab2').style.display = 'none';
    document.querySelector('.btn-otmena-tab2').style.display = 'none';
    document.querySelector('.btn-sybmit-tab2').style.display = 'none';

    var inputHtml = `
    <div class="row">
        <div class="input-group mb-3 gap-2  ">
            <div class='col-md-7'>
                    <input type="text" class="form-control form-cont rounded " id='inputField' placeholder="Название категории" aria-label="Название категории">
            </div>
            <div class='col-md-4'>
                    <button class="btn btn-otmena-js" type="button" onclick="cancelCategory()">Отмена</button>
                    <button class="btn btn-dobavit-js" type="button" id="button-addon2" onclick="saveCategory()">Добавить</button>
            </div>    
        </div>
    </div>
`;
    // Скрываем кнопки и создаем поле ввода...
    document.getElementById('categoryFieldContainer').innerHTML = inputHtml;
    document.getElementById('addCategoryBtn').style.display = 'none';
}
function saveCategory() {
    var categoryName = document.querySelector('#categoryFieldContainer .form-control').value.trim();
    if (categoryName) {
        addCategory(categoryName);
    }
}
document.getElementById('addCategoryBtn').addEventListener('click', addCategoryField);

function addCategory(categoryName) {
    var categoryName = document.querySelector('#categoryFieldContainer .form-control').value.trim();
    if (categoryName) {
        var categoryDisplayHtml = `
        <div class="category-name d-flex align-items-center ">
            <h2>${categoryName}</h2>
            <i class="bi bi-pencil-fill" onclick="editCategory(this)"></i>
            <i class="bi bi-trash-fill" onclick="deleteCategory(this)"></i>
           
            <button type="button" class="btn btn-save me-2 ms-4" style="display:none" onclick="saveEditedCategory(this)">Сохранить</button>

            <button type="button" class="btn btn-cancel" style="display:none" onclick="cancelEdit(this)">Отмена</button>

         
        </div>
            
                <div class="add-subtask-container" onclick="toggleDropdown(event)" style="border: 2px dashed #ccc; height: 118px;">
                    <div id="subcategoryDropdown" style="display: none;">
                        <select class="form-select" aria-label="Выберите тип подзадачи">
                            <option selected>Выберите из списка</option>
                            <option value="1">Один вариант ответа</option>
                            <option value="2">Несколько вариантов ответа</option>
                            <option value="3">Текстовое поле</option>
                            <option value="4">Фото</option>
                            <option value="5">Фото с примером</option>
                            <option value="6">Прикрепление файла</option>
                        </select>
                        <button class="btn btn-success">Сохранить</button>
                         <button class="btn btn-danger" onclick="event.stopPropagation(); closeDropdown();">Отмена</button>

                    </div>
                    <span class="add-subtask-label">+ Добавить подзадачу</span>
                </div>
           

    
    
    
    
    
    
    
    
    

        
        <div id="subcategoryContainer"></div>
        <button type="button" id="newCategoryBtn" onclick="addCategoryField()">Добавить категорию</button>
    `;
        document.getElementById('contentDisplay').innerHTML = categoryDisplayHtml;
        clearCategoryField();
        document.querySelector('.btn-category').style.display = 'none';
    }
}

function editCategory(element) {
    var categoryItem = element.closest('.category-name');
    if (!categoryItem) {
        console.error('Category item not found.');
        return; // Выходим из функции, если элемент категории не найден
    }

    var currentNameElement = categoryItem.querySelector('h2');
    if (!currentNameElement) {
        console.error('Element h2 not found within the category item.');
        return; // Выходим из функции, если h2 не найден
    }

    // Получаем текущее название из текста элемента h2
    var currentName = currentNameElement.textContent;

    // Сохраняем исходное название в data-атрибуте элемента categoryItem
    categoryItem.dataset.originalName = currentName;

    // Создаем новый input элемент для редактирования названия
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control edit-input';
    input.value = currentName;

    // Заменяем элемент h2 на новый input
    currentNameElement.replaceWith(input);
    input.focus();

    // Скрываем иконки редактирования и удаления
    categoryItem.querySelector('.bi-pencil-fill').style.display = 'none';
    categoryItem.querySelector('.bi-trash-fill').style.display = 'none';

    // Показываем кнопки "Сохранить" и "Отмена"
    var btnSave = categoryItem.querySelector('.btn-save');
    var btnCancel = categoryItem.querySelector('.btn-cancel');
    if (btnSave && btnCancel) {
        btnSave.style.display = 'inline-block';
        btnCancel.style.display = 'inline-block';
    }

    // Скрываем кнопки "Предпросмотр", "Отмена" и "Сохранить" в верхней панели
    var controlButtons = document.querySelectorAll('.btn-light-tab2, .btn-otmena-tab2, .btn-sybmit-tab2');
    controlButtons.forEach(button => {
        button.style.display = 'none';
    });
}

function saveEditedCategory(element) {
    var categoryItem = element.closest('.category-name');
    var editInput = categoryItem.querySelector('.edit-input');
    var newName = editInput.value.trim();

    if (newName === '') {
        alert('Название категории не может быть пустым.');
        editInput.focus();
        return;
    }

    var h2 = document.createElement('h2');
    h2.innerText = newName;

    var editIcon = createIcon('bi-pencil-fill', editCategory);
    var deleteIcon = createIcon('bi-trash-fill', deleteCategory);

    h2.appendChild(editIcon);
    h2.appendChild(deleteIcon);

    categoryItem.replaceChild(h2, editInput);

    categoryItem.querySelector('.btn-save').style.display = 'none';
    categoryItem.querySelector('.btn-cancel').style.display = 'none';

    editIcon.style.display = 'inline-block';
    deleteIcon.style.display = 'inline-block';

    // Сохраняем новое имя в data-атрибут для использования в cancelEdit
    categoryItem.dataset.originalName = newName;

    editIcon.addEventListener('click', function () {
        editCategory(editIcon);
    });
    deleteIcon.addEventListener('click', function () {
        deleteCategory(deleteIcon);
    });

    // Обновляем видимость кнопок
    toggleButtons(true);
}



function cancelEdit(element) {
    var categoryItem = element.closest('.category-name');
    var editInput = categoryItem.querySelector('.edit-input');

    // Возвращаем оригинальное имя из data-атрибута
    var originalName = categoryItem.dataset.originalName;
    if (typeof originalName === 'undefined') {
        console.error('Original name is undefined.');
        return;
    }

    var h2 = document.createElement('h2');
    h2.innerText = originalName;

    var editIcon = createIcon('bi-pencil-fill', () => editCategory(editIcon));
    var deleteIcon = createIcon('bi-trash-fill', () => deleteCategory(deleteIcon));

    h2.appendChild(editIcon);
    h2.appendChild(deleteIcon);

    categoryItem.replaceChild(h2, editInput);

    h2.querySelector('.bi-pencil-fill').style.display = 'inline-block';
    h2.querySelector('.bi-trash-fill').style.display = 'inline-block';

    categoryItem.querySelector('.btn-save').style.display = 'none';
    categoryItem.querySelector('.btn-cancel').style.display = 'none';

    toggleButtons(true);
}
// Функция для переключения отображения кнопок
function toggleButtons(show) {
    var buttons = document.querySelectorAll('.btn-light-tab2, .btn-otmena-tab2, .btn-sybmit-tab2');
    buttons.forEach(button => {
        button.style.display = show ? 'inline-block' : 'none';
    });
}


// Вспомогательная функция для создания иконки
function createIcon(className, eventHandler) {
    var i = document.createElement('i');
    i.className = `bi ${className} your-custom-class-for-size`; // Добавьте все необходимые классы здесь
    i.addEventListener('click', function (event) {
        eventHandler(event.target.closest('i'));
    });
    return i;
}

function cancelChanges(h2Element, oldName) {
    // Возвращаем старое название
    h2Element.innerHTML = oldName + ' <i class="bi bi-pencil-fill"></i> <i class="bi bi-trash-fill"></i>';

    // Показываем иконки редактирования и удаления
    var editIcon = h2Element.querySelector('.bi-pencil-fill');
    var deleteIcon = h2Element.querySelector('.bi-trash-fill');
    editIcon.style.display = 'inline-block';
    deleteIcon.style.display = 'inline-block';

    // Скрываем кнопки "Сохранить" и "Отмена"
    var saveButton = document.querySelector('.btn-save');
    var cancelButton = document.querySelector('.btn-cancel');
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
}

// Вешаем обработчики на иконки карандаша и мусорки
document.querySelectorAll('.bi-pencil-fill').forEach(function (pencilIcon) {
    pencilIcon.addEventListener('click', function () {
        editCategory(this);
    });
});
document.querySelectorAll('.bi-trash-fill').forEach(function (trashIcon) {
    trashIcon.addEventListener('click', function () {
        deleteCategory(this.closest('h2'));
    });
});

function finishEditing(input) {
    var newName = input.value.trim();
    if (newName === '') {
        // Если новое название пустое, удаляем элемент ввода и возвращаем прежний заголовок
        alert('Название категории не может быть пустым.');
        input.focus();
    } else {
        // Заменяем поле ввода обратно на заголовок с новым названием категории
        var newTitle = document.createElement('h2');
        newTitle.innerText = newName;
        input.replaceWith(newTitle);

        // Показываем кнопки
        toggleButtons(true);
    }
}

function toggleButtons(show) {
    var buttons = document.querySelectorAll('.btn-light-tab2, .btn-otmena-tab2, .btn-sybmit-tab2');
    buttons.forEach(button => {
        button.style.display = show ? 'inline-block' : 'none';
    });
}


function deleteCategory(element) {
    // Показываем модальное окно с помощью чистого JavaScript
    var modal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    modal.show();

    // Устанавливаем обработчик события нажатия на кнопку подтверждения удаления
    document.getElementById('deleteConfirmButton').onclick = function () {
        confirmDelete(element);
        modal.hide(); // Скрываем модальное окно после подтверждения удаления
    };
}


function confirmDelete(element) {
    // Находим ближайший родительский элемент с классом .category-name
    var categoryItem = element.closest('.category-name');
    if (!categoryItem) {
        console.error('Category item not found.');
        return; // Если элемент не найден, выходим из функции
    }

    // Удаляем элемент категории из DOM
    categoryItem.remove();

    // Скрываем модальное окно с подтверждением удаления
    var modal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
    if (modal) {
        modal.hide();
    } else {
        console.error('Modal instance not found.');
        return; // Если экземпляр модального окна не найден, выходим из функции
    }

    // Перенаправляем пользователя на указанную страницу
    window.location.href = '/project/general_web/if_chablon_zadah.html';
}


// Пример использования этих функций (должно быть частью ваших обработчиков событий):
document.querySelectorAll('.category-name .bi-pencil-fill').forEach(pencilIcon => {
    pencilIcon.addEventListener('click', () => editCategory(pencilIcon));
});

document.querySelectorAll('.category-name .bi-trash-fill').forEach(trashIcon => {
    trashIcon.addEventListener('click', () => deleteCategory(trashIcon));
});

function toggleButtons(show) {
    var displayStyle = show ? 'block' : 'none';
    document.querySelector('.btn-light-tab2').style.display = displayStyle;
    document.querySelector('.btn-otmena-tab2').style.display = displayStyle;
    document.querySelector('.btn-sybmit-tab2').style.display = displayStyle;
}



function cancelCategory() {
    clearCategoryField();
    document.getElementById('addCategoryBtn').style.display = 'flex';
}


function clearCategoryField() {
    document.getElementById('categoryFieldContainer').innerHTML = '';
    resetCategoryForm();
}

function resetCategoryForm() {
    // Получаем контейнер кнопок
    var buttonsContainer = document.querySelector('.col-xxl-6');

    // Применяем классы Bootstrap для flex-контейнера, чтобы выровнять элементы в строку и к верхнему краю
    buttonsContainer.classList.add('d-flex', 'align-items-start', 'gap-2');

    // Устанавливаем стили отображения для кнопок
    var previewButton = document.querySelector('.btn-light-tab2');
    var cancelButton = document.querySelector('.btn-otmena-tab2');
    var submitButton = document.querySelector('.btn-sybmit-tab2');

    if (previewButton) previewButton.style.display = 'block';
    if (cancelButton) cancelButton.style.display = 'block';
    if (submitButton) submitButton.style.display = 'block';

    // Показываем кнопку добавления категории, если она была скрыта
    var addCategoryBtn = document.getElementById('addCategoryBtn');
    if (addCategoryBtn) addCategoryBtn.style.display = 'block';
}
// это косаемо спрятать кнопки и тд

function toggleDropdown(event) {
    event.stopPropagation();
    var dropdown = document.getElementById('subcategoryDropdown');
    var label = document.querySelector('.add-subtask-label');
    var container = document.querySelector('.add-subtask-container');
    var isVisible = dropdown.style.display === 'block';
    dropdown.style.display = isVisible ? 'none' : 'block';
    label.textContent = isVisible ? '- Скрыть подзадачу' : '+ Добавить подзадачу';

    function closeDropdown() {
        dropdown.style.display = 'none';
        label.textContent = '+ Добавить подзадачу';
    }
    // Измененный обработчик для контейнера
    container.addEventListener('click', function(event) {
        if (event.target === this || event.target === label) {
            toggleDropdown(event);
        }
    });

    dropdown.addEventListener('click', function (event) {
        // Останавливаем всплытие событий кликов внутри выпадающего списка
        event.stopPropagation();
    });

    document.addEventListener('click', function (event) {
        // Закрытие выпадающего списка, если клик был вне контейнера
        if (!container.contains(event.target) && dropdown.style.display === 'block') {
            closeDropdown();
        }
    });
}














// 









document.addEventListener('DOMContentLoaded', function () {
    let tabBtn1 = document.getElementById('tab-btn-1');
    let tabBtn2 = document.getElementById('tab-btn-2');
    let content1 = document.getElementById('content-1');
    let content2 = document.getElementById('content-2');

    tabBtn1.addEventListener('change', function () {
        if (tabBtn1.checked) {
            content1.style.display = 'block';
            content2.style.display = 'none';
        }
    });

    tabBtn2.addEventListener('change', function () {
        if (tabBtn2.checked) {
            content1.style.display = 'none';
            content2.style.display = 'block';
        }
    });
});

tinymce.init({
    selector: 'textarea#premiumskinsandicons-outside',
    skin: 'outside',
    icons: 'small',
    plugins: 'lists code table codesample link image',
    toolbar: 'undo redo | styles | bold italic underline forecolor backcolor | link image code | align | bullist numlist',
    menubar: false,
    statusbar: false
});