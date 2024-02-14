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
    offset: 120, // offset (in px) from the original trigger point
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

const cocktailSwiper = new Swiper('.cocktail-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
        600: {
            slidesPerView: 2,
        },
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

function updateCounter(swiper) {
    document.querySelector('.modal-counter').innerText = `${swiper.activeIndex + 1} / ${images.length}`;
}

gallerySwiper.on('init', updateCounter)
gallerySwiper.on('slideChange', updateCounter)

const galleryElement = document.querySelector('.gallery');
const gallerySwiperWrapperElement = document.querySelector('.gallery-swiper .swiper-wrapper');
const galleryModalElement = document.querySelector('.gallery-modal');

images.map((imageName, index) => {
    const newPhoto = document.createElement('div');
    const photoElement = document.createElement('img');
    newPhoto.className = 'gallery-item';
    photoElement.src = `./img/gallery/${imageName}`;
    newPhoto.dataset.aos = 'zoom-in';
    newPhoto.dataset.aosDelay = `${300 + index * 10}`;

    newPhoto.appendChild(photoElement);

    newPhoto.onclick = () => {
        gallerySwiper.slideTo(index);
        document.body.classList.add('modal-open');
        galleryModalElement.style.display = 'block';
        galleryModalElement.style.scale = '1';
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

// Фуллскрин для просмотра галереи
document.querySelector('#fullscreen').addEventListener("click", function (event) {
    document.querySelector(".gallery-modal").requestFullscreen();

    document.querySelector('#fullscreen').style.display = 'none';
    document.querySelector('#fullscreen-close').style.display = 'inline';
})
document.querySelector('#fullscreen-close').addEventListener("click", function (event) {
    if (document.fullscreenElement) {
        document.exitFullscreen();

        document.querySelector('#fullscreen').style.display = 'inline';
        document.querySelector('#fullscreen-close').style.display = 'none';
        return;
    }
})

// Увеличение/уменьшение изображения
document.querySelector('#zoom-button').addEventListener('click', () => {
    const isZoom = gallerySwiper.zoom.scale;
    gallerySwiper.zoom.toggle(isZoom === 1);
    document.querySelector('#zoom-plus').style.display = isZoom === 1 ? 'none' : 'inline';
    document.querySelector('#zoom-minus').style.display = isZoom === 1 ? 'inline' : 'none';
});

// Закрытие модального окна
document.querySelector('#close').addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        return;
    }
    document.body.classList.remove('modal-open');
    galleryModalElement.style.display = 'none';
    galleryModalElement.style.scale = '0';
})