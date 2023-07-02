'use strict';
import micImg from './img/mic.png';
import micCrossedImg from './img/mic-crossed.png';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const sectionsAll = document.querySelectorAll('.section');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelectorAll('.slider');
const [insideSlider] = slider;
const slideToLeft = document.querySelector('.slider__btn--left');
const slideToRight = document.querySelector('.slider__btn--right');
const dotsCont = document.querySelector('.dots');

const header = document.querySelector('header');

const lazyImage = document.querySelectorAll('.lazy-img');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We need your history. <button class="btn btn--close--cookie">Okay</button>';
header.append(message);
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 20 + 'px';
message.style.color = 'blue';
message.style.backgroundColor = 'yellow';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// btnScrollTo.addEventListener('click', function () {
//   const scrollCoordinates = section1.getBoundingClientRect();
//   console.log(scrollCoordinates);
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(e.target.getAttribute('href'));
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  // Operation Buttons
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (clicked.classList.contains('operations__tab')) {
    document
      .querySelector('.operations__tab--active')
      .classList.remove('operations__tab--active');
    const lastNumber = clicked.classList[2].slice(-1);

    clicked.classList.add('operations__tab--active');

    // Operation Content
    document
      .querySelector('.operations__content--active')
      .classList.remove('operations__content--active');
    tabsContent[lastNumber - 1].classList.add('operations__content--active');
  }
});

const headerWhenHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const links = document.querySelectorAll('.nav__link');
    const logo = document.querySelector('.nav__logo');

    links.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', headerWhenHover.bind('0.5'));
nav.addEventListener('mouseout', headerWhenHover.bind('1'));
//StickyBar Effect
const navHeight = nav.getBoundingClientRect().height;

const funcAfterObserving = function (e) {
  if (e[0].isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
};
const headerObserver = new IntersectionObserver(funcAfterObserving, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Section Revealling Effect

const sectionObsFunc = function (e, obs) {
  const [eInside] = e;
  // ;
  // console.log(eInside);
  if (eInside.isIntersecting) {
    eInside.target.classList.remove('section--hidden');
    obs.unobserve(eInside.target);
  }
};

const sectionObserver = new IntersectionObserver(sectionObsFunc, {
  root: null,
  threshold: 0.15,
});
sectionsAll.forEach(function (section) {
  section.classList.add('section--hidden');

  sectionObserver.observe(section);
});

//Image Encovering/Unblurring

const imageIbserverdFunc = function (e, obs) {
  const [eInside] = e;
  if (eInside.isIntersecting) {
    eInside.target.src = eInside.target.dataset.src;
    console.log(eInside);
    eInside.target.classList.remove('lazy-img');
    obs.unobserve(eInside.target);
  }
};
const imageObserver = new IntersectionObserver(imageIbserverdFunc, {
  root: null,
  threshold: 0,
});
lazyImage.forEach(function (image) {
  imageObserver.observe(image);
});
// slider.style.transform = 'scale(0.2)';
// slider.style.overflow = 'visible';

// Slide Switching
const maxSlide = slides.length - 1;
slides.forEach(
  (key, num) => (key.style.transform = `translateX(${num * 100}%)`)
);

console.log(insideSlider);
console.log(slider);

let curSlide = 0;

const switchSlide = function (slide) {
  slides.forEach(
    (key, num) => (key.style.transform = `translateX(${(num - slide) * 100}%)`)
  );
};
const dotToActive = function (num) {
  dotsAll.forEach(function (key, i) {
    key.classList.remove('dots__dot--active');
  });
  dotsAll[num].classList.add('dots__dot--active');
};
const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  switchSlide(curSlide);
  dotToActive(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  switchSlide(curSlide);
  dotToActive(curSlide);
};
slideToLeft.addEventListener('click', prevSlide);
slideToRight.addEventListener('click', nextSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
  }
});

//Dots
slides.forEach(function (_, num) {
  dotsCont.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot" data-slide="${num}"></button>`
  );
});
const dotsAll = document.querySelectorAll('.dots__dot');

dotsAll.forEach(function (key, num) {
  dotsAll[curSlide].classList.add('dots__dot--active');
  key.addEventListener('click', function (e) {
    const selectedDot = Number(e.target.dataset.slide);
    switchSlide(selectedDot);
    dotToActive(selectedDot);
    curSlide = selectedDot;
  });
});
const arr = [1, 1, 1, 2, 2, 3, 4, 3, 4];
Array.prototype.unique = function () {
  return [new Set(this)];
};
console.log(arr.unique());
console.log([...new Set(arr)]);

const textInputContainer = document.querySelector('.text-input');
const textInput = textInputContainer.querySelector('input'); // <=> document.querySelector("#search-form input");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if (SpeechRecognition) {
  console.log('Your Browser supports speech Recognition');

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  textInputContainer.insertAdjacentHTML(
    'beforeend',
    `<button type="button"><img src=${micImg} alt="" class="microphone" /></button>`
  );

  const micBtn = textInputContainer.querySelector('button');
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener('click', micBtnClick);
  function micBtnClick() {
    if (micIcon.classList.contains('microphone')) {
      // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    } else {
      recognition.stop();
    }
  }

  recognition.addEventListener('start', startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove('microphone');
    micIcon.classList.add('microphone-crossed');
    micIcon.src = micCrossedImg;
    textInput.focus();
    console.log('Voice activated, SPEAK');
  }

  recognition.addEventListener('end', endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.src = micImg;
    micIcon.classList.remove('microphone-crossed');
    micIcon.classList.add('microphone');
  }

  recognition.addEventListener('result', resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    if (transcript.toLowerCase().trim() === 'stop recording') {
      recognition.stop();
    } else if (!textInput.value) {
      textInput.value = transcript;
    } else {
      if (transcript.toLowerCase().trim() === 'go') {
        textInputContainer.submit();
      } else if (transcript.toLowerCase().trim() === 'reset input') {
        textInput.value = '';
      } else {
        textInput.value = transcript;
      }
    }
    // textInput.value = transcript;
    // textInput.focus();
    // setTimeout(() => {
    //   textInputContainer.submit();
    // }, 500);
  }
} else {
  console.log('Your Browser does not support speech Recognition');
  info.textContent = 'Your Browser does not support Speech Recognition';
}
