const navbar = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('#sidebar');
const date = document.querySelector('#date');
// add fixed class to navbar
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 80) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
});
// show sidebar
navBtn.addEventListener('click', function () {
  sidebar.classList.add('show-sidebar');
});
closeBtn.addEventListener('click', function () {
  sidebar.classList.remove('show-sidebar');
});
// set year
date.innerHTML = new Date().getFullYear();

window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.nav-links');
  const dropdownContent = document.querySelector('.dropdown-content');

  if (window.pageYOffset > navbar.offsetHeight) {
    dropdownContent.classList.add('nav-hidden');
  } else {
    dropdownContent.classList.remove('nav-hidden');
  }
});

window.addEventListener('scroll', function () {
  const navbar = document.querySelector('#nav');
  if (window.pageYOffset > 80) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
});
