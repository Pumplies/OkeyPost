
const time = document.querySelector('.time__text')


function updateCurrentTime() {
    let currentTime = new Date();
    time.textContent = currentTime.toLocaleTimeString();
}
setInterval(updateCurrentTime, 1000)
updateCurrentTime

document.querySelector('.edit').addEventListener('click', () => {
    window.location.href = 'edit/edit.html'
})


document.addEventListener('DOMContentLoaded', function () {
    const mainNameElement = document.querySelector('.main__name');
    const loginElement = document.querySelector('.login');
    const emailElement = document.querySelector('.e-mail');
    const phoneNumberElement = document.querySelector('.phone__number');
    const adresElement = document.querySelector('.adres');
    const topName = document.querySelector('.top__name')
    const imgElement = document.querySelector('.ava');
    const miniAva = document.querySelector('.mini__ava')
    const savedImageSrc = localStorage.getItem('Аватарка (ссылка)');
    if (savedImageSrc) {
        miniAva.src = savedImageSrc
        imgElement.src = savedImageSrc;
    }

    const editButton = document.querySelector('.edit');

    mainNameElement.textContent = localStorage.getItem('Имя');
    topName.textContent = localStorage.getItem('Имя');
    loginElement.textContent = localStorage.getItem('Логин');
    emailElement.textContent = localStorage.getItem('E-mail');
    phoneNumberElement.textContent = localStorage.getItem('Телефон');
    adresElement.textContent = localStorage.getItem('Адрес');
});

