var course = document.querySelector('#course'),
    module = document.querySelector('#module'),
    headerBtn = document.querySelector('#headerBtn'),
    headerAction = document.querySelector('.header__action'),
    title = document.querySelector('#title'),
    overlay = document.querySelector('#overlay'),
    wrapper = document.querySelector('#wrapper'),
    overlayImage = document.querySelector('#overlayImage'),
    actions = document.querySelector('#actions'),
    playButton = document.querySelector('#playButton');

var swapTime = 250;

var titleModule = 'Safety in the workplace',
    titleUser = 'Jason Corbett';

var showCourse = function(event) {
    event.preventDefault();
    course.classList.add('exit');
    headerBtn.classList.remove('fa-bars');
    headerBtn.classList.add('fa-arrow-left');
    headerAction.classList.add('visible');
    title.textContent=titleModule;
    actions.classList.add('actions--active');
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
        actions.classList.remove('actions--active');
    }
}

var showOverlay = function(event) {
    overlay.classList.toggle('overlay--active');
    var src = event.target.getAttribute('src');
    overlayImage.setAttribute('src',src);
}

var toggleMode = function(event) {
    wrapper.classList.toggle('audio');
    actions.classList.toggle('actions--active');
}

var startSong = function(event) {
    event.target.classList.add('active');
    console.log(event);
    playButton.classList.add('fa-pause');
}

document.querySelector('.course__module').addEventListener('click', showCourse);
document.querySelector('#headerBtn').addEventListener('click', moveBack);
document.querySelector('.module-content img').addEventListener('click', showOverlay);
document.querySelector('#overlayClose').addEventListener('click', showOverlay);
document.querySelector('#toggleMode').addEventListener('click', toggleMode);
document.querySelector('.playlist__item').addEventListener('click', startSong);
