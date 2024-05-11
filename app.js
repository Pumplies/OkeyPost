class Rating {
  constructor(dom) {
    dom.innerHTML = '<svg width="110" height="20"></svg>';
    this.svg = dom.querySelector('svg');
    for (var i = 0; i < 5; i++)
      this.svg.innerHTML += `<polygon data-value="${i + 1}"
             transform="translate(${i * 22},0)" 
             points="10,1 4,19.8 19,7.8 1,7.8 16,19.8">`;
    this.svg.onclick = e => this.change(e);
    this.render();
  }

  change(e) {
    let value = e.target.dataset.value;
    value && (this.svg.parentNode.dataset.value = value);
    this.render();
  }

  render() {
    this.svg.querySelectorAll('polygon').forEach(star => {
      let on = +this.svg.parentNode.dataset.value >= +star.dataset.value;
      star.classList.toggle('active', on);
    });
  }
}

document.querySelectorAll('.rating').forEach(dom => new Rating(dom));

document.querySelector('.logo__text').addEventListener('click', () => {
  window.location.href = 'index.html'
})



// TUT SLIDER S KURTKAMI 
const slider = document.querySelector('.big__kurtka');
const slides = document.querySelectorAll('.big__kurtka .slide');
const prevBtn = document.querySelector('.slider__button__left');
const nextBtn = document.querySelector('.slider__button__right');
const smallSliders = document.querySelectorAll('.slider__left, .slider__right');

let slideIndex = 0;
const slideWidth = slides[0].offsetWidth;

nextBtn.addEventListener('click', () => {
    slideIndex++;
    if (slideIndex === slides.length) {
        slideIndex = 0;
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
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
    const slides = slider.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });
});

function updateSmallSliders() {
    smallSliders.forEach((slider) => {
        const slides = slider.querySelectorAll('.slide');
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
