
// On start
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

    // decrease the values over time. I wonder if this can be done asyncronously. probably.
    



}