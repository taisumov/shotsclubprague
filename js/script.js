const images = [
    'img.png',
    'img_1.png',
    'img_2.png',
    'img_3.png',
    'img_4.png',
    'img_5.png',
    'img_6.png',
    'img_7.png',
    'img_8.png',
    'img_9.png',
    'img_10.png',
    'img_11.png',
    'img_12.png',
    'img_13.png',
    'img_14.png',
    'img_15.png',
    'img_16.png',
    'img_17.png',
    'img_18.png',
    'img_19.png',
    'img_20.png',
    'img_21.png',
    'img_22.png',
    'img_23.png',
    'img_24.png',
    'img_25.png',
    'img_26.png',
    'img_27.png',
];

// You can also pass an optional settings object
// below listed default settings
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

const cocktailSwiper = new Swiper('.cocktail-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 2,
    spaceBetween: 0,
    breakpoints: {
        1024: {
            slidesPerView: 5,
            spaceBetween: 100,
        }
    },
    navigation: {
        nextEl: '.cocktail-swiper-button-next',
        prevEl: '.cocktail-swiper-button-prev',
    },
});

const gallerySwiper = new Swiper('.gallery-swiper', {
    zoom: true,
    navigation: {
        nextEl: '.gallery-swiper-button-next',
        prevEl: '.gallery-swiper-button-prev',
    },
})

gallerySwiper.on('slideChange', function (swiper) {
    document.querySelector('.gallery-counter').innerHTML = `${swiper.activeIndex + 1} / ${images.length}`;
})

const galleryElement = document.querySelector('.gallery');
const gallerySwiperWrapperElement = document.querySelector('.gallery-swiper .swiper-wrapper');
const galleryModalElement = document.querySelector('.gallery-modal');

images.map((imageName, index) => {
    const newPhoto = document.createElement('div');
    const photoElement = document.createElement('img');
    newPhoto.className = 'gallery-item';
    photoElement.src = `./img/gallery/${imageName}`;
    newPhoto.appendChild(photoElement);

    newPhoto.onclick = () => {
        gallerySwiper.slideTo(index);
        galleryModalElement.style.display = 'block';
    }

    galleryElement.appendChild(newPhoto);
});

images.map((imageName, index) => {
    const newPhoto = document.createElement('div');
    const newZoomContainer = document.createElement('div');
    const photoElement = document.createElement('img');

    newPhoto.className = 'swiper-slide slide-gallery-item';
    newZoomContainer.className = 'swiper-zoom-container';

    photoElement.src = `./img/gallery/${imageName}`;
    photoElement.loading = 'lazy';

    newZoomContainer.appendChild(photoElement);
    newPhoto.appendChild(newZoomContainer);

    gallerySwiperWrapperElement.appendChild(newPhoto);
});