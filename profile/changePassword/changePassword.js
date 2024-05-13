document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.querySelector('.save');

    saveButton.addEventListener('click', function() {
        const inputs = document.querySelectorAll('.text__inp input');
        const oldPassword = inputs[0].value;
        const newPassword = inputs[1].value;
        const newPasswordRepeat = inputs[2].value;

        // Проверка на совпадение нового пароля и его повтора
        if (newPassword !== newPasswordRepeat) {
            alert('Новый пароль и его повтор не совпадают');
            return;
        }

        // Обновление пароля в Local Storage
        localStorage.setItem('password', newPassword);

        // Перенаправление на другую страницу после успешного обновления
        window.location.href = '../profile.html';
    });

    const savedInputs = document.querySelectorAll('.text__inp input');
    savedInputs.forEach(function(input) {
        const value = localStorage.getItem(input.previousElementSibling.textContent.slice(0, -1));
        if (value) {
            input.value = value;
        }
    });

    const imgElement = document.querySelector('.ava');
    const miniAva = document.querySelector('.mini__ava')
    const savedImageSrc = localStorage.getItem('Аватарка (ссылка)');
    if (savedImageSrc) {
        miniAva.src = savedImageSrc
        imgElement.src = savedImageSrc;
    }
    const topName = document.querySelector('.top__name')
    topName.textContent = localStorage.getItem('Имя');
});
