// On start set stats
let hunger = 25; /* 25 */
let tiredness = 30; /* 30 */
let boredom = 35; /* 35 */
let age = 0;

const hungerLevel = hunger;
const tiredLevel = tiredness;
const boredomLevel = boredom;

// Getting css vars
let styles = getComputedStyle(document.documentElement);

// Making menu variables
const eat = 'assets/eatmenu.png';
const sleep = 'assets/sleepmenu.png';

let startMainMenu = () => {
    $('.title-menu').animate({bottom: 0}, {duration: 800, queue: false, complete: () => {

        $('.play-button').on('click', playButton);
    
    }});
}

startMainMenu();

let playButton = (e) => {
    // Fade the menu, bring in the new menu. 
    e.preventDefault();

    // Make the button unusable
    $('.play-button').off('click', playButton);

    $('.title-menu').fadeOut();

    // Fade in game menu
    $('.💪').css('opacity', 0);
    $('.💪').css('display', 'flex');
    $('.💪').animate({opacity: 1}, 1000);

    play();
}

let play = () => {

    // TODO: Enable buttons


    // * Animate progress bars
    $('#hunger').animate({width: 0}, hunger * 1000);
    $('#tiredness').animate({width: 0}, tiredness * 1000);
    $('#boredom').animate({width: 0}, boredom * 1000);

    // * Decrease stat values every second, as if it matched up with the animations

    let timePassed = 0;

    let timer = setInterval(() => {

        timePassed++;
        // Age the tamagotchi based on time passed

        if (timePassed % 15 === 0) {
            age++;

            // Set text to reflect the age
            $('h2').text('Age: ' + age);

        }

        // Decrement stats
        hunger--;
        tiredness--;
        boredom--;
    
        if (hunger <= 0 || tiredness <= 0 || boredom <= 0) {

            // * End the timer
            clearInterval(timer);

            lose();

        }

    }, 1000);

}


let lose = () => {
    
    // * Pause the animations
    $('#hunger').stop();
    $('#tiredness').stop();
    $('#boredom').stop();

    // TODO: Stop player input

    $('.tamagotchi').attr('src', 'assets/tamagotchidead.gif');

    
    setTimeout(() => {

        $('.💪').fadeOut();

        // We need to set up the flexbox so everything will work normal when we bring it back to play again.

        setTimeout(() => {

            resetGame();

            // Bring in the old menu but change the text
            $('.title-menu').css('bottom', '100vh');

            // Make menu visible again
            $('.title-menu').css('opacity', 1);
            $('.title-menu').css('display', 'flex');

            startMainMenu();

        }, 500); 

    }, 3000);
}

let resetGame = () => {

    // Reset values
    hunger = hungerLevel;
    tiredness = tiredLevel;
    boredom = boredomLevel;

    // Reset age
    age = 0;
    // Reset age text
    $('h2').text('Age: 0');

    // Reset progress bars
    let barLength = styles.getPropertyValue('--progress-bar-width');

    $('#hunger').css('width', barLength);
    $('#tiredness').css('width', barLength);
    $('#boredom').css('width', barLength);

    // Reset img
    $('.tamagotchi').attr('src', 'assets/tamagotchi1.gif');

}

let enableButtons = () => {






}

