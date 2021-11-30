// On start
let hunger = 25;
let tiredness = 30;
let boredom = 35;

$('.title-menu').animate({bottom: 0}, {duration: 800, queue: false, complete: () => {

    $('.play-button').on('click', playButton);

}});

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
    // if we want to add random tamagotchi functionality, we just need to have no image initially
    // and then assign a random one right here
    
    // * Animate progress bars
    $('#hunger').animate({width: 0}, hunger * 1000);
    $('#tiredness').animate({width: 0}, tiredness * 1000);
    $('#boredom').animate({width: 0}, boredom * 1000);

    // * Decrease stat values every second, as if it matched up with the animations

    setInterval(() => {
        hunger--;
        tiredness--;
        boredom--;

        // TODO: Check for zeroes to make the player lose        

    }, 1000);

}