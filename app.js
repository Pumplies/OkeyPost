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

document.querySelector(".logo__text").addEventListener("click", () => {
  window.location.href = "index.html";
});

// TUT SLIDER S KURTKAMI
const slider = document.querySelector(".big__kurtka");
const slides = document.querySelectorAll(".big__kurtka .slide");
const prevBtn = document.querySelector(".slider__button__left");
const nextBtn = document.querySelector(".slider__button__right");
const smallSliders = document.querySelectorAll(".slider__left, .slider__right");

let slideIndex = 0;
const slideWidth = slides[0].offsetWidth;

nextBtn.addEventListener("click", () => {
  slideIndex++;
  if (slideIndex === slides.length) {
    slideIndex = 0;
  }
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  updateSlider();
});

slides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
});

smallSliders.forEach((slider) => {
  const slides = slider.querySelectorAll(".slide");
  slides.forEach((slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
  });
});

function updateSmallSliders() {
  smallSliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    const slideOffset = -slideWidth * slideIndex;
    slides.forEach((slide, index) => {
      slide.style.left = `${slideOffset + slideWidth * index}px`;
    });
  });
}

function updateSlider() {
  const slideOffset = -slideWidth * slideIndex;
  slides.forEach((slide, index) => {
    slide.style.left = `${slideOffset + slideWidth * index}px`;
  });

  updateSmallSliders();
}

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

    const deleteBtn = document.createElement("text");
    deleteBtn.classList.add("delete-txt");
    deleteBtn.textContent = "Выйти";

    deleteBtn.addEventListener("click", () => {
      localStorage.removeItem("Логин");
      localStorage.removeItem("Аватарка (ссылка)");

      location.reload();
    });
    const authDiv = document.querySelector(".auth");
    authDiv.appendChild(deleteBtn);
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


document.querySelector('.otzivi__button').addEventListener('click', () => {
  window.location.href = 'reviews/reviews.html'
})