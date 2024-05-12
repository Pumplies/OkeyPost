const time = document.querySelector('.time__text')


function updateCurrentTime() {
    let currentTime = new Date();
    time.textContent = currentTime.toLocaleTimeString();
}
setInterval(updateCurrentTime, 1000)
updateCurrentTime

document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.querySelector('.save');

    saveButton.addEventListener('click', function() {
        const inputs = document.querySelectorAll('.text__inp input');
        inputs.forEach(function(input) {
            localStorage.setItem(input.previousElementSibling.textContent.slice(0, -1), input.value.replace(/\s/g, ''));
        });

        window.location.href = '../profile.html'
    });

    
    const savedInputs = document.querySelectorAll('.text__inp input');
    savedInputs.forEach(function(input) {
        const value = localStorage.getItem(input.previousElementSibling.textContent.slice(0, -1));
        if (value) {
            input.value = value;
        }
    });
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