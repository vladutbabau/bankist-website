'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault;
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect()); // Coordonatele butonului btnScrollTo

  // console.log(
  //   'Coordonatele din pozitia unde am dat scroll: ',
  //   window.scrollX,
  //   window.scrollY
  // );

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scroll
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // PRIMA VARIANTA PENTRU SMOOTH SCROLL
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // A DOUA VARIANTA PENTRU BROWSERELE MODERNE
  section1.scrollIntoView({ behavior: 'smooth' });
});

// PAGE NAVIGATION
// const navLinks = document.querySelectorAll('.nav__link');
// console.log(navLinks);
// navLinks.forEach(nav =>
//   nav.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Componentele TAB

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Clauza de protectie
  if (!clicked) return;

  // Scoatem clasa active
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activam TAB-ul
  clicked.classList.add('operations__tab--active');

  // Adaugam vizibilitatea operatiunilor pentru fiecare buton de tab apasat
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(e.target);
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');
    // console.log(logo);

    siblings.forEach(sibling => {
      if (sibling !== link) sibling.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// navigatie sticky
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Navigatie STICKY MODERNA

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.5,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
observer.observe(header);

// Sections reveal

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Load lazy images

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  // Inlocuim src cu data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

// ELEMENTUL SLIDER
const slider = function () {
  const btnRight = document.querySelector('.slider__btn--right ');
  const btnLeft = document.querySelector('.slider__btn--left ');
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.dots');
  // console.log(dotsContainer);
  let curSlide = 0;
  const maxSlides = slides.length;

  const slider = document.querySelector('.slider');
  // slider.style.overflow = 'visible';
  // slider.style.transform = 'scale(0.4) translateX(-400px)';
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  // 0% 100% 200% 300%

  const activateDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  // activateDots(0);
  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide=${i}></button>`
      );
    });
  };
  // createDots();

  const goToSlide = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  // goToSlide(0);
  const nextSlide = () => {
    curSlide === maxSlides - 1 ? (curSlide = 0) : curSlide++;
    goToSlide(curSlide);
    activateDots(curSlide);
  };
  const prevSlide = () => {
    curSlide === 0 ? (curSlide = maxSlides - 1) : curSlide--;
    goToSlide(curSlide);
    activateDots(curSlide);
  };
  const init = function () {
    createDots();
    activateDots(0);
    goToSlide(0);
  };
  init();
  // Events HANDLERS
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', e => {
    // console.log(e.key);
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);
    }
  });
};
slider();

document.addEventListener('DOMContentLoaded', e => {
  // e.preventDefault();
  console.log('HTML si CSS s-au incarcat');
});
window.addEventListener('load', e => {
  console.log('Toata pagina s-a downloadat');
});
window.addEventListener('beforeunload', e => {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
////////////////////////////////////
//////////////////////////////////////
// SELECTAREA ELEMENTELOR
// console.log(document.documentElement);
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// console.log(document.getElementsByClassName('btn'));

//CREAREA SI INSERAREA ELEMENTELOR
//.insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookies to improve functionality and analytics <button class="btn btn--close-cookie"> Got it! </button>';
// const header = document.querySelector('.header');
// header.prepend(message);
// header.append(message);
// header.before(message);
// header.after(message);
// const btnCookie = document.querySelector('.btn--close-cookie');
// btnCookie.addEventListener('click', () => {
//   message.remove();
// });

// message.style.width = '120%';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// message.style.backgroundColor = '#37383d';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.getAttribute('designer')); // Atunci cand am adaugat un alt atribut care nu este standard HTML
// logo.alt = 'Beautiful minimalist logo'; // Schimbam atributul 'ALT' de la img
// logo.setAttribute('company', 'Romano-Americana');
// console.log(logo.getAttribute('company'));

// Data attributes
// console.log(logo.dataset.versionNumber);

// Classes
// logo.classList.add('c', 'j'); // Putem adauga mai multe clase
// logo.classList.remove('c'); // Putem sterge mai multe clase
// logo.classList.toggle('c');
// logo.classList.contains('c');

// NU folosi DEOARECE face overwrite peste toate clasele adaugate deja
// logo.className = 'jonas';

// btnScrollTo.addEventListener('click', function (e) {
//   e.preventDefault;
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect()); // Coordonatele butonului btnScrollTo

//   console.log(
//     'Coordonatele din pozitia unde am dat scroll: ',
//     window.scrollX,
//     window.scrollY
//   );

//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

// Scroll
// window.scrollTo(
//   s1coords.left + window.scrollX,
//   s1coords.top + window.scrollY
// );

// PRIMA VARIANTA PENTRU SMOOTH SCROLL
// window.scrollTo({
//   left: s1coords.left + window.scrollX,
//   top: s1coords.top + window.scrollY,
//   behavior: 'smooth',
// });

// A DOUA VARIANTA PENTRU BROWSERELE MODERNE
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
