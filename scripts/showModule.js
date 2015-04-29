var course = document.querySelector('#course'),
    module = document.querySelector('#module'),
    headerBtn = document.querySelector('#headerBtn');

var swapTime = 250;

document.querySelector('.course__module').addEventListener('click', function(event) {
    event.preventDefault();
    course.classList.add('exit');
    headerBtn.classList.remove('fa-bars');
    headerBtn.classList.add('fa-arrow-left');
    setTimeout(function() {
        course.setAttribute('hidden','');
        module.classList.add('enter');
    }, swapTime);
});

document.querySelector('#headerBtn').addEventListener('click', function(event) {
    if(event.target.className == "fa fa-arrow-left") {
        headerBtn.classList.remove('fa-arrow-left');
        headerBtn.classList.add('fa-bars');
        module.classList.remove('enter');
        course.classList.remove('exit');
        course.removeAttribute('hidden');
    }
});
