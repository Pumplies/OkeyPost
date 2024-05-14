document.addEventListener("DOMContentLoaded", () => {
    const avatarStorage = localStorage.getItem("Аватарка (ссылка)");
    const nameStorage = localStorage.getItem("Логин");

    if (nameStorage && avatarStorage) {
        const authLink = document.querySelector(".auth a");
        authLink.textContent = nameStorage;
        authLink.href = "../okpost/profile/profile.html";

        const userImage = document.querySelector(".auth .user");
        userImage.src = avatarStorage;
        userImage.style.width = "60px";
        userImage.style.width = "50px";
        userImage.style.borderRadius = "30px";

        const authDiv = document.querySelector(".auth");

        if (!authDiv.querySelector(".delete-txt")) { // Проверяем, есть ли уже кнопка "Выйти"
            const deleteBtn = document.createElement("text");
            deleteBtn.classList.add("delete-txt");
            deleteBtn.textContent = "Выйти";

            deleteBtn.addEventListener("click", () => {
                localStorage.removeItem("Логин");
                localStorage.removeItem("Аватарка (ссылка)");

                location.reload();
            });

            authDiv.appendChild(deleteBtn);
        }
    }
});


const modal = document.getElementById("modal");
const modalBtn = document.querySelector(".contact");
const closeBtn = document.getElementById("close");


modalBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.querySelector(".logo__text").addEventListener("click", () => {
    window.location.href = "../index.html";
});


//   rating 
class Rating {
    constructor(dom) {
        dom.innerHTML = '<svg width="110" height="20"></svg>';
        this.svg = dom.querySelector("svg");
        for (var i = 0; i < 5; i++)
            this.svg.innerHTML += `<polygon data-value="${i + 1}"
               transform="translate(${i * 22},0)" 
               points="10,1 4,19.8 19,7.8 1,7.8 16,19.8">`;
        this.svg.onclick = (e) => this.change(e);
        this.render();
    }

    change(e) {
        let value = e.target.dataset.value;
        value && (this.svg.parentNode.dataset.value = value);
        this.render();
    }

    render() {
        this.svg.querySelectorAll("polygon").forEach((star) => {
            let on = +this.svg.parentNode.dataset.value >= +star.dataset.value;
            star.classList.toggle("active", on);
        });
    }
}

document.querySelectorAll(".rating").forEach((dom) => new Rating(dom));



// модалка с отзывами 

// Находим элементы модального окна и кнопку для его открытия
const makeReviewButton = document.querySelector('.make__review');
const reviewModal = document.getElementById('reviewModal');
const closeModal = reviewModal.querySelector('.modal__close__btn');
const submitModal = document.querySelector('.modal__button__2');

// Функция для открытия модального окна
function openModal() {
    reviewModal.style.display = 'flex';
}

// Функция для закрытия модального окна
function closeModalFunction() {
    reviewModal.style.display = 'none';
}

// Открытие модального окна при клике на кнопку
makeReviewButton.addEventListener('click', () => {
    if (reviewModal) {
        openModal();
    }
});

// Закрытие модального окна при клике на крестик
closeModal.addEventListener('click', closeModalFunction);

// Закрытие модального окна при отправке формы



// отправка в api
let idCounter = 0;
function submitReview(reviewForm) {
    const url = 'https://4015abceced6b993.mokky.dev/examination';
    const imageUrl = document.querySelector('#url').value;
    const text = document.querySelector('#otziv').value;
    const city = document.querySelector('#city').value;
    const rating = reviewForm.querySelector('.modal__select__2').value;
    const name = localStorage.getItem('Логин'); // Исправлено с 'Имя'
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const time = `${day} ${month} ${year}`;

    const data = {
        id: idCounter++,
        imageUrl: imageUrl,
        text: text,
        city: city,
        rating: rating,
        name: name,
        time: time
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            closeModalFunction();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
submitModal.addEventListener('click', (e) => {
    e.preventDefault();
    const reviewForm = document.getElementById('reviewModal').querySelector('.modal__window');
    submitReview(reviewForm);
    closeModalFunction();
});



function fetchReviews() {
    const url = 'https://4015abceced6b993.mokky.dev/confirmed';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(reviews => {
            const otziviBlock = document.querySelector('.otzivi');
            otziviBlock.innerHTML = ''; // Очищаем блок отзывов перед добавлением новых

            reviews.forEach(review => {
                let currentReview = review; // Создаем уникальную копию review для каждой карточки
                const card = document.createElement('div');
                card.classList.add('otzivi__card');
                card.setAttribute('data-id', currentReview.id); // Добавляем data-id для идентификации отзыва
                card.innerHTML = `
                    <img src="${currentReview.imageUrl}" alt="">
                    <div class="otzivi__text">
                        <h3 class="otzivi__name">${currentReview.name}</h3>
                        <span class="rating" data-value="${currentReview.rating}"></span>
                        <span class="overview">${currentReview.text}</span>
                        <div class="data__city">
                            <span class="span__bold">Дата:</span>
                            <span class="otzivi__data">${currentReview.time}</span>
                            <br>
                            <span class="span__bold">Город:</span>
                            <span class="otzivi__city">${currentReview.city}</span>
                        </div>
                    </div>
                `;
                otziviBlock.appendChild(card);
                new Rating(card.querySelector('.rating'));
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
document.addEventListener('DOMContentLoaded', () => {
    fetchReviews();
});
