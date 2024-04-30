



// cо страницы bloki_s_proverkami
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})




document.addEventListener('DOMContentLoaded', function () {
  var radios = document.getElementsByName('btnradio');
  var publicData = document.getElementById('publicData');
  var manualData = document.getElementById('manualData');

  radios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      if (radio.id === 'btnradio1') {
        publicData.style.display = 'block';
        manualData.style.display = 'none';
      } else if (radio.id === 'btnradio2') {
        publicData.style.display = 'none';
        manualData.style.display = 'block';
      }
    });
  });
});



// Инициализация всплывающих подсказок для всех элементов с data-bs-toggle="tooltip"
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


// кнопка неактивна до того момента когда польз не заполнинт данные
document.addEventListener('DOMContentLoaded', function () {
  var inputs = document.querySelectorAll('#myForm input');
  var button = document.querySelector('#submitButton');

  function updateButtonState() {
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        button.disabled = true;
        return;
      }
    }
    button.disabled = false;
  }

  inputs.forEach(function (input) {
    input.addEventListener('input', updateButtonState);
  });

  updateButtonState(); // Вызов функции при загрузке для инициализации состояния кнопки
});


// bloki_s_proverkami проверка на вводимость если не заполнено то кнопка не актив
document.addEventListener('DOMContentLoaded', function () {
  var inputs = document.querySelectorAll('#myForm input[type="text"]');
  var button = document.querySelector('#submitButton');

  function updateButtonState() {
    var allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    button.disabled = !allFilled;
  }

  inputs.forEach(function (input) {
    input.addEventListener('input', updateButtonState);
  });

  updateButtonState(); // Вызов функции при загрузке для инициализации состояния кнопки
});




document.addEventListener('DOMContentLoaded', function () {
  // Получаем все поля ввода и кнопку
  var inputs = document.querySelectorAll('#myForm input');
  var button = document.getElementById('submitButton');

  // Функция для обновления состояния кнопки
  function updateButtonState() {
    // Проверяем каждое поле ввода
    var allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    // Если все поля заполнены, удаляем атрибут disabled, иначе добавляем
    button.disabled = !allFilled;
  }

  // Добавляем обработчик события для каждого поля ввода
  inputs.forEach(function (input) {
    input.addEventListener('input', updateButtonState);
  });

  // Вызываем функцию при инициализации для установки начального состояния кнопки
  updateButtonState();
});



// test


