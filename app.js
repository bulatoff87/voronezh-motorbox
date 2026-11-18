const requestForm = document.querySelector('#request');
const serviceField = document.querySelector('#service');
const result = document.querySelector('#form-result');
const checks = {
  name: (value) => value.trim().length >= 2 ? '' : 'Укажите имя (минимум два символа).',
  phone: (value) => {
    const normalized = value.replace(/[\s()-]/g, '');
    return /^(?:\+7|8)\d{10}$/.test(normalized)
      ? '' : 'Введите 11 цифр. Номер должен начинаться с +7 или 8.';
  },
  service: (value) => value ? '' : 'Выберите услугу.',
};

function validate(field) {
  const message = checks[field.name](field.value);
  document.getElementById(`${field.name}-error`).textContent = message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
  return !message;
}

requestForm.querySelectorAll('input, select, textarea').forEach((field) => {
  const update = () => {
    result.textContent = '';
    if (field.hasAttribute('aria-invalid')) validate(field);
  };
  field.addEventListener('input', update);
  field.addEventListener('change', update);
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    serviceField.value = link.dataset.service;
    validate(serviceField);
    result.textContent = '';
  });
});

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  result.textContent = '';
  const invalidFields = Object.keys(checks).map((name) => requestForm.elements.namedItem(name))
    .filter((field) => !validate(field));
  if (invalidFields.length) {
    invalidFields[0].focus();
    return;
  }
  result.textContent = 'Демо-заявка прошла проверку. Данные остались в браузере.';
});
