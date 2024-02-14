const links = [
    ...Array.from(document.querySelectorAll('.nav-list__item')),
    ...Array.from(document.querySelectorAll('.main-picture-link')) ?? []
];

const blocksToObserve = links.map(link => document.querySelector(link.dataset.linkTo))

// Опции для Intersection Observer
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Порог пересечения в 50%
};

// Функция, которая будет выполнена при пересечении наблюдаемого элемента с областью просмотра
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        const link = document.querySelector(`li[data-link-to="#${entry.target.id}"]`)
        if (entry.isIntersecting) {
            link.style.color = 'var(--orange-bg-color)';
        } else {
            link.style.color = 'var(--white)';
        }
    });
};

const observer = new IntersectionObserver(handleIntersection, options);

blocksToObserve.map(block => {
    if (block) observer.observe(block)
})

const linksWithBottom = [...links, ...Array.from(document.querySelectorAll('.bottom-nav-list__item'))]

const scrollToElement = (selector) => {
    const linkTo = document.querySelector(selector);
    const linkToPosition = linkTo.getBoundingClientRect().top - document.body.getBoundingClientRect().top;

    const offset = window.matchMedia("(max-width: 800px)").matches ? 0 : 100

    window.scrollTo({
        top: linkToPosition - offset,
        behavior: 'smooth'
    })
}

linksWithBottom.map(link => link.addEventListener('click', () => {
    if (window.location.pathname !== '/') {
        window.location.href = `/?scroll=${link.dataset.linkTo.replace('#', '')}`
        return;
    } else {
        scrollToElement(link.dataset.linkTo)
    }
}))

document.addEventListener('DOMContentLoaded', () => {
    const scrollBlockName = new URLSearchParams(window.location.search).get('scroll');
    console.log(scrollBlockName)
    if (scrollBlockName) {
        scrollToElement(`#${scrollBlockName}`)
    }
})