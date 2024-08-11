// selecting landing page items :
let landingPage = document.querySelector('.landing');

// array of images to render :
let imgsArray = ['01.png', '02.png', '03.png', '04.png'];

// randomize background
let random = localStorage.getItem('bg_random');

// control interval to clear it
let bgInterval;

// check if there is value in localStorage
let isThereValue = localStorage.getItem('bg_random');

// if value not empty
if (isThereValue !== null) {
    if (isThereValue === 'true') {
        random = true;
    } else {
        random = false;
    }
    document.querySelectorAll('.bg li').forEach(li => {
        li.classList.remove('active');

        if (isThereValue === 'true') {
            document.querySelector('.yes').classList.add('active');
        } else {
            document.querySelector('.no').classList.add('active');
        }
    });
}

// setInterval made in function 
function randomBg () {
    if (random === true) {

            bgInterval = setInterval(() => {

            // get random number :
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // change url every 2s : 
            landingPage.style.backgroundImage = 'url("images/'+ imgsArray[randomNumber] + '")';
        }, 2000);
    } else {
        clearInterval(bgInterval);
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////

let settingsIcon = document.querySelector('#settings-icon');
let options = document.querySelector('.settings-options');

settingsIcon.addEventListener('click', () => {
    settingsIcon.classList.toggle('fa-spin');
    options.classList.toggle('visible');
});

///////////////////////////////////////////////////////////////////////////////////////////////

// switching colors :

const colorsLi = document.querySelectorAll('.colors li');

colorsLi.forEach(li => {
    li.addEventListener('click', (e) => {
        
        // change color in interface :
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // set color to localStorage
        localStorage.setItem('main-color', e.target.dataset.color);

        // remove active class from all children
        e.target.parentElement.querySelectorAll('.active').forEach(i => {
            i.classList.remove('active');
        });

        // add active class on clicked item
        e.target.classList.add('active');
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////

// save colors in local storage :

// check existing colors already 
let mainColor = window.localStorage.getItem('main-color');
//console.log(mainColor);
// null initially, before setting an actual value in storage

if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);

    // remove active class from all colors
    document.querySelectorAll('.colors-list li').forEach(i => {
        i.classList.remove('active');

        // add active class to the selected color in localStorage
        if (i.dataset.color === mainColor) {
            i.classList.add('active');
        }
    });
}

//////////////////////////////////////////////////////////////////////////////


const bgOptions = document.querySelectorAll('.bg li');

bgOptions.forEach(li => {
    li.addEventListener('click', (e) => {
        // remove active class from all elements
        e.target.parentElement.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active');
        });

        // add active class to selected item
        e.target.classList.add('active');

        if (e.target.dataset.bg === 'yes') {
            localStorage.setItem('bg_random', true);
            random = true;
            randomBg();
        } else {
            localStorage.setItem('bg_random', false);
            random = false;
            randomBg();
        }
    });
});

randomBg();
/////////////////////////////////////////////////////////////////////////////////////