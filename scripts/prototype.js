var course = document.querySelector('#course'),
    module = document.querySelector('#module'),
    headerBtn = document.querySelector('#headerBtn'),
    headerAction = document.querySelector('.header__action'),
    title = document.querySelector('#title'),
    overlay = document.querySelector('#overlay'),
    wrapper = document.querySelector('#wrapper'),
    overlayImage = document.querySelector('#overlayImage'),
    actions = document.querySelector('#actions'),
    actionsNav = document.querySelector('.actions__nav'),
    quizSlides = document.querySelector('#quiz-slides'),
    playButton = document.querySelector('#playButton');

var swapTime = 250;

var titleModule = 'Safety in the workplace',
    titleUser = 'Jason Corbett';

var pageNumber = 0;

var showCourse = function(event) {
    pageNumber++;
    event.preventDefault();
    course.classList.add('exit');
    headerBtn.classList.remove('fa-bars');
    headerBtn.classList.add('fa-arrow-left');
    headerAction.classList.add('visible');
    title.textContent=titleModule;
    actionsNav.classList.add('actions__nav--visible');
    setTimeout(function() {
        course.setAttribute('hidden','');
        module.classList.add('enter');
    }, swapTime);
}

var moveBack = function(event) {
    if(pageNumber == 1) {
        headerBtn.classList.remove('fa-arrow-left');
        headerBtn.classList.add('fa-bars');
        headerAction.classList.remove('visible');
        title.textContent=titleUser;
        module.classList.remove('enter');
        course.classList.remove('exit');
        course.removeAttribute('hidden');
        actionsNav.classList.remove('actions__nav--visible');
        pageNumber--;
    }
}

var showOverlay = function(event) {
    overlay.classList.toggle('overlay--active');
    var src = event.target.getAttribute('src');
    overlayImage.setAttribute('src',src);
}

var toggleMode = function(event) {
    wrapper.classList.toggle('audio');
    actionsNav.classList.toggle('actions__nav--visible');
}

var startSong = function(event) {
    event.target.classList.add('active');
    playButton.classList.add('fa-pause');
}

var toggleActions = function(event) {
    actions.classList.toggle('actions--active')
}

var toggleSearch = function(event) {
    wrapper.classList.toggle('wrapper--search')
}

var quizCount = 1;
var selectAnswer = function(event) {
    var answer = event.toElement.dataset.answer,
        activeAnswer = document.querySelector('.slide--active'),
        activeClass = 'slide--active',
        doneClass = 'slide--done',
        quizLength = document.querySelectorAll('.quiz__question').length,
        slides = document.querySelectorAll('.slide');

    event.toElement.classList.add('quiz__option--' + answer);
    quizCount++;
    [].forEach.call(slides, function (el) {
        console.log(quizCount);
        if(quizCount >= slides.length) {
            return
        }
        else {
            setTimeout(function() {
                if(el.dataset.order == (quizCount-1)) {
                    el.classList.add(doneClass);
                }
                if(el.dataset.order == quizCount) {
                    el.classList.add(activeClass);
                }
            },1000);
        }
    });
}

document.querySelector('.course__module').addEventListener('click', showCourse);
document.querySelector('#headerBtn').addEventListener('click', moveBack);
document.querySelector('.module-content img').addEventListener('click', showOverlay);
document.querySelector('#overlayClose').addEventListener('click', showOverlay);
document.querySelector('#toggleMode').addEventListener('click', toggleMode);
document.querySelector('.playlist__item').addEventListener('click', startSong);

// Multiple selectors on a page

var searchTogglers = document.querySelectorAll('.js-toggleSearch');
[].forEach.call(searchTogglers, function (el) {
    el.addEventListener('click', toggleSearch);
});

var actionTogglers = document.querySelectorAll('.js-toggleActions');
[].forEach.call(actionTogglers, function (el) {
    el.addEventListener('click', toggleActions);
});

var quizOptions = document.querySelectorAll('.quiz__option');
[].forEach.call(quizOptions, function (el) {
    el.addEventListener('click', selectAnswer);
});
