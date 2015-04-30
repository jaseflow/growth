var course = document.querySelector('#course'),
    module = document.querySelector('#module'),
    headerBtn = document.querySelector('#headerBtn'),
    headerAction = document.querySelector('.header__action'),
    title = document.querySelector('#title'),
    overlay = document.querySelector('#overlay'),
    overlayImage = document.querySelector('#overlayImage');

var swapTime = 250;

var titleCourse = 'Safety and Testing',
    titleUser = 'Jason Corbett';

var showCourse = function(event) {
    event.preventDefault();
    course.classList.add('exit');
    headerBtn.classList.remove('fa-bars');
    headerBtn.classList.add('fa-arrow-left');
    headerAction.classList.add('visible');
    title.textContent=titleCourse;
    setTimeout(function() {
        course.setAttribute('hidden','');
        module.classList.add('enter');
    }, swapTime);
}

var moveBack = function(event) {
    if(event.target.className == "fa fa-arrow-left") {
        headerBtn.classList.remove('fa-arrow-left');
        headerBtn.classList.add('fa-bars');
        headerAction.classList.remove('visible');
        title.textContent=titleUser;
        module.classList.remove('enter');
        course.classList.remove('exit');
        course.removeAttribute('hidden');
    }
}

var showOverlay = function(event) {
    overlay.classList.toggle('overlay--active');
    var src = event.target.getAttribute('src');
    overlayImage.setAttribute('src',src);
}

document.querySelector('.course__module').addEventListener('click', showCourse);

document.querySelector('#headerBtn').addEventListener('click', moveBack);

document.querySelector('.module-content img').addEventListener('click', showOverlay);

document.querySelector('#overlayClose').addEventListener('click', showOverlay);
