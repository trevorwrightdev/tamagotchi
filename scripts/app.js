// On start set stats
let hunger = 25; /* 25 */
let tiredness = 30; /* 30 */
let boredom = 35; /* 35 */
let age = 0;

const hungerAddAmount = 5;
const tiredAddAmount = 5;
const boredomAddAmount = 5;

const hungerLevel = hunger;
const tiredLevel = tiredness;
const boredomLevel = boredom;

// Getting css vars
let styles = getComputedStyle(document.documentElement);

// Getting progress bar length in pixels

let barMaxPixels = parseFloat($('#hunger').css('width'));

// Making img variables
const eatImage = 'assets/eatmenu.png';
const sleepImage = 'assets/sleepmenu.png';
const playImage = 'assets/playmenu.png';
const tamagotchiImage = 'assets/tamagotchi1.gif';
const tamagotchiDeadImg = 'assets/tamagotchidead.gif';
const tamagotchiEvolved1Img = 'assets/tamagotchevolution1.gif';
const tamagotchiEvo2Img = 'assets/tamagotchievo2.gif';

let currentTamagotchiImg = tamagotchiImage;

let currentMenuIndex = 0;

let startMainMenu = () => {
    $('.title-menu').animate({bottom: 0}, {duration: 800, queue: false, complete: () => {

        $('.play-button').on('click', playButton);
    
    }});
}

startMainMenu();
setupColorButtons();

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

    //Enable buttons
    enableButtons();

    // * Animate progress bars
    $('#hunger').animate({width: 0}, hunger * 1000);
    $('#tiredness').animate({width: 0}, tiredness * 1000);
    $('#boredom').animate({width: 0}, boredom * 1000);

    // * Decrease stat values every second, as if it matched up with the animations

    let timePassed = 0;

    let timer = setInterval(() => {

        timePassed++;
        // Age the tamagotchi based on time passed

        if (timePassed % 5 === 0) {
            age++;

            // Set text to reflect the age
            $('h2').text('Age: ' + age);

        }

        // * EVOLVE TAMAGOTCHI

        if (age === 5) {
            currentTamagotchiImg = tamagotchiEvolved1Img;

            if (currentMenuIndex === 0) {
                // Only change the picture if they are looking at their tamagotchi
                $('.tamagotchi').attr('src', currentTamagotchiImg);
            }
            
        } else if (age === 10) {
            currentTamagotchiImg = tamagotchiEvo2Img;

            if (currentMenuIndex === 0) {
                // Only change the picture if they are looking at their tamagotchi
                $('.tamagotchi').attr('src', currentTamagotchiImg);
            }
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

    // Stop player input
    $('#select').off('click', selectButton);
    $('#continue').off('click', continueButton);
    $('#cancel').off('click', cancelButton);

    $('.tamagotchi').attr('src', tamagotchiDeadImg);

    
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
    $('.tamagotchi').attr('src', tamagotchiImage);

    // Reset currentMenuIndex
    currentMenuIndex = 0;

    // Reset currentTamagotchi
    currentTamagotchiImg = tamagotchiImage;

}

let enableButtons = () => {

    $('#select').on('click', selectButton);
    $('#continue').on('click', continueButton);
    $('#cancel').on('click', cancelButton);

}

let selectButton = (e) => {
    
    e.preventDefault();

    // In this system, each menu is a number.
    // * TAMAGOTCHI: 0
    // * EAT: 1
    // * SLEEP: 2
    // * PLAY: 3

    // Increment menu 0-3
    if (currentMenuIndex !== 3) currentMenuIndex++;
    else currentMenuIndex = 0;

    // Show correct menu based on number
    if (currentMenuIndex === 0) {
        $('.tamagotchi').attr('src', currentTamagotchiImg);
    } else if (currentMenuIndex === 1) {
        $('.tamagotchi').attr('src', eatImage);
    } else if (currentMenuIndex === 2) {
        $('.tamagotchi').attr('src', sleepImage);
    } else if (currentMenuIndex === 3) {
        $('.tamagotchi').attr('src', playImage);
    }
}

let continueButton = (e) => {
    
    e.preventDefault();

    // Add the stats based on current menu, then change the menu back to the tamagotchi.

    // * Stop animation. Change css property. resume animation. Nice and simple.

    if (currentMenuIndex === 1) {
        hunger += hungerAddAmount;

        if (hunger > hungerLevel) hunger = hungerLevel;

        let percent = hunger / hungerLevel;
        let amount = barMaxPixels * percent;

        $('#hunger').stop()

        $('#hunger').css('width', `${amount}px`);

        $('#hunger').animate({width: 0}, hunger * 1000);

    } else if (currentMenuIndex === 2) {
        tiredness += tiredAddAmount;

        if (tiredness > tiredLevel) tiredness = tiredLevel;

        let percent = tiredness / tiredLevel;
        let amount = barMaxPixels * percent;

        $('#tiredness').stop()

        $('#tiredness').css('width', `${amount}px`);

        $('#tiredness').animate({width: 0}, tiredness * 1000);
    } else if (currentMenuIndex === 3) {
        boredom += boredomAddAmount;

        if (boredom > boredomLevel) boredom = boredomLevel;

        let percent = boredom / boredomLevel;
        let amount = barMaxPixels * percent;

        $('#boredom').stop()

        $('#boredom').css('width', `${amount}px`);

        $('#boredom').animate({width: 0}, boredom * 1000);
    } 

    if (currentMenuIndex !== 0) {
        currentMenuIndex = 0;

        $('.tamagotchi').attr('src', currentTamagotchiImg);
    }

}

let cancelButton = (e) => {
    
    e.preventDefault();

    // Do nothing if on tamagotchi menu
    if (currentMenuIndex === 0) return;

    // Set back to tamagotchi menu
    currentMenuIndex = 0;
    $('.tamagotchi').attr('src', currentTamagotchiImg);

}

function setupColorButtons() {

    // * Colors

    // * Green
    let green1 = '#34BE82';
    let green2 = '#1c7c53';
    let green3 = '#F2F013';

    // * Blue
    let blue1 = '#14279B';
    let blue2 = '#3D56B2';
    let blue3 = '#5C7AEA';

    // * Dark
    let dark1 = '#000000';
    let dark2 = '#AA14F0';
    let dark3 = '#BC8CF2';

    $('#green').on('click', (e) => {
        e.preventDefault();

        $('html').css('background-color', green1);
        $('html').css('color', 'black');

        $('.play-button').css('background-color', green2);
        $('.bar-filler').css('background-color', green2);
        $('.game-button').css('background-color', green2);

        $('.bar-background').css('background-color', green3);
        $('.📺').css('background-color', green3);
    });

    $('#blue').on('click', (e) => {
        e.preventDefault();

        $('html').css('background-color', blue1);
        $('html').css('color', 'black');

        $('.play-button').css('background-color', blue2);
        $('.bar-filler').css('background-color', blue2);
        $('.game-button').css('background-color', blue2);

        $('.bar-background').css('background-color', blue3);
        $('.📺').css('background-color', blue3);
    });

    $('#dark').on('click', (e) => {
        e.preventDefault();

        $('html').css('background-color', dark1);
        $('html').css('color', 'white');

        $('.play-button').css('background-color', dark2);
        $('.bar-filler').css('background-color', dark2);
        $('.game-button').css('background-color', dark2);

        $('.bar-background').css('background-color', dark3);
        $('.📺').css('background-color', dark3);
    });



}

