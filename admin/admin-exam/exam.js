function createRating(dom) {
    dom.innerHTML = '<svg width="110" height="20"></svg>';
    const svg = dom.querySelector("svg");
    for (var i = 0; i < 5; i++)
        svg.innerHTML += `<polygon data-value="${i + 1}"
               transform="translate(${i * 22},0)" 
               points="10,1 4,19.8 19,7.8 1,7.8 16,19.8">`;
    svg.onclick = (e) => changeRating(e);
    renderRating(svg);
}

function changeRating(e) {
    let value = e.target.dataset.value;
    value && (e.target.parentNode.dataset.value = value);
    renderRating(e.target.parentNode);
}

function renderRating(svg) {
    svg.querySelectorAll("polygon").forEach((star) => {
        let on = +svg.parentNode.dataset.value >= +star.dataset.value;
        star.classList.toggle("active", on);
    });
}

document.querySelectorAll(".rating").forEach((dom) => createRating(dom));

function fetchReviews() {
    const url = 'https://4015abceced6b993.mokky.dev/examination'; // Замените на ваш URL API
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
                card.setAttribute('data-id', currentReview.id); // Добавляем data-id к элементу .otzivi__card
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
                        <div class="buttons">
                            <button class="succes__btn" data-id="${currentReview.id}">Принять</button>
                            <button class="refusal" data-id="${currentReview.id}">Отклонить</button>
                        </div>
                    </div>
                `;
                otziviBlock.appendChild(card);
                createRating(card.querySelector('.rating'));
            
                // Добавляем обработчики событий на кнопки "Принять" и "Отклонить"
                const acceptBtn = card.querySelector('.succes__btn');
                const rejectBtn = card.querySelector('.refusal');
            
                acceptBtn.addEventListener('click', () => {
                    confirmReview(currentReview.id);
                    deleteReview(currentReview.id);
                });
            
                rejectBtn.addEventListener('click', () => {
                    deleteReview(currentReview.id);
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function confirmReview(id) {
    const review = document.querySelector(`.otzivi__card[data-id="${id}"]`);
    if (!review) {
        console.error('Review element not found');
        return;
    }
    const url = 'https://4015abceced6b993.mokky.dev/confirmed';
    const imageUrl = review.querySelector('img').src;
    const name = review.querySelector('.otzivi__name').textContent;
    const rating = review.querySelector('.rating').getAttribute('data-value');
    const text = review.querySelector('.overview').textContent;
    const city = review.querySelector('.otzivi__city').textContent;
    const time = review.querySelector('.otzivi__data').textContent;

    const data = {
        id: id,
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
        console.log('Review confirmed:', data);
        fetchReviews(); // Обновляем отзывы после подтверждения
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteReview(id) {
    const review = document.querySelector(`.otzivi__card[data-id="${id}"]`);
    if (!review) {
        console.error('Review element not found');
        return;
    }
    const url = `https://4015abceced6b993.mokky.dev/examination/${id}`;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Review deleted:', data);
        fetchReviews(); // Обновляем отзывы после удаления
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

fetchReviews();

