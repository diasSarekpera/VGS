const burger = document.querySelector('.burger');
const overlayMenu = document.querySelector('.overlay-mobile-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    overlayMenu.classList.toggle('active');
});
