/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('main > section'),
    mainNav = document.getElementById('navbar__list'),
    activeClass = 'active';
let mainNavItems = '';

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function removeClass(el, classsToRemove ) {
    el.forEach(function (el) {
        el.classList.remove(classsToRemove);
    })
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function creatNaveItem(dataSection) {
    let li = `<li> <a data-section="${dataSection}" class="menu__link">${dataSection}</a></li>`
    return li;
}

// Add class 'active' to section when near top of viewport

function setActiveSec(sections) {

    /* first check if there is an element which is fully in viewport 
       if not check the element that is taking more than 50% of the vewport */
    // use the for loop " for... " to be able to break once first section is selected to be active
    for (let index = 0; index < sections.length; index++) {
        let el = sections[index];
        //var el = document.getElementById('section2');
        var position = el.getBoundingClientRect();
        let viewportHeight = window.innerHeight;
        // checking whether fully visible
        if (position.top >= 0 && position.bottom <= window.innerHeight || position.top === 0) {
            //console.log('Element is fully visible in screen');
            el.classList.add(activeClass);
            // beak after selecting first section inviewport;
            break;
        }

        // check for the first section where +50% of it is visible
        if (position.top < 0 && position.bottom > viewportHeight / 2) {
            el.classList.add(activeClass);
            //console.log('Element is partially visible in screen - 2', el);
            break;
        } else if (position.top > 0 && position.top < viewportHeight / 2) {
            el.classList.add(activeClass);
            //console.log('Element is partially visible in screen - 3', el);
            break;
        }
    }

}

// Scroll to anchor using scrollTO event
function scrollToSec(links) {
    links.forEach(function (el) {
        el.addEventListener('click', function (evt) {
            //debugger;
            let topOffset = document.querySelector('section[data-nav="' + this.dataset.section +'"]').offsetTop;
            window.scrollTo({
                top: topOffset,
                left: 0,
                behavior: 'smooth'
            });
        })
    })
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

sections.forEach(function (el) {
    mainNavItems += creatNaveItem(el.dataset.nav);
});

mainNav.innerHTML = mainNavItems;

// Scroll to section on link click

scrollToSec(mainNav.querySelectorAll('a'));

// Set sections as active

window.addEventListener('scroll', function () {
    removeClass(sections, activeClass);
    setActiveSec(sections);
})
