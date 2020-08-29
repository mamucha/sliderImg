const imgsArr = [
  'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  'https://images.pexels.com/photos/301614/pexels-photo-301614.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  'https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
];

class Slider {
  constructor(images) {
    this.images = images;
    this.slide = null;
    this.btnPrev = null;
    this.btnNext = null;
    this.image = null;
    this.currentSlide = 0;
    this.slideArrayLength = 0;
    this.slideCaption = null;

    this.UISelectors = {
      slide: '[data-slide]',
      btnPrev: '[data-btnPrev]',
      btnNext: '[data-btnNext]',
    };
  }

  sliderInit() {
    this.slide = document.querySelector(this.UISelectors.slide);
    this.btnPrev = document.querySelector(this.UISelectors.btnPrev);
    this.btnNext = document.querySelector(this.UISelectors.btnNext);

    this.image = document.createElement('img');
    this.image.classList.add('slide__img');
    this.setSlideAttributes(0);
    this.slideArrayLength = this.images && this.images.length;
    this.slide.appendChild(this.image);
    this.addListeners();

    this.slideCaption = document.createElement('figcaption');
    this.slideCaption.classList.add('slider__text');
    this.slide.appendChild(this.slideCaption);
    this.addCaption();
  }

  addListeners() {
    this.btnPrev.addEventListener('click', () => this.changeSlide(this.currentSlide - 1));
    this.btnNext.addEventListener('click', () => this.changeSlide(this.currentSlide + 1));

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 37) {
        this.changeSlide(this.currentSlide - 1);
      } else if (e.keyCode === 39) {
        this.changeSlide(this.currentSlide + 1);
      }
    });
  }

  disableButtons() {
    this.currentSlide === 0
      ? this.btnPrev.setAttribute('disabled', true)
      : this.btnPrev.removeAttribute('disabled');
    this.currentSlide === this.slideArrayLength - 1
      ? this.btnNext.setAttribute('disabled', true)
      : this.btnNext.removeAttribute('disabled');
  }

  changeSlide(index) {
    if (index === -1 || index === this.slideArrayLength) return;
    this.currentSlide = index;

    this.addCaption();

    this.setSlideAttributes(index);
    this.disableButtons();
  }

  addCaption() {
    this.slideCaption.innerText = `${this.currentSlide + 1}/${this.slideArrayLength}`;
  }

  setSlideAttributes(index) {
    this.image.setAttribute(
      'src',
      Array.isArray(this.images) && this.images.length && this.images[index]
    );
    this.image.setAttribute('alt', `Slide ${index + 1}`);
  }
}

const slider = new Slider(imgsArr);
slider.sliderInit();
