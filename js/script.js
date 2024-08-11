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

// select skills section elements

let skillsSection = document.querySelector('.skills');

window.addEventListener('scroll', () => {
    // section offset top :
    let sectionOffsetTop = skillsSection.offsetTop;
    
    let sectionOuterHeight = skillsSection.offsetHeight;
    // => height of the section
    
    let windowHeight = window.innerHeight;

    // window scroll top :
    let windowScrollTop = window.pageYOffset;

    /* 
        console.log(windowScrollTop);
        console.log(window.scrollY);
        console.log('#'.repeat(10));
     */

    if (windowScrollTop > sectionOffsetTop + sectionOuterHeight - windowHeight) {
        // get all skills elements
        let skills = document.querySelectorAll('.skill .progress span');
        skills.forEach(skill => skill.style.width = skill.dataset.progress);
    }
    
});

///////////////////////////////////////////////////////////////////////////////////////////

// create pop up box when click on images in gallery 

let galleryImages = document.querySelectorAll('.gallery .images img');

galleryImages.forEach(img => {
    img.addEventListener('click', (e) => {

        // create overlay (makes bg darker when pop up appears)
        let overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        // create pop-up box
        let popup = document.createElement('div');
        popup.className = 'pop-up';

        // create the image inside the popup
        let popupImage = document.createElement('img');
        popupImage.src = e.target.src;

        popup.appendChild(popupImage);
        

        // create button to close popup
        let closePopupButton = document.createElement('div');
        closePopupButton.className = 'close-popup';
        closePopupButton.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';

        popup.appendChild(closePopupButton);

        closePopupButton.addEventListener('click', () => {
            popup.remove();
            overlay.remove();
        });

        // create the description
        if (img.alt !== "" ) {
            let description = document.createElement('div');
            description.className = 'popup-description';
            description.innerText = img.alt;
            popup.appendChild(description);
        }

        document.body.appendChild(popup);
    });
});

///////////////////////////////////////////////////////////////////////////////////////

// displaying timeline on scroll

let contents = document.querySelectorAll('.career .content');

contents.forEach(content => {

    window.addEventListener('scroll', () => {
        let contentOffsetTop = content.offsetTop;

        let contentOffsetHeight = content.offsetHeight;
        
        let windowHeight = window.innerHeight;

        let scroll = window.pageYOffset;

        if (scroll > contentOffsetHeight + contentOffsetTop - windowHeight) {
            content.style.opacity = 1;
        }
    });

})